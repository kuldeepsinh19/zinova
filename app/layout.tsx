import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Zinnova - AI-Powered Marketing for Indian Startups",
  description:
    "Generate professional marketing visuals at the lowest cost. AI-powered image recreation for skincare, food, fashion, and more.",
  keywords: [
    "AI marketing",
    "image generation",
    "Indian startups",
    "marketing visuals",
    "affordable marketing",
  ],
  icons: {
    icon: [
      { url: "/favicon.png", sizes: "512x512", type: "image/png" },
      { url: "/favicon.png", sizes: "192x192", type: "image/png" },
      { url: "/favicon.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon.png", sizes: "16x16", type: "image/png" },
    ],
    apple: [{ url: "/favicon.png", sizes: "180x180", type: "image/png" }],
  },
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
