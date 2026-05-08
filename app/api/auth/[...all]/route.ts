let handler: { GET: (req: Request) => Promise<Response>; POST: (req: Request) => Promise<Response> };

try {
  const { toNextJsHandler } = require("better-auth/next-js");
  const { auth } = require("@/lib/auth");
  handler = toNextJsHandler(auth);
} catch (e) {
  console.error("[AUTH INIT ERROR]", e);
  const errResponse = () =>
    new Response(JSON.stringify({ error: "Auth init failed: " + String(e) }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  handler = { GET: async () => errResponse(), POST: async () => errResponse() };
}

export const GET = async (req: Request) => {
  try {
    return await handler.GET(req);
  } catch (e) {
    console.error("[AUTH GET ERROR]", e);
    return new Response(JSON.stringify({ error: String(e) }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
};

export const POST = async (req: Request) => {
  try {
    return await handler.POST(req);
  } catch (e) {
    console.error("[AUTH POST ERROR]", e);
    return new Response(JSON.stringify({ error: String(e) }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
};
