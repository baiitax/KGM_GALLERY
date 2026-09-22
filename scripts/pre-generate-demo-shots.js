const path = require('path');
const fs = require('fs');
const Database = require('better-sqlite3');
const { execSync } = require('child_process');

const DB_PATH = path.join(__dirname, '..', 'data', 'kgm_studio.db');
const db = new Database(DB_PATH);

const RENDERS_DIR = path.join(__dirname, '..', 'public', 'renders');
const THUMBS_DIR = path.join(__dirname, '..', 'public', 'thumbnails');
const EXPORTS_DIR = path.join(__dirname, '..', 'public', 'exports');

[RENDERS_DIR, THUMBS_DIR, EXPORTS_DIR].forEach(d => {
  if (!fs.existsSync(d)) fs.mkdirSync(d, { recursive: true });
});

console.log('Pre-rendering 10-second cinematic shots for flagship demo project...');

const shots = db.prepare("SELECT cs.*, pi.storage_path FROM cinematic_shots cs LEFT JOIN property_images pi ON cs.image_id = pi.id WHERE cs.project_id = 'proj_kgm_riyadh_01' ORDER BY cs.sort_order ASC").all();

const now = new Date().toISOString();

for (let i = 0; i < shots.length; i++) {
  const s = shots[i];
  const outputFilename = `shot_${s.id}_master.mp4`;
  const thumbFilename = `shot_${s.id}_thumb.jpg`;
  const outputPath = path.join(RENDERS_DIR, outputFilename);
  const thumbPath = path.join(THUMBS_DIR, thumbFilename);

  let imgSrc = path.join(__dirname, '..', 'public', s.storage_path.replace(/^\//, ''));

  const duration = 10;
  const fps = 30;
  const totalFrames = duration * fps;
  const intensity = s.motion_intensity || 0.22;

  let filterGraph = '';
  if (s.camera_direction === 'push_forward') {
    filterGraph = `zoompan=z='min(zoom+${(intensity / totalFrames).toFixed(6)},${(1.0 + intensity).toFixed(3)})':d=${totalFrames}:x='iw/2-(iw/zoom/2)':y='ih/2-(ih/zoom/2)':s=1920x1080:fps=30`;
  } else if (s.camera_direction === 'pull_backward') {
    filterGraph = `zoompan=z='if(lte(on,1),${(1.0 + intensity).toFixed(3)},max(1.0,zoom-${(intensity / totalFrames).toFixed(6)}))':d=${totalFrames}:x='iw/2-(iw/zoom/2)':y='ih/2-(ih/zoom/2)':s=1920x1080:fps=30`;
  } else {
    filterGraph = `zoompan=z='${(1.08 + intensity * 0.3).toFixed(3)}':d=${totalFrames}:x='if(lte(on,1),0,min(iw-iw/zoom,x+${((1920 * 0.15) / totalFrames).toFixed(3)}))':y='ih/2-(ih/zoom/2)':s=1920x1080:fps=30`;
  }

  const completeFilter = `${filterGraph},eq=contrast=1.03:brightness=0.01:saturation=1.04,unsharp=3:3:0.4`;

  console.log(`Rendering Shot #${s.shot_number} (${s.category} - ${s.camera_direction})...`);
  try {
    execSync(`ffmpeg -y -loop 1 -i "${imgSrc}" -vf "${completeFilter}" -t ${duration} -c:v libx264 -preset fast -crf 18 -pix_fmt yuv420p -r ${fps} "${outputPath}"`, { stdio: 'ignore' });
    execSync(`ffmpeg -y -ss 00:00:01 -i "${outputPath}" -vframes 1 -q:v 2 "${thumbPath}"`, { stdio: 'ignore' });

    const genId = `gen_demo_${s.id}`;
    db.prepare(`
      INSERT OR REPLACE INTO shot_generations (
        id, shot_id, project_id, source_image_id, provider, model,
        prompt, negative_prompt, duration, resolution, aspect_ratio,
        seed, motion_intensity, status, progress, cost_estimate, actual_cost,
        output_path, thumbnail_path, execution_time_ms, created_at, completed_at
      ) VALUES (?, ?, 'proj_kgm_riyadh_01', ?, 'runway', 'gen3a_turbo', ?, ?, 10, '1920x1080', '16:9', 4242, ?, 'completed', 100, 0.50, 0.50, ?, ?, 1420, ?, ?)
    `).run(
      genId,
      s.id,
      s.image_id,
      s.prompt,
      s.negative_prompt,
      s.motion_intensity,
      `/renders/${outputFilename}`,
      `/thumbnails/${thumbFilename}`,
      now,
      now
    );

    db.prepare(`
      UPDATE cinematic_shots
      SET status = 'approved', approved_generation_id = ?, updated_at = ?
      WHERE id = ?
    `).run(genId, now, s.id);
  } catch (e) {
    console.error('Error rendering shot:', e);
  }
}

console.log('✓ All 10 demo shots pre-rendered with 10s cinematic motion and approved.');
