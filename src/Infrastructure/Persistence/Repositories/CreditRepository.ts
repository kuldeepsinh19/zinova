import { PrismaClient } from "@prisma/client";
import { ICreditRepository } from "@domain/Interfaces/ICreditRepository";
import { Transaction } from "@domain/Entities/Transaction";
import { TransactionMapper } from "../Mappers/TransactionMapper";

/**
 * Prisma/Supabase Implementation of ICreditRepository
 *
 * Handles credit operations with atomic transactions.
 * Can be swapped for MongoDB, MySQL, etc.
 */
export class PrismaCreditRepository implements ICreditRepository {
  constructor(private prisma: PrismaClient) {}

  async addCredits(
    userId: string,
    amount: number,
    transactionId: string,
  ): Promise<void> {
    // Atomic transaction: update balance + create transaction record
    await this.prisma.$transaction([
      this.prisma.user.update({
        where: { id: userId },
        data: { creditBalance: { increment: amount } },
      }),
      this.prisma.transaction.update({
        where: { id: transactionId },
        data: { status: "COMPLETED" },
      }),
    ]);
  }

  async deductCredits(
    userId: string,
    amount: number,
    reason: string,
  ): Promise<void> {
    // Atomic transaction: check balance + deduct + create record
    await this.prisma.$transaction(async (tx) => {
      const user = await tx.user.findUnique({ where: { id: userId } });

      if (!user || user.creditBalance < amount) {
        throw new Error("Insufficient credits");
      }

      await tx.user.update({
        where: { id: userId },
        data: { creditBalance: { decrement: amount } },
      });

      await tx.transaction.create({
        data: {
          userId,
          type: "CREDIT_DEDUCTION",
          amount,
          paymentAmount: null,
          razorpayOrderId: null,
          razorpayPaymentId: null,
          status: "COMPLETED",
          metadata: { reason },
        },
      });
    });
  }

  async getBalance(userId: string): Promise<number> {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: { creditBalance: true },
    });

    return user?.creditBalance ?? 0;
  }

  async getTransactionHistory(
    userId: string,
    limit: number = 50,
  ): Promise<Transaction[]> {
    const prismaTransactions = await this.prisma.transaction.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
      take: limit,
    });

    return prismaTransactions.map(TransactionMapper.toDomain);
  }

  async createTransaction(transaction: Transaction): Promise<Transaction> {
    const prismaTransaction = await this.prisma.transaction.create({
      data: {
        ...TransactionMapper.toPrisma(transaction),
        metadata: transaction.metadata as any, // Cast to fix Prisma JSON type
      },
    });

    return TransactionMapper.toDomain(prismaTransaction);
  }

  async updateTransactionStatus(
    transactionId: string,
    status: string,
  ): Promise<void> {
    await this.prisma.transaction.update({
      where: { id: transactionId },
      data: { status },
    });
  }
}
