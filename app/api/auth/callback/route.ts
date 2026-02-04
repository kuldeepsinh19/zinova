import { NextResponse, type NextRequest } from "next/server";
import { cookies } from "next/headers";
import { createServerClient } from "@supabase/ssr";
import { RepositoryFactory } from "@infrastructure/Persistence/RepositoryFactory";
import { User } from "@domain/Entities/User";

export const dynamic = "force-dynamic";

/**
 * GET /api/auth/callback
 *
 * Handles OAuth callback from Supabase
 * Exchanges code for session and creates user in database if needed
 */
export async function GET(request: NextRequest) {
  try {
    console.log("🔵 OAuth callback started");
    console.log("🔵 Full URL:", request.url);
    const requestUrl = new URL(request.url);
    const code = requestUrl.searchParams.get("code");

    console.log("🔵 Code received:", code ? "YES" : "NO");

    if (!code) {
      console.log("❌ No code in URL");
      return NextResponse.redirect(
        new URL("/login?error=no_code", requestUrl.origin),
      );
    }

    const cookieStore = cookies();

    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          get(name: string) {
            return cookieStore.get(name)?.value;
          },
          set(name: string, value: string, options: any) {
            cookieStore.set({ name, value, ...options });
          },
          remove(name: string, options: any) {
            cookieStore.set({ name, value: "", ...options });
          },
        },
      },
    );

    console.log("🔵 Exchanging code for session...");
    // Exchange code for session
    const {
      data: { session },
      error: sessionError,
    } = await supabase.auth.exchangeCodeForSession(code);

    if (sessionError || !session) {
      console.error("❌ Session exchange error:", sessionError);
      return NextResponse.redirect(
        new URL("/login?error=session_failed", requestUrl.origin),
      );
    }

    console.log("✅ Session created for user:", session.user.email);

    const user = session.user;
    const userRepository = RepositoryFactory.getUserRepository();

    // Check if user exists in database
    console.log("🔵 Checking if user exists in database...");
    let dbUser = await userRepository.findById(user.id);

    if (!dbUser) {
      console.log("🔵 User not found, creating new user...");
      // Create new user with 20 free credits
      const newUser = new User(
        user.id,
        user.email!,
        user.user_metadata?.full_name ||
          user.user_metadata?.name ||
          user.email!.split("@")[0],
        "", // No password hash for OAuth users
        20, // 20 free credits
        new Date(),
        new Date(),
      );

      dbUser = await userRepository.create(newUser);
      console.log("✅ User created:", dbUser.email);
    } else {
      console.log("✅ User already exists:", dbUser.email);
    }

    // Redirect to dashboard
    console.log("🔵 Redirecting to dashboard...");
    return NextResponse.redirect(new URL("/dashboard", requestUrl.origin));
  } catch (error) {
    console.error("❌ OAuth callback error:", error);
    return NextResponse.redirect(new URL("/login?error=unknown", request.url));
  }
}
