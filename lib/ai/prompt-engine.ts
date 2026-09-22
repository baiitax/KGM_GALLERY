export interface PromptEngineInput {
  style: 'kgm_luxury' | 'cinematic_moody' | 'bright_editorial' | 'dusk_prestige';
  category: string;
  motionPreset: {
    name: string;
    key: string;
    default_lens?: string;
    speed?: string;
    motion_intensity?: number;
    environmental_motion?: string;
    prompt_template?: string;
    negative_prompt?: string;
  };
  propertyContext?: {
    name?: string;
    location?: string;
    architectural_style?: string;
  };
}

export class CinematicPromptEngine {
  static buildPrompt(input: PromptEngineInput): { prompt: string; negativePrompt: string } {
    const lens = input.motionPreset.default_lens || '28mm';
    const speed = input.motionPreset.speed || 'slow';
    const motionMotion = input.motionPreset.prompt_template || 'Slow controlled cinematic camera movement.';
    const propName = input.propertyContext?.name || 'luxury architectural estate';

    const positivePrompt = [
      `Ultra-high-end 8K architectural cinematography of ${propName}.`,
      `${motionMotion}`,
      `Captured on ARRI Alexa Mini LF with Zeiss Supreme ${lens} cinema prime lens at T1.5.`,
      `Motion characteristics: ${speed} cinematic cadence, smooth hydraulic gimbal stabilization, zero camera shake, fluid parallax depth.`,
      `Lighting & Color: Master-graded in ACES color space, natural photorealistic illumination, accurate reflections, authentic high dynamic range.`,
      `Environmental details: ${input.motionPreset.environmental_motion || 'gentle atmospheric breeze and soft natural lighting'}.`,
      `STRICT ARCHITECTURAL DIRECTIVE: Preserve 100% of the exact structural architecture, spatial layout, furniture placement, materials, wall positions, and geometry visible in the source reference image. No structural morphing, no hallucinations, completely photorealistic real estate rendering.`,
    ].join(' ');

    const negativePrompt = [
      input.motionPreset.negative_prompt || '',
      'morphing architecture, warped walls, unstable geometry, moving furniture, distorted perspective, blurry textures, AI artifacts, jittery panning, erratic frame jumps, cartoonish rendering, oversaturated neon, extra objects, floating debris, noisy grain, low resolution, cheap ken burns zoom, camera shake.',
    ].filter(Boolean).join(', ');

    return {
      prompt: positivePrompt,
      negativePrompt,
    };
  }
}
