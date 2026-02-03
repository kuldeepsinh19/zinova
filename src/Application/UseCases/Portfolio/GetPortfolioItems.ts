import { IPortfolioRepository } from "@domain/Repositories/IPortfolioRepository";
import { PortfolioItemResponseDTO } from "@application/DTOs/PortfolioItemDTO";

/**
 * Get Portfolio Items Use Case
 *
 * Fetches all active portfolio items for display in the gallery.
 * No authentication required - this is a public feature.
 */
export class GetPortfolioItems {
  constructor(private portfolioRepository: IPortfolioRepository) {}

  async execute(): Promise<PortfolioItemResponseDTO[]> {
    // Fetch all active portfolio items
    const items = await this.portfolioRepository.findAll();

    // Map to response DTOs
    return items.map((item) => ({
      id: item.id,
      title: item.title,
      category: item.category,
      categoryDisplayName: item.getCategoryDisplayName(),
      imageUrl: item.imageUrl,
      videoUrl: item.videoUrl,
      description: item.description,
      hasVideo: item.hasVideo(),
    }));
  }
}
