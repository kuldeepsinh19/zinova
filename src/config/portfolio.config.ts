/**
 * Portfolio Image Configuration
 *
 * Determines the source of portfolio images based on environment variable.
 */

export const PORTFOLIO_CONFIG = {
  /**
   * Feature flag: Use database URLs for images
   *
   * - true: Load images from database URLs (e.g., Supabase Storage, Cloudinary)
   *         Allows admin panel to manage images dynamically
   *
   * - false: Load images from local /public/portfolio/ folder
   *          Faster, no external dependencies, version controlled
   */
  useDbImages: process.env.NEXT_PUBLIC_USE_DB_IMAGES === "true",

  /**
   * Local image base path
   * Used when useDbImages is false
   */
  localBasePath: "/portfolio",

  /**
   * Get the correct image URL based on configuration
   *
   * @param dbUrl - URL from database (e.g., https://supabase.co/image.jpg or /portfolio/image.png)
   * @param localPath - Local path (e.g., /portfolio/skincare/product.png)
   * @returns The appropriate image URL based on feature flag
   */
  getImageUrl: (dbUrl: string, localPath: string): string => {
    if (PORTFOLIO_CONFIG.useDbImages) {
      return dbUrl;
    }
    return localPath;
  },

  /**
   * Check if a URL is external (requires domain configuration)
   */
  isExternalUrl: (url: string): boolean => {
    return url.startsWith("http://") || url.startsWith("https://");
  },
} as const;
