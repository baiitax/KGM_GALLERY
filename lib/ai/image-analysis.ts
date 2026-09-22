export interface ImageAnalysisResult {
  category: 'exterior' | 'entrance' | 'living_room' | 'dining' | 'kitchen' | 'master_bedroom' | 'bathroom' | 'balcony' | 'pool' | 'aerial';
  confidence: number;
  depth_score: number;
  symmetry_score: number;
  lighting_quality: 'dusk_golden_hour' | 'natural_diffused' | 'bright_daylight' | 'moody_ambient';
  recommended_motion_preset: string;
  recommended_lens: string;
  recommended_speed: 'ultra_slow' | 'slow' | 'medium';
  generation_risk: 'low' | 'medium' | 'high';
  detected_features: string[];
  composition_critique: string;
}

export class ImageAnalysisService {
  static analyzeImage(params: { filename: string; categoryHint?: string }): ImageAnalysisResult {
    const fn = (params.filename || '').toLowerCase();
    const hint = (params.categoryHint || '').toLowerCase();

    let category: ImageAnalysisResult['category'] = 'living_room';
    let lens = '28mm';
    let preset = 'living_room';
    let lighting: ImageAnalysisResult['lighting_quality'] = 'natural_diffused';
    let features: string[] = ['Open concept luxury layout', 'High architectural ceilings'];
    let critique = 'Clean spatial proportions with distinct vanishing lines.';
    let depthScore = 0.88;
    let symmetryScore = 0.82;
    const risk: 'low' | 'medium' | 'high' = 'low';

    if (fn.includes('exterior') || fn.includes('facade') || hint.includes('exterior') || hint.includes('facade')) {
      category = 'exterior';
      lens = '24mm';
      preset = 'hero_exterior';
      lighting = 'dusk_golden_hour';
      features = ['Modern travertine stone facade', 'Integrated LED accent lighting', 'Expansive manicured landscaping'];
      critique = 'Striking architectural volume with balanced vanishing lines against twilight sky.';
      depthScore = 0.96;
      symmetryScore = 0.89;
    } else if (fn.includes('foyer') || fn.includes('entrance') || hint.includes('entrance')) {
      category = 'entrance';
      lens = '24mm';
      preset = 'entrance_foyer';
      lighting = 'natural_diffused';
      features = ['Grand double-height pivot door', 'Book-matched Italian marble flooring', 'Sculptural brass chandelier'];
      critique = 'Exceptional verticality; recommended gentle upward tilt to emphasize ceiling scale.';
      depthScore = 0.91;
    } else if (fn.includes('kitchen') || fn.includes('counter') || hint.includes('kitchen')) {
      category = 'kitchen';
      lens = '35mm';
      preset = 'kitchen_dolly';
      lighting = 'natural_diffused';
      features = ['Monolithic Calacatta marble island', 'Gaggenau integrated appliances', 'Custom bronze cabinet hardware'];
      critique = 'Crisp planar alignment; shallow depth of field recommended for texture richness.';
      depthScore = 0.84;
    } else if (fn.includes('bedroom') || fn.includes('master') || hint.includes('bedroom')) {
      category = 'master_bedroom';
      lens = '35mm';
      preset = 'bedroom_push';
      lighting = 'moody_ambient';
      features = ['Panoramic floor-to-ceiling glass', 'Custom textured wood headboard wall', 'Linen upholstered seating'];
      critique = 'Serene spatial flow with warm morning illumination.';
      depthScore = 0.86;
    } else if (fn.includes('bath') || hint.includes('bath')) {
      category = 'bathroom';
      lens = '35mm';
      preset = 'bathroom_pan';
      lighting = 'natural_diffused';
      features = ['Freestanding soaking stone tub', 'Frameless rainfall shower enclosure', 'Floating timber vanity'];
      critique = 'Intimate spa ambiance; slow drift highlights surface reflectivity.';
      depthScore = 0.80;
    } else if (fn.includes('pool') || fn.includes('terrace') || hint.includes('pool') || hint.includes('terrace')) {
      category = 'pool';
      lens = '24mm';
      preset = 'pool_reveal';
      lighting = 'dusk_golden_hour';
      features = ['Infinity water edge', 'Sunken lounge with linear fire pit', 'Submerged ambient pool illumination'];
      critique = 'High visual contrast between glowing water and twilight perimeter.';
      depthScore = 0.95;
    } else if (fn.includes('dining') || hint.includes('dining')) {
      category = 'dining';
      lens = '35mm';
      preset = 'dining_sweep';
      lighting = 'moody_ambient';
      features = ['Smoked oak 12-seat dining table', 'Bespoke cascading crystal fixture', 'Temp-controlled wine gallery'];
      critique = 'Balanced axial composition centered on chandelier glow.';
      depthScore = 0.85;
    }

    return {
      category,
      confidence: 0.94,
      depth_score: depthScore,
      symmetry_score: symmetryScore,
      lighting_quality: lighting,
      recommended_motion_preset: preset,
      recommended_lens: lens,
      recommended_speed: 'slow',
      generation_risk: risk,
      detected_features: features,
      composition_critique: critique,
    };
  }
}
