import { IUserRepository } from "@domain/Interfaces/IUserRepository";
import { User } from "@domain/Entities/User";
import { IAuthService } from "./LoginUser";

/**
 * Register User Use Case
 *
 * This use case is COMPLETELY database-agnostic.
 * It works with ANY implementation of IUserRepository and IAuthService.
 *
 * Swap Supabase for MongoDB? This code doesn't change!
 */
export class RegisterUserUseCase {
  constructor(
    private userRepository: IUserRepository,
    private authService: IAuthService,
  ) {}

  async execute(
    email: string,
    name: string,
    password: string,
  ): Promise<RegisterUserResult> {
    // 1. Check if user already exists
    const existingUser = await this.userRepository.findByEmail(email);
    if (existingUser) {
      throw new Error("User with this email already exists");
    }

    // 2. Create auth user in Supabase
    const authResult = await this.authService.signUp(email, password);

    if (!authResult.success) {
      throw new Error(authResult.error || "Failed to create auth user");
    }

    // 3. Create user entity with 20 free credits
    const user = new User(
      authResult.session!.userId, // Use Supabase user ID
      email,
      name,
      "", // Password hash not needed (handled by Supabase)
      20, // Free credits for new users
      new Date(),
      new Date(),
    );

    // 4. Save to database (via repository interface)
    const savedUser = await this.userRepository.create(user);

    return {
      userId: savedUser.id,
      email: savedUser.email,
      creditBalance: savedUser.creditBalance,
    };
  }
}

export interface RegisterUserResult {
  userId: string;
  email: string;
  creditBalance: number;
}
