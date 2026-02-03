/**
 * Mock implementations for repositories and services
 * Use these in unit tests to isolate business logic
 */

import { vi } from "vitest";

/**
 * Create a mock UserRepository
 */
export function createMockUserRepository() {
  return {
    create: vi.fn(),
    findById: vi.fn(),
    findByEmail: vi.fn(),
    update: vi.fn(),
    updateCreditBalance: vi.fn(),
    delete: vi.fn(),
  };
}

/**
 * Create a mock TransactionRepository
 */
export function createMockTransactionRepository() {
  return {
    create: vi.fn(),
    findById: vi.fn(),
    findByUserId: vi.fn(),
    update: vi.fn(),
  };
}

/**
 * Create a mock ImageGenerationRepository
 */
export function createMockImageGenerationRepository() {
  return {
    create: vi.fn(),
    findById: vi.fn(),
    findByUserId: vi.fn(),
    update: vi.fn(),
  };
}

/**
 * Create a mock BusinessInquiryRepository
 */
export function createMockBusinessInquiryRepository() {
  return {
    create: vi.fn(),
    findById: vi.fn(),
    findAll: vi.fn(),
    update: vi.fn(),
  };
}

/**
 * Create a mock AI Service
 */
export function createMockAIService() {
  return {
    generateImage: vi.fn(),
    getModelInfo: vi.fn(),
  };
}

/**
 * Create a mock Payment Service (Razorpay)
 */
export function createMockPaymentService() {
  return {
    createOrder: vi.fn(),
    verifyPayment: vi.fn(),
    processWebhook: vi.fn(),
  };
}

/**
 * Create a mock Email Service
 */
export function createMockEmailService() {
  return {
    sendEmail: vi.fn(),
    sendBusinessInquiryNotification: vi.fn(),
  };
}

/**
 * Create a mock File Storage Service
 */
export function createMockFileStorageService() {
  return {
    uploadFile: vi.fn(),
    getFileUrl: vi.fn(),
    deleteFile: vi.fn(),
  };
}

/**
 * Mock Supabase client
 */
export function createMockSupabaseClient() {
  return {
    auth: {
      signUp: vi.fn(),
      signInWithPassword: vi.fn(),
      signOut: vi.fn(),
      getUser: vi.fn(),
      getSession: vi.fn(),
    },
    from: vi.fn(() => ({
      select: vi.fn().mockReturnThis(),
      insert: vi.fn().mockReturnThis(),
      update: vi.fn().mockReturnThis(),
      delete: vi.fn().mockReturnThis(),
      eq: vi.fn().mockReturnThis(),
      single: vi.fn(),
    })),
  };
}
