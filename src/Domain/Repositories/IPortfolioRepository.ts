import { PortfolioItem, PortfolioCategory } from "../Entities/PortfolioItem";

/**
 * Portfolio Repository Interface
 *
 * Defines operations for accessing portfolio items.
 * Portfolio items are read-only in the MVP (managed via database seeding).
 */
export interface IPortfolioRepository {
  /**
   * Find all active portfolio items, ordered by the 'order' field
   */
  findAll(): Promise<PortfolioItem[]>;

  /**
   * Find all active portfolio items in a specific category
   */
  findByCategory(category: PortfolioCategory): Promise<PortfolioItem[]>;

  /**
   * Find a single portfolio item by ID
   */
  findById(id: string): Promise<PortfolioItem | null>;

  /**
   * Get all available categories that have active items
   */
  getActiveCategories(): Promise<PortfolioCategory[]>;
}
