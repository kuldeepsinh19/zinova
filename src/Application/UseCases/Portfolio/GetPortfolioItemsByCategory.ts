import { IPortfolioRepository } from "@domain/Repositories/IPortfolioRepository";
import { PortfolioCategory } from "@domain/Entities/PortfolioItem";
import { PortfolioItemResponseDTO } from "@application/DTOs/PortfolioItemDTO";

/**
 * Get Portfolio Items By Category Use Case
 *
 * Fetches portfolio items filtered by category.
 * No authentication required - this is a public feature.
 */
export class GetPortfolioItemsByCategory {
  constructor(private portfolioRepository: IPortfolioRepository) {}

  async execute(
    category: PortfolioCategory,
  ): Promise<PortfolioItemResponseDTO[]> {
    // Fetch items for the specified category
    const items = await this.portfolioRepository.findByCategory(category);

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
