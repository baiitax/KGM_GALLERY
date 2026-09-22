import { NextResponse } from 'next/server';
import { getDatabase } from '@/lib/db';

export async function GET(req: Request, { params }: { params: { id: string } }) {
  try {
    const db = getDatabase();
    const projectId = params.id;

    const project = db.prepare(`
      SELECT p.*, prop.property_name, prop.location, prop.price, prop.currency,
             prop.bedrooms, prop.bathrooms, prop.property_size, prop.description
      FROM projects p
      LEFT JOIN properties prop ON p.property_id = prop.id
      WHERE p.id = ? OR p.public_id = ?
    `).get(projectId, projectId);

    if (!project) {
      return NextResponse.json({ success: false, error: 'Project not found' }, { status: 404 });
    }

    const actualProjectId = (project as any).id;

    const shots = db.prepare(`
      SELECT cs.*, mp.name as preset_name, mp.direction as camera_movement, cs.lens as lens_focal_length,
             cs.duration as duration_seconds,
             sg.output_path as video_url, sg.status as generation_status, sg.progress, sg.provider
      FROM cinematic_shots cs
      LEFT JOIN motion_presets mp ON cs.motion_preset_id = mp.id
      LEFT JOIN shot_generations sg ON cs.id = sg.shot_id AND sg.status = 'completed'
      WHERE cs.project_id = ?
      ORDER BY cs.shot_number ASC
    `).all(actualProjectId);

    const images = db.prepare(`
      SELECT pi.*, pi.storage_path as file_path, ia.category as room_category, ia.lighting_condition, ia.dominant_feature as detected_features, ia.confidence as confidence_score
      FROM property_images pi
      LEFT JOIN image_analysis ia ON pi.id = ia.image_id
      WHERE pi.project_id = ?
      ORDER BY pi.sort_order ASC
    `).all(actualProjectId);

    const exports = db.prepare(`
      SELECT * FROM exports WHERE project_id = ? ORDER BY created_at DESC
    `).all(actualProjectId);

    const brand = db.prepare(`
      SELECT * FROM brand_profiles WHERE is_default = 1 LIMIT 1
    `).get();

    const musicTracks = db.prepare(`
      SELECT * FROM music_tracks ORDER BY category ASC
    `).all();

    return NextResponse.json({
      success: true,
      project,
      shots,
      images,
      exports,
      brand,
      musicTracks,
    });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  try {
    const db = getDatabase();
    const projectId = params.id;
    const body = await req.json();
    const now = new Date().toISOString();

    if (body.title || body.video_style || body.default_aspect_ratio || body.audio_track_id || body.status) {
      db.prepare(`
        UPDATE projects
        SET title = COALESCE(?, title),
            video_style = COALESCE(?, video_style),
            default_aspect_ratio = COALESCE(?, default_aspect_ratio),
            audio_track_id = COALESCE(?, audio_track_id),
            status = COALESCE(?, status),
            updated_at = ?
        WHERE id = ?
      `).run(
        body.title,
        body.video_style,
        body.default_aspect_ratio,
        body.audio_track_id,
        body.status,
        now,
        projectId
      );
    }

    if (body.shots && Array.isArray(body.shots)) {
      for (const [index, shot] of body.shots.entries()) {
        if (shot.id) {
          db.prepare(`
            UPDATE cinematic_shots
            SET shot_number = ?,
                sort_order = ?,
                motion_preset_id = COALESCE(?, motion_preset_id),
                duration = COALESCE(?, duration),
                status = COALESCE(?, status),
                transition_type = COALESCE(?, transition_type),
                camera_speed = COALESCE(?, camera_speed),
                updated_at = ?
            WHERE id = ?
          `).run(
            index + 1,
            index + 1,
            shot.motion_preset_id,
            shot.duration_seconds || shot.duration,
            shot.status,
            shot.transition_type,
            shot.camera_speed,
            now,
            shot.id
          );
        }
      }
    }

    return NextResponse.json({ success: true, message: 'Project updated successfully' });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
