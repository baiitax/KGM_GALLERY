export type UserRole =
  | 'super_admin'
  | 'admin'
  | 'creative_director'
  | 'property_manager'
  | 'agent'
  | 'viewer';

export interface User {
  id: string;
  email: string;
  full_name: string;
  role: UserRole;
  avatar_url?: string;
  org_id: string;
  created_at: string;
}

export interface Organization {
  id: string;
  name: string;
  slug: string;
  tier: 'starter' | 'professional' | 'enterprise';
  quota_monthly_seconds: number;
  used_seconds_this_month: number;
  created_at: string;
}

export type PropertyType =
  | 'Apartment'
  | 'Villa'
  | 'Duplex'
  | 'Penthouse'
  | 'Mansion'
  | 'Townhouse'
  | 'Office'
  | 'Commercial'
  | 'Retail'
  | 'Land'
  | 'Estate'
  | 'Development'
  | 'Hotel'
  | 'Other';

export type MarketingObjective =
  | 'For Sale'
  | 'For Rent'
  | 'For Lease'
  | 'Investment'
  | 'Property Launch'
  | 'Open House'
  | 'General Marketing';

export interface Property {
  id: string;
  org_id: string;
  property_name: string;
  property_ref: string;
  property_type: PropertyType;
  marketing_objective: MarketingObjective;
  location: string;
  property_status: 'Active' | 'Under Offer' | 'Sold' | 'Leased' | 'Draft';
  bedrooms: number;
  bathrooms: number;
  property_size: string;
  price: string;
  rental_price?: string;
  currency: string;
  description: string;
  agent_name: string;
  agent_contact: string;
  agent_whatsapp: string;
  agent_website: string;
  cta_text: string;
  created_at: string;
  updated_at: string;
}

export type ProjectStatus =
  | 'draft'
  | 'analyzing'
  | 'storyboard_ready'
  | 'generating'
  | 'reviewing'
  | 'rendering'
  | 'completed'
  | 'failed';

export type CinematicStyle =
  | 'kgm_luxury'
  | 'kgm_modern'
  | 'kgm_corporate'
  | 'kgm_investment'
  | 'kgm_social';

export type AspectRatio = '16:9' | '9:16' | '1:1';

export interface Project {
  id: string;
  org_id: string;
  property_id: string;
  title: string;
  status: ProjectStatus;
  cinematic_style: CinematicStyle;
  default_duration: number; // 5, 6, 8, 10
  target_aspect_ratio: AspectRatio;
  brand_profile_id?: string;
  music_track_id?: string;
  voiceover_id?: string;
  public_id: string;
  is_public: boolean;
  cover_image_url?: string;
  created_by: string;
  created_at: string;
  updated_at: string;
  property?: Property;
  images_count?: number;
  shots_count?: number;
  completed_shots_count?: number;
}

export type RoomCategory =
  | 'exterior'
  | 'entrance'
  | 'living_room'
  | 'dining_room'
  | 'kitchen'
  | 'bedroom'
  | 'master_bedroom'
  | 'bathroom'
  | 'office'
  | 'balcony'
  | 'terrace'
  | 'garden'
  | 'pool'
  | 'hallway'
  | 'staircase'
  | 'garage'
  | 'view'
  | 'land'
  | 'aerial'
  | 'other';

export interface PropertyImage {
  id: string;
  project_id: string;
  storage_path: string;
  original_filename: string;
  mime_type: string;
  width: number;
  height: number;
  file_size: number;
  sort_order: number;
  category: RoomCategory;
  analysis_status: 'pending' | 'analyzing' | 'completed' | 'failed';
  analysis_json?: string;
  is_cover: boolean;
  is_locked: boolean;
  is_optional: boolean;
  rotation: number;
  crop_data?: string;
  created_at: string;
  analysis?: ImageAnalysisData;
}

export interface ImageAnalysisData {
  category: RoomCategory;
  confidence: number;
  dominant_feature: string;
  camera_direction: 'forward' | 'backward' | 'left_to_right' | 'right_to_left' | 'orbit' | 'pan_up' | 'pan_down' | 'static';
  foreground: string;
  midground: string;
  background: string;
  depth_score: number; // 0.0 - 1.0
  lighting_condition: 'natural_daylight' | 'golden_hour' | 'twilight' | 'interior_warm' | 'interior_architectural' | 'overcast';
  visual_quality: 'pristine' | 'high' | 'medium' | 'low';
  orientation: 'landscape' | 'portrait' | 'square';
  perspective: 'eye_level' | 'wide_angle' | 'low_angle' | 'elevated' | 'aerial';
  architectural_sensitivity: 'high' | 'medium' | 'low';
  reflective_surfaces: 'none' | 'low' | 'medium' | 'high';
  fragile_objects: 'none' | 'few' | 'many';
  has_text: boolean;
  has_faces: boolean;
  generation_risk: 'low' | 'medium' | 'high';
  recommended_motion: string;
  recommended_lens: string;
  suggested_duration: number;
}

export interface MotionPreset {
  id: string;
  key: string;
  name: string;
  description: string;
  best_for: string;
  risk_level: 'low' | 'medium' | 'high';
  direction: 'left_to_right' | 'right_to_left' | 'push_forward' | 'pull_backward' | 'crane_up' | 'crane_down' | 'orbit_subtle' | 'static_hold';
  speed: 'slow' | 'medium' | 'ultra_slow';
  default_duration: number;
  default_lens: string;
  motion_intensity: number; // 0.1 - 1.0
  parallax_intensity: number;
  environmental_motion: string;
  stability_req: 'strict' | 'moderate' | 'relaxed';
  preferred_model: string;
  fallback_model: string;
  prompt_template: string;
  negative_prompt: string;
  is_active: boolean;
  is_custom: boolean;
  created_at: string;
}

export type ShotStatus =
  | 'pending'
  | 'generating'
  | 'generated'
  | 'approved'
  | 'rejected'
  | 'locked';

export type TransitionType =
  | 'cross_dissolve'
  | 'match_dissolve'
  | 'fade_black'
  | 'light_fade'
  | 'cut';

export interface CinematicShot {
  id: string;
  project_id: string;
  image_id: string;
  shot_number: number;
  category: RoomCategory;
  motion_preset_id: string;
  camera_direction: string;
  camera_speed: string;
  lens: string;
  duration: number;
  motion_intensity: number;
  prompt: string;
  negative_prompt: string;
  status: ShotStatus;
  approved_generation_id?: string;
  transition_type: TransitionType;
  caption_text: string;
  sort_order: number;
  created_at: string;
  updated_at: string;
  image?: PropertyImage;
  motion_preset?: MotionPreset;
  active_generation?: ShotGeneration;
  generations?: ShotGeneration[];
}

export type GenerationStatus =
  | 'queued'
  | 'processing'
  | 'completed'
  | 'failed'
  | 'cancelled';

export interface ShotGeneration {
  id: string;
  shot_id: string;
  project_id: string;
  source_image_id: string;
  provider: string; // 'runway' | 'luma' | 'kling' | 'google_veo' | 'kgm_neural'
  model: string;
  provider_job_id?: string;
  prompt: string;
  negative_prompt: string;
  duration: number;
  resolution: string;
  aspect_ratio: AspectRatio;
  seed: number;
  motion_intensity: number;
  status: GenerationStatus;
  progress: number; // 0 - 100
  cost_estimate: number;
  actual_cost: number;
  output_path?: string;
  thumbnail_path?: string;
  error_code?: string;
  error_message?: string;
  execution_time_ms?: number;
  created_at: string;
  completed_at?: string;
}

export type WatermarkPosition =
  | 'top_left'
  | 'top_right'
  | 'bottom_left'
  | 'bottom_right'
  | 'center';

export interface BrandProfile {
  id: string;
  org_id: string;
  name: string;
  logo_path?: string;
  primary_color: string;
  secondary_color: string;
  font_family: string;
  watermark_position: WatermarkPosition;
  watermark_opacity: number; // 10 - 100
  show_opening_card: boolean;
  show_lower_third: boolean;
  show_contact_card: boolean;
  website: string;
  phone: string;
  whatsapp: string;
  is_default: boolean;
  created_at: string;
}

export type MusicCategory =
  | 'luxury'
  | 'modern'
  | 'elegant'
  | 'cinematic'
  | 'corporate'
  | 'calm'
  | 'premium'
  | 'african_contemporary'
  | 'minimal_piano'
  | 'ambient';

export interface MusicTrack {
  id: string;
  category: MusicCategory;
  title: string;
  artist: string;
  duration_seconds: number;
  file_path: string;
  wave_data?: string;
  is_royalty_verified: boolean;
  license_type: string;
  is_custom: boolean;
  created_at: string;
}

export interface VoiceoverTrack {
  id: string;
  project_id: string;
  language: 'en' | 'ar' | 'fr';
  script_text: string;
  voice_id: string;
  audio_path?: string;
  duration_seconds: number;
  status: 'draft' | 'synthesizing' | 'ready' | 'failed';
  created_at: string;
}

export type RenderStep =
  | 'queued'
  | 'normalizing_assets'
  | 'applying_cinematic_motion'
  | 'building_transitions'
  | 'rendering_brand_overlays'
  | 'mixing_audio_tracks'
  | 'mastering_4k_export'
  | 'generating_social_crops'
  | 'completed'
  | 'failed';

export interface RenderJob {
  id: string;
  project_id: string;
  status: 'queued' | 'processing' | 'completed' | 'failed';
  progress: number; // 0 - 100
  current_step: RenderStep;
  total_steps: number;
  step_number: number;
  output_master_path?: string;
  output_landscape_path?: string;
  output_portrait_path?: string;
  output_square_path?: string;
  output_whatsapp_path?: string;
  thumbnail_path?: string;
  duration_seconds: number;
  resolution: string;
  file_size_bytes: number;
  error_message?: string;
  started_at?: string;
  completed_at?: string;
  created_at: string;
}

export type ExportType =
  | 'master_4k'
  | 'social_landscape'
  | 'social_portrait'
  | 'social_square'
  | 'whatsapp_compressed';

export interface ExportItem {
  id: string;
  project_id: string;
  render_job_id: string;
  export_type: ExportType;
  title: string;
  file_path: string;
  file_size: number;
  resolution: string;
  aspect_ratio: AspectRatio;
  download_count: number;
  created_at: string;
}

export interface ProviderAccount {
  id: string;
  provider_name: 'runway' | 'luma' | 'kling' | 'google_veo' | 'kgm_neural';
  display_name: string;
  is_active: boolean;
  api_key_configured: boolean;
  priority: number;
  rate_limit_per_min: number;
  current_balance: number;
  models: ProviderModel[];
  created_at: string;
}

export interface ProviderModel {
  id: string;
  provider_id: string;
  model_name: string;
  model_id: string;
  supported_durations: number[]; // [5, 10]
  max_resolution: string;
  cost_per_second: number;
  speed_score: number; // 1 - 10
  quality_tier: 'high_quality' | 'balanced' | 'fast_preview';
  is_active: boolean;
}

export interface AuditLog {
  id: string;
  user_id: string;
  user_email: string;
  action: string;
  entity_type: string;
  entity_id: string;
  details_json: string;
  ip_address?: string;
  created_at: string;
}

export interface DashboardKPIs {
  active_projects: number;
  completed_films: number;
  generating_queue_count: number;
  draft_projects: number;
  total_exports: number;
  total_ai_cost: number;
  avg_generation_time_sec: number;
  success_rate_percent: number;
}

export interface QCReport {
  is_ready: boolean;
  score: number; // 0 - 100
  checks: {
    id: string;
    label: string;
    passed: boolean;
    severity: 'error' | 'warning' | 'info';
    message: string;
  }[];
  director_evaluation: {
    story_flow_score: number;
    shot_diversity_score: number;
    pacing_score: number;
    recommendation: 'Approved' | 'Recommended Changes';
    feedback: string[];
  };
}
