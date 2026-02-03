/**
 * Test data factories using Faker.js
 * Use these to generate consistent, realistic test data
 */

import { faker } from "@faker-js/faker";

/**
 * Generate a test user object
 */
export function createTestUser(overrides?: Partial<TestUser>): TestUser {
  return {
    id: faker.string.uuid(),
    email: faker.internet.email().toLowerCase(),
    name: faker.person.fullName(),
    passwordHash: faker.string.alphanumeric(60),
    creditBalance: 20, // Default free credits
    createdAt: faker.date.past(),
    updatedAt: faker.date.recent(),
    ...overrides,
  };
}

/**
 * Generate a test transaction object
 */
export function createTestTransaction(
  overrides?: Partial<TestTransaction>,
): TestTransaction {
  return {
    id: faker.string.uuid(),
    userId: faker.string.uuid(),
    type: "CREDIT_PURCHASE",
    amount: 20,
    paymentAmount: 20,
    razorpayOrderId: `order_${faker.string.alphanumeric(14)}`,
    razorpayPaymentId: `pay_${faker.string.alphanumeric(14)}`,
    status: "COMPLETED",
    createdAt: faker.date.recent(),
    ...overrides,
  };
}

/**
 * Generate a test image generation object
 */
export function createTestImageGeneration(
  overrides?: Partial<TestImageGeneration>,
): TestImageGeneration {
  return {
    id: faker.string.uuid(),
    userId: faker.string.uuid(),
    inputImageUrl: faker.image.url(),
    outputImageUrl: faker.image.url(),
    style: "trendy",
    creditsUsed: 5,
    status: "COMPLETED",
    aiProvider: "gemini",
    errorMessage: null,
    createdAt: faker.date.recent(),
    ...overrides,
  };
}

/**
 * Generate a test business inquiry object
 */
export function createTestBusinessInquiry(
  overrides?: Partial<TestBusinessInquiry>,
): TestBusinessInquiry {
  return {
    id: faker.string.uuid(),
    userId: faker.string.uuid(),
    businessName: faker.company.name(),
    productType: "skincare",
    requirements: faker.lorem.paragraph(),
    budget: "₹500-₹1000",
    email: faker.internet.email().toLowerCase(),
    phone: faker.phone.number(),
    status: "NEW",
    createdAt: faker.date.recent(),
    ...overrides,
  };
}

/**
 * Generate a valid email for testing
 */
export function createTestEmail(): string {
  return faker.internet.email().toLowerCase();
}

/**
 * Generate a valid password for testing
 */
export function createTestPassword(): string {
  return faker.internet.password({ length: 12 });
}

// Type definitions for test data
export interface TestUser {
  id: string;
  email: string;
  name: string;
  passwordHash: string;
  creditBalance: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface TestTransaction {
  id: string;
  userId: string;
  type: string;
  amount: number;
  paymentAmount: number | null;
  razorpayOrderId: string | null;
  razorpayPaymentId: string | null;
  status: string;
  createdAt: Date;
}

export interface TestImageGeneration {
  id: string;
  userId: string;
  inputImageUrl: string;
  outputImageUrl: string | null;
  style: string;
  creditsUsed: number;
  status: string;
  aiProvider: string;
  errorMessage: string | null;
  createdAt: Date;
}

export interface TestBusinessInquiry {
  id: string;
  userId: string | null;
  businessName: string;
  productType: string;
  requirements: string;
  budget: string;
  email: string;
  phone: string | null;
  status: string;
  createdAt: Date;
}
