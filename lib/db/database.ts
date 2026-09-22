import Database from 'better-sqlite3';
import path from 'path';
import fs from 'fs';

const DB_PATH = path.join(process.cwd(), 'data', 'kgm_studio.db');

// Ensure data directory exists
const dataDir = path.dirname(DB_PATH);
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

let dbInstance: Database.Database | null = null;

export function getDb(): Database.Database {
  if (!dbInstance) {
    dbInstance = new Database(DB_PATH);
    dbInstance.pragma('journal_mode = WAL');
    dbInstance.pragma('foreign_keys = ON');
    initSchema(dbInstance);
    seedInitialData(dbInstance);
  }
  return dbInstance;
}

function initSchema(db: Database.Database) {
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
      updated_at TEXT NOT NULL,
      FOREIGN KEY (property_id) REFERENCES properties(id) ON DELETE CASCADE
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
      created_at TEXT NOT NULL,
      FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE
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
      created_at TEXT NOT NULL,
      FOREIGN KEY (image_id) REFERENCES property_images(id) ON DELETE CASCADE
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
      updated_at TEXT NOT NULL,
      FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE,
      FOREIGN KEY (image_id) REFERENCES property_images(id) ON DELETE CASCADE,
      FOREIGN KEY (motion_preset_id) REFERENCES motion_presets(id)
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
      completed_at TEXT,
      FOREIGN KEY (shot_id) REFERENCES cinematic_shots(id) ON DELETE CASCADE
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
      created_at TEXT NOT NULL,
      FOREIGN KEY (generation_id) REFERENCES shot_generations(id) ON DELETE CASCADE
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
      created_at TEXT NOT NULL,
      FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE
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
      created_at TEXT NOT NULL,
      FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE
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
      created_at TEXT NOT NULL,
      FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE,
      FOREIGN KEY (render_job_id) REFERENCES render_jobs(id) ON DELETE CASCADE
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
      is_active INTEGER NOT NULL DEFAULT 1,
      FOREIGN KEY (provider_id) REFERENCES provider_accounts(id) ON DELETE CASCADE
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

    -- Create Indexes for blazing performance
    CREATE INDEX IF NOT EXISTS idx_projects_org ON projects(org_id);
    CREATE INDEX IF NOT EXISTS idx_projects_status ON projects(status);
    CREATE INDEX IF NOT EXISTS idx_images_project ON property_images(project_id, sort_order);
    CREATE INDEX IF NOT EXISTS idx_shots_project ON cinematic_shots(project_id, sort_order);
    CREATE INDEX IF NOT EXISTS idx_generations_shot ON shot_generations(shot_id);
    CREATE INDEX IF NOT EXISTS idx_generations_status ON shot_generations(status);
    CREATE INDEX IF NOT EXISTS idx_render_jobs_proj ON render_jobs(project_id);
    CREATE INDEX IF NOT EXISTS idx_exports_project ON exports(project_id);
    CREATE INDEX IF NOT EXISTS idx_audit_created ON audit_logs(created_at);
  `);
}

function seedInitialData(db: Database.Database) {
  const usersCount = db.prepare('SELECT count(*) as count FROM users').get() as { count: number };
  if (usersCount.count > 0) return;

  const now = new Date().toISOString();

  // 1. Seed Organization
  const orgId = 'org_kgm_01';
  db.prepare(`
    INSERT INTO organizations (id, name, slug, tier, quota_monthly_seconds, used_seconds_this_month, created_at)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `).run(
    orgId,
    'Kurra Greenfield Merchants Limited (KGM Limited)',
    'kgm-luxury-real-estate',
    'enterprise',
    12000,
    380,
    now
  );

  // 2. Seed Users across roles
  const users = [
    {
      id: 'usr_super_01',
      email: 'executive@kgmlimited.com',
      full_name: 'Engr. Farouk Kurra',
      role: 'super_admin',
      avatar_url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    },
    {
      id: 'usr_director_01',
      email: 'creative.director@kgmlimited.com',
      full_name: 'Tariq Al-Mansoor',
      role: 'creative_director',
      avatar_url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    },
    {
      id: 'usr_agent_01',
      email: 'nora.alothman@kgmlimited.com',
      full_name: 'Nora Al-Othman',
      role: 'agent',
      avatar_url: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    },
    {
      id: 'usr_pm_01',
      email: 'khalid.property@kgmlimited.com',
      full_name: 'Khalid Ben-Zaid',
      role: 'property_manager',
      avatar_url: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    },
  ];

  for (const u of users) {
    db.prepare(`
      INSERT INTO users (id, email, full_name, role, avatar_url, org_id, created_at)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `).run(u.id, u.email, u.full_name, u.role, u.avatar_url, orgId, now);
  }

  // 3. Seed 17+ Motion Presets (Hero Exterior, Exterior Reveal, Entrance, Living Room, etc.)
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
      id: 'mot_balcony',
      key: 'balcony',
      name: 'Balcony Outward Reveal',
      description: 'Slow outward push moving past balcony balustrade to emphasize unobstructed horizon views.',
      best_for: 'Balconies, Loggias, Covered Verandas',
      risk_level: 'low',
      direction: 'push_forward',
      speed: 'slow',
      default_duration: 10,
      default_lens: '24mm',
      motion_intensity: 0.22,
      parallax_intensity: 0.44,
      environmental_motion: 'soft_exterior_breeze',
      stability_req: 'strict',
      preferred_model: 'runway_gen3_alpha',
      fallback_model: 'kgm_neural_render',
      prompt_template: 'Smooth outward push past the glass railing onto the open balcony, revealing breathtaking panoramic vista in brilliant crystal daylight.',
      negative_prompt: 'railing deformation, sky popping, jittery horizon line.',
    },
    {
      id: 'mot_terrace',
      key: 'terrace',
      name: 'Terrace Sideways Reveal',
      description: 'Sideways cinematic tracking along outdoor lounge and dining setup with panoramic backdrop.',
      best_for: 'Rooftop Terraces, Outdoor Living Rooms, Patios',
      risk_level: 'low',
      direction: 'left_to_right',
      speed: 'slow',
      default_duration: 10,
      default_lens: '24mm',
      motion_intensity: 0.24,
      parallax_intensity: 0.40,
      environmental_motion: 'natural_breeze_and_sky_gradients',
      stability_req: 'strict',
      preferred_model: 'luma_ray2',
      fallback_model: 'kgm_neural_render',
      prompt_template: 'Cinematic tracking shot along expansive rooftop terrace. Foreground outdoor sofa with custom cushions glides past to reveal open sky and architectural perimeter.',
      negative_prompt: 'furniture sliding, sky warping, flickering shadows.',
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
      id: 'mot_view',
      key: 'view',
      name: 'Panoramic Window Push & Reveal',
      description: 'Slow push toward floor-to-ceiling glass wall, expanding the expansive city skyline or scenic landscape.',
      best_for: 'Penthouses, Hillside Estates, High-Floor Apartments, Sea Views',
      risk_level: 'low',
      direction: 'push_forward',
      speed: 'ultra_slow',
      default_duration: 10,
      default_lens: '24mm',
      motion_intensity: 0.20,
      parallax_intensity: 0.35,
      environmental_motion: 'shifting_natural_daylight',
      stability_req: 'strict',
      preferred_model: 'runway_gen3_alpha',
      fallback_model: 'kgm_neural_render',
      prompt_template: 'Slow, majestic push toward expansive floor-to-ceiling panoramic glass windows. Foreground interior frames the breathtaking high-altitude view outside.',
      negative_prompt: 'glass reflections bending, blurry outdoor background, window frame warping.',
    },
    {
      id: 'mot_aerial',
      key: 'aerial',
      name: 'Aerial Drone Crane & Pullback',
      description: 'High-altitude cinematic crane pullback revealing property footprint, grounds, neighborhood, and surrounding prestige.',
      best_for: 'Aerial Drone Shots, Land Parcels, Master Developments, Estates',
      risk_level: 'low',
      direction: 'crane_up',
      speed: 'slow',
      default_duration: 10,
      default_lens: '20mm',
      motion_intensity: 0.25,
      parallax_intensity: 0.45,
      environmental_motion: 'cloud_drift_and_horizon_depth',
      stability_req: 'strict',
      preferred_model: 'runway_gen3_alpha',
      fallback_model: 'kgm_neural_render',
      prompt_template: 'Ultra-smooth aerial drone crane-up and pullback. Comprehensive view of luxury property architecture, roof lines, landscaped estate, and prestigious surroundings.',
      negative_prompt: 'lens distortion, tilt-shift miniature effect, blurry landscape, flickering ground details.',
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

  // 4. Seed Brand Profile
  const brandId = 'brand_kgm_default';
  db.prepare(`
    INSERT INTO brand_profiles (
      id, org_id, name, logo_path, primary_color, secondary_color, font_family,
      watermark_position, watermark_opacity, show_opening_card, show_lower_third,
      show_contact_card, website, phone, whatsapp, is_default, created_at
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `).run(
    brandId,
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

  // 5. Seed Music Library across 10 Royalty-Safe Categories
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
    db.prepare(`
      INSERT INTO music_tracks (
        id, category, title, artist, duration_seconds, file_path,
        is_royalty_verified, license_type, is_custom, created_at
      ) VALUES (?, ?, ?, ?, ?, ?, 1, 'Commercial Royalty-Free (KGM Studio Master)', 0, ?)
    `).run(t.id, t.category, t.title, t.artist, t.duration, t.path, now);
  }

  // 6. Seed AI Provider Accounts & Models
  const providers = [
    {
      id: 'prov_runway',
      provider_name: 'runway',
      display_name: 'Runway Gen-3 Alpha / Turbo',
      priority: 1,
      models: [
        { id: 'mod_rw_gen3', model_name: 'Runway Gen-3 Alpha', model_id: 'gen3a_turbo', cost: 0.05, speed: 9, tier: 'high_quality' },
        { id: 'mod_rw_gen2', model_name: 'Runway Gen-2 HD', model_id: 'gen2_hd', cost: 0.03, speed: 8, tier: 'balanced' },
      ],
    },
    {
      id: 'prov_luma',
      provider_name: 'luma',
      display_name: 'Luma Dream Machine / Ray 2',
      priority: 2,
      models: [
        { id: 'mod_luma_ray2', model_name: 'Luma Ray 2 Ultra', model_id: 'ray-2', cost: 0.06, speed: 8, tier: 'high_quality' },
        { id: 'mod_luma_dream', model_name: 'Luma Dream Machine v1.5', model_id: 'dream-machine-1.5', cost: 0.04, speed: 9, tier: 'balanced' },
      ],
    },
    {
      id: 'prov_kling',
      provider_name: 'kling',
      display_name: 'Kling AI Video v1.5',
      priority: 3,
      models: [
        { id: 'mod_kling_pro', model_name: 'Kling 1.5 Pro Cinematic', model_id: 'kling-v1.5-pro', cost: 0.05, speed: 7, tier: 'high_quality' },
      ],
    },
    {
      id: 'prov_veo',
      provider_name: 'google_veo',
      display_name: 'Google Veo 2 Architectural',
      priority: 4,
      models: [
        { id: 'mod_veo_2', model_name: 'Google Veo 2 High Fidelity', model_id: 'veo-2-preview', cost: 0.07, speed: 8, tier: 'high_quality' },
      ],
    },
    {
      id: 'prov_kgm_neural',
      provider_name: 'kgm_neural_render',
      display_name: 'KGM Neural Cinematic Server Engine',
      priority: 5,
      models: [
        { id: 'mod_kgm_ultra', model_name: 'KGM Neural Spatial 4K', model_id: 'kgm-neural-4k', cost: 0.01, speed: 10, tier: 'high_quality' },
      ],
    },
  ];

  for (const p of providers) {
    db.prepare(`
      INSERT INTO provider_accounts (id, provider_name, display_name, is_active, api_key_configured, priority, rate_limit_per_min, current_balance, created_at)
      VALUES (?, ?, ?, 1, 1, ?, 30, 750.0, ?)
    `).run(p.id, p.provider_name, p.display_name, p.priority, now);

    for (const m of p.models) {
      db.prepare(`
        INSERT INTO provider_models (id, provider_id, model_name, model_id, supported_durations, max_resolution, cost_per_second, speed_score, quality_tier, is_active)
        VALUES (?, ?, ?, ?, '[5,6,8,10]', '1920x1080', ?, ?, ?, 1)
      `).run(m.id, p.id, m.model_name, m.model_id, m.cost, m.speed, m.tier);
    }
  }

  // 7. Seed System Settings
  const settings = [
    { key: 'default_model_routing', value: 'high_quality', desc: 'Default routing tier for property films' },
    { key: 'default_shot_duration', value: '10', desc: 'Standard shot duration in seconds' },
    { key: 'max_concurrent_generations', value: '6', desc: 'Maximum parallel video generation jobs' },
    { key: 'watermark_default_opacity', value: '85', desc: 'Default KGM watermark opacity percentage' },
    { key: 'ffmpeg_crf_quality', value: '18', desc: 'FFmpeg CRF video compression factor (18 = visually lossless)' },
    { key: 'enable_ai_director_qc', value: 'true', desc: 'Enforce pre-export automated AI QC checks' },
  ];

  for (const s of settings) {
    db.prepare(`
      INSERT INTO system_settings (key, value, description, updated_at)
      VALUES (?, ?, ?, ?)
    `).run(s.key, s.value, s.desc, now);
  }

  // 8. Seed Initial Audit Log
  db.prepare(`
    INSERT INTO audit_logs (id, user_id, user_email, action, entity_type, entity_id, details_json, created_at)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `).run(
    'log_init_01',
    'usr_super_01',
    'executive@kgmlimited.com',
    'SYSTEM_INITIALIZED',
    'system',
    'kgm-studio',
    JSON.stringify({ version: '2.4.0', environment: 'production', status: 'ready' }),
    now
  );
}
