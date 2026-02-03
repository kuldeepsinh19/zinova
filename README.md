# Ceratlyin

AI-powered marketing platform for Indian startups. Generate professional marketing visuals at the lowest cost.

## 🚀 Quick Start

```bash
# Install dependencies
pnpm install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local with your Supabase and API keys

# Initialize database
pnpm db:generate
pnpm db:migrate
pnpm db:seed

# Run development server
pnpm dev
```

Visit [http://localhost:3000](http://localhost:3000)

## 📖 Documentation

- **[QUICK-START.md](./QUICK-START.md)** - Complete setup guide
- **[PROJECT-SETUP-GUIDE.md](./PROJECT-SETUP-GUIDE.md)** - Detailed architecture explanation
- **[DATABASE-SWAP-EXAMPLE.md](./DATABASE-SWAP-EXAMPLE.md)** - How to swap databases

## 🏗️ Architecture

Built with **Clean Architecture** for maximum flexibility:

- **Domain Layer**: Pure business logic (database-agnostic)
- **Application Layer**: Use cases
- **Infrastructure Layer**: Database, AI, Payment services (swappable)
- **Presentation Layer**: Next.js UI & API

### Tech Stack

- **Frontend**: Next.js 14 + TypeScript + Tailwind CSS
- **Database**: Supabase (PostgreSQL) - **FREE tier, $0/month**
- **ORM**: Prisma (type-safe, swappable)
- **AI**: Google Gemini API
- **Payment**: Razorpay (Indian market)
- **Auth**: Supabase Auth

## 🔄 Database Portability

Your database is **completely swappable** thanks to the Repository Pattern:

```typescript
// To swap from Supabase to MongoDB:
// 1. Create MongoUserRepository implements IUserRepository
// 2. Update RepositoryFactory (3 lines)
// 3. Done! Your use cases don't change
```

**Time to migrate**: 1-2 days (vs 2-4 weeks without Clean Architecture)

## 📁 Project Structure

```
src/
├── Domain/              # Business entities & interfaces
├── Application/         # Use cases (RegisterUser, PurchaseCredits, etc.)
├── Infrastructure/      # Database, AI, Payment implementations
└── Presentation/        # Next.js pages, components, API routes
```

## 💳 Credits System

- 1 credit = ₹1
- New users: 20 free credits
- Minimum purchase: 20 credits
- Bulk tiers: 60, 100, 200+ credits

## 🎯 Features

- ✅ Portfolio showcase (AI-generated work)
- ✅ AI image recreation tool (Gemini API)
- ✅ User authentication & credit system
- ✅ Payment integration (Razorpay)
- ✅ Business inquiry system
- ✅ Mobile-first responsive design

## 🔐 Security

- Helmet.js (HTTP headers)
- express-rate-limit (rate limiting)
- Zod (input validation)
- Supabase Row-Level Security
- All security tools are FREE

## 📊 Performance

- Target: <2s page load on 3G
- Lighthouse score: 90+ on all metrics
- Next.js Image optimization
- Automatic code splitting
- Edge caching

## 💰 Cost Structure

**MVP Phase**: $0/month infrastructure

- Supabase free tier: 500MB database, 1GB storage
- Vercel free tier: 100GB bandwidth
- Only cost: Gemini API usage (~$50/month)

## 🛠️ Development

```bash
# Database commands
pnpm db:generate    # Generate Prisma client
pnpm db:migrate     # Run migrations
pnpm db:push        # Push schema (dev only)
pnpm db:studio      # Open Prisma Studio GUI
pnpm db:seed        # Seed database

# Development
pnpm dev            # Run dev server
pnpm build          # Build for production
pnpm type-check     # TypeScript check
pnpm lint           # Lint code
pnpm test           # Run tests
```

## 📝 License

Private project - All rights reserved

---

**Built with Clean Architecture for scalability and maintainability** 🚀
