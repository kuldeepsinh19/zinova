import { User } from "../Entities/User";

/**
 * User Repository Interface
 *
 * This interface defines the contract for user data access.
 * It is DATABASE-AGNOSTIC - implementations can use Supabase, MongoDB, MySQL, etc.
 *
 * To swap databases: Create a new class that implements this interface.
 */
export interface IUserRepository {
  /**
   * Find user by ID
   */
  findById(id: string): Promise<User | null>;

  /**
   * Find user by email
   */
  findByEmail(email: string): Promise<User | null>;

  /**
   * Create a new user
   */
  create(user: User): Promise<User>;

  /**
   * Update existing user
   */
  update(user: User): Promise<User>;

  /**
   * Update user's credit balance
   */
  updateCreditBalance(userId: string, newBalance: number): Promise<void>;

  /**
   * Find multiple users with optional filters
   */
  findMany(filters?: UserFilters): Promise<User[]>;
}

export interface UserFilters {
  email?: string;
  createdAfter?: Date;
  limit?: number;
}
