# Setup Instructions

## ✅ Completed Steps

1. ✅ Installed pnpm globally
2. ✅ Installed all project dependencies (Next.js, Prisma, Supabase, etc.)
3. ✅ Created `.env.local` template

---

## 🔑 Next Steps - Get Your API Keys

### Step 1: Set Up Supabase (FREE - Required)

1. **Go to** [https://supabase.com](https://supabase.com)
2. **Sign up** or log in
3. **Click** "New Project"
4. **Fill in**:
   - Name: `ceratlyin`
   - Database Password: (create a strong password - save it!)
   - Region: Choose closest to India
   - Pricing Plan: **Free**
5. **Wait** ~2 minutes for project to be ready

6. **Get Database URL**:
   - Go to **Settings** → **Database**
   - Scroll to "Connection String"
   - Select **URI** mode
   - Click **Copy**
   - Paste into `.env.local` as `DATABASE_URL`
   - **Important**: Add `?pgbouncer=true` at the end

7. **Get API Keys**:
   - Go to **Settings** → **API**
   - Copy **Project URL** → paste as `NEXT_PUBLIC_SUPABASE_URL`
   - Copy **anon public** key → paste as `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - Copy **service_role** key → paste as `SUPABASE_SERVICE_ROLE_KEY`

### Step 2: Get Gemini API Key (FREE - Required)

1. **Go to** [https://makersuite.google.com/app/apikey](https://makersuite.google.com/app/apikey)
2. **Sign in** with Google account
3. **Click** "Create API Key"
4. **Copy** the key
5. **Paste** into `.env.local` as `GEMINI_API_KEY`

### Step 3: Razorpay (Optional - Can add later)

You mentioned you'll get this soon. When ready:
1. Go to [https://dashboard.razorpay.com/app/keys](https://dashboard.razorpay.com/app/keys)
2. Get Key ID and Key Secret
3. Add to `.env.local`

---

## 🚀 After You Have API Keys

Once you've filled in `.env.local` with your Supabase and Gemini keys, run:

```bash
# Generate Prisma client
pnpm db:generate

# Create database tables
pnpm db:migrate

# Seed with portfolio items (optional)
pnpm db:seed

# Start development server
pnpm dev
```

---

## 📝 Your `.env.local` Should Look Like:

```env
DATABASE_URL="postgresql://postgres:YOUR_PASSWORD@db.abcdefghijk.supabase.co:5432/postgres?pgbouncer=true"
NEXT_PUBLIC_SUPABASE_URL="https://abcdefghijk.supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
SUPABASE_SERVICE_ROLE_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
GEMINI_API_KEY="AIzaSyC..."
NEXT_PUBLIC_APP_URL="http://localhost:3000"
NODE_ENV="development"
```

---

## ⏸️ Waiting for You

I've set everything up and am waiting for you to:
1. Create Supabase account
2. Get API keys
3. Fill in `.env.local`

**Let me know when you're ready, and I'll help you run the database setup!**
