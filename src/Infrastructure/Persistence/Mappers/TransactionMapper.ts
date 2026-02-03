import { Transaction as PrismaTransaction } from "@prisma/client";
import {
  Transaction,
  TransactionType,
  TransactionStatus,
} from "@domain/Entities/Transaction";
import { Decimal } from "@prisma/client/runtime/library";

/**
 * Transaction Mapper
 */
export class TransactionMapper {
  static toDomain(prismaTransaction: PrismaTransaction): Transaction {
    return new Transaction(
      prismaTransaction.id,
      prismaTransaction.userId,
      prismaTransaction.type as TransactionType,
      prismaTransaction.amount,
      prismaTransaction.paymentAmount
        ? Number(prismaTransaction.paymentAmount)
        : null,
      prismaTransaction.razorpayOrderId,
      prismaTransaction.razorpayPaymentId,
      prismaTransaction.status as TransactionStatus,
      prismaTransaction.metadata as Record<string, any> | null,
      prismaTransaction.createdAt,
    );
  }

  static toPrisma(
    transaction: Transaction,
  ): Omit<PrismaTransaction, "createdAt"> {
    return {
      id: transaction.id,
      userId: transaction.userId,
      type: transaction.type,
      amount: transaction.amount,
      paymentAmount: transaction.paymentAmount
        ? new Decimal(transaction.paymentAmount)
        : null,
      razorpayOrderId: transaction.razorpayOrderId,
      razorpayPaymentId: transaction.razorpayPaymentId,
      status: transaction.status,
      metadata: transaction.metadata,
    };
  }
}
