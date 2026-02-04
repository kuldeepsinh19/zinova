import { NextResponse } from "next/server";
import { RegisterUserUseCase } from "@application/UseCases/User/RegisterUser";
import { RepositoryFactory } from "@infrastructure/Persistence/RepositoryFactory";
import { ServerSupabaseAuthService } from "@infrastructure/Services/ServerSupabaseAuthService";
import { RegisterUserDTOSchema } from "@application/DTOs/AuthDTOs";

/**
 * POST /api/auth/register
 *
 * Register a new user with email and password.
 * Gives 20 free credits to new users.
 */
export async function POST(request: Request) {
  try {
    // 1. Parse and validate request body
    const body = await request.json();
    const validatedData = RegisterUserDTOSchema.parse(body);

    // 2. Get dependencies
    const userRepository = RepositoryFactory.getUserRepository();
    const authService = new ServerSupabaseAuthService();

    // 3. Execute use case
    const useCase = new RegisterUserUseCase(userRepository, authService);
    const result = await useCase.execute(
      validatedData.email,
      validatedData.name,
      validatedData.password,
    );

    // 4. Return success response
    return NextResponse.json(
      {
        success: true,
        data: result,
        message: "Registration successful! You received 20 free credits.",
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("Registration error:", error);

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

    // Handle duplicate email
    if (error instanceof Error && error.message.includes("already exists")) {
      return NextResponse.json(
        {
          success: false,
          error: "Email already registered",
        },
        { status: 409 },
      );
    }

    // Handle other errors
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Registration failed",
      },
      { status: 500 },
    );
  }
}
