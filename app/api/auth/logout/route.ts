import { NextResponse } from "next/server";
import { ServerSupabaseAuthService } from "@infrastructure/Services/ServerSupabaseAuthService";

/**
 * POST /api/auth/logout
 *
 * Sign out the current user and clear session.
 */
export async function POST(request: Request) {
  try {
    const authService = new ServerSupabaseAuthService();
    await authService.signOut();

    return NextResponse.json(
      {
        success: true,
        message: "Logout successful",
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("Logout error:", error);

    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Logout failed",
      },
      { status: 500 },
    );
  }
}
