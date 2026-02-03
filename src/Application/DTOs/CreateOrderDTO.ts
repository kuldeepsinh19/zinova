import { z } from "zod";

export const createOrderSchema = z.object({
  userId: z.string().min(1, "User ID is required"),
  packageId: z.string().min(1, "Package ID is required"),
});

export type CreateOrderDTO = z.infer<typeof createOrderSchema>;
