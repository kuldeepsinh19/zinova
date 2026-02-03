/**
 * AI Service Interface
 *
 * This interface allows swapping AI providers easily.
 * Current: Gemini API
 * Future: DALL-E, Midjourney, Stable Diffusion, etc.
 */
export interface IAIService {
  /**
   * Generate an image from input image and style
   */
  generateImage(
    inputImageUrl: string,
    style: string,
  ): Promise<AIGenerationResult>;

  /**
   * Get the name of the AI provider
   */
  getProviderName(): string;

  /**
   * Check if the service is available
   */
  isAvailable(): Promise<boolean>;
}

export interface AIGenerationResult {
  outputImageUrl: string;
  processingTime: number;
  creditsUsed: number;
  metadata?: Record<string, any>;
}

export type AIStyle =
  | "trendy"
  | "professional"
  | "artistic"
  | "minimal"
  | "vibrant";
