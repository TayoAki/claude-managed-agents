export async function GET() {
  const envCheck = {
    DATABASE_URL: !!process.env.DATABASE_URL,
    ANTHROPIC_API_KEY: !!process.env.ANTHROPIC_API_KEY,
    BETTER_AUTH_SECRET: !!process.env.BETTER_AUTH_SECRET,
    BETTER_AUTH_URL: process.env.BETTER_AUTH_URL || "NOT SET",
    TOKEN_ENCRYPTION_KEY: !!process.env.TOKEN_ENCRYPTION_KEY,
    VERCEL_CLIENT_ID: !!process.env.VERCEL_CLIENT_ID,
    VERCEL_CLIENT_SECRET: !!process.env.VERCEL_CLIENT_SECRET,
    NODE_ENV: process.env.NODE_ENV,
  };

  // Try importing auth to see if it crashes
  let authStatus = "ok";
  try {
    const { auth } = await import("@/lib/auth");
    authStatus = auth ? "loaded" : "null";
  } catch (e) {
    authStatus = "FAILED: " + String(e);
  }

  // Try DB connection
  let dbStatus = "ok";
  try {
    const { db } = await import("@/lib/db");
    const result = await db.execute(new (await import("drizzle-orm")).SQL(["SELECT 1"], []));
    dbStatus = result ? "connected" : "no result";
  } catch (e) {
    dbStatus = "FAILED: " + String(e);
  }

  return Response.json({ envCheck, authStatus, dbStatus });
}
