import { NextRequest, NextResponse } from 'next/server';
import { getDb } from '@/lib/db/database';
import { CinematicShot, PropertyImage } from '@/lib/types';

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const db = getDb();
    const projectId = params.id;

    const project = db.prepare('SELECT * FROM projects WHERE id = ?').get(projectId) as any;
    if (!project) {
      return NextResponse.json({ error: 'Project not found' }, { status: 404 });
    }

    const property = db.prepare('SELECT * FROM properties WHERE id = ?').get(project.property_id);
    
    // Fetch images with analysis
    const images = db.prepare(`
      SELECT pi.*, ia.confidence, ia.dominant_feature, ia.camera_direction as ana_direction,
             ia.foreground, ia.midground, ia.background, ia.depth_score,
             ia.lighting_condition, ia.generation_risk, ia.recommended_motion,
             ia.recommended_lens, ia.suggested_duration
      FROM property_images pi
      LEFT JOIN image_analysis ia ON pi.id = ia.image_id
      WHERE pi.project_id = ?
      ORDER BY pi.sort_order ASC
    `).all(projectId);

    // Fetch cinematic shots with preset and generations
    const shotsRaw = db.prepare(`
      SELECT cs.*, mp.key as preset_key, mp.name as preset_name, mp.description as preset_desc,
             mp.direction as preset_dir, mp.speed as preset_speed, mp.default_lens as preset_lens,
             mp.motion_intensity as preset_intensity, mp.risk_level as preset_risk
      FROM cinematic_shots cs
      LEFT JOIN motion_presets mp ON cs.motion_preset_id = mp.id
      WHERE cs.project_id = ?
      ORDER BY cs.sort_order ASC
    `).all(projectId) as any[];

    const shots = shotsRaw.map(shot => {
      const generations = db.prepare('SELECT * FROM shot_generations WHERE shot_id = ? ORDER BY created_at DESC').all(shot.id);
      const activeGen = generations.find(g => g.id === shot.approved_generation_id) || generations[0];
      const image = images.find(img => img.id === shot.image_id);

      return {
        ...shot,
        image,
        generations,
        active_generation: activeGen,
      };
    });

    const brandProfile = db.prepare('SELECT * FROM brand_profiles WHERE id = ?').get(project.brand_profile_id || 'brand_kgm_default') ||
                         db.prepare('SELECT * FROM brand_profiles LIMIT 1').get();

    const musicTracks = db.prepare('SELECT * FROM music_tracks ORDER BY created_at ASC').all();
    const activeMusic = musicTracks.find(m => m.id === project.music_track_id) || musicTracks[0];

    const voiceover = db.prepare('SELECT * FROM voiceovers WHERE project_id = ?').get(projectId);
    const renderJobs = db.prepare('SELECT * FROM render_jobs WHERE project_id = ? ORDER BY created_at DESC').all(projectId);
    const exports = db.prepare('SELECT * FROM exports WHERE project_id = ? ORDER BY created_at DESC').all(projectId);

    return NextResponse.json({
      project,
      property,
      images,
      shots,
      brandProfile,
      musicTracks,
      activeMusic,
      voiceover,
      renderJobs,
      exports,
    });
  } catch (error: any) {
    console.error('Fetch project error:', error);
    return NextResponse.json({ error: error?.message }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const db = getDb();
    const projectId = params.id;
    const body = await req.json();
    const now = new Date().toISOString();

    // 1. Update Project Fields if present
    const projectUpdates: string[] = [];
    const projectValues: any[] = [];

    if (body.title !== undefined) { projectUpdates.push('title = ?'); projectValues.push(body.title); }
    if (body.status !== undefined) { projectUpdates.push('status = ?'); projectValues.push(body.status); }
    if (body.cinematic_style !== undefined) { projectUpdates.push('cinematic_style = ?'); projectValues.push(body.cinematic_style); }
    if (body.default_duration !== undefined) { projectUpdates.push('default_duration = ?'); projectValues.push(body.default_duration); }
    if (body.target_aspect_ratio !== undefined) { projectUpdates.push('target_aspect_ratio = ?'); projectValues.push(body.target_aspect_ratio); }
    if (body.brand_profile_id !== undefined) { projectUpdates.push('brand_profile_id = ?'); projectValues.push(body.brand_profile_id); }
    if (body.music_track_id !== undefined) { projectUpdates.push('music_track_id = ?'); projectValues.push(body.music_track_id); }
    if (body.is_public !== undefined) { projectUpdates.push('is_public = ?'); projectValues.push(body.is_public ? 1 : 0); }

    if (projectUpdates.length > 0) {
      projectUpdates.push('updated_at = ?');
      projectValues.push(now);
      projectValues.push(projectId);
      db.prepare(`UPDATE projects SET ${projectUpdates.join(', ')} WHERE id = ?`).run(...projectValues);
    }

    // 2. Update Property Fields if present
    if (body.property) {
      const propUpdates: string[] = [];
      const propValues: any[] = [];
      const prop = body.property;

      if (prop.property_name !== undefined) { propUpdates.push('property_name = ?'); propValues.push(prop.property_name); }
      if (prop.property_ref !== undefined) { propUpdates.push('property_ref = ?'); propValues.push(prop.property_ref); }
      if (prop.property_type !== undefined) { propUpdates.push('property_type = ?'); propValues.push(prop.property_type); }
      if (prop.marketing_objective !== undefined) { propUpdates.push('marketing_objective = ?'); propValues.push(prop.marketing_objective); }
      if (prop.location !== undefined) { propUpdates.push('location = ?'); propValues.push(prop.location); }
      if (prop.price !== undefined) { propUpdates.push('price = ?'); propValues.push(prop.price); }
      if (prop.rental_price !== undefined) { propUpdates.push('rental_price = ?'); propValues.push(prop.rental_price); }
      if (prop.bedrooms !== undefined) { propUpdates.push('bedrooms = ?'); propValues.push(Number(prop.bedrooms)); }
      if (prop.bathrooms !== undefined) { propUpdates.push('bathrooms = ?'); propValues.push(Number(prop.bathrooms)); }
      if (prop.property_size !== undefined) { propUpdates.push('property_size = ?'); propValues.push(prop.property_size); }
      if (prop.description !== undefined) { propUpdates.push('description = ?'); propValues.push(prop.description); }
      if (prop.agent_name !== undefined) { propUpdates.push('agent_name = ?'); propValues.push(prop.agent_name); }
      if (prop.agent_contact !== undefined) { propUpdates.push('agent_contact = ?'); propValues.push(prop.agent_contact); }
      if (prop.agent_whatsapp !== undefined) { propUpdates.push('agent_whatsapp = ?'); propValues.push(prop.agent_whatsapp); }
      if (prop.agent_website !== undefined) { propUpdates.push('agent_website = ?'); propValues.push(prop.agent_website); }
      if (prop.cta_text !== undefined) { propUpdates.push('cta_text = ?'); propValues.push(prop.cta_text); }

      if (propUpdates.length > 0) {
        propUpdates.push('updated_at = ?');
        propValues.push(now);
        propValues.push(body.property_id || prop.id);
        db.prepare(`UPDATE properties SET ${propUpdates.join(', ')} WHERE id = ?`).run(...propValues);
      }
    }

    return NextResponse.json({ success: true, message: 'Project updated successfully' });
  } catch (error: any) {
    return NextResponse.json({ error: error?.message }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const db = getDb();
    const projectId = params.id;

    db.prepare('DELETE FROM projects WHERE id = ?').run(projectId);
    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error?.message }, { status: 500 });
  }
}
