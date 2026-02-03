/**
 * Image Generation Domain Entity
 *
 * Represents an AI image generation request/result
 */
export class ImageGeneration {
  constructor(
    public readonly id: string,
    public readonly userId: string,
    public readonly inputImageUrl: string,
    public outputImageUrl: string | null,
    public readonly style: string,
    public readonly creditsUsed: number,
    public status: ImageGenerationStatus,
    public readonly aiProvider: string,
    public errorMessage: string | null,
    public readonly metadata: Record<string, any> | null,
    public readonly createdAt: Date,
  ) {}

  /**
   * Mark generation as processing
   */
  markAsProcessing(): void {
    this.status = "PROCESSING";
  }

  /**
   * Mark generation as completed
   */
  markAsCompleted(outputUrl: string): void {
    this.status = "COMPLETED";
    this.outputImageUrl = outputUrl;
    this.errorMessage = null;
  }

  /**
   * Mark generation as failed
   */
  markAsFailed(error: string): void {
    this.status = "FAILED";
    this.errorMessage = error;
  }

  /**
   * Check if generation is completed
   */
  isCompleted(): boolean {
    return this.status === "COMPLETED";
  }

  /**
   * Check if generation failed
   */
  hasFailed(): boolean {
    return this.status === "FAILED";
  }

  /**
   * Check if generation is still pending
   */
  isPending(): boolean {
    return this.status === "PENDING";
  }
}

export type ImageGenerationStatus =
  | "PENDING"
  | "PROCESSING"
  | "COMPLETED"
  | "FAILED";
