"use client";

import { useState, useEffect } from "react";
import LoginForm from "@/src/Presentation/components/auth/LoginForm";

const taglines = [
  "Affordable marketing magic for growing brands",
  "Professional visuals in minutes, not days",
  "Your shortcut to stunning marketing content",
  "Create. Transform. Grow",
];

export default function LoginPage() {
  const [currentTagline, setCurrentTagline] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false);

      setTimeout(() => {
        setCurrentTagline((prev) => (prev + 1) % taglines.length);
        setFade(true);
      }, 300); // Wait for fade out before changing text
    }, 3000); // Change every 3 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Welcome to <span className="text-blue-600">Zinnova</span>
          </h1>
          <div className="h-8 flex items-center justify-center">
            <p
              className={`text-lg text-gray-600 font-medium transition-opacity duration-300 ${
                fade ? "opacity-100" : "opacity-0"
              }`}
            >
              {taglines[currentTagline]}
            </p>
          </div>
        </div>

        <LoginForm />
      </div>
    </div>
  );
}
