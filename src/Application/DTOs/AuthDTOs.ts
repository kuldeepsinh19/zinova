import { z } from "zod";

/**
 * Register User DTO
 * Validation schema for user registration
 */
export const RegisterUserDTOSchema = z.object({
  email: z.string().email("Invalid email format"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[0-9]/, "Password must contain at least one number"),
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name must be at most 50 characters"),
});

export type RegisterUserDTO = z.infer<typeof RegisterUserDTOSchema>;

/**
 * Login User DTO
 * Validation schema for user login
 */
export const LoginUserDTOSchema = z.object({
  email: z.string().email("Invalid email format"),
  password: z.string().min(1, "Password is required"),
});

export type LoginUserDTO = z.infer<typeof LoginUserDTOSchema>;

/**
 * User Profile DTO
 * Response format for user profile data
 */
export interface UserProfileDTO {
  id: string;
  email: string;
  name: string | null;
  creditBalance: number;
  createdAt: Date;
}

/**
 * Auth Response DTO
 * Response format for authentication operations
 */
export interface AuthResponseDTO {
  user: UserProfileDTO;
  session: {
    accessToken: string;
    refreshToken: string;
    expiresAt: number;
  };
}
