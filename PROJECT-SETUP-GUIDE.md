# Ceratlyin - Project Setup Guide

## Overview

This guide sets up the ceratlyin project with **Clean Architecture** and **database abstraction** to ensure you can easily swap database providers in the future.

**Key Principle**: Your business logic will NEVER depend on Supabase or Prisma directly. They are just implementation details that can be replaced.

---

## Database Abstraction Strategy

### The Repository Pattern

```
Domain Layer (Interfaces)
    ↓ defines contracts
Infrastructure Layer (Implementations)
    ↓ implements using Prisma/Supabase
    ↓ can be swapped for MongoDB, MySQL, etc.
```

**Example**:

```typescript
// Domain/Interfaces/IUserRepository.ts (NEVER changes)
export interface IUserRepository {
  findById(id: string): Promise<User | null>;
  create(user: User): Promise<User>;
  updateCreditBalance(userId: string, newBalance: number): Promise<void>;
}

// Infrastructure/Persistence/Repositories/UserRepository.ts (Supabase implementation)
export class SupabaseUserRepository implements IUserRepository {
  // Uses Prisma/Supabase internally
}

// Future: Infrastructure/Persistence/Repositories/MongoUserRepository.ts
export class MongoUserRepository implements IUserRepository {
  // Uses MongoDB internally
}
```

**To swap databases**: Just create a new repository implementation. Your use cases don't change at all!

---

## Step 1: Initialize Next.js 14 Project

### 1.1 Create Project

```bash
cd /home/av33/Documents/ceratlyin
npx create-next-app@latest . --typescript --tailwind --app --no-src-dir --import-alias "@/*"
```

**Options selected**:

- ✅ TypeScript
- ✅ Tailwind CSS
- ✅ App Router
- ❌ src/ directory (we'll use Clean Architecture folders)
- ✅ Import alias `@/*`

### 1.2 Install Core Dependencies

```bash
# Database & ORM
pnpm add prisma @prisma/client
pnpm add -D prisma

# Supabase (current implementation)
pnpm add @supabase/supabase-js @supabase/auth-helpers-nextjs

# Validation
pnpm add zod

# Forms
pnpm add react-hook-form @hookform/resolvers

# State Management
pnpm add @tanstack/react-query

# UI Components
pnpm add @headlessui/react @heroicons/react

# Security (FREE frameworks)
pnpm add helmet express-rate-limit

# Email
pnpm add resend

# Payment (when you get API key)
# pnpm add razorpay

# Development Tools
pnpm add -D @types/node typescript eslint prettier eslint-config-prettier
pnpm add -D vitest @testing-library/react @testing-library/jest-dom
```

---

## Step 2: Create Clean Architecture Folder Structure

### 2.1 Create Folders

```bash
# Create Clean Architecture structure
mkdir -p src/Domain/Entities
mkdir -p src/Domain/ValueObjects
mkdir -p src/Domain/Interfaces

mkdir -p src/Application/UseCases/User
mkdir -p src/Application/UseCases/Credits
mkdir -p src/Application/UseCases/ImageGeneration
mkdir -p src/Application/UseCases/BusinessInquiry
mkdir -p src/Application/DTOs
mkdir -p src/Application/Behaviors

mkdir -p src/Infrastructure/Persistence/Repositories
mkdir -p src/Infrastructure/Persistence/Mappers
mkdir -p src/Infrastructure/Database/prisma
mkdir -p src/Infrastructure/Services/AI
mkdir -p src/Infrastructure/Services/Payment
mkdir -p src/Infrastructure/Services/Email
mkdir -p src/Infrastructure/Services/Storage

mkdir -p src/Presentation/components/ui
mkdir -p src/Presentation/components/forms
mkdir -p src/Presentation/components/portfolio
mkdir -p src/Presentation/components/dashboard
mkdir -p src/Presentation/lib/hooks
mkdir -p src/Presentation/lib/utils
mkdir -p src/Presentation/lib/validation
```

### 2.2 Update `tsconfig.json` for Clean Architecture

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [
      {
        "name": "next"
      }
    ],
    "paths": {
      "@/*": ["./*"],
      "@domain/*": ["./src/Domain/*"],
      "@application/*": ["./src/Application/*"],
      "@infrastructure/*": ["./src/Infrastructure/*"],
      "@presentation/*": ["./src/Presentation/*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

---

## Step 3: Database Abstraction Layer (Repository Pattern)

### 3.1 Define Domain Interfaces (Database-Agnostic)

**These interfaces NEVER change, regardless of database**:

#### `src/Domain/Interfaces/IUserRepository.ts`

```typescript
import { User } from "@domain/Entities/User";

export interface IUserRepository {
  // Query methods
  findById(id: string): Promise<User | null>;
  findByEmail(email: string): Promise<User | null>;

  // Command methods
  create(user: User): Promise<User>;
  update(user: User): Promise<User>;
  updateCreditBalance(userId: string, newBalance: number): Promise<void>;

  // Batch operations
  findMany(filters?: UserFilters): Promise<User[]>;
}

export interface UserFilters {
  email?: string;
  createdAfter?: Date;
  limit?: number;
}
```

#### `src/Domain/Interfaces/ICreditRepository.ts`

```typescript
import { Transaction } from "@domain/Entities/Transaction";

export interface ICreditRepository {
  // Credit operations
  addCredits(
    userId: string,
    amount: number,
    transactionId: string,
  ): Promise<void>;
  deductCredits(userId: string, amount: number, reason: string): Promise<void>;
  getBalance(userId: string): Promise<number>;

  // Transaction history
  getTransactionHistory(userId: string, limit?: number): Promise<Transaction[]>;
  createTransaction(transaction: Transaction): Promise<Transaction>;
}
```

#### `src/Domain/Interfaces/IImageGenerationRepository.ts`

```typescript
import { ImageGeneration } from "@domain/Entities/ImageGeneration";

export interface IImageGenerationRepository {
  create(generation: ImageGeneration): Promise<ImageGeneration>;
  findById(id: string): Promise<ImageGeneration | null>;
  updateStatus(id: string, status: string, outputUrl?: string): Promise<void>;
  getUserHistory(userId: string, limit?: number): Promise<ImageGeneration[]>;
}
```

#### `src/Domain/Interfaces/IAIService.ts`

```typescript
export interface IAIService {
  generateImage(
    inputImageUrl: string,
    style: string,
  ): Promise<AIGenerationResult>;
  getProviderName(): string;
}

export interface AIGenerationResult {
  outputImageUrl: string;
  processingTime: number;
  creditsUsed: number;
}
```

### 3.2 Set Up Prisma Schema (Current Implementation)

#### `src/Infrastructure/Database/prisma/schema.prisma`

```prisma
generator client {
  provider = "prisma-client-js"
  output   = "../../../node_modules/.prisma/client"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model User {
  id            String   @id @default(cuid())
  email         String   @unique
  name          String?
  passwordHash  String
  creditBalance Int      @default(20)
  createdAt     DateTime @default(now())
  updatedAt     DateTime @updatedAt

  transactions      Transaction[]
  imageGenerations  ImageGeneration[]
  businessInquiries BusinessInquiry[]

  @@index([email])
}

model Transaction {
  id                String   @id @default(cuid())
  userId            String
  type              String   // 'CREDIT_PURCHASE' | 'CREDIT_DEDUCTION' | 'CREDIT_REFUND'
  amount            Int
  paymentAmount     Decimal?
  razorpayOrderId   String?
  razorpayPaymentId String?
  status            String   // 'PENDING' | 'COMPLETED' | 'FAILED'
  metadata          Json?    // Flexible field for additional data
  createdAt         DateTime @default(now())

  user User @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@index([userId])
  @@index([status])
}

model ImageGeneration {
  id             String   @id @default(cuid())
  userId         String
  inputImageUrl  String
  outputImageUrl String?
  style          String
  creditsUsed    Int
  status         String   // 'PENDING' | 'PROCESSING' | 'COMPLETED' | 'FAILED'
  aiProvider     String   @default("gemini")
  errorMessage   String?
  metadata       Json?    // Flexible field for AI-specific data
  createdAt      DateTime @default(now())

  user User @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@index([userId])
  @@index([status])
}

model BusinessInquiry {
  id           String   @id @default(cuid())
  userId       String?
  businessName String
  productType  String
  requirements String
  budget       String
  email        String
  phone        String?
  status       String   @default("NEW")
  createdAt    DateTime @default(now())

  user User? @relation(fields: [userId], references: [id], onDelete: SetNull)

  @@index([status])
}

model PortfolioItem {
  id          String   @id @default(cuid())
  title       String
  category    String
  imageUrl    String
  videoUrl    String?
  description String?
  order       Int      @default(0)
  isActive    Boolean  @default(true)
  createdAt   DateTime @default(now())

  @@index([category])
  @@index([isActive])
}
```

**Key Features for Scalability**:

- `@@index` for query performance
- `Json` fields for flexible metadata
- `onDelete: Cascade` for referential integrity
- Separate concerns (transactions, generations, inquiries)

### 3.3 Create Repository Implementations (Supabase/Prisma)

#### `src/Infrastructure/Persistence/Repositories/UserRepository.ts`

```typescript
import { PrismaClient } from "@prisma/client";
import {
  IUserRepository,
  UserFilters,
} from "@domain/Interfaces/IUserRepository";
import { User } from "@domain/Entities/User";
import { UserMapper } from "../Mappers/UserMapper";

export class PrismaUserRepository implements IUserRepository {
  constructor(private prisma: PrismaClient) {}

  async findById(id: string): Promise<User | null> {
    const prismaUser = await this.prisma.user.findUnique({
      where: { id },
    });
    return prismaUser ? UserMapper.toDomain(prismaUser) : null;
  }

  async findByEmail(email: string): Promise<User | null> {
    const prismaUser = await this.prisma.user.findUnique({
      where: { email },
    });
    return prismaUser ? UserMapper.toDomain(prismaUser) : null;
  }

  async create(user: User): Promise<User> {
    const prismaData = UserMapper.toPrisma(user);
    const created = await this.prisma.user.create({
      data: prismaData,
    });
    return UserMapper.toDomain(created);
  }

  async update(user: User): Promise<User> {
    const prismaData = UserMapper.toPrisma(user);
    const updated = await this.prisma.user.update({
      where: { id: user.id },
      data: prismaData,
    });
    return UserMapper.toDomain(updated);
  }

  async updateCreditBalance(userId: string, newBalance: number): Promise<void> {
    await this.prisma.user.update({
      where: { id: userId },
      data: { creditBalance: newBalance },
    });
  }

  async findMany(filters?: UserFilters): Promise<User[]> {
    const prismaUsers = await this.prisma.user.findMany({
      where: {
        email: filters?.email,
        createdAt: filters?.createdAfter
          ? { gte: filters.createdAfter }
          : undefined,
      },
      take: filters?.limit,
    });
    return prismaUsers.map(UserMapper.toDomain);
  }
}
```

**Why this is swappable**:

1. Implements `IUserRepository` interface (contract)
2. Uses `UserMapper` to convert between Prisma models and Domain entities
3. All Prisma-specific code is isolated here
4. To swap to MongoDB: Create `MongoUserRepository implements IUserRepository`

---

## Step 4: Environment Configuration

### 4.1 Create `.env.local`

```bash
# Database (Supabase PostgreSQL)
DATABASE_URL="postgresql://postgres:[password]@db.[project-ref].supabase.co:5432/postgres"

# Supabase
NEXT_PUBLIC_SUPABASE_URL="https://[project-ref].supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="[your-anon-key]"
SUPABASE_SERVICE_ROLE_KEY="[your-service-role-key]"

# AI Service
GEMINI_API_KEY="[your-gemini-api-key]"

# Payment (when you get it)
# RAZORPAY_KEY_ID="[your-key-id]"
# RAZORPAY_KEY_SECRET="[your-key-secret]"

# Email
RESEND_API_KEY="[your-resend-key]"

# App
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

### 4.2 Create `.env.example`

```bash
# Copy this to .env.local and fill in your values

DATABASE_URL="postgresql://..."
NEXT_PUBLIC_SUPABASE_URL="https://..."
NEXT_PUBLIC_SUPABASE_ANON_KEY="..."
SUPABASE_SERVICE_ROLE_KEY="..."
GEMINI_API_KEY="..."
RESEND_API_KEY="..."
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

---

## Step 5: Dependency Injection Setup

### 5.1 Create Repository Factory (Swappable Database)

#### `src/Infrastructure/Persistence/RepositoryFactory.ts`

```typescript
import { PrismaClient } from "@prisma/client";
import { IUserRepository } from "@domain/Interfaces/IUserRepository";
import { ICreditRepository } from "@domain/Interfaces/ICreditRepository";
import { IImageGenerationRepository } from "@domain/Interfaces/IImageGenerationRepository";
import { PrismaUserRepository } from "./Repositories/UserRepository";
import { PrismaCreditRepository } from "./Repositories/CreditRepository";
import { PrismaImageGenerationRepository } from "./Repositories/ImageGenerationRepository";

// Singleton Prisma client
let prisma: PrismaClient;

export function getPrismaClient(): PrismaClient {
  if (!prisma) {
    prisma = new PrismaClient();
  }
  return prisma;
}

// Repository factory - EASY TO SWAP DATABASE HERE
export class RepositoryFactory {
  private static prisma = getPrismaClient();

  // To swap database: Change these implementations
  static getUserRepository(): IUserRepository {
    return new PrismaUserRepository(this.prisma);
    // Future: return new MongoUserRepository(mongoClient);
  }

  static getCreditRepository(): ICreditRepository {
    return new PrismaCreditRepository(this.prisma);
    // Future: return new MongoCreditRepository(mongoClient);
  }

  static getImageGenerationRepository(): IImageGenerationRepository {
    return new PrismaImageGenerationRepository(this.prisma);
    // Future: return new MongoImageGenerationRepository(mongoClient);
  }
}
```

**To swap databases in the future**:

1. Create new repository implementations (e.g., `MongoUserRepository`)
2. Change the factory methods above
3. Your use cases don't change at all!

---

## Step 6: Initialize Database

### 6.1 Initialize Prisma

```bash
# Initialize Prisma
cd src/Infrastructure/Database
npx prisma init

# Copy schema.prisma content from Step 3.2

# Generate Prisma client
npx prisma generate

# Create migration
npx prisma migrate dev --name init

# (Optional) Seed database with portfolio items
npx prisma db seed
```

### 6.2 Create Seed Script (Optional)

#### `src/Infrastructure/Database/prisma/seed.ts`

```typescript
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Seed portfolio items
  await prisma.portfolioItem.createMany({
    data: [
      {
        title: "Skincare Product Launch",
        category: "skincare",
        imageUrl: "/portfolio/skincare-1.jpg",
        description: "AI-generated product launch campaign",
        order: 1,
      },
      {
        title: "Food Brand Social Media",
        category: "food",
        imageUrl: "/portfolio/food-1.jpg",
        description: "Instagram-ready food photography",
        order: 2,
      },
      // Add more portfolio items...
    ],
  });

  console.log("✅ Database seeded successfully");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
```

Add to `package.json`:

```json
{
  "prisma": {
    "seed": "ts-node --compiler-options {\"module\":\"CommonJS\"} src/Infrastructure/Database/prisma/seed.ts"
  }
}
```

---

## Step 7: Verification

### 7.1 Test Database Connection

Create `src/Infrastructure/Database/test-connection.ts`:

```typescript
import { getPrismaClient } from "../Persistence/RepositoryFactory";

async function testConnection() {
  const prisma = getPrismaClient();

  try {
    await prisma.$connect();
    console.log("✅ Database connected successfully");

    const userCount = await prisma.user.count();
    console.log(`📊 Users in database: ${userCount}`);
  } catch (error) {
    console.error("❌ Database connection failed:", error);
  } finally {
    await prisma.$disconnect();
  }
}

testConnection();
```

Run:

```bash
npx ts-node src/Infrastructure/Database/test-connection.ts
```

### 7.2 Verify Clean Architecture Boundaries

**Check dependency flow**:

- ✅ Domain has NO imports from Infrastructure/Presentation
- ✅ Application only imports from Domain
- ✅ Infrastructure imports from Domain (interfaces)
- ✅ Presentation imports from Application

---

## Summary

### ✅ What You've Set Up

1. **Next.js 14 project** with TypeScript and Tailwind
2. **Clean Architecture folders** (Domain/Application/Infrastructure/Presentation)
3. **Database abstraction layer** with Repository Pattern
4. **Prisma schema** with Supabase PostgreSQL
5. **Repository implementations** that are swappable
6. **Dependency injection** via RepositoryFactory
7. **Environment configuration** for all services

### 🔄 How to Swap Databases in Future

**Current**: Supabase (PostgreSQL) via Prisma

**To swap to MongoDB**:

1. Install MongoDB driver: `pnpm add mongodb`
2. Create `MongoUserRepository implements IUserRepository`
3. Update `RepositoryFactory.getUserRepository()` to return `new MongoUserRepository()`
4. Your use cases don't change!

**To swap to MySQL**:

1. Update Prisma datasource: `provider = "mysql"`
2. Update `DATABASE_URL` in `.env.local`
3. Run `npx prisma migrate dev`
4. Repository implementations stay the same!

### 📁 Project Structure Created

```
ceratlyin/
├── src/
│   ├── Domain/              # ✅ Database-agnostic
│   │   ├── Entities/
│   │   ├── ValueObjects/
│   │   └── Interfaces/      # 🔑 Repository contracts
│   ├── Application/         # ✅ Database-agnostic
│   │   ├── UseCases/
│   │   ├── DTOs/
│   │   └── Behaviors/
│   ├── Infrastructure/      # 🔄 Swappable implementations
│   │   ├── Persistence/
│   │   │   ├── Repositories/  # Prisma implementations
│   │   │   └── Mappers/
│   │   ├── Database/
│   │   │   └── prisma/
│   │   └── Services/
│   └── Presentation/
│       ├── app/
│       ├── components/
│       └── lib/
├── .env.local
├── .env.example
├── tsconfig.json
└── package.json
```

### 🎯 Next Steps

1. **Run the setup commands** from this guide
2. **Test database connection** (Step 7.1)
3. **Start building Domain entities** (User, Credit, ImageGeneration)
4. **Create Use Cases** (RegisterUser, PurchaseCredits, GenerateImage)

---

**Your database is now completely abstracted and swappable!** 🚀
