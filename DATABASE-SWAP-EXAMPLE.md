# Database Swap Example

## How to Swap from Supabase to MongoDB

This document demonstrates how easy it is to swap databases thanks to the Repository Pattern.

---

## Current Setup (Supabase/Prisma)

```typescript
// src/Infrastructure/Persistence/RepositoryFactory.ts
export class RepositoryFactory {
  static getUserRepository(): IUserRepository {
    return new PrismaUserRepository(prisma); // ← Current implementation
  }
}
```

---

## Step 1: Create MongoDB Repository Implementation

```typescript
// src/Infrastructure/Persistence/Repositories/MongoUserRepository.ts
import { MongoClient, Db } from "mongodb";
import { IUserRepository } from "@domain/Interfaces/IUserRepository";
import { User } from "@domain/Entities/User";

export class MongoUserRepository implements IUserRepository {
  constructor(private db: Db) {}

  async findById(id: string): Promise<User | null> {
    const doc = await this.db.collection("users").findOne({ _id: id });
    return doc ? this.mapToUser(doc) : null;
  }

  async findByEmail(email: string): Promise<User | null> {
    const doc = await this.db.collection("users").findOne({ email });
    return doc ? this.mapToUser(doc) : null;
  }

  async create(user: User): Promise<User> {
    await this.db.collection("users").insertOne({
      _id: user.id,
      email: user.email,
      name: user.name,
      passwordHash: user.passwordHash,
      creditBalance: user.creditBalance,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    });
    return user;
  }

  // ... other methods

  private mapToUser(doc: any): User {
    return new User(
      doc._id,
      doc.email,
      doc.name,
      doc.passwordHash,
      doc.creditBalance,
      doc.createdAt,
      doc.updatedAt,
    );
  }
}
```

---

## Step 2: Update RepositoryFactory

```typescript
// src/Infrastructure/Persistence/RepositoryFactory.ts
import { MongoClient } from "mongodb";
import { MongoUserRepository } from "./Repositories/MongoUserRepository";

let mongoClient: MongoClient;

function getMongoClient(): MongoClient {
  if (!mongoClient) {
    mongoClient = new MongoClient(process.env.MONGODB_URL!);
  }
  return mongoClient;
}

export class RepositoryFactory {
  // Just change this ONE line!
  static getUserRepository(): IUserRepository {
    const client = getMongoClient();
    return new MongoUserRepository(client.db("zinnova")); // ← Swapped!
  }
}
```

---

## Step 3: That's It!

**Your use cases don't change at all:**

```typescript
// src/Application/UseCases/User/RegisterUser.ts
export class RegisterUserUseCase {
  constructor(private userRepository: IUserRepository) {} // ← Still works!

  async execute(email: string, name: string, password: string) {
    // This code works with Supabase, MongoDB, MySQL, Firebase, etc.
    const existingUser = await this.userRepository.findByEmail(email);
    // ...
  }
}
```

---

## Comparison: With vs Without Clean Architecture

### ❌ WITHOUT Clean Architecture (Tightly Coupled)

```typescript
// Use case directly uses Prisma
export class RegisterUserUseCase {
  async execute(email: string, name: string, password: string) {
    // Directly coupled to Prisma
    const existing = await prisma.user.findUnique({ where: { email } });

    // To swap to MongoDB: REWRITE ENTIRE USE CASE
    // const existing = await db.collection('users').findOne({ email });
  }
}
```

**Problem**: Every use case must be rewritten when changing databases!

### ✅ WITH Clean Architecture (Loosely Coupled)

```typescript
// Use case uses interface
export class RegisterUserUseCase {
  constructor(private userRepository: IUserRepository) {}

  async execute(email: string, name: string, password: string) {
    // Works with ANY database
    const existing = await this.userRepository.findByEmail(email);

    // To swap to MongoDB: CHANGE NOTHING
  }
}
```

**Benefit**: Use cases never change, just swap repository implementation!

---

## Real-World Scenario

**Scenario**: You start with Supabase free tier, then need to scale to MongoDB Atlas.

### Without Clean Architecture:

1. Find all Prisma queries in your codebase (100+ files)
2. Rewrite each one to MongoDB syntax
3. Test everything again
4. Fix bugs for weeks
5. **Estimated time: 2-4 weeks** ⏰

### With Clean Architecture:

1. Create `MongoUserRepository implements IUserRepository`
2. Create `MongoCreditRepository implements ICreditRepository`
3. Update `RepositoryFactory` (3 lines)
4. Run tests (they all pass because interfaces match)
5. **Estimated time: 1-2 days** ⚡

---

## Supported Database Swaps

With this architecture, you can easily swap to:

- ✅ **MongoDB** (NoSQL document store)
- ✅ **MySQL** (relational database)
- ✅ **Firebase Firestore** (Google's NoSQL)
- ✅ **DynamoDB** (AWS NoSQL)
- ✅ **Redis** (in-memory cache)
- ✅ **Any other database**

Just implement the interfaces!

---

## Summary

**The Repository Pattern gives you:**

1. **Database Independence**: Swap databases without changing business logic
2. **Testability**: Mock repositories for unit tests
3. **Flexibility**: Use different databases for different environments
4. **Future-Proofing**: Easily migrate as your needs change

**Your investment**: A few extra files (interfaces, mappers)
**Your return**: Infinite flexibility and maintainability
