import { NextResponse } from "next/server";
import { SupabaseAuthService } from "@infrastructure/Services/SupabaseAuthService";

/**
 * POST /api/auth/google
 *
 * Initiates Google OAuth flow.
 * Returns redirect URL to Google sign-in page.
 */
export async function POST(request: Request) {
  try {
    const authService = new SupabaseAuthService();
    const result = await authService.signInWithGoogle();

    if (!result.success) {
      return NextResponse.json(
        {
          success: false,
          error: result.error || "Failed to initiate Google sign-in",
        },
        { status: 500 },
      );
    }

    // Get the OAuth URL from Supabase
    const { data } = await authService.getClient().auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${process.env.NEXT_PUBLIC_APP_URL}/auth/callback`,
      },
    });

    return NextResponse.json(
      {
        success: true,
        url: data.url,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("Google OAuth error:", error);

    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Google sign-in failed",
      },
      { status: 500 },
    );
  }
}
