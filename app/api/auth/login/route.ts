import { NextResponse } from "next/server";
import { LoginUserUseCase } from "@application/UseCases/User/LoginUser";
import { RepositoryFactory } from "@infrastructure/Persistence/RepositoryFactory";
import { SupabaseAuthService } from "@infrastructure/Services/SupabaseAuthService";
import { LoginUserDTOSchema } from "@application/DTOs/AuthDTOs";

/**
 * POST /api/auth/login
 *
 * Authenticate user with email and password.
 * Returns user profile and session tokens.
 */
export async function POST(request: Request) {
  try {
    // 1. Parse and validate request body
    const body = await request.json();
    const validatedData = LoginUserDTOSchema.parse(body);

    // 2. Get dependencies
    const userRepository = RepositoryFactory.getUserRepository();
    const authService = new SupabaseAuthService();

    // 3. Execute use case
    const useCase = new LoginUserUseCase(userRepository, authService);
    const result = await useCase.execute(validatedData);

    // 4. Return success response
    return NextResponse.json(
      {
        success: true,
        data: result,
        message: "Login successful",
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("Login error:", error);

    // Handle validation errors
    if (error instanceof Error && error.name === "ZodError") {
      return NextResponse.json(
        {
          success: false,
          error: "Validation failed",
          details: error.message,
        },
        { status: 400 },
      );
    }

    // Handle invalid credentials
    if (
      error instanceof Error &&
      (error.message.includes("Invalid credentials") ||
        error.message.includes("not found"))
    ) {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid email or password",
        },
        { status: 401 },
      );
    }

    // Handle other errors
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Login failed",
      },
      { status: 500 },
    );
  }
}
