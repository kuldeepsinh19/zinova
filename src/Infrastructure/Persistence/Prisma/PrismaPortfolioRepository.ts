import { IPortfolioRepository } from "@domain/Repositories/IPortfolioRepository";
import {
  PortfolioItem,
  PortfolioCategory,
} from "@domain/Entities/PortfolioItem";
import { PrismaClient } from "@prisma/client";
import { PortfolioItemMapper } from "../Mappers/PortfolioItemMapper";

/**
 * Prisma Portfolio Repository
 *
 * Implements IPortfolioRepository using Prisma ORM
 */
export class PrismaPortfolioRepository implements IPortfolioRepository {
  constructor(private prisma: PrismaClient) {}

  /**
   * Find all active portfolio items, ordered by the 'order' field
   */
  async findAll(): Promise<PortfolioItem[]> {
    const items = await this.prisma.portfolioItem.findMany({
      where: {
        isActive: true,
      },
      orderBy: {
        order: "asc",
      },
    });

    return PortfolioItemMapper.toDomainList(items);
  }

  /**
   * Find all active portfolio items in a specific category
   */
  async findByCategory(category: PortfolioCategory): Promise<PortfolioItem[]> {
    const items = await this.prisma.portfolioItem.findMany({
      where: {
        isActive: true,
        category: category,
      },
      orderBy: {
        order: "asc",
      },
    });

    return PortfolioItemMapper.toDomainList(items);
  }

  /**
   * Find a single portfolio item by ID
   */
  async findById(id: string): Promise<PortfolioItem | null> {
    const item = await this.prisma.portfolioItem.findUnique({
      where: { id },
    });

    if (!item) {
      return null;
    }

    return PortfolioItemMapper.toDomain(item);
  }

  /**
   * Get all available categories that have active items
   */
  async getActiveCategories(): Promise<PortfolioCategory[]> {
    const items = await this.prisma.portfolioItem.findMany({
      where: {
        isActive: true,
      },
      select: {
        category: true,
      },
      distinct: ["category"],
    });

    return items.map((item) => item.category as PortfolioCategory);
  }
}
