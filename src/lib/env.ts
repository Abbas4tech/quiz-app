import { z } from "zod";

/**
 * Environment variables schema for runtime validation
 */
const envSchema = z.object({
  // Database
  MONGODB_URI: z.string().min(1, "MongoDB URI is required"),

  // NextAuth
  NEXT_AUTH_SECRET: z.string().min(1, "NextAuth secret is required"),
  NEXTAUTH_URL: z.url("Valid NextAuth URL is required"),

  // Google OAuth
  NEXT_AUTH_GOOGLE_CLIENT_ID: z.string().min(1, "Google Client ID is required"),
  NEXT_AUTH_GOOGLE_CLIENT_SECRET: z
    .string()
    .min(1, "Google Client Secret is required"),

  // Application
  BASE_AUTHENTICATED_URL: z.string().default("/dashboard"),
});

/**
 * Validated environment variables
 */
export const env = envSchema.parse(process.env);
