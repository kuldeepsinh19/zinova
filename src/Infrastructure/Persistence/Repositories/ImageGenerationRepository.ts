import { PrismaClient } from "@prisma/client";
import { IImageGenerationRepository } from "@domain/Interfaces/IImageGenerationRepository";
import { ImageGeneration } from "@domain/Entities/ImageGeneration";
import { ImageGenerationMapper } from "../Mappers/ImageGenerationMapper";

/**
 * Prisma/Supabase Implementation of IImageGenerationRepository
 */
export class PrismaImageGenerationRepository implements IImageGenerationRepository {
  constructor(private prisma: PrismaClient) {}

  async create(generation: ImageGeneration): Promise<ImageGeneration> {
    const prismaGeneration = await this.prisma.imageGeneration.create({
      data: {
        ...ImageGenerationMapper.toPrisma(generation),
        metadata: generation.metadata as any, // Cast to fix Prisma JSON type
      },
    });

    return ImageGenerationMapper.toDomain(prismaGeneration);
  }

  async findById(id: string): Promise<ImageGeneration | null> {
    const prismaGeneration = await this.prisma.imageGeneration.findUnique({
      where: { id },
    });

    return prismaGeneration
      ? ImageGenerationMapper.toDomain(prismaGeneration)
      : null;
  }

  async updateStatus(
    id: string,
    status: string,
    outputUrl?: string,
    errorMessage?: string,
  ): Promise<void> {
    await this.prisma.imageGeneration.update({
      where: { id },
      data: {
        status,
        outputImageUrl: outputUrl,
        errorMessage,
      },
    });
  }

  async getUserHistory(
    userId: string,
    limit: number = 50,
  ): Promise<ImageGeneration[]> {
    const prismaGenerations = await this.prisma.imageGeneration.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
      take: limit,
    });

    return prismaGenerations.map(ImageGenerationMapper.toDomain);
  }

  async getPendingGenerations(): Promise<ImageGeneration[]> {
    const prismaGenerations = await this.prisma.imageGeneration.findMany({
      where: { status: "PENDING" },
      orderBy: { createdAt: "asc" },
    });

    return prismaGenerations.map(ImageGenerationMapper.toDomain);
  }
}
