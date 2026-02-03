import { Transaction } from "../Entities/Transaction";

/**
 * Credit Repository Interface
 *
 * This interface defines the contract for credit/transaction data access.
 * DATABASE-AGNOSTIC - can be implemented with any database.
 */
export interface ICreditRepository {
  /**
   * Add credits to user's balance
   */
  addCredits(
    userId: string,
    amount: number,
    transactionId: string,
  ): Promise<void>;

  /**
   * Deduct credits from user's balance
   */
  deductCredits(userId: string, amount: number, reason: string): Promise<void>;

  /**
   * Get user's current credit balance
   */
  getBalance(userId: string): Promise<number>;

  /**
   * Get user's transaction history
   */
  getTransactionHistory(userId: string, limit?: number): Promise<Transaction[]>;

  /**
   * Create a new transaction record
   */
  createTransaction(transaction: Transaction): Promise<Transaction>;

  /**
   * Update transaction status
   */
  updateTransactionStatus(transactionId: string, status: string): Promise<void>;
}
