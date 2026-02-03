import {
  PortfolioItem,
  PortfolioCategory,
} from "@domain/Entities/PortfolioItem";
import { PortfolioItem as PrismaPortfolioItem } from "@prisma/client";

/**
 * Portfolio Item Mapper
 *
 * Maps between Prisma database models and Domain entities
 */
export class PortfolioItemMapper {
  /**
   * Convert Prisma model to Domain entity
   */
  static toDomain(prismaItem: PrismaPortfolioItem): PortfolioItem {
    return new PortfolioItem(
      prismaItem.id,
      prismaItem.title,
      prismaItem.category as PortfolioCategory,
      prismaItem.imageUrl,
      prismaItem.videoUrl,
      prismaItem.description,
      prismaItem.order,
      prismaItem.isActive,
      prismaItem.createdAt,
    );
  }

  /**
   * Convert Domain entity to Prisma model data
   */
  static toPrisma(
    domainItem: PortfolioItem,
  ): Omit<PrismaPortfolioItem, "createdAt"> {
    return {
      id: domainItem.id,
      title: domainItem.title,
      category: domainItem.category,
      imageUrl: domainItem.imageUrl,
      videoUrl: domainItem.videoUrl,
      description: domainItem.description,
      order: domainItem.order,
      isActive: domainItem.isActive,
    };
  }

  /**
   * Convert array of Prisma models to Domain entities
   */
  static toDomainList(prismaItems: PrismaPortfolioItem[]): PortfolioItem[] {
    return prismaItems.map((item) => this.toDomain(item));
  }
}
