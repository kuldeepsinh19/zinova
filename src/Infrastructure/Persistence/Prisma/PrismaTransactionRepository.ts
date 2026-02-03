import { PrismaClient } from "@prisma/client";
import { ITransactionRepository } from "../../../Domain/Repositories/ITransactionRepository";
import { Transaction } from "../../../Domain/Entities/Transaction";

export class PrismaTransactionRepository implements ITransactionRepository {
  private prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }

  async create(transaction: Transaction): Promise<Transaction> {
    const data = await this.prisma.transaction.create({
      data: {
        userId: transaction.userId,
        type: transaction.type,
        amount: transaction.amount,
        paymentAmount: transaction.paymentAmount,
        razorpayOrderId: transaction.razorpayOrderId,
        status: transaction.status,
        metadata: transaction.metadata || {},
      },
    });
    return this.mapToEntity(data);
  }

  async findById(id: string): Promise<Transaction | null> {
    const data = await this.prisma.transaction.findUnique({
      where: { id },
    });
    return data ? this.mapToEntity(data) : null;
  }

  async update(transaction: Transaction): Promise<Transaction> {
    if (!transaction.id)
      throw new Error("Transaction ID is required for update");

    const data = await this.prisma.transaction.update({
      where: { id: transaction.id },
      data: {
        status: transaction.status,
        razorpayPaymentId: transaction.razorpayPaymentId,
        metadata: transaction.metadata || {},
      },
    });
    return this.mapToEntity(data);
  }

  async findByOrderId(orderId: string): Promise<Transaction | null> {
    const data = await this.prisma.transaction.findFirst({
      where: { razorpayOrderId: orderId },
    });
    return data ? this.mapToEntity(data) : null;
  }

  async findByUserId(userId: string): Promise<Transaction[]> {
    const data = await this.prisma.transaction.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
    });
    return data.map((item) => this.mapToEntity(item));
  }

  private mapToEntity(data: any): Transaction {
    // Constructor Config:
    // id, userId, type, amount, paymentAmount, razorpayOrderId, razorpayPaymentId, status, metadata, createdAt
    return new Transaction(
      data.id,
      data.userId,
      data.type as any, // Cast to TransactionType
      data.amount,
      Number(data.paymentAmount) || 0,
      data.razorpayOrderId,
      data.razorpayPaymentId,
      data.status as any, // Cast to TransactionStatus
      data.metadata,
      data.createdAt,
    );
  }
}
