# Database Connection Troubleshooting Guide

## Current Issue

Cannot connect to Supabase PostgreSQL database at `db.dwzsvvixclxoysfhotuz.supabase.co:5432`

## Possible Causes & Solutions

### 1. Supabase Project Paused (Most Likely)

**Free tier projects pause after 7 days of inactivity**

**Solution:**

1. Visit: https://supabase.com/dashboard/project/dwzsvvixclxoysfhotuz
2. If you see "Project Paused", click **"Resume Project"**
3. Wait 2-3 minutes for database to start
4. Restart dev server: `pnpm dev`

### 2. Database Password Issue

Your current password contains `@` which might need URL encoding.

**Current:**

```
DATABASE_URL="postgresql://postgres:Kuldeep@1907@db.dwzsvvixclxoysfhotuz.supabase.co:5432/postgres"
```

**Try URL-encoded version:**

```
DATABASE_URL="postgresql://postgres:Kuldeep%401907@db.dwzsvvixclxoysfhotuz.supabase.co:5432/postgres"
```

### 3. Get Fresh Connection String

1. Go to: https://supabase.com/dashboard/project/dwzsvvixclxoysfhotuz/settings/database
2. Scroll to **"Connection String"**
3. Select **"URI"** mode
4. Copy the connection string
5. Replace `[YOUR-PASSWORD]` with your actual database password
6. Update `DATABASE_URL` in `.env.local`

### 4. Check Network/Firewall

If on corporate/restricted network:

- PostgreSQL port 5432 might be blocked
- Try different network (mobile hotspot, home WiFi)

## Quick Test

After making changes, test connection:

```bash
# Restart dev server
pnpm dev

# Or test Prisma connection
pnpm prisma db pull
```

## Alternative: Use Prisma Studio

If database is accessible but app isn't connecting:

```bash
pnpm prisma studio --schema=./src/Infrastructure/Database/prisma/schema.prisma
```

If Prisma Studio opens successfully, the database is fine and issue is in app configuration.
