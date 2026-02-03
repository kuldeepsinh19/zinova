import { User as PrismaUser } from "@prisma/client";
import { User } from "@domain/Entities/User";

/**
 * User Mapper
 *
 * Converts between Prisma database models and Domain entities.
 * This keeps database concerns out of the domain layer.
 */
export class UserMapper {
  /**
   * Convert Prisma model to Domain entity
   */
  static toDomain(prismaUser: PrismaUser): User {
    return new User(
      prismaUser.id,
      prismaUser.email,
      prismaUser.name,
      prismaUser.passwordHash,
      prismaUser.creditBalance,
      prismaUser.createdAt,
      prismaUser.updatedAt,
    );
  }

  /**
   * Convert Domain entity to Prisma model data
   */
  static toPrisma(user: User): Omit<PrismaUser, "createdAt" | "updatedAt"> {
    return {
      id: user.id,
      email: user.email,
      name: user.name,
      passwordHash: user.passwordHash,
      creditBalance: user.creditBalance,
    };
  }
}
