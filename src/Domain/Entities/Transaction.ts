/**
 * Transaction Domain Entity
 *
 * Represents a credit transaction (purchase, deduction, refund)
 */
export class Transaction {
  constructor(
    public readonly id: string,
    public readonly userId: string,
    public readonly type: TransactionType,
    public readonly amount: number,
    public readonly paymentAmount: number | null,
    public readonly razorpayOrderId: string | null,
    public readonly razorpayPaymentId: string | null,
    public status: TransactionStatus,
    public readonly metadata: Record<string, any> | null,
    public readonly createdAt: Date,
  ) {}

  /**
   * Mark transaction as completed
   */
  markAsCompleted(): void {
    this.status = "COMPLETED";
  }

  /**
   * Mark transaction as failed
   */
  markAsFailed(): void {
    this.status = "FAILED";
  }

  /**
   * Check if transaction is completed
   */
  isCompleted(): boolean {
    return this.status === "COMPLETED";
  }

  /**
   * Check if transaction is a credit purchase
   */
  isCreditPurchase(): boolean {
    return this.type === "CREDIT_PURCHASE";
  }
}

export type TransactionType =
  | "CREDIT_PURCHASE"
  | "CREDIT_DEDUCTION"
  | "CREDIT_REFUND";
export type TransactionStatus = "PENDING" | "COMPLETED" | "FAILED";
