import { NextRequest, NextResponse } from 'next/server';
import { getDb } from '@/lib/db/database';

export async function GET(req: NextRequest, { params }: { params: { publicId: string } }) {
  try {
    const db = getDb();
    const publicId = params.publicId;

    const project = db.prepare('SELECT * FROM projects WHERE public_id = ? OR id = ?').get(publicId, publicId) as any;
    if (!project) return NextResponse.json({ error: 'Property film not found' }, { status: 404 });

    const property = db.prepare('SELECT * FROM properties WHERE id = ?').get(project.property_id);
    const brandProfile = db.prepare('SELECT * FROM brand_profiles WHERE id = ?').get(project.brand_profile_id || 'brand_kgm_default') ||
                         db.prepare('SELECT * FROM brand_profiles LIMIT 1').get();

    const exports = db.prepare('SELECT * FROM exports WHERE project_id = ? ORDER BY created_at DESC').all(project.id);
    const images = db.prepare('SELECT * FROM property_images WHERE project_id = ? ORDER BY sort_order ASC').all(project.id);

    return NextResponse.json({
      project,
      property,
      brandProfile,
      exports,
      images,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error?.message }, { status: 500 });
  }
}
