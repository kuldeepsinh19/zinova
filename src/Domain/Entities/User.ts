/**
 * User Domain Entity
 *
 * This represents a User in the business domain.
 * It is COMPLETELY independent of the database.
 */
export class User {
  constructor(
    public readonly id: string,
    public email: string,
    public name: string | null,
    public passwordHash: string,
    public creditBalance: number,
    public createdAt: Date,
    public updatedAt: Date,
  ) {}

  /**
   * Check if user has enough credits
   */
  hasEnoughCredits(amount: number): boolean {
    return this.creditBalance >= amount;
  }

  /**
   * Deduct credits from user's balance
   */
  deductCredits(amount: number): void {
    if (!this.hasEnoughCredits(amount)) {
      throw new Error(
        `Insufficient credits. Required: ${amount}, Available: ${this.creditBalance}`,
      );
    }
    this.creditBalance -= amount;
  }

  /**
   * Add credits to user's balance
   */
  addCredits(amount: number): void {
    if (amount <= 0) {
      throw new Error("Credit amount must be positive");
    }
    this.creditBalance += amount;
  }

  /**
   * Check if this is a new user (eligible for free credits)
   */
  isNewUser(): boolean {
    const daysSinceCreation =
      (Date.now() - this.createdAt.getTime()) / (1000 * 60 * 60 * 24);
    return daysSinceCreation < 1; // New if created within last 24 hours
  }
}
