import { IUserRepository } from "@domain/Interfaces/IUserRepository";
import { User } from "@domain/Entities/User";
import { LoginUserDTO, AuthResponseDTO } from "@application/DTOs/AuthDTOs";

/**
 * Login User Use Case
 *
 * Handles user authentication via Supabase Auth.
 * This use case is database-agnostic and works with any IUserRepository implementation.
 */
export class LoginUserUseCase {
  constructor(
    private userRepository: IUserRepository,
    private authService: IAuthService,
  ) {}

  async execute(dto: LoginUserDTO): Promise<AuthResponseDTO> {
    // 1. Validate credentials with Supabase Auth
    const authResult = await this.authService.signIn(dto.email, dto.password);

    if (!authResult.success) {
      throw new Error(authResult.error || "Invalid credentials");
    }

    // 2. Fetch user from database
    const user = await this.userRepository.findByEmail(dto.email);

    if (!user) {
      throw new Error("User not found in database");
    }

    // 3. Return user profile and session
    return {
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        creditBalance: user.creditBalance,
        createdAt: user.createdAt,
      },
      session: {
        accessToken: authResult.session!.accessToken,
        refreshToken: authResult.session!.refreshToken,
        expiresAt: authResult.session!.expiresAt,
      },
    };
  }
}

/**
 * Auth Service Interface
 * Abstraction for authentication providers (Supabase, Firebase, AWS Cognito, etc.)
 */
export interface IAuthService {
  signUp(email: string, password: string): Promise<AuthResult>;
  signIn(email: string, password: string): Promise<AuthResult>;
  signInWithGoogle(): Promise<AuthResult>;
  signInWithProvider(
    provider: "google" | "github" | "facebook",
  ): Promise<AuthResult>;
  signOut(): Promise<void>;
  getSession(): Promise<Session | null>;
  refreshSession(refreshToken: string): Promise<AuthResult>;
}

export interface AuthResult {
  success: boolean;
  session?: Session;
  error?: string;
}

export interface Session {
  accessToken: string;
  refreshToken: string;
  expiresAt: number;
  userId: string;
}
