import { PrismaClient } from "@prisma/client";
import { IUserRepository } from "@domain/Interfaces/IUserRepository";
import { ICreditRepository } from "@domain/Interfaces/ICreditRepository";
import { IImageGenerationRepository } from "@domain/Interfaces/IImageGenerationRepository";
import { IPortfolioRepository } from "@domain/Repositories/IPortfolioRepository";

// Import implementations (Supabase/Prisma for now)
import { PrismaUserRepository } from "./Repositories/UserRepository";
import { PrismaCreditRepository } from "./Repositories/CreditRepository";
import { PrismaImageGenerationRepository } from "./Repositories/ImageGenerationRepository";
import { PrismaPortfolioRepository } from "./Prisma/PrismaPortfolioRepository";
import { PrismaTransactionRepository } from "./Prisma/PrismaTransactionRepository";
import { ITransactionRepository } from "../../Domain/Repositories/ITransactionRepository";

/**
 * Singleton Prisma Client
 */
let prisma: PrismaClient | null = null;

export function getPrismaClient(): PrismaClient {
  if (!prisma) {
    prisma = new PrismaClient({
      log:
        process.env.NODE_ENV === "development"
          ? ["query", "error", "warn"]
          : ["error"],
    });
  }
  return prisma;
}

/**
 * Repository Factory
 *
 * This is the ONLY place where you specify which database implementation to use.
 * To swap databases:
 * 1. Create new repository implementations (e.g., MongoUserRepository)
 * 2. Change the return statements below
 * 3. Your use cases don't change at all!
 *
 * Example:
 * ```typescript
 * static getUserRepository(): IUserRepository {
 *   return new MongoUserRepository(mongoClient);  // Swap here
 * }
 * ```
 */
export class RepositoryFactory {
  private static prisma = getPrismaClient();

  /**
   * Get User Repository
   *
   * Current: Prisma/Supabase implementation
   * To swap: Change to `new MongoUserRepository()` or `new MySQLUserRepository()`
   */
  static getUserRepository(): IUserRepository {
    return new PrismaUserRepository(this.prisma);
  }

  /**
   * Get Credit Repository
   *
   * Current: Prisma/Supabase implementation
   * To swap: Change to any other database implementation
   */
  static getCreditRepository(): ICreditRepository {
    return new PrismaCreditRepository(this.prisma);
  }

  /**
   * Get Image Generation Repository
   *
   * Current: Prisma/Supabase implementation
   * To swap: Change to any other database implementation
   */
  static getImageGenerationRepository(): IImageGenerationRepository {
    return new PrismaImageGenerationRepository(this.prisma);
  }

  /**
   * Get Portfolio Repository
   *
   * Current: Prisma/Supabase implementation
   * To swap: Change to any other database implementation
   */
  static getPortfolioRepository(): IPortfolioRepository {
    return new PrismaPortfolioRepository(this.prisma);
  }

  /**
   * Get Transaction Repository
   *
   * Current: Prisma implementation
   */
  static getTransactionRepository(): ITransactionRepository {
    return new PrismaTransactionRepository(this.prisma);
  }

  /**
   * Disconnect from database (cleanup)
   */
  static async disconnect(): Promise<void> {
    if (prisma) {
      await prisma.$disconnect();
      prisma = null;
    }
  }
}
