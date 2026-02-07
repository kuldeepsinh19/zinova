"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { ClientSupabaseAuthService } from "@/src/Infrastructure/Services/ClientSupabaseAuthService";

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [creditBalance, setCreditBalance] = useState<number | null>(null);

  useEffect(() => {
    const checkUser = async () => {
      const authService = new ClientSupabaseAuthService();
      const session = await authService.getSession();
      setUser(session ? session.userId : null);

      // Fetch credit balance if logged in
      if (session?.userId) {
        try {
          const res = await fetch("/api/user/profile");
          if (res.ok) {
            const data = await res.json();
            setCreditBalance(data.creditBalance ?? 0);
          }
        } catch {
          // Silently fail
        }
      }
    };
    checkUser();
  }, []);

  const handleLogout = async () => {
    const authService = new ClientSupabaseAuthService();
    await authService.signOut();
    router.push("/login");
    router.refresh();
  };

  const isActive = (path: string) => pathname === path;

  const navLinkClass = (path: string) =>
    `inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-colors ${
      isActive(path)
        ? "border-blue-600 text-gray-900"
        : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
    }`;

  const mobileNavLinkClass = (path: string) =>
    `block pl-3 pr-4 py-2 border-l-4 text-base font-medium transition-colors ${
      isActive(path)
        ? "bg-blue-50 border-blue-600 text-blue-700"
        : "border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700"
    }`;

  return (
    <nav className="bg-white border-b border-gray-100 sticky top-0 z-50 backdrop-blur-sm bg-white/95">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Left side - Logo and main nav */}
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link
                href="/"
                className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent hover:opacity-80 transition-opacity"
              >
                Zinnova
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden sm:ml-8 sm:flex sm:space-x-6">
              {/* AI Studio - Always visible, PRIMARY */}
              <Link href="/ai-studio" className={navLinkClass("/ai-studio")}>
                <span className="flex items-center gap-1.5">
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                    />
                  </svg>
                  AI Studio
                </span>
              </Link>

              {/* Portfolio - Always visible */}
              <Link href="/portfolio" className={navLinkClass("/portfolio")}>
                Portfolio
              </Link>

              {/* Pricing - Always visible */}
              <Link href="/pricing" className={navLinkClass("/pricing")}>
                Pricing
              </Link>

              {/* Dashboard - Logged in only */}
              {user && (
                <Link href="/dashboard" className={navLinkClass("/dashboard")}>
                  Dashboard
                </Link>
              )}
            </div>
          </div>

          {/* Right side - Credits badge and auth */}
          <div className="hidden sm:ml-6 sm:flex sm:items-center sm:gap-4">
            {user ? (
              <>
                {/* Credits Badge */}
                <Link
                  href="/credits"
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-amber-100 to-yellow-100 text-amber-700 rounded-full text-sm font-medium hover:from-amber-200 hover:to-yellow-200 transition-all"
                >
                  <span className="text-amber-500">⚡</span>
                  <span>{creditBalance ?? "..."}</span>
                </Link>

                {/* User Menu */}
                <button
                  onClick={handleLogout}
                  className="text-gray-500 hover:text-gray-700 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link
                href="/login"
                className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-5 py-2 rounded-lg text-sm font-medium hover:from-blue-700 hover:to-indigo-700 transition-all shadow-sm hover:shadow"
              >
                Login
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="-mr-2 flex items-center sm:hidden">
            {/* Mobile Credits Badge */}
            {user && creditBalance !== null && (
              <Link
                href="/credits"
                className="flex items-center gap-1 px-2 py-1 bg-amber-100 text-amber-700 rounded-full text-xs font-medium mr-2"
              >
                <span>⚡</span>
                <span>{creditBalance}</span>
              </Link>
            )}

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className={`${isMenuOpen ? "hidden" : "block"} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
              <svg
                className={`${isMenuOpen ? "block" : "hidden"} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`${
          isMenuOpen ? "block" : "hidden"
        } sm:hidden border-t border-gray-100`}
      >
        <div className="pt-2 pb-3 space-y-1">
          <Link
            href="/ai-studio"
            className={mobileNavLinkClass("/ai-studio")}
            onClick={() => setIsMenuOpen(false)}
          >
            <span className="flex items-center gap-2">
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                />
              </svg>
              AI Studio
            </span>
          </Link>

          <Link
            href="/portfolio"
            className={mobileNavLinkClass("/portfolio")}
            onClick={() => setIsMenuOpen(false)}
          >
            Portfolio
          </Link>

          <Link
            href="/pricing"
            className={mobileNavLinkClass("/pricing")}
            onClick={() => setIsMenuOpen(false)}
          >
            Pricing
          </Link>

          {user && (
            <>
              <Link
                href="/dashboard"
                className={mobileNavLinkClass("/dashboard")}
                onClick={() => setIsMenuOpen(false)}
              >
                Dashboard
              </Link>

              <Link
                href="/credits"
                className={mobileNavLinkClass("/credits")}
                onClick={() => setIsMenuOpen(false)}
              >
                Buy Credits
              </Link>

              <button
                onClick={() => {
                  handleLogout();
                  setIsMenuOpen(false);
                }}
                className="block w-full text-left pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700"
              >
                Logout
              </button>
            </>
          )}

          {!user && (
            <Link
              href="/login"
              className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-blue-600 hover:bg-blue-50 hover:border-blue-300"
              onClick={() => setIsMenuOpen(false)}
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
