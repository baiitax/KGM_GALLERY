const path = require('path');
const Database = require('better-sqlite3');
const { VideoAssemblyPipeline } = require('../lib/video/ffmpeg-pipeline');

async function main() {
  const DB_PATH = path.join(__dirname, '..', 'data', 'kgm_studio.db');
  const db = new Database(DB_PATH);

  const projectId = 'proj_kgm_riyadh_01';
  const project = db.prepare('SELECT * FROM projects WHERE id = ?').get(projectId);
  const property = db.prepare('SELECT * FROM properties WHERE id = ?').get(project.property_id);
  const brandProfile = db.prepare('SELECT * FROM brand_profiles WHERE id = ?').get(project.brand_profile_id);
  const musicTrack = db.prepare('SELECT * FROM music_tracks WHERE id = ?').get(project.music_track_id);

  const shotsRaw = db.prepare('SELECT cs.*, pi.storage_path as image_storage_path FROM cinematic_shots cs LEFT JOIN property_images pi ON cs.image_id = pi.id WHERE cs.project_id = ? ORDER BY cs.sort_order ASC').all(projectId);

  const shotsToRender = shotsRaw.map(shot => {
    const activeGen = db.prepare('SELECT * FROM shot_generations WHERE shot_id = ? AND status = "completed" ORDER BY created_at DESC LIMIT 1').get(shot.id);
    return {
      ...shot,
      videoPath: activeGen ? activeGen.output_path : shot.image_storage_path,
    };
  });

  const renderJobId = `rend_demo_${Date.now()}`;
  db.prepare(`
    INSERT INTO render_jobs (
      id, project_id, status, progress, current_step, total_steps, step_number,
      duration_seconds, resolution, file_size_bytes, created_at
    ) VALUES (?, ?, 'processing', 10, 'normalizing_assets', 7, 1, 107, '1920x1080', 0, datetime('now'))
  `).run(renderJobId, projectId);

  console.log('Assembling Master 4K & Social exports for demo film...');
  // Require from our compiled bundle or execute direct pipeline
}

main().catch(console.error);
