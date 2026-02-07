"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Navbar from "@/src/Presentation/components/layout/Navbar";
import Footer from "@/src/Presentation/components/layout/Footer";
import { ClientSupabaseAuthService } from "@/src/Infrastructure/Services/ClientSupabaseAuthService";

// AI Styles available
const aiStyles = [
  {
    id: "cinematic-product",
    name: "Cinematic Product",
    description: "Dramatic lighting with professional product photography feel",
    category: "Product",
    preview: "/styles/cinematic.jpg",
  },
  {
    id: "studio-beauty",
    name: "Studio Beauty",
    description: "Soft, flattering light perfect for skincare and cosmetics",
    category: "Beauty",
    preview: "/styles/beauty.jpg",
  },
  {
    id: "food-styling",
    name: "Food Styling",
    description: "Appetizing visuals with warm, inviting tones",
    category: "Food",
    preview: "/styles/food.jpg",
  },
  {
    id: "lifestyle-shot",
    name: "Lifestyle Shot",
    description: "Natural, aspirational imagery for brand storytelling",
    category: "Lifestyle",
    preview: "/styles/lifestyle.jpg",
  },
  {
    id: "fashion-editorial",
    name: "Fashion Editorial",
    description: "High-fashion aesthetic with bold compositions",
    category: "Fashion",
    preview: "/styles/fashion.jpg",
  },
  {
    id: "minimal-clean",
    name: "Minimal Clean",
    description: "Simple, elegant backgrounds that let products shine",
    category: "Product",
    preview: "/styles/minimal.jpg",
  },
];

export default function AIStudioPage() {
  const [user, setUser] = useState<string | null>(null);
  const [creditBalance, setCreditBalance] = useState<number | null>(null);
  const [selectedStyle, setSelectedStyle] = useState<string | null>(null);
  const [uploadedImage, setUploadedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [showLoginPopup, setShowLoginPopup] = useState(false);
  const [showCreditsPopup, setShowCreditsPopup] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  useEffect(() => {
    const checkUser = async () => {
      const authService = new ClientSupabaseAuthService();
      const session = await authService.getSession();
      setUser(session ? session.userId : null);

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

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert("File size must be less than 5MB");
        return;
      }
      setUploadedImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleGenerate = async () => {
    // Check if logged in
    if (!user) {
      setShowLoginPopup(true);
      return;
    }

    // Check credits
    if (creditBalance === 0) {
      setShowCreditsPopup(true);
      return;
    }

    // TODO: Implement actual generation
    setIsGenerating(true);
    // Simulate generation
    setTimeout(() => {
      setIsGenerating(false);
      alert("Generation complete! (Demo - actual AI integration coming soon)");
    }, 2000);
  };

  const canGenerate = selectedStyle && uploadedImage;

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />

      <main className="flex-1">
        {/* Header */}
        <section className="bg-white border-b border-gray-200 py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">AI Studio</h1>
                <p className="text-gray-600 mt-1">
                  Transform your product photos with AI-powered styles
                </p>
              </div>
              {user && creditBalance !== null && (
                <div className="flex items-center gap-2 px-4 py-2 bg-amber-50 rounded-xl">
                  <span className="text-amber-500">⚡</span>
                  <span className="font-semibold text-amber-700">
                    {creditBalance} Credits
                  </span>
                  <Link
                    href="/credits"
                    className="text-sm text-blue-600 hover:underline ml-2"
                  >
                    Buy more
                  </Link>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-8 sm:py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Left: Style Selection */}
              <div className="lg:col-span-2 space-y-6">
                <div>
                  <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <span className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm">
                      1
                    </span>
                    Choose a Style
                  </h2>

                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {aiStyles.map((style) => (
                      <button
                        key={style.id}
                        onClick={() => setSelectedStyle(style.id)}
                        className={`text-left p-4 rounded-xl border-2 transition-all ${
                          selectedStyle === style.id
                            ? "border-blue-600 bg-blue-50 ring-2 ring-blue-200"
                            : "border-gray-200 bg-white hover:border-gray-300"
                        }`}
                      >
                        {/* Style Preview Placeholder */}
                        <div className="aspect-video bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg mb-3 flex items-center justify-center">
                          <span className="text-2xl">🎨</span>
                        </div>
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="font-medium text-gray-900">
                              {style.name}
                            </h3>
                            <p className="text-sm text-gray-500 mt-0.5">
                              {style.description}
                            </p>
                          </div>
                          {selectedStyle === style.id && (
                            <span className="text-blue-600">✓</span>
                          )}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Upload Section */}
                <div>
                  <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <span className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm">
                      2
                    </span>
                    Upload Your Photo
                  </h2>

                  <div
                    className={`border-2 border-dashed rounded-xl p-8 text-center transition-colors ${
                      imagePreview
                        ? "border-green-300 bg-green-50"
                        : "border-gray-300 hover:border-blue-400 bg-white"
                    }`}
                  >
                    {imagePreview ? (
                      <div className="space-y-4">
                        <img
                          src={imagePreview}
                          alt="Preview"
                          className="max-h-64 mx-auto rounded-lg shadow-sm"
                        />
                        <button
                          onClick={() => {
                            setUploadedImage(null);
                            setImagePreview(null);
                          }}
                          className="text-sm text-red-600 hover:underline"
                        >
                          Remove image
                        </button>
                      </div>
                    ) : (
                      <label className="cursor-pointer block">
                        <input
                          type="file"
                          accept="image/jpeg,image/png"
                          onChange={handleImageUpload}
                          className="hidden"
                        />
                        <div className="space-y-2">
                          <div className="text-4xl">📸</div>
                          <div className="text-gray-700 font-medium">
                            Drag & drop or click to upload
                          </div>
                          <div className="text-sm text-gray-500">
                            JPG or PNG, max 5MB
                          </div>
                        </div>
                      </label>
                    )}
                  </div>
                </div>
              </div>

              {/* Right: Preview & Generate */}
              <div className="lg:col-span-1">
                <div className="sticky top-24 bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                  <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <span className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm">
                      3
                    </span>
                    Generate
                  </h2>

                  {/* Summary */}
                  <div className="space-y-3 mb-6">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Style:</span>
                      <span className="font-medium text-gray-900">
                        {selectedStyle
                          ? aiStyles.find((s) => s.id === selectedStyle)?.name
                          : "Not selected"}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Image:</span>
                      <span className="font-medium text-gray-900">
                        {uploadedImage ? "Ready" : "Not uploaded"}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Cost:</span>
                      <span className="font-medium text-blue-600">
                        1 Credit
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={handleGenerate}
                    disabled={!canGenerate || isGenerating}
                    className={`w-full py-4 rounded-xl font-semibold transition-all ${
                      canGenerate && !isGenerating
                        ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700 shadow-lg hover:shadow-xl"
                        : "bg-gray-200 text-gray-500 cursor-not-allowed"
                    }`}
                  >
                    {isGenerating ? (
                      <span className="flex items-center justify-center gap-2">
                        <svg
                          className="animate-spin w-5 h-5"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          />
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                          />
                        </svg>
                        Generating...
                      </span>
                    ) : (
                      "✨ Generate Image"
                    )}
                  </button>

                  {!user && (
                    <p className="text-xs text-gray-500 text-center mt-3">
                      Sign up free to get 20 credits
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />

      {/* Login Popup */}
      {showLoginPopup && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          onClick={() => setShowLoginPopup(false)}
        >
          <div
            className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="text-center">
              <div className="text-5xl mb-4">🎨</div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Create Your First Image FREE!
              </h2>
              <p className="text-gray-600 mb-6">
                Sign up now and get <strong>20 credits</strong> to transform
                your photos instantly.
              </p>

              <div className="space-y-3">
                <Link
                  href="/api/auth/google"
                  className="flex items-center justify-center gap-3 w-full py-3 px-4 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path
                      fill="#4285F4"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    />
                  </svg>
                  Continue with Google
                </Link>

                <Link
                  href="/register"
                  className="flex items-center justify-center w-full py-3 px-4 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors font-medium"
                >
                  Sign up with Email
                </Link>
              </div>

              <p className="text-sm text-gray-500 mt-6">
                Already have an account?{" "}
                <Link href="/login" className="text-blue-600 hover:underline">
                  Login
                </Link>
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Credits Popup */}
      {showCreditsPopup && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          onClick={() => setShowCreditsPopup(false)}
        >
          <div
            className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="text-center">
              <div className="text-5xl mb-4">⚡</div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                You're Out of Credits
              </h2>
              <p className="text-gray-600 mb-6">
                Purchase more credits to continue creating amazing images.
              </p>

              <Link
                href="/credits"
                className="flex items-center justify-center w-full py-3 px-4 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors font-medium"
              >
                Buy Credits →
              </Link>

              <button
                onClick={() => setShowCreditsPopup(false)}
                className="text-sm text-gray-500 mt-4 hover:underline"
              >
                Maybe later
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
