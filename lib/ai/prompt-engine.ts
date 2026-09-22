import { CinematicStyle, MotionPreset, RoomCategory } from '../types';

export interface PromptBuildParams {
  style: CinematicStyle;
  category: RoomCategory;
  motionPreset: MotionPreset;
  propertyContext?: {
    name?: string;
    type?: string;
    location?: string;
  };
  customInstructions?: string;
}

export class CinematicPromptEngine {
  public static buildPrompt(params: PromptBuildParams): { prompt: string; negativePrompt: string } {
    const { style, category, motionPreset, propertyContext, customInstructions } = params;

    // 1. Style Prefix
    const stylePhrases: Record<CinematicStyle, string> = {
      kgm_luxury: 'Premium luxury real-estate cinematography for Kurra Greenfield Merchants Limited (KGM). Masterwork high-end production value.',
      kgm_modern: 'Ultra-contemporary architectural cinematography. Clean geometric lines, luminous natural lighting, minimalist luxury aesthetic.',
      kgm_corporate: 'Prestige institutional real-estate cinematography. Sophisticated, stately, balanced, and authoritative.',
      kgm_investment: 'High-value property investment showcase cinematography. Crisp architectural precision and prime asset presentation.',
      kgm_social: 'High-engagement luxury property cinematography. Dynamic yet ultra-smooth and stately, optimized for viral luxury discovery.',
    };

    const stylePrefix = stylePhrases[style] || stylePhrases.kgm_luxury;

    // 2. Exact Image Preservation Clause
    const preservationClause = `CRITICAL ARCHITECTURAL PRESERVATION: Preserve 100% of the exact structural architecture, room geometry, furniture placement, cabinetry, materials, marble veining, colors, windows, doors, lighting fixtures, and decorative art present in the reference image.`;

    // 3. Motion & Lens Direction
    const motionClause = `CAMERA CHOREOGRAPHY: ${motionPreset.prompt_template} Using a calibrated ${motionPreset.default_lens} cinema prime lens with ultra-smooth optical stabilization. Physically plausible camera movement at a stately, controlled ${motionPreset.speed.replace('_', ' ')} speed.`;

    // 4. Parallax & Environmental Depth
    const depthClause = `DEPTH & PARALLAX: Natural foreground-to-background spatial separation with gentle three-dimensional parallax drift. Stable straight vertical and horizontal architectural lines.`;

    // 5. Environmental Lighting
    const lightingClause = `ATMOSPHERE & LIGHTING: Shifting soft daylight reflections across polished surfaces. Gentle, realistic ambient environmental airflow (${motionPreset.environmental_motion.replace(/_/g, ' ')}).`;

    // 6. Custom Instructions if any
    const customClause = customInstructions ? `DIRECTOR NOTE: ${customInstructions}` : '';

    const prompt = [
      stylePrefix,
      propertyContext?.name ? `Property: ${propertyContext.name}.` : '',
      preservationClause,
      motionClause,
      depthClause,
      lightingClause,
      customClause,
      `OUTPUT: Photorealistic 4K cinema master. No cartoonish animation. Flawless luxury property film.`
    ].filter(Boolean).join(' ');

    // 7. Negative Prompt enforcing strict preservation
    const defaultNegative = [
      'morphing architecture',
      'warping walls',
      'shifting window positions',
      'distorted columns',
      'melting doors',
      'sliding furniture',
      'changing cushion patterns',
      'hallway warping',
      'wobbly camera',
      'jerky camera motion',
      'fast zooms',
      'fish-eye distortion',
      'flicker',
      'noise',
      'grain',
      'duplicate items',
      'newly added objects',
      'structural alterations',
      'blurry textures',
      'artificial CGI look',
      'water glitches',
      'unnatural sky motion',
      'over-saturation',
      'deformed ceiling',
    ].join(', ');

    const negativePrompt = motionPreset.negative_prompt
      ? `${defaultNegative}, ${motionPreset.negative_prompt}`
      : defaultNegative;

    return { prompt, negativePrompt };
  }
}
