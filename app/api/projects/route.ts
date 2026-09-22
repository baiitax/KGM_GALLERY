import { NextResponse } from 'next/server';
import { getDatabase } from '@/lib/db';

export async function GET() {
  try {
    const db = getDatabase();
    const projects = db.prepare(`
      SELECT p.*, prop.property_name, prop.location, prop.price, prop.currency, prop.bedrooms, prop.bathrooms, prop.property_size,
             (SELECT COUNT(*) FROM cinematic_shots WHERE project_id = p.id) as shot_count,
             (SELECT COUNT(*) FROM cinematic_shots WHERE project_id = p.id AND status = 'approved') as approved_shot_count
      FROM projects p
      LEFT JOIN properties prop ON p.property_id = prop.id
      ORDER BY p.updated_at DESC
    `).all();

    return NextResponse.json({ success: true, projects });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const db = getDatabase();
    const body = await req.json();
    const id = `proj_${Date.now()}`;
    const publicId = `film-${Math.random().toString(36).substring(2, 9)}`;
    const now = new Date().toISOString();

    let propertyId = body.property_id;
    if (!propertyId && body.property_name) {
      propertyId = `prop_${Date.now()}`;
      db.prepare(`
        INSERT INTO properties (
          id, property_name, property_type, marketing_objective, location,
          price, currency, bedrooms, bathrooms, property_size, description, created_at, updated_at
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `).run(
        propertyId,
        body.property_name,
        body.property_type || 'luxury_villa',
        body.marketing_objective || 'sale',
        body.location || 'Riyadh, Saudi Arabia',
        body.price || 45000000,
        body.currency || 'SAR',
        body.bedrooms || 5,
        body.bathrooms || 6,
        body.property_size || '12,000 sq ft',
        body.description || 'Exclusive architectural residence.',
        now,
        now
      );
    }

    db.prepare(`
      INSERT INTO projects (
        id, property_id, title, status, default_aspect_ratio,
        target_duration_seconds, video_style, public_id, created_at, updated_at
      ) VALUES (?, ?, ?, 'draft', ?, ?, ?, ?, ?, ?)
    `).run(
      id,
      propertyId,
      body.title || body.property_name || 'Untitled KGM Project',
      body.default_aspect_ratio || '16:9',
      body.target_duration_seconds || 100,
      body.video_style || 'kgm_luxury',
      publicId,
      now,
      now
    );

    const project = db.prepare('SELECT * FROM projects WHERE id = ?').get(id);
    return NextResponse.json({ success: true, project });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
