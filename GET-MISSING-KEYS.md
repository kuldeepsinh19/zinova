# 🔑 Missing API Keys - Quick Guide

## ✅ What You Have

- Supabase URL ✓
- Supabase Anon Key ✓
- Supabase Service Role Key ✓

## ❌ What You Still Need

### 1. DATABASE_URL (Required - from Supabase)

**Where to find it:**

1. Go to your Supabase project: https://app.supabase.com/project/dwzsvvixclxoysfhotuz
2. Click **Settings** (gear icon in sidebar)
3. Click **Database**
4. Scroll down to **Connection String**
5. Select **URI** (not Transaction pooler)
6. Click **Copy**
7. It will look like: `postgresql://postgres:[YOUR-PASSWORD]@db.dwzsvvixclxoysfhotuz.supabase.co:5432/postgres`

**Important:**

- Replace `[YOUR-PASSWORD]` with the database password you created when setting up the project
- Add `?pgbouncer=true` at the end

**Example:**

```
DATABASE_URL="postgresql://postgres:MySecretPass123@db.dwzsvvixclxoysfhotuz.supabase.co:5432/postgres?pgbouncer=true"
```

### 2. GEMINI_API_KEY (Required - for AI image generation)

**Where to get it:**

1. Go to: https://makersuite.google.com/app/apikey
2. Sign in with your Google account
3. Click **"Create API Key"**
4. Copy the key (starts with `AIzaSy...`)
5. Paste into `.env.local`

**Example:**

```
GEMINI_API_KEY="AIzaSyC1234567890abcdefghijklmnopqrstuvwxyz"
```

---

## 📝 Your Updated .env.local Should Look Like:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://dwzsvvixclxoysfhotuz.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# Database Connection String (ADD THIS)
DATABASE_URL="postgresql://postgres:YOUR_ACTUAL_PASSWORD@db.dwzsvvixclxoysfhotuz.supabase.co:5432/postgres?pgbouncer=true"

# AI Service (ADD THIS)
GEMINI_API_KEY="AIzaSy..."

# App Configuration
NEXT_PUBLIC_APP_URL="http://localhost:3000"
NODE_ENV="development"
```

---

## 🚀 After Adding These Keys

Once you've added `DATABASE_URL` and `GEMINI_API_KEY` to `.env.local`, let me know and I'll run:

```bash
pnpm db:generate    # Generate Prisma client
pnpm db:migrate     # Create database tables
pnpm db:seed        # Add portfolio items
pnpm dev            # Start the app!
```

---

## ❓ Don't Remember Your Database Password?

If you forgot your Supabase database password:

1. Go to: https://app.supabase.com/project/dwzsvvixclxoysfhotuz/settings/database
2. Scroll to **Database Password**
3. Click **Reset Database Password**
4. Set a new password
5. Use that in your `DATABASE_URL`
