/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // For local images in /public/, no domains needed
    // Add external domains only if using CDN (Supabase, Cloudinary, etc.)
    domains: [
      "localhost",
      // "dwzsvvixclxoysfhotuz.supabase.co", // Uncomment if using Supabase Storage
      // "res.cloudinary.com", // Uncomment if using Cloudinary
    ],
    formats: ["image/webp", "image/avif"],
  },
  // Enable strict mode for better error handling
  reactStrictMode: true,
  // Optimize for production
  swcMinify: true,
  // Exclude BMAD folders from build
  outputFileTracingExcludes: {
    "*": ["./_bmad/**", "./_bmad-output/**", "./.agent/**"],
  },
};

module.exports = nextConfig;
