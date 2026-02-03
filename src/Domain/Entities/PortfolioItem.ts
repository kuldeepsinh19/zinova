/**
 * Portfolio Category Enum
 * Defines the available categories for portfolio items
 */
export enum PortfolioCategory {
  SKINCARE = "skincare",
  FOOD = "food",
  FASHION = "fashion",
  GENERAL = "general",
}

/**
 * Portfolio Item Entity
 *
 * Represents a showcase item in the portfolio gallery.
 * These are examples of AI-generated work to demonstrate capabilities.
 */
export class PortfolioItem {
  constructor(
    public readonly id: string,
    public readonly title: string,
    public readonly category: PortfolioCategory,
    public readonly imageUrl: string,
    public readonly videoUrl: string | null,
    public readonly description: string | null,
    public readonly order: number,
    public readonly isActive: boolean,
    public readonly createdAt: Date,
  ) {}

  /**
   * Check if this portfolio item should be displayed
   */
  isVisible(): boolean {
    return this.isActive;
  }

  /**
   * Get category display name
   */
  getCategoryDisplayName(): string {
    const displayNames: Record<PortfolioCategory, string> = {
      [PortfolioCategory.SKINCARE]: "Skincare",
      [PortfolioCategory.FOOD]: "Food & Beverage",
      [PortfolioCategory.FASHION]: "Fashion",
      [PortfolioCategory.GENERAL]: "General",
    };
    return displayNames[this.category];
  }

  /**
   * Check if item has video content
   */
  hasVideo(): boolean {
    return this.videoUrl !== null && this.videoUrl.length > 0;
  }
}
