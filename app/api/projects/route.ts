import { NextRequest, NextResponse } from 'next/server';
import { getDb } from '@/lib/db/database';
import { Project, Property } from '@/lib/types';

export async function GET(req: NextRequest) {
  try {
    const db = getDb();
    const { searchParams } = new URL(req.url);
    const status = searchParams.get('status');
    const objective = searchParams.get('objective');
    const search = searchParams.get('search');

    let query = `
      SELECT p.*,
             prop.property_name, prop.property_ref, prop.property_type,
             prop.marketing_objective, prop.location, prop.price, prop.rental_price,
             (SELECT COUNT(*) FROM property_images WHERE project_id = p.id) as images_count,
             (SELECT COUNT(*) FROM cinematic_shots WHERE project_id = p.id) as shots_count,
             (SELECT COUNT(*) FROM cinematic_shots WHERE project_id = p.id AND (status = 'approved' OR status = 'generated')) as completed_shots_count
      FROM projects p
      LEFT JOIN properties prop ON p.property_id = prop.id
      WHERE 1=1
    `;
    const params: any[] = [];

    if (status && status !== 'all') {
      query += ` AND p.status = ?`;
      params.push(status);
    }
    if (objective && objective !== 'all') {
      query += ` AND prop.marketing_objective = ?`;
      params.push(objective);
    }
    if (search) {
      query += ` AND (p.title LIKE ? OR prop.property_name LIKE ? OR prop.location LIKE ?)`;
      params.push(`%${search}%`, `%${search}%`, `%${search}%`);
    }

    query += ` ORDER BY p.updated_at DESC`;

    const projects = db.prepare(query).all(...params);
    return NextResponse.json({ projects });
  } catch (error: any) {
    return NextResponse.json({ error: error?.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const db = getDb();
    const body = await req.json();

    const now = new Date().toISOString();
    const propertyId = `prop_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`;
    const projectId = `proj_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`;
    const orgId = body.org_id || 'org_kgm_01';
    const userId = body.user_id || 'usr_super_01';

    const publicSlug = (body.property_name || 'luxury-residence')
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '') + `-${Math.random().toString(36).substring(2, 6)}`;

    // 1. Insert Property
    db.prepare(`
      INSERT INTO properties (
        id, org_id, property_name, property_ref, property_type, marketing_objective,
        location, property_status, bedrooms, bathrooms, property_size, price,
        rental_price, currency, description, agent_name, agent_contact, agent_whatsapp,
        agent_website, cta_text, created_at, updated_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).run(
      propertyId,
      orgId,
      body.property_name || 'Untitled Luxury Property',
      body.property_ref || `KGM-${Math.floor(1000 + Math.random() * 9000)}`,
      body.property_type || 'Villa',
      body.marketing_objective || 'For Sale',
      body.location || 'Riyadh, Saudi Arabia',
      body.property_status || 'Active',
      Number(body.bedrooms) || 4,
      Number(body.bathrooms) || 5,
      body.property_size || '12,000 sq ft',
      body.price || '$8,500,000',
      body.rental_price || null,
      body.currency || 'USD',
      body.description || 'Exclusive luxury residence presented by Kurra Greenfield Merchants Limited.',
      body.agent_name || 'KGM Private Client Advisory',
      body.agent_contact || '+966 11 450 8899',
      body.agent_whatsapp || '+966 50 123 4567',
      body.agent_website || 'www.kgmlimited.com',
      body.cta_text || 'Schedule a Private Viewing',
      now,
      now
    );

    // 2. Insert Project
    db.prepare(`
      INSERT INTO projects (
        id, org_id, property_id, title, status, cinematic_style, default_duration,
        target_aspect_ratio, brand_profile_id, music_track_id, public_id, is_public,
        created_by, created_at, updated_at
      ) VALUES (?, ?, ?, ?, 'draft', ?, ?, ?, 'brand_kgm_default', 'mus_lux_01', ?, 1, ?, ?, ?)
    `).run(
      projectId,
      orgId,
      propertyId,
      `${body.property_name || 'Luxury Property'} — Cinematic Film`,
      body.cinematic_style || 'kgm_luxury',
      Number(body.default_duration) || 10,
      body.target_aspect_ratio || '16:9',
      publicSlug,
      userId,
      now,
      now
    );

    // Log Audit
    db.prepare(`
      INSERT INTO audit_logs (id, user_id, user_email, action, entity_type, entity_id, details_json, created_at)
      VALUES (?, ?, ?, 'CREATE_PROJECT', 'project', ?, ?, ?)
    `).run(
      `log_${Date.now()}`,
      userId,
      'executive@kgmlimited.com',
      projectId,
      JSON.stringify({ propertyId, title: body.property_name }),
      now
    );

    const project = db.prepare('SELECT * FROM projects WHERE id = ?').get(projectId);
    const property = db.prepare('SELECT * FROM properties WHERE id = ?').get(propertyId);

    return NextResponse.json({ success: true, project, property });
  } catch (error: any) {
    console.error('Create project error:', error);
    return NextResponse.json({ error: error?.message }, { status: 500 });
  }
}
