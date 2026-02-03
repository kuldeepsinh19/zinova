import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { createServerClient } from "@supabase/ssr";
import { RepositoryFactory } from "@infrastructure/Persistence/RepositoryFactory";
import { User } from "@domain/Entities/User";

/**
 * POST /api/auth/set-session
 *
 * Sets Supabase session from OAuth tokens and creates user in database
 * This endpoint properly handles cookie setting for Next.js App Router
 */
export async function POST(request: NextRequest) {
  try {
    const { access_token, refresh_token } = await request.json();

    if (!access_token) {
      return NextResponse.json(
        { error: "No access token provided" },
        { status: 400 },
      );
    }

    const cookieStore = cookies();

    // Create Supabase client with proper cookie handling
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          get(name: string) {
            return cookieStore.get(name)?.value;
          },
          set(name: string, value: string, options: any) {
            try {
              cookieStore.set({ name, value, ...options });
            } catch (error) {
              // Ignore cookie setting errors in route handlers
              console.log("Cookie set (will be handled in response):", name);
            }
          },
          remove(name: string, options: any) {
            try {
              cookieStore.set({ name, value: "", ...options });
            } catch (error) {
              console.log("Cookie remove (will be handled in response):", name);
            }
          },
        },
      },
    );

    // Set the session
    const { data, error: sessionError } = await supabase.auth.setSession({
      access_token,
      refresh_token: refresh_token || "",
    });

    if (sessionError || !data.session) {
      console.error("Session error:", sessionError);
      return NextResponse.json(
        { error: "Failed to set session", details: sessionError?.message },
        { status: 401 },
      );
    }

    console.log("✅ Session created for:", data.session.user.email);

    const authUser = data.session.user;
    const userRepository = RepositoryFactory.getUserRepository();

    // Check if user already exists
    let user = await userRepository.findById(authUser.id);

    if (!user) {
      // Create new user with 20 free credits
      const newUser = new User(
        authUser.id,
        authUser.email!,
        authUser.user_metadata?.full_name ||
          authUser.user_metadata?.name ||
          authUser.email!.split("@")[0],
        "", // No password hash for OAuth users
        20, // 20 free credits
        new Date(),
        new Date(),
      );

      user = await userRepository.create(newUser);
      console.log("✅ Created new user:", user.email, "with 20 credits");
    } else {
      console.log("✅ User already exists:", user.email);
    }

    // Return success with user data
    return NextResponse.json({
      success: true,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        creditBalance: user.creditBalance,
      },
      // Include session data for client-side storage
      session: {
        access_token: data.session.access_token,
        refresh_token: data.session.refresh_token,
        expires_at: data.session.expires_at,
      },
    });
  } catch (error) {
    console.error("Set session error:", error);
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Failed to set session",
      },
      { status: 500 },
    );
  }
}
