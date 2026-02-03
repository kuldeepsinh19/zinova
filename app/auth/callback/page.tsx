"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createBrowserClient } from "@supabase/ssr";

export default function AuthCallbackPage() {
  const router = useRouter();
  const [status, setStatus] = useState("Processing authentication...");
  const [error, setError] = useState("");

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  );

  useEffect(() => {
    const handleCallback = async () => {
      try {
        console.log("🔵 OAuth Callback Started");
        console.log("🔵 Full URL:", window.location.href);

        // Supabase automatically exchanges the code for a session
        // We just need to wait for it to complete
        setStatus("Completing sign in...");

        // Wait a moment for Supabase to process the callback
        await new Promise((resolve) => setTimeout(resolve, 1000));

        // Get the session
        const {
          data: { session },
          error: sessionError,
        } = await supabase.auth.getSession();

        if (sessionError) {
          console.error("❌ Session error:", sessionError);
          setError("Authentication failed: " + sessionError.message);
          setTimeout(() => router.push("/login"), 2000);
          return;
        }

        if (!session) {
          console.log("⏳ No session found, checking auth state...");

          // Listen for auth state change
          const {
            data: { subscription },
          } = supabase.auth.onAuthStateChange(async (event, session) => {
            console.log("🔵 Auth event:", event);

            if (event === "SIGNED_IN" && session) {
              console.log("✅ Signed in:", session.user.email);
              subscription.unsubscribe();
              await createUserInDatabase(session.user.email!);
              router.push("/dashboard");
            }
          });

          // Timeout after 10 seconds
          setTimeout(() => {
            subscription.unsubscribe();
            setError("Authentication timeout");
            router.push("/login");
          }, 10000);

          return;
        }

        console.log("✅ Session found:", session.user.email);
        setStatus("Setting up your account...");

        // Create user in database
        await createUserInDatabase(session.user.email!);

        setStatus("Success! Redirecting...");
        setTimeout(() => router.push("/dashboard"), 500);
      } catch (err) {
        console.error("❌ Unexpected error:", err);
        setError("An unexpected error occurred");
        setTimeout(() => router.push("/login"), 2000);
      }
    };

    async function createUserInDatabase(email: string) {
      try {
        const response = await fetch("/api/auth/oauth-callback", {
          method: "POST",
        });

        if (response.ok) {
          const data = await response.json();
          console.log("✅ User synced:", data.user?.email || email);
        } else {
          console.log("⚠️ User sync failed, but continuing...");
        }
      } catch (err) {
        console.error("❌ Error syncing user:", err);
      }
    }

    handleCallback();
  }, [router, supabase]);

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="text-center p-8 bg-white rounded-lg shadow-lg max-w-md">
          <div className="text-red-600 mb-4">
            <svg
              className="w-16 h-16 mx-auto mb-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <h3 className="text-xl font-bold mb-2">Authentication Failed</h3>
            <p className="text-gray-700">{error}</p>
          </div>
          <button
            onClick={() => router.push("/login")}
            className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Back to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="text-center p-8 bg-white rounded-lg shadow-lg max-w-md">
        <div className="relative">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600 mx-auto mb-6"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <svg
              className="w-8 h-8 text-blue-600"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        </div>
        <h2 className="text-2xl font-semibold text-gray-900 mb-2">{status}</h2>
        <p className="text-gray-600">This will only take a moment...</p>
        <div className="mt-6 flex justify-center space-x-2">
          <div
            className="w-2 h-2 bg-blue-600 rounded-full animate-bounce"
            style={{ animationDelay: "0ms" }}
          ></div>
          <div
            className="w-2 h-2 bg-blue-600 rounded-full animate-bounce"
            style={{ animationDelay: "150ms" }}
          ></div>
          <div
            className="w-2 h-2 bg-blue-600 rounded-full animate-bounce"
            style={{ animationDelay: "300ms" }}
          ></div>
        </div>
      </div>
    </div>
  );
}
