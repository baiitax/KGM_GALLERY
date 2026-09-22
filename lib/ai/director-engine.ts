import { ImageAnalysisData, MotionPreset, RoomCategory, TransitionType } from '../types';
import { CinematicPromptEngine } from './prompt-engine';

export interface ShotSpecification {
  shotNumber: number;
  category: RoomCategory;
  motionPresetId: string;
  cameraDirection: string;
  cameraSpeed: string;
  lens: string;
  duration: number;
  motionIntensity: number;
  prompt: string;
  negativePrompt: string;
  transitionType: TransitionType;
  captionText: string;
}

export class CinematicDirectorEngine {
  public static createShotSpecification(
    analysis: ImageAnalysisData,
    presets: MotionPreset[],
    shotNumber: number,
    totalShots: number,
    propertyName?: string,
    style: any = 'kgm_luxury'
  ): ShotSpecification {
    // 1. Select optimal motion preset
    let targetKey = analysis.recommended_motion;

    // Special rules: If opening shot and exterior, ensure hero exterior
    if (shotNumber === 1 && analysis.category === 'exterior') {
      targetKey = 'hero_exterior';
    }
    // If last shot and exterior, make it final hero pullback
    if (shotNumber === totalShots && totalShots > 2 && (analysis.category === 'exterior' || analysis.category === 'aerial' || analysis.category === 'view')) {
      targetKey = 'final_hero';
    }

    let preset = presets.find(p => p.key === targetKey || p.id === targetKey);
    if (!preset) {
      preset = presets.find(p => p.key.includes(analysis.category)) || presets[0];
    }

    // 2. Select Lens & Speed
    const lens = preset?.default_lens || analysis.recommended_lens || '28mm';
    const cameraDirection = preset?.direction || analysis.camera_direction || 'forward';
    const cameraSpeed = preset?.speed || 'slow';
    const duration = analysis.suggested_duration || 10;
    const motionIntensity = preset?.motion_intensity || 0.22;

    // 3. Build cinematic prompt
    const { prompt, negativePrompt } = CinematicPromptEngine.buildPrompt({
      style,
      category: analysis.category,
      motionPreset: preset || ({} as any),
      propertyContext: { name: propertyName },
    });

    // 4. Select Transition
    let transitionType: TransitionType = 'cross_dissolve';
    if (shotNumber === 1) {
      transitionType = 'light_fade';
    } else if (shotNumber === totalShots) {
      transitionType = 'fade_black';
    } else if (analysis.category === 'pool' || analysis.category === 'garden') {
      transitionType = 'match_dissolve';
    }

    // 5. Generate Professional Caption
    const categoryCaptions: Record<RoomCategory, string> = {
      exterior: 'Grand Architectural Facade',
      entrance: 'Double-Height Grand Foyer',
      living_room: 'Formal Reception Salon',
      dining_room: 'Formal Dining Suite',
      kitchen: 'Gourmet Chef Kitchen',
      bedroom: 'Guest Bedroom Suite',
      master_bedroom: 'Primary Master Retreat',
      bathroom: 'Primary Spa En-suite',
      office: 'Executive Study & Library',
      balcony: 'Private Horizon Balcony',
      terrace: 'Rooftop Lounge Terrace',
      garden: 'Manicured Estate Grounds',
      pool: 'Infinity Swimming Pool',
      hallway: 'Architectural Gallery Corridor',
      staircase: 'Floating Cantilevered Staircase',
      garage: 'Showroom Automotive Pavilion',
      view: 'Panoramic Cityscape Vista',
      land: 'Prime Estate Parcel',
      aerial: 'Aerial Estate Perspective',
      other: 'Bespoke Architectural Feature',
    };

    const captionText = categoryCaptions[analysis.category] || analysis.dominant_feature || 'Luxury Space';

    return {
      shotNumber,
      category: analysis.category,
      motionPresetId: preset?.id || 'mot_hero_ext',
      cameraDirection,
      cameraSpeed,
      lens,
      duration,
      motionIntensity,
      prompt,
      negativePrompt,
      transitionType,
      captionText,
    };
  }
}
