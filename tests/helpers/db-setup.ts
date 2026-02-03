/**
 * Database setup and teardown utilities for integration tests
 */

import { PrismaClient } from ".prisma/client";

let prisma: PrismaClient;

/**
 * Get or create Prisma client for tests
 */
export function getPrismaClient(): PrismaClient {
  if (!prisma) {
    prisma = new PrismaClient({
      datasources: {
        db: {
          url:
            process.env.DATABASE_URL ||
            "postgresql://postgres:postgres@localhost:5432/ceratlyin_test",
        },
      },
    });
  }
  return prisma;
}

/**
 * Clean up database before/after tests
 * Deletes all data from all tables
 */
export async function cleanupDatabase() {
  const prisma = getPrismaClient();

  // Delete in correct order to respect foreign key constraints
  await prisma.imageGeneration.deleteMany();
  await prisma.businessInquiry.deleteMany();
  await prisma.transaction.deleteMany();
  await prisma.user.deleteMany();
  await prisma.portfolioItem.deleteMany();
}

/**
 * Seed database with test data
 */
export async function seedTestDatabase() {
  const prisma = getPrismaClient();

  // Create a test user
  const testUser = await prisma.user.create({
    data: {
      email: "test@example.com",
      name: "Test User",
      passwordHash: "hashed_password",
      creditBalance: 20,
    },
  });

  return { testUser };
}

/**
 * Disconnect Prisma client
 */
export async function disconnectDatabase() {
  if (prisma) {
    await prisma.$disconnect();
  }
}

/**
 * Helper to run tests in a transaction that gets rolled back
 * This ensures tests don't affect each other
 */
export async function runInTransaction<T>(
  callback: (prisma: PrismaClient) => Promise<T>,
): Promise<T> {
  const prisma = getPrismaClient();

  return await prisma.$transaction(async (tx: PrismaClient) => {
    return await callback(tx);
  });
}
