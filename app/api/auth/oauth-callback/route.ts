import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { createServerClient } from "@supabase/ssr";
import { RepositoryFactory } from "@infrastructure/Persistence/RepositoryFactory";
import { User } from "@domain/Entities/User";

/**
 * POST /api/auth/oauth-callback
 *
 * Creates user in database after OAuth sign-in
 * Expects Supabase session to already be set
 */
export async function POST() {
  try {
    const cookieStore = cookies();

    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          get(name: string) {
            return cookieStore.get(name)?.value;
          },
        },
      },
    );

    // Get current session
    const {
      data: { session },
      error: sessionError,
    } = await supabase.auth.getSession();

    if (sessionError || !session) {
      console.error("Session error:", sessionError);
      return NextResponse.json({ error: "No active session" }, { status: 401 });
    }

    const authUser = session.user;
    const userRepository = RepositoryFactory.getUserRepository();

    // Check if user already exists
    const existingUser = await userRepository.findById(authUser.id);
    if (existingUser) {
      return NextResponse.json(
        {
          success: true,
          message: "User already exists",
          user: {
            id: existingUser.id,
            email: existingUser.email,
            name: existingUser.name,
            creditBalance: existingUser.creditBalance,
          },
        },
        { status: 200 },
      );
    }

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

    const savedUser = await userRepository.create(newUser);

    return NextResponse.json(
      {
        success: true,
        user: {
          id: savedUser.id,
          email: savedUser.email,
          name: savedUser.name,
          creditBalance: savedUser.creditBalance,
        },
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("OAuth callback error:", error);

    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Failed to create user",
      },
      { status: 500 },
    );
  }
}
