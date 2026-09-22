import { VideoGenerationProvider, GenerateShotParams, ProviderJobResult } from './base-provider';
import { RunwayProvider } from './runway-provider';
import { LumaProvider, KlingProvider, GoogleVeoProvider } from './other-providers';
import { KGMNeuralRenderer } from './neural-renderer';

export type QualityTier = 'high_quality' | 'balanced' | 'fast_preview';

export interface ModelRouteDecision {
  provider: VideoGenerationProvider;
  model: string;
  estimatedCost: number;
  fallbackProvider?: VideoGenerationProvider;
  fallbackModel?: string;
  reason: string;
}

export class AIModelRouter {
  private static providers: Record<string, VideoGenerationProvider> = {
    runway: new RunwayProvider(),
    luma: new LumaProvider(),
    kling: new KlingProvider(),
    google_veo: new GoogleVeoProvider(),
    kgm_neural_render: new KGMNeuralRenderer(),
  };

  public static getProvider(providerName: string): VideoGenerationProvider {
    return this.providers[providerName] || this.providers.kgm_neural_render;
  }

  public static routeJob(params: GenerateShotParams, qualityTier: QualityTier = 'high_quality'): ModelRouteDecision {
    // 1. Policy Decision Matrix
    if (qualityTier === 'fast_preview') {
      const p = this.providers.kgm_neural_render;
      return {
        provider: p,
        model: 'kgm-neural-4k',
        estimatedCost: p.estimateCost(params),
        fallbackProvider: this.providers.runway,
        fallbackModel: 'gen3a_turbo',
        reason: 'Fast preview requested: Routed to low-latency KGM Neural Spatial Engine.',
      };
    }

    if (qualityTier === 'balanced') {
      const p = this.providers.runway;
      return {
        provider: p,
        model: 'gen3a_turbo',
        estimatedCost: p.estimateCost(params),
        fallbackProvider: this.providers.kgm_neural_render,
        fallbackModel: 'kgm-neural-4k',
        reason: 'Balanced tier: Routed to Runway Gen-3 Turbo with KGM Neural fallback.',
      };
    }

    // Default: High Quality Luxury Production
    const preferredProviderName = params.motionPreset?.preferred_model?.includes('luma') ? 'luma' : 'runway';
    const primaryProvider = this.providers[preferredProviderName] || this.providers.runway;

    return {
      provider: primaryProvider,
      model: preferredProviderName === 'luma' ? 'ray-2' : 'gen3a_turbo',
      estimatedCost: primaryProvider.estimateCost(params),
      fallbackProvider: this.providers.kgm_neural_render,
      fallbackModel: 'kgm-neural-4k',
      reason: `Luxury production standard: Selected ${primaryProvider.displayName} for supreme architectural preservation.`,
    };
  }

  public static async executeWithFallback(params: GenerateShotParams, qualityTier: QualityTier = 'high_quality'): Promise<ProviderJobResult> {
    const route = this.routeJob(params, qualityTier);

    try {
      // Validate model constraints
      const validation = route.provider.validateConstraints(params);
      if (!validation.valid) {
        console.warn(`Provider constraint validation warning: ${validation.error}. Falling back to KGM Neural Engine.`);
        return await this.providers.kgm_neural_render.generateShot(params);
      }

      const result = await route.provider.generateShot(params);
      if (result.status === 'completed' || result.status === 'processing') {
        return result;
      }
      throw new Error(result.errorMessage || 'Primary generation failed');
    } catch (err: any) {
      console.warn(`Primary provider (${route.provider.providerName}) failed: ${err?.message}. Engaging fallback provider.`);
      const fallback = route.fallbackProvider || this.providers.kgm_neural_render;
      return await fallback.generateShot({
        ...params,
        modelId: route.fallbackModel || 'kgm-neural-4k',
      });
    }
  }
}
