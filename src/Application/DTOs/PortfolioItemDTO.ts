import { z } from "zod";
import { PortfolioCategory } from "@domain/Entities/PortfolioItem";

/**
 * Portfolio Item DTO Schema
 */
export const PortfolioItemDTOSchema = z.object({
  id: z.string(),
  title: z.string(),
  category: z.nativeEnum(PortfolioCategory),
  imageUrl: z.string().url(),
  videoUrl: z.string().url().nullable(),
  description: z.string().nullable(),
  order: z.number(),
  isActive: z.boolean(),
  createdAt: z.date(),
});

export type PortfolioItemDTO = z.infer<typeof PortfolioItemDTOSchema>;

/**
 * Portfolio Item Response DTO (for API responses)
 */
export interface PortfolioItemResponseDTO {
  id: string;
  title: string;
  category: string;
  categoryDisplayName: string;
  imageUrl: string;
  videoUrl: string | null;
  description: string | null;
  hasVideo: boolean;
}
