import { NextRequest, NextResponse } from 'next/server';
import { getDb } from '@/lib/db/database';
import { VideoAssemblyPipeline } from '@/lib/video/ffmpeg-pipeline';
import { BrandProfile, CinematicShot, Project, Property } from '@/lib/types';

export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const db = getDb();
    const projectId = params.id;
    const now = new Date().toISOString();

    const project = db.prepare('SELECT * FROM projects WHERE id = ?').get(projectId) as Project | undefined;
    if (!project) return NextResponse.json({ error: 'Project not found' }, { status: 404 });

    const property = db.prepare('SELECT * FROM properties WHERE id = ?').get(project.property_id) as Property | undefined;
    const brandProfile = (db.prepare('SELECT * FROM brand_profiles WHERE id = ?').get(project.brand_profile_id || 'brand_kgm_default') ||
      db.prepare('SELECT * FROM brand_profiles LIMIT 1').get()) as BrandProfile;

    const musicTrack = db.prepare('SELECT * FROM music_tracks WHERE id = ?').get(project.music_track_id || 'mus_lux_01') as any;

    // Fetch shots
    const shotsRaw = db.prepare(`
      SELECT cs.*, pi.storage_path as image_storage_path, pi.original_filename as image_filename
      FROM cinematic_shots cs
      LEFT JOIN property_images pi ON cs.image_id = pi.id
      WHERE cs.project_id = ?
      ORDER BY cs.sort_order ASC
    `).all(projectId) as any[];

    if (shotsRaw.length === 0) {
      return NextResponse.json({ error: 'No shots in storyboard to assemble' }, { status: 400 });
    }

    // Attach video paths
    const shotsToRender = shotsRaw.map(shot => {
      let activeGen = null;
      if (shot.approved_generation_id) {
        activeGen = db.prepare('SELECT * FROM shot_generations WHERE id = ?').get(shot.approved_generation_id) as any;
      }
      if (!activeGen) {
        activeGen = db.prepare('SELECT * FROM shot_generations WHERE shot_id = ? AND status = "completed" ORDER BY created_at DESC LIMIT 1').get(shot.id) as any;
      }

      return {
        ...shot,
        videoPath: activeGen?.output_path || shot.image_storage_path,
        image: {
          id: shot.image_id,
          project_id: projectId,
          storage_path: shot.image_storage_path,
          original_filename: shot.image_filename,
        },
      };
    });

    const renderJobId = `rend_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;

    // Create Render Job Record
    db.prepare(`
      INSERT INTO render_jobs (
        id, project_id, status, progress, current_step, total_steps, step_number,
        duration_seconds, resolution, file_size_bytes, created_at
      ) VALUES (?, ?, 'processing', 5, 'normalizing_assets', 7, 1, ?, '1920x1080', 0, ?)
    `).run(
      renderJobId,
      projectId,
      shotsToRender.reduce((a, s) => a + (s.duration || 10), 0) + 7,
      now
    );

    // Update Project Status
    db.prepare(`UPDATE projects SET status = 'rendering', updated_at = ? WHERE id = ?`).run(now, projectId);

    // Run Assembly Pipeline
    const completedJob = await VideoAssemblyPipeline.assembleAndRender(
      {
        projectId,
        renderJobId,
        project,
        property,
        shots: shotsToRender as any,
        brandProfile,
        musicTrackPath: musicTrack?.file_path,
      },
      db
    );

    return NextResponse.json({
      success: true,
      message: 'Property film assembled and rendered successfully',
      renderJob: completedJob,
    });
  } catch (error: any) {
    console.error('Assembly API error:', error);
    return NextResponse.json({ error: error?.message || 'Video assembly failed' }, { status: 500 });
  }
}
