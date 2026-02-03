const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Starting database seed...");

  // Seed portfolio items
  const portfolioItems = await prisma.portfolioItem.createMany({
    data: [
      {
        title: "Skincare Product Launch",
        category: "skincare",
        imageUrl: "/portfolio/skincare-1.jpg",
        description:
          "AI-generated product launch campaign for premium skincare brand",
        order: 1,
        isActive: true,
      },
      {
        title: "Organic Face Cream Ad",
        category: "skincare",
        imageUrl: "/portfolio/skincare-2.jpg",
        description: "Instagram-ready promotional content",
        order: 2,
        isActive: true,
      },
      {
        title: "Restaurant Food Photography",
        category: "food",
        imageUrl: "/portfolio/food-1.jpg",
        description: "Mouth-watering food visuals for social media",
        order: 3,
        isActive: true,
      },
      {
        title: "Cafe Menu Showcase",
        category: "food",
        imageUrl: "/portfolio/food-2.jpg",
        description: "Professional food styling and photography",
        order: 4,
        isActive: true,
      },
      {
        title: "Fashion Brand Campaign",
        category: "fashion",
        imageUrl: "/portfolio/fashion-1.jpg",
        description: "Modern fashion photography for e-commerce",
        order: 5,
        isActive: true,
      },
      {
        title: "Streetwear Collection",
        category: "fashion",
        imageUrl: "/portfolio/fashion-2.jpg",
        description: "Urban fashion visuals for Instagram",
        order: 6,
        isActive: true,
      },
    ],
    skipDuplicates: true,
  });

  console.log(`✅ Created ${portfolioItems.count} portfolio items`);

  // Create a test user (for development only)
  const testUser = await prisma.user.upsert({
    where: { email: "test@ceratlyin.com" },
    update: {},
    create: {
      email: "test@ceratlyin.com",
      name: "Test User",
      passwordHash: "hashed_password_here", // In production, use bcrypt
      creditBalance: 100, // Give test user extra credits
    },
  });

  console.log(`✅ Created test user: ${testUser.email}`);

  console.log("🎉 Database seeded successfully!");
}

main()
  .catch((e) => {
    console.error("❌ Error seeding database:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
