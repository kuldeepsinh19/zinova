import { IUserRepository } from "@domain/Interfaces/IUserRepository";
import { UserProfileDTO } from "@application/DTOs/AuthDTOs";

/**
 * Get User Profile Use Case
 *
 * Fetches user profile information by user ID.
 * Database-agnostic - works with any IUserRepository implementation.
 */
export class GetUserProfileUseCase {
  constructor(private userRepository: IUserRepository) {}

  async execute(userId: string): Promise<UserProfileDTO> {
    // 1. Fetch user from repository
    const user = await this.userRepository.findById(userId);

    if (!user) {
      throw new Error("User not found");
    }

    // 2. Map to DTO
    return {
      id: user.id,
      email: user.email,
      name: user.name,
      creditBalance: user.creditBalance,
      createdAt: user.createdAt,
    };
  }
}
