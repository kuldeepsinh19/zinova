import { ImageGeneration } from "../Entities/ImageGeneration";

/**
 * Image Generation Repository Interface
 *
 * DATABASE-AGNOSTIC interface for image generation data access.
 */
export interface IImageGenerationRepository {
  /**
   * Create a new image generation record
   */
  create(generation: ImageGeneration): Promise<ImageGeneration>;

  /**
   * Find generation by ID
   */
  findById(id: string): Promise<ImageGeneration | null>;

  /**
   * Update generation status and output URL
   */
  updateStatus(
    id: string,
    status: string,
    outputUrl?: string,
    errorMessage?: string,
  ): Promise<void>;

  /**
   * Get user's generation history
   */
  getUserHistory(userId: string, limit?: number): Promise<ImageGeneration[]>;

  /**
   * Get all pending generations (for processing queue)
   */
  getPendingGenerations(): Promise<ImageGeneration[]>;
}
