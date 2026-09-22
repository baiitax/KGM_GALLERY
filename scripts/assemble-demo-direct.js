const path = require('path');
const fs = require('fs');
const Database = require('better-sqlite3');
const { execSync } = require('child_process');

const DB_PATH = path.join(__dirname, '..', 'data', 'kgm_studio.db');
const db = new Database(DB_PATH);

const RENDERS_DIR = path.join(__dirname, '..', 'public', 'renders');
const EXPORTS_DIR = path.join(__dirname, '..', 'public', 'exports');
const THUMBS_DIR = path.join(__dirname, '..', 'public', 'thumbnails');
const TEMP_DIR = path.join(__dirname, '..', 'public', 'temp', 'demo_init');

[RENDERS_DIR, EXPORTS_DIR, THUMBS_DIR, TEMP_DIR].forEach(d => {
  if (!fs.existsSync(d)) fs.mkdirSync(d, { recursive: true });
});

console.log('Assembling Master KGM Film for demo project...');

const projectId = 'proj_kgm_riyadh_01';
const renderJobId = 'rend_demo_master_01';

// 1. Prepare concat list of the 10 shots
const shots = db.prepare("SELECT * FROM shot_generations WHERE project_id = ? AND status = 'completed' ORDER BY id ASC").all(projectId);
const shotVideoPaths = shots.map(s => path.join(__dirname, '..', 'public', s.output_path.replace(/^\//, '')));

const concatList = path.join(TEMP_DIR, 'concat_shots.txt');
fs.writeFileSync(concatList, shotVideoPaths.map(p => `file '${p}'`).join('\n'));

const shotsSequencePath = path.join(TEMP_DIR, 'shots_combined.mp4');
execSync(`ffmpeg -y -f concat -safe 0 -i "${concatList}" -c copy "${shotsSequencePath}"`);

// 2. Add Background Music & Mix Audio
const audioSrc = path.join(__dirname, '..', 'public', 'audio', 'luxury_prestige.mp3');
const master169Filename = `film_${projectId}_master_16x9.mp4`;
const master169Path = path.join(EXPORTS_DIR, master169Filename);

console.log('Mixing audio and mastering 16:9 1080p Cine Master...');
execSync(`ffmpeg -y -i "${shotsSequencePath}" -stream_loop -1 -i "${audioSrc}" -filter_complex "[1:a]volume=0.35,afade=t=out:st=97:d=3[aout]" -map 0:v -map "[aout]" -c:v copy -c:a aac -b:a 256k -shortest "${master169Path}"`);

// 3. Generate 9:16 Social Portrait Version
console.log('Generating 9:16 Portrait Social Reel...');
const portraitFilename = `film_${projectId}_social_portrait_9x16.mp4`;
const portraitPath = path.join(EXPORTS_DIR, portraitFilename);
execSync(`ffmpeg -y -i "${master169Path}" -vf "scale=1080:1920:force_original_aspect_ratio=increase,crop=1080:1920" -c:v libx264 -preset fast -crf 20 -c:a copy "${portraitPath}"`);

// 4. Generate 1:1 Social Square Version
console.log('Generating 1:1 Square Feed Version...');
const squareFilename = `film_${projectId}_social_square_1x1.mp4`;
const squarePath = path.join(EXPORTS_DIR, squareFilename);
execSync(`ffmpeg -y -i "${master169Path}" -vf "scale=1080:1080:force_original_aspect_ratio=increase,crop=1080:1080" -c:v libx264 -preset fast -crf 20 -c:a copy "${squarePath}"`);

// 5. Generate Compressed WhatsApp Version
console.log('Generating WhatsApp fast mobile share...');
const whatsappFilename = `film_${projectId}_whatsapp_fast.mp4`;
const whatsappPath = path.join(EXPORTS_DIR, whatsappFilename);
execSync(`ffmpeg -y -i "${master169Path}" -vf "scale=1280:720" -c:v libx264 -preset fast -crf 26 -b:v 1500k -c:a aac -b:a 128k "${whatsappPath}"`);

// 6. Generate Master Film Thumbnail
const thumbFilename = `film_${projectId}_thumb.jpg`;
const thumbPath = path.join(THUMBS_DIR, thumbFilename);
execSync(`ffmpeg -y -ss 00:00:04 -i "${master169Path}" -vframes 1 -q:v 2 "${thumbPath}"`);

const now = new Date().toISOString();
const masterStat = fs.statSync(master169Path);
const portStat = fs.statSync(portraitPath);
const sqStat = fs.statSync(squarePath);
const waStat = fs.statSync(whatsappPath);

// Save Render Job in DB
db.prepare(`
  INSERT OR REPLACE INTO render_jobs (
    id, project_id, status, progress, current_step, total_steps, step_number,
    output_master_path, output_landscape_path, output_portrait_path,
    output_square_path, output_whatsapp_path, thumbnail_path,
    duration_seconds, resolution, file_size_bytes, started_at, completed_at, created_at
  ) VALUES (
    ?, ?, 'completed', 100, 'completed', 7, 7,
    ?, ?, ?,
    ?, ?, ?,
    100, '1920x1080', ?, ?, ?, ?
  )
`).run(
  renderJobId,
  projectId,
  `/exports/${master169Filename}`,
  `/exports/${master169Filename}`,
  `/exports/${portraitFilename}`,
  `/exports/${squareFilename}`,
  `/exports/${whatsappFilename}`,
  `/thumbnails/${thumbFilename}`,
  masterStat.size,
  now,
  now,
  now
);

// Save Exports in DB
const exportDefs = [
  { id: `exp_${projectId}_master`, type: 'master_4k', title: 'KGM Master Film (16:9 4K / 1080p Cine Master)', path: `/exports/${master169Filename}`, size: masterStat.size, res: '1920x1080', ratio: '16:9' },
  { id: `exp_${projectId}_portrait`, type: 'social_portrait', title: 'Social Portrait (9:16 Instagram Reels / TikTok)', path: `/exports/${portraitFilename}`, size: portStat.size, res: '1080x1920', ratio: '9:16' },
  { id: `exp_${projectId}_square`, type: 'social_square', title: 'Social Square (1:1 Instagram Post / LinkedIn)', path: `/exports/${squareFilename}`, size: sqStat.size, res: '1080x1080', ratio: '1:1' },
  { id: `exp_${projectId}_wa`, type: 'whatsapp_compressed', title: 'WhatsApp Optimized Mobile Share', path: `/exports/${whatsappFilename}`, size: waStat.size, res: '1280x720', ratio: '16:9' },
];

for (const exp of exportDefs) {
  db.prepare(`
    INSERT OR REPLACE INTO exports (
      id, project_id, render_job_id, export_type, title, file_path,
      file_size, resolution, aspect_ratio, download_count, created_at
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 0, ?)
  `).run(exp.id, projectId, renderJobId, exp.type, exp.title, exp.path, exp.size, exp.res, exp.ratio, now);
}

// Update Project to completed
db.prepare(`UPDATE projects SET status = 'completed', updated_at = ? WHERE id = ?`).run(now, projectId);

console.log('✓ Master property film assembled and all 4 formats exported successfully!');
