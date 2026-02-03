# Portfolio Management Guide

This guide explains how to manage portfolio items without touching code.

---

## Quick Overview

**Portfolio items are stored in the database**, not in code. This means you can:

- ✅ Add new items without coding
- ✅ Update images without redeploying
- ✅ Change categories easily
- ✅ Reorder items by changing the `order` field

---

## Method 1: Using Prisma Studio (Easiest)

### Step 1: Open Prisma Studio

```bash
pnpm prisma studio --schema=./src/Infrastructure/Database/prisma/schema.prisma
```

This opens a web interface at `http://localhost:5555`

### Step 2: Navigate to PortfolioItem Table

- Click on **"PortfolioItem"** in the left sidebar
- You'll see all your portfolio items

### Step 3: Add a New Item

1. Click **"Add record"** button
2. Fill in the fields:
   - **title**: "My Amazing Product Shot"
   - **category**: "skincare" | "food" | "fashion" | "general"
   - **imageUrl**: Full URL to your image (see Image Upload section below)
   - **description**: Optional description
   - **order**: Number (lower = appears first)
   - **isActive**: true (to show) or false (to hide)
3. Click **"Save 1 change"**

### Step 4: Edit Existing Items

1. Click on any row to edit
2. Change any field
3. Click **"Save 1 change"**

### Step 5: Delete Items

1. Click the checkbox next to the item
2. Click **"Delete 1 selected record"**

---

## Method 2: Using SQL (Advanced)

If you prefer SQL, you can run queries directly:

### Add a new item:

```sql
INSERT INTO portfolio_items (id, title, category, "imageUrl", description, "order", "isActive", "createdAt")
VALUES (
  gen_random_uuid(),
  'My Product Shot',
  'skincare',
  'https://your-image-url.com/image.jpg',
  'Beautiful product photography',
  9,
  true,
  NOW()
);
```

### Update an item:

```sql
UPDATE portfolio_items
SET "imageUrl" = 'https://new-image-url.com/image.jpg'
WHERE title = 'My Product Shot';
```

### Hide an item (without deleting):

```sql
UPDATE portfolio_items
SET "isActive" = false
WHERE title = 'My Product Shot';
```

---

## Image Upload Options

### Option 1: Supabase Storage (Recommended for Production)

**Setup:**

1. Go to your Supabase dashboard
2. Navigate to **Storage**
3. Create a bucket called `portfolio-images`
4. Set it to **Public** (so images are accessible)

**Upload:**

1. Click **Upload file**
2. Select your image
3. Copy the public URL
4. Paste into `imageUrl` field in database

**Update next.config.js:**

```javascript
images: {
  domains: [
    "localhost",
    "images.unsplash.com",
    "dwzsvvixclxoysfhotuz.supabase.co", // Your Supabase domain
  ],
}
```

### Option 2: Unsplash (Current - Good for Testing)

**Find images:**

1. Go to https://unsplash.com
2. Search for your category (e.g., "skincare product")
3. Click on an image
4. Click **"Download"** dropdown → **"Copy link"**
5. Paste URL into `imageUrl` field

**Format:** `https://images.unsplash.com/photo-xxxxx?w=800&q=80`

### Option 3: Cloudinary (Alternative CDN)

1. Sign up at https://cloudinary.com (free tier available)
2. Upload images via dashboard
3. Copy the public URL
4. Add `res.cloudinary.com` to `next.config.js` domains

---

## Portfolio Categories

**Available categories:**

- `skincare` - Beauty and skincare products
- `food` - Food and beverage
- `fashion` - Clothing and accessories
- `general` - Everything else

**To add a new category:**

1. Update `src/Domain/Entities/PortfolioItem.ts`:

   ```typescript
   export enum PortfolioCategory {
     SKINCARE = "skincare",
     FOOD = "food",
     FASHION = "fashion",
     GENERAL = "general",
     ELECTRONICS = "electronics", // NEW
   }
   ```

2. Update `src/Presentation/components/portfolio/CategoryFilter.tsx`:

   ```typescript
   const categoryDisplayNames: Record<string, string> = {
     skincare: "Skincare",
     food: "Food & Beverage",
     fashion: "Fashion",
     general: "General",
     electronics: "Electronics", // NEW
   };
   ```

3. Add color for the new category:
   ```typescript
   const categoryColors: Record<string, string> = {
     skincare: "bg-pink-600 hover:bg-pink-700",
     food: "bg-orange-600 hover:bg-orange-700",
     fashion: "bg-purple-600 hover:bg-purple-700",
     general: "bg-blue-600 hover:bg-blue-700",
     electronics: "bg-green-600 hover:bg-green-700", // NEW
   };
   ```

---

## Reordering Items

Items are displayed in ascending order by the `order` field.

**Example:**

- order: 1 → Shows first
- order: 2 → Shows second
- order: 10 → Shows last

**To reorder:**

1. Open Prisma Studio
2. Edit the `order` field for each item
3. Save changes
4. Refresh the portfolio page

---

## Hiding Items (Without Deleting)

Set `isActive` to `false` to hide an item:

```sql
UPDATE portfolio_items
SET "isActive" = false
WHERE id = 'item-id-here';
```

The item stays in the database but won't show on the website.

---

## Bulk Import (For Many Items)

If you have many items to add, create a seed script:

1. Create a file: `src/Infrastructure/Database/prisma/seeds/my-portfolio-seed.ts`
2. Add your items:
   ```typescript
   const myItems = [
     {
       title: "Item 1",
       category: "skincare",
       imageUrl: "https://...",
       order: 1,
       isActive: true,
     },
     // ... more items
   ];
   ```
3. Run: `pnpm tsx src/Infrastructure/Database/prisma/seeds/my-portfolio-seed.ts`

---

## Testing Changes

After making changes:

1. Go to `http://localhost:3000/portfolio`
2. Refresh the page
3. Verify your changes appear

**No code restart needed!** The API fetches fresh data from the database on each request.

---

## Troubleshooting

### Images not loading?

- Check if the domain is in `next.config.js` → `images.domains`
- Verify the image URL is publicly accessible
- Check browser console for errors

### Item not showing?

- Verify `isActive` is `true`
- Check the `order` field (higher numbers appear later)
- Refresh the page

### Category filter not working?

- Verify the category matches exactly: `skincare`, `food`, `fashion`, or `general`
- Check for typos (case-sensitive)

---

## Best Practices

✅ **DO:**

- Use descriptive titles
- Keep descriptions concise (1-2 sentences)
- Use high-quality images (min 800px width)
- Set meaningful order numbers (1, 2, 3... or 10, 20, 30... for easier reordering)
- Use Supabase Storage for production images

❌ **DON'T:**

- Use very large images (> 2MB) - optimize first
- Use broken or private URLs
- Duplicate order numbers (items may appear in random order)
- Forget to set `isActive` to true

---

## Future Enhancements

**Planned features:**

- Admin dashboard to manage portfolio (no Prisma Studio needed)
- Drag-and-drop reordering
- Image upload directly from admin panel
- Video support (already in schema, just add `videoUrl`)
- Analytics (track which items get most clicks)

---

## Need Help?

- Check the [Phase 2 Walkthrough](file:///home/av33/.gemini/antigravity/brain/18536302-964a-44df-b01c-88a6b5d5dc53/phase2-walkthrough.md)
- Review the database schema: `src/Infrastructure/Database/prisma/schema.prisma`
- Contact support or check documentation
