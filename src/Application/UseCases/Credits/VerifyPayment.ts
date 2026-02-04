import { ITransactionRepository } from "../../../Domain/Repositories/ITransactionRepository";
import { IUserRepository } from "../../../Domain/Interfaces/IUserRepository";
import { IPaymentGateway } from "../../../Domain/Interfaces/IPaymentGateway";
import { VerifyPaymentDTO } from "../../DTOs/VerifyPaymentDTO";
import { Transaction } from "../../../Domain/Entities/Transaction";

export class VerifyPayment {
  constructor(
    private transactionRepo: ITransactionRepository,
    private userRepo: IUserRepository,
    private paymentGateway: IPaymentGateway,
  ) {}

  async execute(
    dto: VerifyPaymentDTO,
  ): Promise<{ success: boolean; newBalance: number }> {
    // 1. Verify transaction exists
    const transaction = await this.transactionRepo.findByOrderId(dto.orderId);
    if (!transaction) {
      throw new Error("Transaction not found");
    }

    if (transaction.status === "COMPLETED") {
      // Idempotency: already processed
      const user = await this.userRepo.findById(transaction.userId);
      return { success: true, newBalance: user ? user.creditBalance : 0 };
    }

    // 2. Verify signature with payment gateway
    const isValid = this.paymentGateway.verifyPayment(
      dto.orderId,
      dto.paymentId,
      dto.signature,
    );

    if (!isValid) {
      // Update transaction status to failed
      transaction.markAsFailed();
      await this.transactionRepo.update(transaction);
      throw new Error("Invalid payment signature");
    }

    // 3. Update transaction status
    transaction.markAsCompleted();

    // Create updated transaction object for persistence
    const updatedTransaction = new Transaction(
      transaction.id,
      transaction.userId,
      transaction.type,
      transaction.amount,
      transaction.paymentAmount,
      transaction.razorpayOrderId,
      dto.paymentId, // Set the payment ID
      "COMPLETED", // Set the status
      transaction.metadata,
      transaction.createdAt,
    );

    await this.transactionRepo.update(updatedTransaction);

    // 4. Add credits to user
    const user = await this.userRepo.findById(transaction.userId);
    if (!user) {
      throw new Error("User not found for transaction");
    }

    user.addCredits(transaction.amount);
    await this.userRepo.update(user);

    return {
      success: true,
      newBalance: user.creditBalance,
    };
  }
}
