import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import {
  IAuthService,
  AuthResult,
  Session,
} from "@application/UseCases/User/LoginUser";

/**
 * Supabase Auth Service
 *
 * Implements IAuthService using Supabase Auth.
 * This can be swapped for Firebase, Auth0, or any other auth provider.
 */
export class SupabaseAuthService implements IAuthService {
  private supabase;

  constructor() {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

    if (!supabaseUrl || !supabaseAnonKey) {
      throw new Error("Supabase environment variables not configured");
    }

    const cookieStore = cookies();

    this.supabase = createServerClient(supabaseUrl, supabaseAnonKey, {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value;
        },
        set(name: string, value: string, options: any) {
          try {
            cookieStore.set({ name, value, ...options });
          } catch (error) {
            // Ignore errors in route handlers
          }
        },
        remove(name: string, options: any) {
          try {
            cookieStore.set({ name, value: "", ...options });
          } catch (error) {
            // Ignore errors in route handlers
          }
        },
      },
    });
  }

  /**
   * Sign up a new user
   */
  async signUp(email: string, password: string): Promise<AuthResult> {
    try {
      const { data, error } = await this.supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: undefined,
          // Disable email verification - allow immediate login
          data: {
            email_confirm: true,
          },
        },
      });

      if (error) {
        return {
          success: false,
          error: error.message,
        };
      }

      // Check if session was created
      if (!data.session) {
        // If no session, try to sign in immediately (Supabase auto-confirms in some cases)
        return await this.signIn(email, password);
      }

      return {
        success: true,
        session: {
          accessToken: data.session.access_token,
          refreshToken: data.session.refresh_token,
          expiresAt: data.session.expires_at || 0,
          userId: data.user!.id,
        },
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : "Sign up failed",
      };
    }
  }

  /**
   * Sign in an existing user
   */
  async signIn(email: string, password: string): Promise<AuthResult> {
    try {
      const { data, error } = await this.supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        return {
          success: false,
          error: error.message,
        };
      }

      if (!data.session) {
        return {
          success: false,
          error: "No session created",
        };
      }

      return {
        success: true,
        session: {
          accessToken: data.session.access_token,
          refreshToken: data.session.refresh_token,
          expiresAt: data.session.expires_at || 0,
          userId: data.user.id,
        },
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : "Sign in failed",
      };
    }
  }

  /**
   * Sign out the current user
   */
  async signOut(): Promise<void> {
    await this.supabase.auth.signOut();
  }

  /**
   * Get current session
   */
  async getSession(): Promise<Session | null> {
    const { data } = await this.supabase.auth.getSession();

    if (!data.session) {
      return null;
    }

    return {
      accessToken: data.session.access_token,
      refreshToken: data.session.refresh_token,
      expiresAt: data.session.expires_at || 0,
      userId: data.session.user.id,
    };
  }

  /**
   * Refresh session using refresh token
   */
  async refreshSession(refreshToken: string): Promise<AuthResult> {
    try {
      const { data, error } = await this.supabase.auth.refreshSession({
        refresh_token: refreshToken,
      });

      if (error || !data.session) {
        return {
          success: false,
          error: error?.message || "Session refresh failed",
        };
      }

      return {
        success: true,
        session: {
          accessToken: data.session.access_token,
          refreshToken: data.session.refresh_token,
          expiresAt: data.session.expires_at || 0,
          userId: data.session.user.id,
        },
      };
    } catch (error) {
      return {
        success: false,
        error:
          error instanceof Error ? error.message : "Session refresh failed",
      };
    }
  }

  /**
   * Sign in with Google OAuth
   */
  async signInWithGoogle(): Promise<AuthResult> {
    return this.signInWithProvider("google");
  }

  /**
   * Sign in with OAuth provider (Google, GitHub, Facebook, etc.)
   */
  async signInWithProvider(
    provider: "google" | "github" | "facebook",
  ): Promise<AuthResult> {
    try {
      const { data, error } = await this.supabase.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo: `${process.env.NEXT_PUBLIC_APP_URL}/auth/callback`,
        },
      });

      if (error) {
        return {
          success: false,
          error: error.message,
        };
      }

      // OAuth redirects to provider, so we return success
      // The actual session will be created after redirect
      return {
        success: true,
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : "OAuth sign in failed",
      };
    }
  }

  /**
   * Get current user
   * Validates the token and returns the user object
   */
  async getUser(req?: any): Promise<{ id: string; email?: string } | null> {
    const {
      data: { user },
    } = await this.supabase.auth.getUser();

    if (!user) return null;

    return {
      id: user.id,
      email: user.email,
    };
  }

  /**
   * Get Supabase client instance
   * Useful for advanced operations
   */
  getClient() {
    return this.supabase;
  }
}
