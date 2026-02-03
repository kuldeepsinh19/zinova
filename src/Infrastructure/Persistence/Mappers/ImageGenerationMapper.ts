import { ImageGeneration as PrismaImageGeneration } from "@prisma/client";
import {
  ImageGeneration,
  ImageGenerationStatus,
} from "@domain/Entities/ImageGeneration";

/**
 * ImageGeneration Mapper
 */
export class ImageGenerationMapper {
  static toDomain(prismaGeneration: PrismaImageGeneration): ImageGeneration {
    return new ImageGeneration(
      prismaGeneration.id,
      prismaGeneration.userId,
      prismaGeneration.inputImageUrl,
      prismaGeneration.outputImageUrl,
      prismaGeneration.style,
      prismaGeneration.creditsUsed,
      prismaGeneration.status as ImageGenerationStatus,
      prismaGeneration.aiProvider,
      prismaGeneration.errorMessage,
      prismaGeneration.metadata as Record<string, any> | null,
      prismaGeneration.createdAt,
    );
  }

  static toPrisma(
    generation: ImageGeneration,
  ): Omit<PrismaImageGeneration, "createdAt"> {
    return {
      id: generation.id,
      userId: generation.userId,
      inputImageUrl: generation.inputImageUrl,
      outputImageUrl: generation.outputImageUrl,
      style: generation.style,
      creditsUsed: generation.creditsUsed,
      status: generation.status,
      aiProvider: generation.aiProvider,
      errorMessage: generation.errorMessage,
      metadata: generation.metadata,
    };
  }
}
