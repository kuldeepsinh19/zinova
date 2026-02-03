import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Ceratlyin - AI-Powered Marketing for Indian Startups",
  description:
    "Generate professional marketing visuals at the lowest cost. AI-powered image recreation for skincare, food, fashion, and more.",
  keywords: [
    "AI marketing",
    "image generation",
    "Indian startups",
    "marketing visuals",
    "affordable marketing",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
