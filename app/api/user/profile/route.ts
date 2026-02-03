import { NextResponse } from "next/server";
import { GetUserProfileUseCase } from "@application/UseCases/User/GetUserProfile";
import { RepositoryFactory } from "@infrastructure/Persistence/RepositoryFactory";
import { SupabaseAuthService } from "@infrastructure/Services/SupabaseAuthService";

/**
 * GET /api/user/profile
 *
 * Get current user's profile information.
 * Requires authentication.
 */
export async function GET(request: Request) {
  try {
    // 1. Get current session
    const authService = new SupabaseAuthService();
    const session = await authService.getSession();

    if (!session) {
      return NextResponse.json(
        {
          success: false,
          error: "Not authenticated",
        },
        { status: 401 },
      );
    }

    // 2. Get user profile
    const userRepository = RepositoryFactory.getUserRepository();
    const useCase = new GetUserProfileUseCase(userRepository);
    const profile = await useCase.execute(session.userId);

    // 3. Return profile
    return NextResponse.json(
      {
        success: true,
        data: profile,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("Get profile error:", error);

    if (error instanceof Error && error.message.includes("not found")) {
      return NextResponse.json(
        {
          success: false,
          error: "User not found",
        },
        { status: 404 },
      );
    }

    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Failed to get profile",
      },
      { status: 500 },
    );
  }
}
