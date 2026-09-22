import { AspectRatio, MotionPreset } from '../types';

export interface GenerateShotParams {
  shotId: string;
  projectId: string;
  sourceImagePath: string; // Absolute or public path to reference image
  prompt: string;
  negativePrompt: string;
  duration: number; // 5, 6, 8, 10
  aspectRatio: AspectRatio;
  resolution: string;
  seed?: number;
  motionPreset?: MotionPreset;
  modelId?: string;
  cameraDirection?: string;
  cameraSpeed?: string;
  motionIntensity?: number;
}

export interface ProviderJobResult {
  provider: string;
  model: string;
  externalJobId: string;
  status: 'queued' | 'processing' | 'completed' | 'failed';
  progress: number;
  estimatedCost: number;
  actualCost?: number;
  outputPath?: string;
  thumbnailPath?: string;
  errorMessage?: string;
  executionTimeMs?: number;
}

export interface VideoGenerationProvider {
  readonly providerName: string;
  readonly displayName: string;

  generateShot(params: GenerateShotParams): Promise<ProviderJobResult>;
  getGenerationStatus(jobId: string): Promise<ProviderJobResult>;
  cancelGeneration(jobId: string): Promise<boolean>;
  estimateCost(params: GenerateShotParams): number;
  validateConstraints(params: GenerateShotParams): { valid: boolean; error?: string };
}
