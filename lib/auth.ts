import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { nextCookies } from "better-auth/next-js";
import { db } from "./db";
import * as schema from "./schema";

const authSecret =
  process.env.BETTER_AUTH_SECRET?.trim() ??
  "development-only-better-auth-secret-min-32-chars!";

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
    schema,
  }),
  secret: authSecret,
  baseURL:
    process.env.BETTER_AUTH_URL?.trim() || "http://localhost:3000",
  trustedOrigins: [
    process.env.BETTER_AUTH_URL,
    process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : undefined,
  ].filter((x): x is string => Boolean(x)),
  emailAndPassword: {
    enabled: true,
  },
  plugins: [nextCookies()],
});
