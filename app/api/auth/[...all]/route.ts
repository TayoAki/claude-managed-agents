import { toNextJsHandler } from "better-auth/next-js";
import { auth } from "@/lib/auth";

const handler = toNextJsHandler(auth);

export const GET = async (req: Request) => {
  try {
    return await handler.GET(req);
  } catch (e) {
    console.error("[AUTH GET ERROR]", e);
    return new Response(JSON.stringify({ error: String(e) }), { status: 500 });
  }
};

export const POST = async (req: Request) => {
  try {
    return await handler.POST(req);
  } catch (e) {
    console.error("[AUTH POST ERROR]", e);
    return new Response(JSON.stringify({ error: String(e) }), { status: 500 });
  }
};
