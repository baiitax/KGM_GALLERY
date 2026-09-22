export interface ProviderGenerationRequest {
  provider: 'native_ffmpeg' | 'runway_gen3' | 'luma_dream_machine' | 'kling_v1_5' | 'google_veo';
  imageUrl: string;
  prompt: string;
  negativePrompt?: string;
  durationSeconds: number;
  motionIntensity?: number;
  cameraMovement?: string;
}

export interface ProviderGenerationResponse {
  jobId: string;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  videoUrl?: string;
  estimatedCostUsd: number;
  renderEngine: string;
}

export class VideoProviderService {
  static getEstimatedCost(provider: string, durationSeconds: number): number {
    switch (provider) {
      case 'runway_gen3':
        return durationSeconds * 0.05;
      case 'luma_dream_machine':
        return 0.35;
      case 'kling_v1_5':
        return 0.28;
      case 'google_veo':
        return 0.45;
      case 'native_ffmpeg':
      default:
        return 0.005; // Compute resource cost
    }
  }

  static getProviderCapabilities() {
    return [
      {
        id: 'native_ffmpeg',
        name: 'KGM Native Neural Engine (FFmpeg Master)',
        supportedDurations: [5, 6, 8, 10],
        maxResolution: '1080p / 4K UHD',
        architecturalPreservationRate: '100%',
        costPerSecond: '$0.0005',
        status: 'active',
      },
      {
        id: 'runway_gen3',
        name: 'Runway Gen-3 Alpha',
        supportedDurations: [5, 10],
        maxResolution: '1080p',
        architecturalPreservationRate: '92%',
        costPerSecond: '$0.05',
        status: 'active',
      },
      {
        id: 'luma_dream_machine',
        name: 'Luma Dream Machine',
        supportedDurations: [5],
        maxResolution: '1080p',
        architecturalPreservationRate: '88%',
        costPerSecond: '$0.07',
        status: 'active',
      },
      {
        id: 'kling_v1_5',
        name: 'Kling AI v1.5 Pro',
        supportedDurations: [5, 10],
        maxResolution: '1080p',
        architecturalPreservationRate: '90%',
        costPerSecond: '$0.028',
        status: 'active',
      },
      {
        id: 'google_veo',
        name: 'Google Veo 2',
        supportedDurations: [5, 8, 10],
        maxResolution: '4K',
        architecturalPreservationRate: '95%',
        costPerSecond: '$0.045',
        status: 'standby',
      },
    ];
  }
}
