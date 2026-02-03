# Ceratlyin - Quick Start Guide

## 🚀 Getting Started

Follow these steps to set up and run the ceratlyin project locally.

---

## Prerequisites

- **Node.js** 18+ installed
- **pnpm** installed (`npm install -g pnpm`)
- **Supabase account** (free tier)
- **Gemini API key** (free tier)

---

## Step 1: Install Dependencies

```bash
cd /home/av33/Documents/ceratlyin
pnpm install
```

---

## Step 2: Set Up Supabase

1. Go to [https://supabase.com](https://supabase.com)
2. Create a new project
3. Wait for database to be ready (~2 minutes)
4. Go to **Settings** → **Database**
   - Copy the **Connection String** (URI mode)
5. Go to **Settings** → **API**
   - Copy **Project URL**
   - Copy **anon public** key
   - Copy **service_role** key (keep this secret!)

---

## Step 3: Configure Environment Variables

```bash
# Copy the example file
cp .env.example .env.local

# Edit .env.local and fill in your values
nano .env.local
```

**Required values**:

- `DATABASE_URL`: Your Supabase connection string
- `NEXT_PUBLIC_SUPABASE_URL`: Your Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Your Supabase anon key
- `SUPABASE_SERVICE_ROLE_KEY`: Your Supabase service role key
- `GEMINI_API_KEY`: Your Gemini API key

**Optional** (can add later):

- `RAZORPAY_KEY_ID`: When you get Razorpay API key
- `RESEND_API_KEY`: For email notifications

---

## Step 4: Initialize Database

```bash
# Generate Prisma client
pnpm db:generate

# Create database tables
pnpm db:migrate

# Seed with portfolio items (optional)
pnpm db:seed
```

**What this does**:

- Creates all 5 tables (users, transactions, image_generations, business_inquiries, portfolio_items)
- Adds indexes for performance
- Seeds portfolio items and test user

---

## Step 5: Verify Database Connection

Create a test file to verify everything works:

```bash
# Create test file
cat > test-db.ts << 'EOF'
import { getPrismaClient } from './src/Infrastructure/Persistence/RepositoryFactory';

async function test() {
  const prisma = getPrismaClient();

  try {
    await prisma.$connect();
    console.log('✅ Database connected!');

    const userCount = await prisma.user.count();
    const portfolioCount = await prisma.portfolioItem.count();

    console.log(`📊 Users: ${userCount}`);
    console.log(`📊 Portfolio items: ${portfolioCount}`);

  } catch (error) {
    console.error('❌ Connection failed:', error);
  } finally {
    await prisma.$disconnect();
  }
}

test();
EOF

# Run test
npx ts-node test-db.ts
```

**Expected output**:

```
✅ Database connected!
📊 Users: 1
📊 Portfolio items: 6
```

---

## Step 6: Run Development Server

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## Useful Commands

### Database Management

```bash
# Generate Prisma client (after schema changes)
pnpm db:generate

# Create new migration
pnpm db:migrate

# Push schema without migration (development only)
pnpm db:push

# Open Prisma Studio (database GUI)
pnpm db:studio

# Seed database
pnpm db:seed
```

### Development

```bash
# Run dev server
pnpm dev

# Type check
pnpm type-check

# Lint code
pnpm lint

# Run tests
pnpm test
```

---

## Project Structure

```
ceratlyin/
├── src/
│   ├── Domain/              # Business logic (database-agnostic)
│   ├── Application/         # Use cases
│   ├── Infrastructure/      # Database, AI, Payment services
│   └── Presentation/        # Next.js UI & API
├── .env.local              # Your secrets (DO NOT COMMIT)
├── .env.example            # Template for environment variables
├── package.json
└── tsconfig.json
```

---

## Troubleshooting

### Database connection fails

**Error**: `Can't reach database server`

**Solution**:

1. Check your `DATABASE_URL` in `.env.local`
2. Verify Supabase project is running
3. Check if you're behind a firewall/VPN

### Prisma client not found

**Error**: `Cannot find module '@prisma/client'`

**Solution**:

```bash
pnpm db:generate
```

### TypeScript path alias errors

**Error**: `Cannot find module '@domain/...'`

**Solution**:

1. Restart your TypeScript server (VS Code: Cmd+Shift+P → "Restart TS Server")
2. Check `tsconfig.json` has correct paths

---

## Next Steps

1. ✅ Database is set up and running
2. ✅ Clean Architecture structure in place
3. ✅ Repository Pattern for database abstraction

**Now you can**:

- Build more use cases (PurchaseCredits, GenerateImage)
- Create API routes in `app/api/`
- Build UI components
- Integrate Gemini AI
- Add Razorpay payment flow

---

## Need Help?

- **Prisma docs**: https://www.prisma.io/docs
- **Supabase docs**: https://supabase.com/docs
- **Next.js docs**: https://nextjs.org/docs

**Your database is swappable!** See `DATABASE-SWAP-EXAMPLE.md` for how to migrate to MongoDB, MySQL, etc.
