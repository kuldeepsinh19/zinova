# TDD Workflow Guide for Ceratlyin

**Test-Driven Development (TDD) workflow for the Ceratlyin project using 100% free, open-source tools.**

---

## 🚀 Quick Start

### Running Tests

```bash
# Run all tests in watch mode (recommended during development)
pnpm test:watch

# Run all tests once
pnpm test

# Run tests with coverage report
pnpm test:coverage

# Run E2E tests
pnpm test:e2e

# Run E2E tests in UI mode (visual debugging)
pnpm test:e2e:ui
```

### First Time Setup

```bash
# Install Playwright browsers (only needed once)
pnpm playwright:install

# Generate Prisma client
pnpm db:generate
```

---

## 🔄 TDD Cycle: Red-Green-Refactor

### 1. RED - Write a Failing Test

Write a test for the feature you want to implement **before** writing the code.

```typescript
// src/Domain/ValueObjects/__tests__/Email.test.ts
import { describe, it, expect } from "vitest";
import { Email } from "../Email";

describe("Email Value Object", () => {
  it("should create valid email", () => {
    const email = new Email("user@example.com");
    expect(email.getValue()).toBe("user@example.com");
  });

  it("should throw error for invalid email", () => {
    expect(() => new Email("invalid-email")).toThrow("Invalid email format");
  });
});
```

**Run the test** - it should FAIL because the code doesn't exist yet.

```bash
pnpm test:watch
```

### 2. GREEN - Write Minimal Code to Pass

Write just enough code to make the test pass.

```typescript
// src/Domain/ValueObjects/Email.ts
export class Email {
  private readonly value: string;

  constructor(email: string) {
    if (!this.isValid(email)) {
      throw new Error("Invalid email format");
    }
    this.value = email.toLowerCase();
  }

  getValue(): string {
    return this.value;
  }

  private isValid(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
}
```

**Run the test again** - it should PASS.

### 3. REFACTOR - Improve Code Quality

Now that tests pass, refactor with confidence.

```typescript
// src/Domain/ValueObjects/Email.ts
export class Email {
  private static readonly EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  private readonly value: string;

  constructor(email: string) {
    this.validate(email);
    this.value = email.toLowerCase().trim();
  }

  getValue(): string {
    return this.value;
  }

  equals(other: Email): boolean {
    return this.value === other.value;
  }

  private validate(email: string): void {
    if (!email || !Email.EMAIL_REGEX.test(email)) {
      throw new Error("Invalid email format");
    }
  }
}
```

**Run tests again** - they should still PASS after refactoring.

---

## 📁 Where to Put Tests

Tests live in `__tests__` folders next to the code they test:

```
src/
├── Domain/
│   ├── ValueObjects/
│   │   ├── Email.ts
│   │   └── __tests__/
│   │       └── Email.test.ts
├── Application/
│   ├── UseCases/
│   │   ├── User/
│   │   │   ├── RegisterUser.ts
│   │   │   └── __tests__/
│   │   │       └── RegisterUser.test.ts
├── Presentation/
│   ├── components/
│   │   ├── auth/
│   │   │   ├── RegisterForm.tsx
│   │   │   └── __tests__/
│   │   │       └── RegisterForm.test.tsx
```

---

## 🧪 Testing Patterns by Layer

### Domain Layer (Pure Business Logic)

**What to test:** Entities, Value Objects, business rules

**Pattern:** Pure unit tests, no mocking needed

```typescript
import { describe, it, expect } from "vitest";
import { CreditBalance } from "../CreditBalance";

describe("CreditBalance", () => {
  it("should deduct credits when balance is sufficient", () => {
    const balance = new CreditBalance(100);
    const newBalance = balance.deduct(20);
    expect(newBalance.getValue()).toBe(80);
  });

  it("should throw error when deducting more than balance", () => {
    const balance = new CreditBalance(10);
    expect(() => balance.deduct(20)).toThrow("Insufficient credits");
  });
});
```

### Application Layer (Use Cases)

**What to test:** Use case orchestration, repository interactions

**Pattern:** Unit tests with mocked repositories

```typescript
import { describe, it, expect, vi, beforeEach } from "vitest";
import { RegisterUser } from "../RegisterUser";
import { createMockUserRepository } from "@/tests/helpers/mocks";
import { createTestUser } from "@/tests/helpers/factories";

describe("RegisterUser Use Case", () => {
  let registerUser: RegisterUser;
  let mockUserRepo: ReturnType<typeof createMockUserRepository>;

  beforeEach(() => {
    mockUserRepo = createMockUserRepository();
    registerUser = new RegisterUser(mockUserRepo);
  });

  it("should create user with 20 free credits", async () => {
    const userData = {
      email: "new@example.com",
      password: "Password123",
      name: "New User",
    };

    mockUserRepo.findByEmail.mockResolvedValue(null);
    mockUserRepo.create.mockResolvedValue(
      createTestUser({ ...userData, creditBalance: 20 }),
    );

    const result = await registerUser.execute(userData);

    expect(result.creditBalance).toBe(20);
    expect(mockUserRepo.create).toHaveBeenCalledWith(
      expect.objectContaining({ creditBalance: 20 }),
    );
  });

  it("should throw error if email already exists", async () => {
    mockUserRepo.findByEmail.mockResolvedValue(createTestUser());

    await expect(
      registerUser.execute({
        email: "existing@example.com",
        password: "Password123",
        name: "Test",
      }),
    ).rejects.toThrow("Email already exists");
  });
});
```

### Infrastructure Layer (Database, External Services)

**What to test:** Repository implementations, external service integrations

**Pattern:** Integration tests with real database (or mocked external APIs)

```typescript
import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { UserRepository } from "../UserRepository";
import { cleanupDatabase, disconnectDatabase } from "@/tests/helpers/db-setup";

describe("UserRepository Integration Tests", () => {
  let userRepo: UserRepository;

  beforeEach(async () => {
    await cleanupDatabase();
    userRepo = new UserRepository();
  });

  afterEach(async () => {
    await disconnectDatabase();
  });

  it("should create and retrieve user from database", async () => {
    const userData = {
      email: "test@example.com",
      name: "Test User",
      passwordHash: "hashed",
      creditBalance: 20,
    };

    const created = await userRepo.create(userData);
    expect(created.id).toBeDefined();

    const found = await userRepo.findByEmail("test@example.com");
    expect(found).toBeDefined();
    expect(found?.email).toBe("test@example.com");
  });
});
```

### Presentation Layer (React Components)

**What to test:** User interactions, rendering, form validation

**Pattern:** Component tests with React Testing Library

```typescript
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@/tests/helpers/test-utils';
import userEvent from '@testing-library/user-event';
import { LoginForm } from '../LoginForm';

describe('LoginForm', () => {
  it('should render login form', () => {
    render(<LoginForm />);
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
  });

  it('should call onSubmit when form is valid', async () => {
    const user = userEvent.setup();
    const onSubmit = vi.fn();

    render(<LoginForm onSubmit={onSubmit} />);

    await user.type(screen.getByLabelText(/email/i), 'test@example.com');
    await user.type(screen.getByLabelText(/password/i), 'Password123');
    await user.click(screen.getByRole('button', { name: /sign in/i }));

    expect(onSubmit).toHaveBeenCalledWith({
      email: 'test@example.com',
      password: 'Password123',
    });
  });
});
```

---

## 🎯 Best Practices

### ✅ DO

1. **Write tests first** - Follow TDD: Red → Green → Refactor
2. **Test behavior, not implementation** - Focus on what the code does, not how
3. **Use descriptive test names** - `it('should throw error when email is invalid')`
4. **Keep tests isolated** - Each test should be independent
5. **Use factories for test data** - `createTestUser()` instead of manual objects
6. **Mock external dependencies** - Don't call real APIs in unit tests
7. **Test edge cases** - null, empty, negative values, boundary conditions
8. **Run tests frequently** - Use watch mode during development

### ❌ DON'T

1. **Don't skip tests** - If a test is broken, fix it or delete it
2. **Don't test implementation details** - Avoid testing private methods
3. **Don't write brittle tests** - Don't test exact CSS classes or text
4. **Don't test third-party code** - Trust that libraries work
5. **Don't make tests dependent** - Test B shouldn't rely on Test A passing
6. **Don't ignore failing tests** - Fix them immediately

---

## 📊 Coverage Requirements

| Layer          | Minimum Coverage | Target Coverage |
| -------------- | ---------------- | --------------- |
| Domain         | 95%              | 100%            |
| Application    | 90%              | 95%             |
| Infrastructure | 75%              | 85%             |
| Presentation   | 70%              | 80%             |
| **Overall**    | **80%**          | **90%**         |

Check coverage:

```bash
pnpm test:coverage
```

View detailed HTML report:

```bash
open coverage/index.html
```

---

## 🐛 Debugging Tests

### Debug in VS Code

1. Set breakpoint in test file
2. Run "Debug: JavaScript Debug Terminal"
3. Run `pnpm test` in the debug terminal

### Debug with Vitest UI

```bash
pnpm test:ui
```

Opens a browser UI to visualize and debug tests.

### Debug E2E Tests

```bash
pnpm test:e2e:debug
```

Opens Playwright Inspector for step-by-step debugging.

---

## 🚦 Definition of Done

Before merging any code:

- ✅ All tests pass (`pnpm test`)
- ✅ Coverage meets minimum thresholds (`pnpm test:coverage`)
- ✅ No linting errors (`pnpm lint`)
- ✅ Type checking passes (`pnpm type-check`)
- ✅ Tests written for new features
- ✅ Tests updated for changed features

---

## 📚 Additional Resources

- [Vitest Documentation](https://vitest.dev/)
- [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)
- [Playwright Documentation](https://playwright.dev/)
- [TDD Strategy Document](../_bmad-output/planning-artifacts/tdd-strategy.md)

---

**Remember: Tests are documentation. Write tests that explain what your code does!** 🚀
