const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const Database = require('better-sqlite3');
const sharp = require('sharp');

const DB_PATH = path.join(__dirname, '..', 'data', 'kgm_studio.db');
const AUDIO_DIR = path.join(__dirname, '..', 'public', 'audio');
const UPLOAD_DIR = path.join(__dirname, '..', 'public', 'uploads');
const RENDERS_DIR = path.join(__dirname, '..', 'public', 'renders');
const EXPORTS_DIR = path.join(__dirname, '..', 'public', 'exports');

[AUDIO_DIR, UPLOAD_DIR, RENDERS_DIR, EXPORTS_DIR].forEach(dir => {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
});

console.log('Generating harmonic royalty-safe music library files...');

// 1. Generate 10 distinct harmonic audio files
const musicDefs = [
  { file: 'luxury_prestige.mp3', f1: 174.61, f2: 220.00, f3: 261.63, dur: 30 },
  { file: 'modern_haven.mp3', f1: 196.00, f2: 246.94, f3: 293.66, dur: 30 },
  { file: 'chamber_gold.mp3', f1: 164.81, f2: 207.65, f3: 246.94, dur: 30 },
  { file: 'sovereign_horizons.mp3', f1: 130.81, f2: 196.00, f3: 261.63, dur: 30 },
  { file: 'institutional_trust.mp3', f1: 146.83, f2: 220.00, f3: 293.66, dur: 30 },
  { file: 'serenade_silence.mp3', f1: 164.81, f2: 196.00, f3: 246.94, dur: 30 },
  { file: 'royal_estate.mp3', f1: 130.81, f2: 164.81, f3: 196.00, dur: 30 },
  { file: 'emerald_oasis.mp3', f1: 174.61, f2: 261.63, f3: 329.63, dur: 30 },
  { file: 'reflections_marble.mp3', f1: 220.00, f2: 277.18, f3: 329.63, dur: 30 },
  { file: 'architectural_resonance.mp3', f1: 110.00, f2: 164.81, f3: 220.00, dur: 30 },
];

for (const m of musicDefs) {
  const target = path.join(AUDIO_DIR, m.file);
  if (!fs.existsSync(target)) {
    const expr = `sin(${m.f1}*2*PI*t)*0.07*(0.8+0.2*sin(0.4*t))+sin(${m.f2}*2*PI*t)*0.05*(0.7+0.3*cos(0.3*t))+sin(${m.f3}*2*PI*t)*0.04*(0.9+0.1*sin(0.5*t))`;
    try {
      execSync(`ffmpeg -y -f lavfi -i "aevalsrc='${expr}':d=${m.dur}" -af "afade=t=in:ss=0:d=2,afade=t=out:st=${m.dur-3}:d=3" -c:a libmp3lame -b:a 192k "${target}"`, { stdio: 'ignore' });
    } catch (e) {
      console.error('Error generating audio:', e);
    }
  }
}
console.log('✓ Audio tracks generated.');

// 2. Generate 10 High-Quality Luxury Property Photography Assets for Seed Project
console.log('Creating luxury property photography images for seed project...');

const luxuryImages = [
  {
    filename: 'villa_01_hero_exterior.jpg',
    category: 'exterior',
    title: 'Grand Twilight Facade & Reflecting Pool',
    room: 'Hero Exterior Facade',
    bg1: '#0B1D16',
    bg2: '#16382B',
    accent: '#D4AF37',
    features: ['Double-height limestone portico', 'Illuminated palm colonnade', 'Mirrored reflecting pool'],
  },
  {
    filename: 'villa_02_entrance_foyer.jpg',
    category: 'entrance',
    title: 'Double-Height Grand Entrance Foyer',
    room: 'Grand Entrance & Vestibule',
    bg1: '#121F1A',
    bg2: '#23382D',
    accent: '#E5C158',
    features: ['Bookmatched Calacatta marble', 'Custom bronze chandelier', 'Curved floating staircase'],
  },
  {
    filename: 'villa_03_living_salon.jpg',
    category: 'living_room',
    title: 'Formal Reception Salon & Panoramic Glazing',
    room: 'Formal Reception Salon',
    bg1: '#142720',
    bg2: '#1D3B2F',
    accent: '#D4AF37',
    features: ['Italian Minotti furnishings', '8-meter ceiling height', 'Motorized floor-to-ceiling glass'],
  },
  {
    filename: 'villa_04_formal_dining.jpg',
    category: 'dining_room',
    title: 'Bespoke 14-Seat Formal Dining Hall',
    room: 'Formal Dining Hall',
    bg1: '#0D221A',
    bg2: '#1A3F31',
    accent: '#C5A869',
    features: ['Smoked oak & brass table', 'Crystal cascading chandelier', 'Bespoke wine gallery display'],
  },
  {
    filename: 'villa_05_chef_kitchen.jpg',
    category: 'kitchen',
    title: 'Show Kitchen with Quartzite Waterfall Island',
    room: 'Gourmet Chef Kitchen',
    bg1: '#162822',
    bg2: '#274338',
    accent: '#D4AF37',
    features: ['Gaggenau 400 Series suite', 'Taj Mahal quartzite island', 'Poliform matte cabinetry'],
  },
  {
    filename: 'villa_06_master_suite.jpg',
    category: 'master_bedroom',
    title: 'Primary Master Suite & Private Terrace',
    room: 'Primary Master Suite',
    bg1: '#1A2F27',
    bg2: '#2C493D',
    accent: '#E5C158',
    features: ['Silk velvet wall paneling', 'Panoramic courtyard balcony', 'Integrated morning bar'],
  },
  {
    filename: 'villa_07_spa_bathroom.jpg',
    category: 'bathroom',
    title: 'Primary Spa Sanctuary with Soaking Tub',
    room: 'Master Spa Sanctuary',
    bg1: '#11221B',
    bg2: '#1F3C30',
    accent: '#C5A869',
    features: ['Freestanding monolithic tub', 'Dual steam rain showers', 'Dornbracht brushed gold fittings'],
  },
  {
    filename: 'villa_08_infinity_pool.jpg',
    category: 'pool',
    title: '25-Meter Heated Infinity Swimming Pool',
    room: 'Infinity Pool & Sun Deck',
    bg1: '#0A2019',
    bg2: '#123C2E',
    accent: '#5CD6C6',
    features: ['Balinese natural stone tiles', 'Submerged Baja sun shelves', 'Fire pit sunken lounge'],
  },
  {
    filename: 'villa_09_private_garden.jpg',
    category: 'garden',
    title: 'Sculptural Mediterranean Courtyard Garden',
    room: 'Landscaped Courtyard & Garden',
    bg1: '#13281E',
    bg2: '#1E4433',
    accent: '#D4AF37',
    features: ['Century-old olive trees', 'Architectural water walls', 'Travertine walking pathways'],
  },
  {
    filename: 'villa_10_twilight_hero.jpg',
    category: 'exterior',
    title: 'Illuminated Twilight Architectural Masterpiece',
    room: 'Twilight Estate Finale',
    bg1: '#071510',
    bg2: '#0F2C21',
    accent: '#E5C158',
    features: ['Full perimeter architectural lighting', 'Dramatic evening ambiance', 'KGM Signature Collection'],
  },
];

async function generatePropertyImages() {
  for (const img of luxuryImages) {
    const destPath = path.join(UPLOAD_DIR, img.filename);
    
    const svg = `
    <svg width="1920" height="1080" viewBox="0 0 1920 1080" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="grad_${img.category}" cx="50%" cy="40%" r="75%">
          <stop offset="0%" stop-color="${img.bg2}" />
          <stop offset="100%" stop-color="${img.bg1}" />
        </radialGradient>
        <linearGradient id="goldLg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#FDF3CF" />
          <stop offset="50%" stop-color="#D4AF37" />
          <stop offset="100%" stop-color="#9A7718" />
        </linearGradient>
        <linearGradient id="glassGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="rgba(255,255,255,0.12)" />
          <stop offset="100%" stop-color="rgba(255,255,255,0.03)" />
        </linearGradient>
      </defs>

      <rect width="1920" height="1080" fill="url(#grad_${img.category})" />

      <g stroke="#D4AF37" stroke-width="0.75" opacity="0.12">
        <line x1="0" y1="200" x2="1920" y2="200" />
        <line x1="0" y1="880" x2="1920" y2="880" />
        <line x1="280" y1="0" x2="280" y2="1080" />
        <line x1="1640" y1="0" x2="1640" y2="1080" />
        <line x1="960" y1="480" x2="0" y2="0" />
        <line x1="960" y1="480" x2="1920" y2="0" />
        <line x1="960" y1="480" x2="0" y2="1080" />
        <line x1="960" y1="480" x2="1920" y2="1080" />
      </g>

      <g opacity="0.18">
        <rect x="360" y="240" width="1200" height="600" fill="none" stroke="url(#goldLg)" stroke-width="1.5" />
        <rect x="420" y="300" width="1080" height="480" fill="url(#glassGrad)" stroke="#D4AF37" stroke-width="0.75" />
      </g>

      <rect x="460" y="340" width="1000" height="400" rx="16" fill="#061A14" fill-opacity="0.82" stroke="url(#goldLg)" stroke-width="1.5" />
      
      <g transform="translate(930, 380)">
        <polygon points="30,0 55,15 55,45 30,60 5,45 5,15" fill="#0B2B20" stroke="url(#goldLg)" stroke-width="1.5" />
        <text x="30" y="37" font-family="serif" font-size="16" font-weight="bold" fill="url(#goldLg)" text-anchor="middle">KGM</text>
      </g>

      <text x="960" y="490" font-family="sans-serif" font-size="14" font-weight="600" fill="#C5A869" letter-spacing="4" text-anchor="middle">
        ${img.category.toUpperCase().replace('_', ' ')} • CINEMATIC SHOT SOURCE
      </text>
      <text x="960" y="540" font-family="serif" font-size="34" font-weight="700" fill="#FFFFFF" letter-spacing="2" text-anchor="middle">
        ${img.title.replace(/&/g, '&amp;')}
      </text>
      <text x="960" y="580" font-family="serif" font-size="18" font-style="italic" fill="#E8E2D5" opacity="0.85" text-anchor="middle">
        The Grand Royal Sovereign Villa — Al-Malqa District, Riyadh
      </text>

      <g transform="translate(960, 640)">
        <text x="0" y="0" font-family="sans-serif" font-size="14" fill="#D4AF37" text-anchor="middle" letter-spacing="1">
          ✦ ${img.features.join('   •   ').replace(/&/g, '&amp;')} ✦
        </text>
      </g>

      <rect x="0" y="1020" width="1920" height="60" fill="#061510" fill-opacity="0.95" />
      <text x="60" y="1056" font-family="serif" font-size="14" font-weight="bold" fill="url(#goldLg)" letter-spacing="2">
        KURRA GREENFIELD MERCHANTS LIMITED (KGM LIMITED)
      </text>
      <text x="1860" y="1056" font-family="sans-serif" font-size="13" fill="#A0AEC0" letter-spacing="1" text-anchor="end">
        RAW SOURCE PHOTOGRAPHY • 4K ULTRA-HIGH FIDELITY REF #KGM-RYD-8801
      </text>
    </svg>
    `;

    await sharp(Buffer.from(svg))
      .jpeg({ quality: 95 })
      .toFile(destPath);
  }
  console.log('✓ 10 luxury property images created.');
}

async function seedDemoProject() {
  const db = new Database(DB_PATH);
  db.pragma('journal_mode = WAL');
  db.pragma('foreign_keys = ON');

  // SQLite tables creation
  db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id TEXT PRIMARY KEY,
      email TEXT UNIQUE NOT NULL,
      full_name TEXT NOT NULL,
      role TEXT NOT NULL DEFAULT 'agent',
      avatar_url TEXT,
      org_id TEXT NOT NULL,
      created_at TEXT NOT NULL
    );
    CREATE TABLE IF NOT EXISTS organizations (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      slug TEXT UNIQUE NOT NULL,
      tier TEXT NOT NULL DEFAULT 'enterprise',
      quota_monthly_seconds INTEGER NOT NULL DEFAULT 6000,
      used_seconds_this_month INTEGER NOT NULL DEFAULT 0,
      created_at TEXT NOT NULL
    );
    CREATE TABLE IF NOT EXISTS properties (
      id TEXT PRIMARY KEY,
      org_id TEXT NOT NULL,
      property_name TEXT NOT NULL,
      property_ref TEXT NOT NULL,
      property_type TEXT NOT NULL DEFAULT 'Villa',
      marketing_objective TEXT NOT NULL DEFAULT 'For Sale',
      location TEXT NOT NULL,
      property_status TEXT NOT NULL DEFAULT 'Active',
      bedrooms INTEGER NOT NULL DEFAULT 4,
      bathrooms INTEGER NOT NULL DEFAULT 5,
      property_size TEXT NOT NULL,
      price TEXT NOT NULL,
      rental_price TEXT,
      currency TEXT NOT NULL DEFAULT 'USD',
      description TEXT,
      agent_name TEXT,
      agent_contact TEXT,
      agent_whatsapp TEXT,
      agent_website TEXT,
      cta_text TEXT DEFAULT 'Schedule a Private Viewing',
      created_at TEXT NOT NULL,
      updated_at TEXT NOT NULL
    );
    CREATE TABLE IF NOT EXISTS projects (
      id TEXT PRIMARY KEY,
      org_id TEXT NOT NULL,
      property_id TEXT NOT NULL,
      title TEXT NOT NULL,
      status TEXT NOT NULL DEFAULT 'draft',
      cinematic_style TEXT NOT NULL DEFAULT 'kgm_luxury',
      default_duration INTEGER NOT NULL DEFAULT 10,
      target_aspect_ratio TEXT NOT NULL DEFAULT '16:9',
      brand_profile_id TEXT,
      music_track_id TEXT,
      voiceover_id TEXT,
      public_id TEXT UNIQUE NOT NULL,
      is_public INTEGER NOT NULL DEFAULT 1,
      cover_image_url TEXT,
      created_by TEXT NOT NULL,
      created_at TEXT NOT NULL,
      updated_at TEXT NOT NULL
    );
    CREATE TABLE IF NOT EXISTS property_images (
      id TEXT PRIMARY KEY,
      project_id TEXT NOT NULL,
      storage_path TEXT NOT NULL,
      original_filename TEXT NOT NULL,
      mime_type TEXT NOT NULL,
      width INTEGER NOT NULL DEFAULT 1920,
      height INTEGER NOT NULL DEFAULT 1080,
      file_size INTEGER NOT NULL DEFAULT 0,
      sort_order INTEGER NOT NULL DEFAULT 0,
      category TEXT NOT NULL DEFAULT 'exterior',
      analysis_status TEXT NOT NULL DEFAULT 'pending',
      analysis_json TEXT,
      is_cover INTEGER NOT NULL DEFAULT 0,
      is_locked INTEGER NOT NULL DEFAULT 0,
      is_optional INTEGER NOT NULL DEFAULT 0,
      rotation INTEGER NOT NULL DEFAULT 0,
      crop_data TEXT,
      created_at TEXT NOT NULL
    );
    CREATE TABLE IF NOT EXISTS image_analysis (
      id TEXT PRIMARY KEY,
      image_id TEXT NOT NULL UNIQUE,
      category TEXT NOT NULL,
      confidence REAL NOT NULL DEFAULT 0.95,
      dominant_feature TEXT,
      camera_direction TEXT,
      foreground TEXT,
      midground TEXT,
      background TEXT,
      depth_score REAL NOT NULL DEFAULT 0.85,
      lighting_condition TEXT,
      visual_quality TEXT DEFAULT 'pristine',
      orientation TEXT DEFAULT 'landscape',
      perspective TEXT DEFAULT 'wide_angle',
      architectural_sensitivity TEXT DEFAULT 'high',
      reflective_surfaces TEXT DEFAULT 'low',
      fragile_objects TEXT DEFAULT 'none',
      has_text INTEGER DEFAULT 0,
      has_faces INTEGER DEFAULT 0,
      generation_risk TEXT DEFAULT 'low',
      recommended_motion TEXT,
      recommended_lens TEXT DEFAULT '28mm',
      suggested_duration INTEGER DEFAULT 10,
      raw_json TEXT,
      created_at TEXT NOT NULL
    );
    CREATE TABLE IF NOT EXISTS motion_presets (
      id TEXT PRIMARY KEY,
      key TEXT UNIQUE NOT NULL,
      name TEXT NOT NULL,
      description TEXT NOT NULL,
      best_for TEXT NOT NULL,
      risk_level TEXT NOT NULL DEFAULT 'low',
      direction TEXT NOT NULL DEFAULT 'left_to_right',
      speed TEXT NOT NULL DEFAULT 'slow',
      default_duration INTEGER NOT NULL DEFAULT 10,
      default_lens TEXT NOT NULL DEFAULT '28mm',
      motion_intensity REAL NOT NULL DEFAULT 0.25,
      parallax_intensity REAL NOT NULL DEFAULT 0.35,
      environmental_motion TEXT NOT NULL DEFAULT 'subtle_ambient_light',
      stability_req TEXT NOT NULL DEFAULT 'strict',
      preferred_model TEXT NOT NULL DEFAULT 'runway_gen3_alpha',
      fallback_model TEXT NOT NULL DEFAULT 'kgm_neural_render',
      prompt_template TEXT NOT NULL,
      negative_prompt TEXT NOT NULL,
      is_active INTEGER NOT NULL DEFAULT 1,
      is_custom INTEGER NOT NULL DEFAULT 0,
      created_at TEXT NOT NULL
    );
    CREATE TABLE IF NOT EXISTS cinematic_shots (
      id TEXT PRIMARY KEY,
      project_id TEXT NOT NULL,
      image_id TEXT NOT NULL,
      shot_number INTEGER NOT NULL,
      category TEXT NOT NULL,
      motion_preset_id TEXT NOT NULL,
      camera_direction TEXT NOT NULL,
      camera_speed TEXT NOT NULL DEFAULT 'slow',
      lens TEXT NOT NULL DEFAULT '28mm',
      duration INTEGER NOT NULL DEFAULT 10,
      motion_intensity REAL NOT NULL DEFAULT 0.25,
      prompt TEXT NOT NULL,
      negative_prompt TEXT NOT NULL,
      status TEXT NOT NULL DEFAULT 'pending',
      approved_generation_id TEXT,
      transition_type TEXT NOT NULL DEFAULT 'cross_dissolve',
      caption_text TEXT,
      sort_order INTEGER NOT NULL DEFAULT 0,
      created_at TEXT NOT NULL,
      updated_at TEXT NOT NULL
    );
    CREATE TABLE IF NOT EXISTS shot_generations (
      id TEXT PRIMARY KEY,
      shot_id TEXT NOT NULL,
      project_id TEXT NOT NULL,
      source_image_id TEXT NOT NULL,
      provider TEXT NOT NULL,
      model TEXT NOT NULL,
      provider_job_id TEXT,
      prompt TEXT NOT NULL,
      negative_prompt TEXT NOT NULL,
      duration INTEGER NOT NULL DEFAULT 10,
      resolution TEXT NOT NULL DEFAULT '1920x1080',
      aspect_ratio TEXT NOT NULL DEFAULT '16:9',
      seed INTEGER NOT NULL DEFAULT 42,
      motion_intensity REAL NOT NULL DEFAULT 0.25,
      status TEXT NOT NULL DEFAULT 'queued',
      progress INTEGER NOT NULL DEFAULT 0,
      cost_estimate REAL NOT NULL DEFAULT 0.50,
      actual_cost REAL NOT NULL DEFAULT 0.0,
      output_path TEXT,
      thumbnail_path TEXT,
      error_code TEXT,
      error_message TEXT,
      execution_time_ms INTEGER,
      created_at TEXT NOT NULL,
      completed_at TEXT
    );
    CREATE TABLE IF NOT EXISTS generation_attempts (
      id TEXT PRIMARY KEY,
      generation_id TEXT NOT NULL,
      provider TEXT NOT NULL,
      model TEXT NOT NULL,
      attempt_number INTEGER NOT NULL DEFAULT 1,
      status TEXT NOT NULL,
      error_message TEXT,
      cost REAL NOT NULL DEFAULT 0.0,
      created_at TEXT NOT NULL
    );
    CREATE TABLE IF NOT EXISTS brand_profiles (
      id TEXT PRIMARY KEY,
      org_id TEXT NOT NULL,
      name TEXT NOT NULL,
      logo_path TEXT,
      primary_color TEXT NOT NULL DEFAULT '#0B2B20',
      secondary_color TEXT NOT NULL DEFAULT '#D4AF37',
      font_family TEXT NOT NULL DEFAULT 'Cinzel',
      watermark_position TEXT NOT NULL DEFAULT 'top_right',
      watermark_opacity INTEGER NOT NULL DEFAULT 85,
      show_opening_card INTEGER NOT NULL DEFAULT 1,
      show_lower_third INTEGER NOT NULL DEFAULT 1,
      show_contact_card INTEGER NOT NULL DEFAULT 1,
      website TEXT DEFAULT 'www.kgmlimited.com',
      phone TEXT DEFAULT '+966 11 450 8899',
      whatsapp TEXT DEFAULT '+966 50 123 4567',
      is_default INTEGER NOT NULL DEFAULT 1,
      created_at TEXT NOT NULL
    );
    CREATE TABLE IF NOT EXISTS music_tracks (
      id TEXT PRIMARY KEY,
      category TEXT NOT NULL,
      title TEXT NOT NULL,
      artist TEXT NOT NULL,
      duration_seconds INTEGER NOT NULL DEFAULT 120,
      file_path TEXT NOT NULL,
      wave_data TEXT,
      is_royalty_verified INTEGER NOT NULL DEFAULT 1,
      license_type TEXT NOT NULL DEFAULT 'Commercial Royalty-Free (KGM Studio Master)',
      is_custom INTEGER NOT NULL DEFAULT 0,
      created_at TEXT NOT NULL
    );
    CREATE TABLE IF NOT EXISTS voiceovers (
      id TEXT PRIMARY KEY,
      project_id TEXT NOT NULL,
      language TEXT NOT NULL DEFAULT 'en',
      script_text TEXT NOT NULL,
      voice_id TEXT NOT NULL DEFAULT 'voice_lux_01',
      audio_path TEXT,
      duration_seconds INTEGER NOT NULL DEFAULT 60,
      status TEXT NOT NULL DEFAULT 'draft',
      created_at TEXT NOT NULL
    );
    CREATE TABLE IF NOT EXISTS render_jobs (
      id TEXT PRIMARY KEY,
      project_id TEXT NOT NULL,
      status TEXT NOT NULL DEFAULT 'queued',
      progress INTEGER NOT NULL DEFAULT 0,
      current_step TEXT NOT NULL DEFAULT 'queued',
      total_steps INTEGER NOT NULL DEFAULT 8,
      step_number INTEGER NOT NULL DEFAULT 1,
      output_master_path TEXT,
      output_landscape_path TEXT,
      output_portrait_path TEXT,
      output_square_path TEXT,
      output_whatsapp_path TEXT,
      thumbnail_path TEXT,
      duration_seconds INTEGER NOT NULL DEFAULT 0,
      resolution TEXT NOT NULL DEFAULT '1920x1080',
      file_size_bytes INTEGER NOT NULL DEFAULT 0,
      error_message TEXT,
      started_at TEXT,
      completed_at TEXT,
      created_at TEXT NOT NULL
    );
    CREATE TABLE IF NOT EXISTS exports (
      id TEXT PRIMARY KEY,
      project_id TEXT NOT NULL,
      render_job_id TEXT NOT NULL,
      export_type TEXT NOT NULL,
      title TEXT NOT NULL,
      file_path TEXT NOT NULL,
      file_size INTEGER NOT NULL DEFAULT 0,
      resolution TEXT NOT NULL DEFAULT '1920x1080',
      aspect_ratio TEXT NOT NULL DEFAULT '16:9',
      download_count INTEGER NOT NULL DEFAULT 0,
      created_at TEXT NOT NULL
    );
    CREATE TABLE IF NOT EXISTS provider_accounts (
      id TEXT PRIMARY KEY,
      provider_name TEXT UNIQUE NOT NULL,
      display_name TEXT NOT NULL,
      is_active INTEGER NOT NULL DEFAULT 1,
      api_key_configured INTEGER NOT NULL DEFAULT 1,
      priority INTEGER NOT NULL DEFAULT 1,
      rate_limit_per_min INTEGER NOT NULL DEFAULT 30,
      current_balance REAL NOT NULL DEFAULT 500.0,
      created_at TEXT NOT NULL
    );
    CREATE TABLE IF NOT EXISTS provider_models (
      id TEXT PRIMARY KEY,
      provider_id TEXT NOT NULL,
      model_name TEXT NOT NULL,
      model_id TEXT NOT NULL,
      supported_durations TEXT NOT NULL DEFAULT '[5,6,8,10]',
      max_resolution TEXT NOT NULL DEFAULT '1920x1080',
      cost_per_second REAL NOT NULL DEFAULT 0.05,
      speed_score INTEGER NOT NULL DEFAULT 8,
      quality_tier TEXT NOT NULL DEFAULT 'high_quality',
      is_active INTEGER NOT NULL DEFAULT 1
    );
    CREATE TABLE IF NOT EXISTS provider_usage (
      id TEXT PRIMARY KEY,
      provider_id TEXT NOT NULL,
      project_id TEXT NOT NULL,
      generation_id TEXT,
      seconds_generated INTEGER NOT NULL,
      cost REAL NOT NULL,
      model TEXT NOT NULL,
      status TEXT NOT NULL,
      created_at TEXT NOT NULL
    );
    CREATE TABLE IF NOT EXISTS audit_logs (
      id TEXT PRIMARY KEY,
      user_id TEXT NOT NULL,
      user_email TEXT NOT NULL,
      action TEXT NOT NULL,
      entity_type TEXT NOT NULL,
      entity_id TEXT NOT NULL,
      details_json TEXT,
      ip_address TEXT,
      created_at TEXT NOT NULL
    );
    CREATE TABLE IF NOT EXISTS system_settings (
      key TEXT PRIMARY KEY,
      value TEXT NOT NULL,
      description TEXT,
      updated_at TEXT NOT NULL
    );
  `);

  const now = new Date().toISOString();
  const propertyId = 'prop_kgm_riyadh_01';
  const projectId = 'proj_kgm_riyadh_01';
  const orgId = 'org_kgm_01';
  const userId = 'usr_super_01';

  // Seed default org and user if not exists
  const orgCheck = db.prepare('SELECT id FROM organizations WHERE id = ?').get(orgId);
  if (!orgCheck) {
    db.prepare(`
      INSERT INTO organizations (id, name, slug, tier, quota_monthly_seconds, used_seconds_this_month, created_at)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `).run(orgId, 'Kurra Greenfield Merchants Limited (KGM Limited)', 'kgm-luxury-real-estate', 'enterprise', 12000, 380, now);
  }

  const userCheck = db.prepare('SELECT id FROM users WHERE id = ?').get(userId);
  if (!userCheck) {
    db.prepare(`
      INSERT INTO users (id, email, full_name, role, avatar_url, org_id, created_at)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `).run(userId, 'executive@kgmlimited.com', 'Engr. Farouk Kurra', 'super_admin', 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150', orgId, now);

    db.prepare(`
      INSERT INTO users (id, email, full_name, role, avatar_url, org_id, created_at)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `).run('usr_director_01', 'creative.director@kgmlimited.com', 'Tariq Al-Mansoor', 'creative_director', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150', orgId, now);

    db.prepare(`
      INSERT INTO users (id, email, full_name, role, avatar_url, org_id, created_at)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `).run('usr_agent_01', 'nora.alothman@kgmlimited.com', 'Nora Al-Othman', 'agent', 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150', orgId, now);
  }

  // Seed Brand Profile
  const brandCheck = db.prepare('SELECT id FROM brand_profiles WHERE id = ?').get('brand_kgm_default');
  if (!brandCheck) {
    db.prepare(`
      INSERT INTO brand_profiles (
        id, org_id, name, logo_path, primary_color, secondary_color, font_family,
        watermark_position, watermark_opacity, show_opening_card, show_lower_third,
        show_contact_card, website, phone, whatsapp, is_default, created_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).run(
      'brand_kgm_default',
      orgId,
      'KGM Luxury Real Estate Master Branding',
      '/brand/kgm-crest-gold.svg',
      '#0B2B20',
      '#D4AF37',
      'Cinzel',
      'top_right',
      85,
      1,
      1,
      1,
      'www.kgmlimited.com',
      '+966 11 450 8899',
      '+966 50 123 4567',
      1,
      now
    );
  }

  // Seed Music Tracks
  const musicTracks = [
    { id: 'mus_lux_01', category: 'luxury', title: 'Aura of Prestige', artist: 'KGM Sound Studio', duration: 120, path: '/audio/luxury_prestige.mp3' },
    { id: 'mus_mod_01', category: 'modern', title: 'Contemporary Haven', artist: 'KGM Sound Studio', duration: 110, path: '/audio/modern_haven.mp3' },
    { id: 'mus_ele_01', category: 'elegant', title: 'Chamber of Gold', artist: 'KGM Sound Studio', duration: 125, path: '/audio/chamber_gold.mp3' },
    { id: 'mus_cin_01', category: 'cinematic', title: 'Sovereign Horizons', artist: 'KGM Sound Studio', duration: 135, path: '/audio/sovereign_horizons.mp3' },
    { id: 'mus_corp_01', category: 'corporate', title: 'Institutional Trust', artist: 'KGM Sound Studio', duration: 105, path: '/audio/institutional_trust.mp3' },
    { id: 'mus_calm_01', category: 'calm', title: 'Serenade of Silence', artist: 'KGM Sound Studio', duration: 115, path: '/audio/serenade_silence.mp3' },
    { id: 'mus_prem_01', category: 'premium', title: 'The Royal Estate', artist: 'KGM Sound Studio', duration: 130, path: '/audio/royal_estate.mp3' },
    { id: 'mus_afr_01', category: 'african_contemporary', title: 'Emerald Oasis', artist: 'KGM Sound Studio', duration: 120, path: '/audio/emerald_oasis.mp3' },
    { id: 'mus_pia_01', category: 'minimal_piano', title: 'Reflections on Marble', artist: 'KGM Sound Studio', duration: 110, path: '/audio/reflections_marble.mp3' },
    { id: 'mus_amb_01', category: 'ambient', title: 'Architectural Resonance', artist: 'KGM Sound Studio', duration: 140, path: '/audio/architectural_resonance.mp3' },
  ];

  for (const t of musicTracks) {
    const mtCheck = db.prepare('SELECT id FROM music_tracks WHERE id = ?').get(t.id);
    if (!mtCheck) {
      db.prepare(`
        INSERT INTO music_tracks (
          id, category, title, artist, duration_seconds, file_path,
          is_royalty_verified, license_type, is_custom, created_at
        ) VALUES (?, ?, ?, ?, ?, ?, 1, 'Commercial Royalty-Free (KGM Studio Master)', 0, ?)
      `).run(t.id, t.category, t.title, t.artist, t.duration, t.path, now);
    }
  }

  // Seed Motion Presets
  const motionPresets = [
    {
      id: 'mot_hero_ext',
      key: 'hero_exterior',
      name: 'Hero Exterior Push',
      description: 'Slow cinematic dolly-in toward architectural facade preserving majestic geometry and landscaping.',
      best_for: 'Exterior Facades, Grand Front Elevation, Estate Entrances',
      risk_level: 'low',
      direction: 'push_forward',
      speed: 'slow',
      default_duration: 10,
      default_lens: '24mm',
      motion_intensity: 0.22,
      parallax_intensity: 0.35,
      environmental_motion: 'gentle_palm_sway_and_sky_drift',
      stability_req: 'strict',
      preferred_model: 'runway_gen3_alpha',
      fallback_model: 'kgm_neural_render',
      prompt_template: 'Cinematic luxury real-estate dolly-in. Extremely slow, stately forward glide toward the grand architectural facade. Maintain exact structural columns, window mullions, stonework and landscaping from reference image. Natural golden sunlight with subtle shifting reflections. 4K architectural film quality.',
      negative_prompt: 'morphing, warping walls, shifting window positions, distorted columns, blur, fast zoom, artifacting, artificial CGI look.',
    },
    {
      id: 'mot_ext_reveal',
      key: 'exterior_reveal',
      name: 'Exterior Pullback & Reveal',
      description: 'Slow backward crane and pullback revealing property expanse, boundaries, and lush grounds.',
      best_for: 'Villas, Mansions, Courtyards, Large Estates',
      risk_level: 'low',
      direction: 'pull_backward',
      speed: 'slow',
      default_duration: 10,
      default_lens: '21mm',
      motion_intensity: 0.24,
      parallax_intensity: 0.40,
      environmental_motion: 'subtle_atmospheric_depth',
      stability_req: 'strict',
      preferred_model: 'runway_gen3_alpha',
      fallback_model: 'kgm_neural_render',
      prompt_template: 'Ultra-smooth cinematic pullback reveal. Camera floats gracefully backward along architectural axis, expanding the field of view to reveal the full grandeur of the property. Pure straight architectural lines, authentic natural lighting.',
      negative_prompt: 'deforming architecture, camera wobble, jerking motion, texture stretching, unnatural sky motion.',
    },
    {
      id: 'mot_entrance',
      key: 'entrance',
      name: 'Grand Entrance Push',
      description: 'Controlled forward push through grand doorway or foyer, inviting the viewer into the residence.',
      best_for: 'Foyers, Main Entrances, Double-Height Reception Vestibules',
      risk_level: 'low',
      direction: 'push_forward',
      speed: 'ultra_slow',
      default_duration: 10,
      default_lens: '28mm',
      motion_intensity: 0.18,
      parallax_intensity: 0.30,
      environmental_motion: 'soft_ambient_foyer_glow',
      stability_req: 'strict',
      preferred_model: 'runway_gen3_alpha',
      fallback_model: 'kgm_neural_render',
      prompt_template: 'Controlled architectural glide forward through the grand entrance. Subtle depth separation between door frame, chandelier and inner hall. Preserving exact marble flooring textures, sconces, and door craftsmanship.',
      negative_prompt: 'hallway distortion, stretching doors, swinging lighting fixtures, floor morphing.',
    },
    {
      id: 'mot_living_room',
      key: 'living_room',
      name: 'Living Room Lateral Glide',
      description: 'Slow, elegant left-to-right tracking glide across the main reception salon showcasing seating and high ceilings.',
      best_for: 'Formal Salons, Open Living Rooms, Luxury Reception Halls',
      risk_level: 'low',
      direction: 'left_to_right',
      speed: 'slow',
      default_duration: 10,
      default_lens: '28mm',
      motion_intensity: 0.20,
      parallax_intensity: 0.38,
      environmental_motion: 'soft_daylight_diffusion',
      stability_req: 'strict',
      preferred_model: 'runway_gen3_alpha',
      fallback_model: 'kgm_neural_render',
      prompt_template: 'Slow, stately lateral tracking camera movement across luxury living room. Gentle foreground parallax from coffee table to plush designer sofa to large floor-to-ceiling windows. Pure horizontal motion, no wobble.',
      negative_prompt: 'morphing furniture cushions, twisting table legs, changing rug patterns, wall bending.',
    },
    {
      id: 'mot_open_plan',
      key: 'open_plan',
      name: 'Open Plan Diagonal Reveal',
      description: 'Diagonal spatial glide connecting living, dining, and outdoor zones into one harmonious visual flow.',
      best_for: 'Open Concept Layouts, Penthouse Salons, Great Rooms',
      risk_level: 'low',
      direction: 'left_to_right',
      speed: 'slow',
      default_duration: 10,
      default_lens: '24mm',
      motion_intensity: 0.22,
      parallax_intensity: 0.42,
      environmental_motion: 'ambient_light_glow',
      stability_req: 'strict',
      preferred_model: 'luma_ray2',
      fallback_model: 'kgm_neural_render',
      prompt_template: 'Fluid diagonal architectural camera glide across expansive open-plan layout. Emphasize continuous spatial flow from foreground lounge to background dining and patio vistas.',
      negative_prompt: 'spatial warping, ceiling drops, vanishing furniture, dislocated architectural fixtures.',
    },
    {
      id: 'mot_kitchen',
      key: 'kitchen',
      name: 'Kitchen Countertop Glide',
      description: 'Smooth lateral glide along island countertop highlighting marble veining, custom cabinetry, and premium appliances.',
      best_for: 'Show Kitchens, Chef Kitchens, Gourmet Islands, Prep Areas',
      risk_level: 'low',
      direction: 'left_to_right',
      speed: 'slow',
      default_duration: 10,
      default_lens: '35mm',
      motion_intensity: 0.19,
      parallax_intensity: 0.32,
      environmental_motion: 'subtle_under_cabinet_lighting_sheen',
      stability_req: 'strict',
      preferred_model: 'runway_gen3_alpha',
      fallback_model: 'kgm_neural_render',
      prompt_template: 'Precision cinematic glide along marble kitchen island. Perfectly straight countertop lines, pristine reflections on quartz surfaces and stainless steel fixtures. Steady architectural framing.',
      negative_prompt: 'cabinet door warping, changing marble veining, disappearing appliances, perspective collapse.',
    },
    {
      id: 'mot_dining',
      key: 'dining',
      name: 'Dining Suite Subtle Orbit',
      description: 'Very gentle micro-orbit around formal dining table emphasizing bespoke chandelier and seating symmetry.',
      best_for: 'Formal Dining Rooms, Banquet Areas, Breakfast Nooks',
      risk_level: 'medium',
      direction: 'orbit_subtle',
      speed: 'ultra_slow',
      default_duration: 10,
      default_lens: '35mm',
      motion_intensity: 0.17,
      parallax_intensity: 0.36,
      environmental_motion: 'crystalline_chandelier_shimmer',
      stability_req: 'strict',
      preferred_model: 'runway_gen3_alpha',
      fallback_model: 'kgm_neural_render',
      prompt_template: 'Ultra-gentle curved cinematic orbit around luxury dining setting. Chandelier and centerpiece create delicate parallax over table settings and backdrop art.',
      negative_prompt: 'spinning camera, rotating table distorted, tableware sliding, wall warping.',
    },
    {
      id: 'mot_bedroom',
      key: 'bedroom',
      name: 'Bedroom Serene Push',
      description: 'Calm, tranquil forward drift toward bed headboard highlighting linens, accent walls, and ambient bedside lighting.',
      best_for: 'Guest Suites, Junior Bedrooms, Cozy Sleeping Quarters',
      risk_level: 'low',
      direction: 'push_forward',
      speed: 'ultra_slow',
      default_duration: 10,
      default_lens: '32mm',
      motion_intensity: 0.16,
      parallax_intensity: 0.28,
      environmental_motion: 'soft_curtain_breeze',
      stability_req: 'strict',
      preferred_model: 'runway_gen3_alpha',
      fallback_model: 'kgm_neural_render',
      prompt_template: 'Tranquil cinematic dolly forward toward luxury upholstered bed. Soft sheer curtains gently respond to ambient airflow. Warm, restful luxury hospitality atmosphere.',
      negative_prompt: 'wrinkling morphing bedding, shifting nightstands, wall color variations.',
    },
    {
      id: 'mot_master_suite',
      key: 'master_suite',
      name: 'Master Suite Luxury Reveal',
      description: 'Diagonal luxury reveal capturing king bed, lounge seating, walk-in dressing portal, and private balcony access.',
      best_for: 'Primary Bedrooms, Master Suites, Penthouse Suites',
      risk_level: 'low',
      direction: 'left_to_right',
      speed: 'slow',
      default_duration: 10,
      default_lens: '24mm',
      motion_intensity: 0.21,
      parallax_intensity: 0.38,
      environmental_motion: 'warm_golden_hour_sunbeams',
      stability_req: 'strict',
      preferred_model: 'runway_gen3_alpha',
      fallback_model: 'kgm_neural_render',
      prompt_template: 'Bespoke master suite architectural pan and push. Camera reveals the spacious retreat with bespoke wood paneling, designer lounge chair, and panoramic window view.',
      negative_prompt: 'deformed room geometry, floating furniture, noisy grain.',
    },
    {
      id: 'mot_bathroom',
      key: 'bathroom',
      name: 'Spa Bathroom Architectural Glide',
      description: 'Restrained lateral glide showcasing freestanding soaking tub, double vanity, bookmatched marble, and glass shower.',
      best_for: 'Master Bathrooms, Spa En-suites, Powder Rooms',
      risk_level: 'medium',
      direction: 'left_to_right',
      speed: 'ultra_slow',
      default_duration: 10,
      default_lens: '28mm',
      motion_intensity: 0.15,
      parallax_intensity: 0.25,
      environmental_motion: 'mirror_light_glow',
      stability_req: 'strict',
      preferred_model: 'runway_gen3_alpha',
      fallback_model: 'kgm_neural_render',
      prompt_template: 'Controlled architectural glide across spa-inspired marble bathroom. Perfect mirror reflections, crisp brass fittings, calm stillness. Luxury hotel bathroom cinematography.',
      negative_prompt: 'distorted glass, reflection ghosting, melting vanity mirrors, water glitches.',
    },
    {
      id: 'mot_pool',
      key: 'pool',
      name: 'Infinity Pool Tracking Shot',
      description: 'Low-angle tracking along pool coping capturing turquoise water ripples, sun loungers, and villa facade.',
      best_for: 'Swimming Pools, Infinity Spas, Sun Decks, Water Features',
      risk_level: 'medium',
      direction: 'left_to_right',
      speed: 'slow',
      default_duration: 10,
      default_lens: '24mm',
      motion_intensity: 0.22,
      parallax_intensity: 0.40,
      environmental_motion: 'gentle_water_ripples_and_caustics',
      stability_req: 'strict',
      preferred_model: 'runway_gen3_alpha',
      fallback_model: 'kgm_neural_render',
      prompt_template: 'Crisp poolside tracking shot alongside sparkling turquoise swimming pool. Gentle light caustics on water surface, sun loungers in foreground with villa in background.',
      negative_prompt: 'turbulent water waves, boiling water look, pool wall melting, distorted lounger legs.',
    },
    {
      id: 'mot_garden',
      key: 'garden',
      name: 'Landscape Garden Tracking',
      description: 'Low-speed lateral tracking through manicured flora, pathways, and architectural garden walls.',
      best_for: 'Private Gardens, Courtyards, Manicured Lawns, Landscaping',
      risk_level: 'low',
      direction: 'left_to_right',
      speed: 'slow',
      default_duration: 10,
      default_lens: '28mm',
      motion_intensity: 0.23,
      parallax_intensity: 0.42,
      environmental_motion: 'subtle_foliage_flutter',
      stability_req: 'strict',
      preferred_model: 'runway_gen3_alpha',
      fallback_model: 'kgm_neural_render',
      prompt_template: 'Low-speed lateral camera tracking past sculpted palms and flowering borders. Rich green foliage, clean paved pathway lines, warm dappled sunlight.',
      negative_prompt: 'morphing plant shapes, buzzing leaf artifacts, shifting stone path textures.',
    },
    {
      id: 'mot_final_hero',
      key: 'final_hero',
      name: 'Final Hero Cinematic Pullback',
      description: 'Stately, memorable concluding pullback shot framing the entire illuminated property as a masterwork.',
      best_for: 'Closing Shot, Master Hero Exterior, Twilight Facade',
      risk_level: 'low',
      direction: 'pull_backward',
      speed: 'ultra_slow',
      default_duration: 10,
      default_lens: '24mm',
      motion_intensity: 0.20,
      parallax_intensity: 0.38,
      environmental_motion: 'architectural_exterior_lighting_glow',
      stability_req: 'strict',
      preferred_model: 'runway_gen3_alpha',
      fallback_model: 'kgm_neural_render',
      prompt_template: 'Grand cinematic finale pullback. The illuminated luxury property sits majestic in the twilight evening. Pure tranquility, warm architectural lighting, flawless luxury statement.',
      negative_prompt: 'jitter, flicker, morphing light fixtures, unnatural sky darkening.',
    },
  ];

  for (const m of motionPresets) {
    const mpCheck = db.prepare('SELECT id FROM motion_presets WHERE id = ?').get(m.id);
    if (!mpCheck) {
      db.prepare(`
        INSERT INTO motion_presets (
          id, key, name, description, best_for, risk_level, direction, speed,
          default_duration, default_lens, motion_intensity, parallax_intensity,
          environmental_motion, stability_req, preferred_model, fallback_model,
          prompt_template, negative_prompt, is_active, is_custom, created_at
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `).run(
        m.id, m.key, m.name, m.description, m.best_for, m.risk_level, m.direction, m.speed,
        m.default_duration, m.default_lens, m.motion_intensity, m.parallax_intensity,
        m.environmental_motion, m.stability_req, m.preferred_model, m.fallback_model,
        m.prompt_template, m.negative_prompt, 1, 0, now
      );
    }
  }

  // Seed AI Providers
  const provCheck = db.prepare('SELECT id FROM provider_accounts WHERE id = ?').get('prov_runway');
  if (!provCheck) {
    db.prepare(`INSERT INTO provider_accounts (id, provider_name, display_name, is_active, api_key_configured, priority, rate_limit_per_min, current_balance, created_at) VALUES ('prov_runway', 'runway', 'Runway Gen-3 Alpha / Turbo', 1, 1, 1, 30, 750.0, ?)`).run(now);
    db.prepare(`INSERT INTO provider_accounts (id, provider_name, display_name, is_active, api_key_configured, priority, rate_limit_per_min, current_balance, created_at) VALUES ('prov_luma', 'luma', 'Luma Dream Machine / Ray 2', 1, 1, 2, 30, 500.0, ?)`).run(now);
    db.prepare(`INSERT INTO provider_accounts (id, provider_name, display_name, is_active, api_key_configured, priority, rate_limit_per_min, current_balance, created_at) VALUES ('prov_kling', 'kling', 'Kling AI Video v1.5', 1, 1, 3, 30, 400.0, ?)`).run(now);
    db.prepare(`INSERT INTO provider_accounts (id, provider_name, display_name, is_active, api_key_configured, priority, rate_limit_per_min, current_balance, created_at) VALUES ('prov_veo', 'google_veo', 'Google Veo 2 Architectural', 1, 1, 4, 30, 600.0, ?)`).run(now);
    db.prepare(`INSERT INTO provider_accounts (id, provider_name, display_name, is_active, api_key_configured, priority, rate_limit_per_min, current_balance, created_at) VALUES ('prov_kgm_neural', 'kgm_neural_render', 'KGM Neural Cinematic Engine', 1, 1, 5, 60, 999.0, ?)`).run(now);

    db.prepare(`INSERT INTO provider_models (id, provider_id, model_name, model_id, supported_durations, max_resolution, cost_per_second, speed_score, quality_tier, is_active) VALUES ('mod_rw_gen3', 'prov_runway', 'Runway Gen-3 Alpha', 'gen3a_turbo', '[5,6,8,10]', '1920x1080', 0.05, 9, 'high_quality', 1)`).run();
    db.prepare(`INSERT INTO provider_models (id, provider_id, model_name, model_id, supported_durations, max_resolution, cost_per_second, speed_score, quality_tier, is_active) VALUES ('mod_luma_ray2', 'prov_luma', 'Luma Ray 2 Ultra', 'ray-2', '[5,6,8,10]', '1920x1080', 0.06, 8, 'high_quality', 1)`).run();
    db.prepare(`INSERT INTO provider_models (id, provider_id, model_name, model_id, supported_durations, max_resolution, cost_per_second, speed_score, quality_tier, is_active) VALUES ('mod_kgm_ultra', 'prov_kgm_neural', 'KGM Neural Spatial 4K', 'kgm-neural-4k', '[5,6,8,10]', '1920x1080', 0.01, 10, 'high_quality', 1)`).run();
  }

  // Insert Property
  const existingProp = db.prepare('SELECT id FROM properties WHERE id = ?').get(propertyId);
  if (!existingProp) {
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
      'The Royal Sovereign Villa — Al-Malqa',
      'KGM-RYD-8801',
      'Mansion',
      'For Sale',
      'Al-Malqa District, Northern Riyadh, Kingdom of Saudi Arabia',
      'Active',
      7,
      9,
      '18,500 sq ft (1,720 m²)',
      '$14,800,000',
      null,
      'USD',
      'An architectural triumph of contemporary luxury in prestige Northern Riyadh. Featuring double-height reception salons, bespoke Italian craftsmanship, 25-meter heated infinity pool, private spa sanctuary, subterranean entertainment pavilion, and smart home automation.',
      'Nora Al-Othman & Tariq Kurra',
      '+966 11 450 8899',
      '+966 50 123 4567',
      'www.kgmlimited.com/listings/royal-sovereign-villa',
      'Schedule a Private VIP Viewing',
      now,
      now
    );
  }

  const existingProject = db.prepare('SELECT id FROM projects WHERE id = ?').get(projectId);
  if (!existingProject) {
    db.prepare(`
      INSERT INTO projects (
        id, org_id, property_id, title, status, cinematic_style, default_duration,
        target_aspect_ratio, brand_profile_id, music_track_id, public_id, is_public,
        cover_image_url, created_by, created_at, updated_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).run(
      projectId,
      orgId,
      propertyId,
      'The Royal Sovereign Villa — Cinematic Showcase',
      'storyboard_ready',
      'kgm_luxury',
      10,
      '16:9',
      'brand_kgm_default',
      'mus_lux_01',
      'kgm-film-royal-villa-riyadh',
      1,
      '/uploads/villa_01_hero_exterior.jpg',
      userId,
      now,
      now
    );

    const motionsMap = {
      exterior: { preset: 'mot_hero_ext', motion: 'hero_exterior', lens: '24mm', dir: 'push_forward' },
      entrance: { preset: 'mot_entrance', motion: 'entrance', lens: '28mm', dir: 'push_forward' },
      living_room: { preset: 'mot_living_room', motion: 'living_room', lens: '28mm', dir: 'left_to_right' },
      dining_room: { preset: 'mot_dining', motion: 'dining', lens: '35mm', dir: 'orbit_subtle' },
      kitchen: { preset: 'mot_kitchen', motion: 'kitchen', lens: '35mm', dir: 'left_to_right' },
      master_bedroom: { preset: 'mot_master_suite', motion: 'master_suite', lens: '24mm', dir: 'left_to_right' },
      bathroom: { preset: 'mot_bathroom', motion: 'bathroom', lens: '28mm', dir: 'left_to_right' },
      pool: { preset: 'mot_pool', motion: 'pool', lens: '24mm', dir: 'left_to_right' },
      garden: { preset: 'mot_garden', motion: 'garden', lens: '28mm', dir: 'left_to_right' },
    };

    luxuryImages.forEach((item, index) => {
      const imgId = `img_demo_${index + 1}`;
      const shotId = `shot_demo_${index + 1}`;
      const mInfo = (index === 9)
        ? { preset: 'mot_final_hero', motion: 'final_hero', lens: '24mm', dir: 'pull_backward' }
        : (motionsMap[item.category] || { preset: 'mot_hero_ext', motion: 'hero_exterior', lens: '28mm', dir: 'left_to_right' });

      db.prepare(`
        INSERT INTO property_images (
          id, project_id, storage_path, original_filename, mime_type, width, height,
          file_size, sort_order, category, analysis_status, analysis_json, is_cover,
          is_locked, is_optional, rotation, created_at
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `).run(
        imgId,
        projectId,
        `/uploads/${item.filename}`,
        item.filename,
        'image/jpeg',
        1920,
        1080,
        450000,
        index + 1,
        item.category,
        'completed',
        JSON.stringify({ category: item.category, confidence: 0.98, title: item.title }),
        index === 0 ? 1 : 0,
        0,
        0,
        0,
        now
      );

      db.prepare(`
        INSERT INTO image_analysis (
          id, image_id, category, confidence, dominant_feature, camera_direction,
          foreground, midground, background, depth_score, lighting_condition,
          visual_quality, orientation, perspective, architectural_sensitivity,
          reflective_surfaces, fragile_objects, has_text, has_faces, generation_risk,
          recommended_motion, recommended_lens, suggested_duration, raw_json, created_at
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `).run(
        `ana_demo_${index + 1}`,
        imgId,
        item.category,
        0.98,
        item.features[0],
        mInfo.dir,
        item.features[0],
        item.features[1],
        item.features[2],
        0.92,
        'golden_hour',
        'pristine',
        'landscape',
        'wide_angle',
        'high',
        'low',
        'none',
        0,
        0,
        'low',
        mInfo.motion,
        mInfo.lens,
        10,
        JSON.stringify(item),
        now
      );

      const shotPrompt = `Premium luxury real-estate cinematography. Preserve the exact architecture, room dimensions, furniture placement, materials, colors, windows and doors from the reference image. Camera performs an extremely slow ${mInfo.dir.replace('_', ' ')} architectural glide, creating subtle foreground-to-background parallax. Natural daylight reflections shift gently across surfaces. Stable architectural lines. Photorealistic luxury property film. No redesign, no new furniture, no structural changes.`;
      const shotNegative = `morphing walls, changing furniture, sliding items, warped doors, blurry artifacts, glitch, sudden speed changes.`;

      db.prepare(`
        INSERT INTO cinematic_shots (
          id, project_id, image_id, shot_number, category, motion_preset_id,
          camera_direction, camera_speed, lens, duration, motion_intensity,
          prompt, negative_prompt, status, approved_generation_id,
          transition_type, caption_text, sort_order, created_at, updated_at
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `).run(
        shotId,
        projectId,
        imgId,
        index + 1,
        item.category,
        mInfo.preset,
        mInfo.dir,
        'slow',
        mInfo.lens,
        10,
        0.22,
        shotPrompt,
        shotNegative,
        'pending',
        null,
        'cross_dissolve',
        item.room,
        index + 1,
        now,
        now
      );
    });
  }

  console.log('✓ Demo project, 10 images, analyses, and shots seeded successfully.');
}

async function main() {
  await generatePropertyImages();
  await seedDemoProject();
}

main().catch(console.error);
