import { config } from "dotenv";
import { PrismaClient } from "@prisma/client";

// Load environment variables from .env.local
config({ path: ".env.local" });

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding portfolio items...");

  // Clear existing portfolio items
  await prisma.portfolioItem.deleteMany({});

  // Create sample portfolio items using LOCAL images
  const portfolioItems = [
    // Skincare items
    {
      title: "Luxury Skincare Serum",
      category: "skincare",
      imageUrl: "/portfolio/skincare/luxury-serum.png",
      description:
        "Professional AI-generated product photography for premium skincare brand",
      order: 1,
      isActive: true,
    },
    {
      title: "Natural Beauty Product Display",
      category: "skincare",
      imageUrl: "/portfolio/skincare/natural-beauty.png",
      description:
        "Elegant product showcase with natural lighting and botanical elements",
      order: 2,
      isActive: true,
    },

    // Food items
    {
      title: "Gourmet Dish Presentation",
      category: "food",
      imageUrl: "/portfolio/food/gourmet-dish.png",
      description:
        "Mouth-watering food photography for restaurant social media",
      order: 3,
      isActive: true,
    },
    {
      title: "Artisan Coffee Setup",
      category: "food",
      imageUrl: "/portfolio/food/artisan-coffee.png",
      description: "Cozy cafe atmosphere with professional styling",
      order: 4,
      isActive: true,
    },

    // Fashion items
    {
      title: "Modern Fashion Editorial",
      category: "fashion",
      imageUrl: "/portfolio/fashion/modern-editorial.png",
      description: "Trendy fashion photography for clothing brand campaigns",
      order: 5,
      isActive: true,
    },
    {
      title: "Minimalist Accessories Display",
      category: "fashion",
      imageUrl: "/portfolio/fashion/accessories.png",
      description: "Clean and elegant product showcase for fashion accessories",
      order: 6,
      isActive: true,
    },

    // General items
    {
      title: "Tech Product Launch",
      category: "general",
      imageUrl: "/portfolio/general/tech-product.png",
      description: "Professional product photography for tech startups",
      order: 7,
      isActive: true,
    },
    {
      title: "Lifestyle Brand Visual",
      category: "general",
      imageUrl: "/portfolio/general/lifestyle-brand.png",
      description: "Versatile lifestyle imagery for various business types",
      order: 8,
      isActive: true,
    },
  ];

  // Insert all items
  for (const item of portfolioItems) {
    await prisma.portfolioItem.create({
      data: item,
    });
    console.log(`✅ Created: ${item.title}`);
  }

  console.log("🎉 Portfolio seeding complete!");
  console.log("📁 All images are now stored locally in /public/portfolio/");
}

main()
  .catch((e) => {
    console.error("❌ Seeding error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
