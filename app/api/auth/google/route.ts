import { NextResponse } from "next/server";
import { ServerSupabaseAuthService } from "@infrastructure/Services/ServerSupabaseAuthService";

/**
 * POST /api/auth/google
 *
 * Initiates Google OAuth flow.
 * Returns redirect URL to Google sign-in page.
 */
export async function POST(request: Request) {
  try {
    const authService = new ServerSupabaseAuthService();
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

    // Determine the base URL
    let baseUrl = process.env.NEXT_PUBLIC_APP_URL;

    if (!baseUrl) {
      if (process.env.VERCEL_URL) {
        baseUrl = `https://${process.env.VERCEL_URL}`;
      } else {
        // Fallback for local development if variable is missing
        const host = request.headers.get("host") || "localhost:3000";
        const protocol = host.includes("localhost") ? "http" : "https";
        baseUrl = `${protocol}://${host}`;
      }
    }

    // Ensure no trailing slash
    baseUrl = baseUrl.replace(/\/$/, "");

    console.log(
      "🔵 Initiating Google OAuth with redirect to:",
      `${baseUrl}/auth/callback`,
    );

    // Get the OAuth URL from Supabase
    const { data } = await authService.getClient().auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${baseUrl}/auth/callback`,
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
