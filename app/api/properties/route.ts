import { NextResponse } from 'next/server';
import { getDatabase } from '@/lib/db';

export async function GET() {
  try {
    const db = getDatabase();
    const properties = db.prepare(`
      SELECT prop.*, 
             (SELECT COUNT(*) FROM property_images pi JOIN projects p ON pi.project_id = p.id WHERE p.property_id = prop.id) as image_count,
             (SELECT COUNT(*) FROM projects WHERE property_id = prop.id) as project_count,
             (SELECT pi.storage_path FROM property_images pi JOIN projects p ON pi.project_id = p.id WHERE p.property_id = prop.id ORDER BY pi.sort_order ASC LIMIT 1) as cover_image
      FROM properties prop
      ORDER BY prop.created_at DESC
    `).all();

    return NextResponse.json({ success: true, properties });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const db = getDatabase();
    const body = await req.json();
    const id = `prop_${Date.now()}`;
    const now = new Date().toISOString();

    db.prepare(`
      INSERT INTO properties (
        id, property_name, property_type, marketing_objective, location,
        price, currency, bedrooms, bathrooms, property_size, description,
        agent_name, agent_contact, agent_whatsapp, created_at, updated_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).run(
      id,
      body.property_name || 'New Property',
      body.property_type || 'luxury_villa',
      body.marketing_objective || 'sale',
      body.location || 'Riyadh, Saudi Arabia',
      body.price || 25000000,
      body.currency || 'SAR',
      body.bedrooms || 4,
      body.bathrooms || 5,
      body.property_size || '8,500 sq ft',
      body.description || 'Stunning luxury residence.',
      body.agent_name || 'KGM Private Client Advisor',
      body.agent_contact || 'concierge@kgm-estates.com',
      body.agent_whatsapp || '+966 50 000 0000',
      now,
      now
    );

    const property = db.prepare('SELECT * FROM properties WHERE id = ?').get(id);
    return NextResponse.json({ success: true, property });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
