/**
 * Simple example test to verify test infrastructure works
 * Run with: pnpm test
 */

import { describe, it, expect } from "vitest";

describe("Test Infrastructure", () => {
  it("should run basic tests", () => {
    expect(true).toBe(true);
  });

  it("should perform simple math", () => {
    expect(2 + 2).toBe(4);
  });

  it("should handle async operations", async () => {
    const promise = Promise.resolve("success");
    await expect(promise).resolves.toBe("success");
  });
});
