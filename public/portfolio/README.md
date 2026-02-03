# Portfolio Images

This folder contains all portfolio showcase images.

## Structure

```
/public/portfolio/
  /skincare/     - Beauty and skincare product images
  /food/         - Food and beverage images
  /fashion/      - Fashion and accessories images
  /general/      - General business images
```

## Adding Images

1. **Place your image** in the appropriate category folder
2. **Name it descriptively**: `luxury-serum.jpg`, `gourmet-burger.jpg`
3. **Update database** via Prisma Studio:
   - imageUrl: `/portfolio/skincare/luxury-serum.jpg`

## Image Guidelines

- **Format**: JPG, PNG, or WebP
- **Size**: 800-1200px width
- **File size**: < 300KB (use TinyPNG to compress)
- **Aspect ratio**: Square (1:1) or landscape (4:3) works best

## Optimization

Before adding images, optimize them:

- **TinyPNG**: https://tinypng.com
- **Squoosh**: https://squoosh.app

Next.js will automatically:

- Convert to WebP/AVIF
- Generate responsive sizes
- Lazy load images

## Current Images

For now, we're using Unsplash URLs as placeholders.
Replace them with your actual portfolio images by:

1. Adding images to this folder
2. Updating the database URLs in Prisma Studio
3. Removing Unsplash domain from next.config.js

## Migration

To switch image providers:

1. Upload images to new provider
2. Update database URLs
3. Update next.config.js domains (if external)

**No code changes needed!**
