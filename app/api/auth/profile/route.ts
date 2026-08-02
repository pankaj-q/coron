import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/dal";
import { encrypt, SESSION_COOKIE } from "@/lib/session";
import { rateLimit } from "@/lib/rate-limit";

const DATA_URL_PREFIX = "data:image/";
const MAX_IMAGE_CHARS = 500_000; // ~375KB base64

const schema = z.object({
  name: z.string().trim().min(2).max(60).optional(),
  image: z
    .union([
      z.string().refine((v) => v.startsWith(DATA_URL_PREFIX), "Invalid image format."),
      z.string().length(0),
    ])
    .optional(),
});

export async function PATCH(req: NextRequest) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Not authenticated." }, { status: 401 });
  }

  const rl = rateLimit(`profile:${session.userId}`, 10, 60_000);
  if (!rl.allowed) {
    return NextResponse.json(
      { error: "Too many updates. Try again in a minute." },
      {
        status: 429,
        headers: { "Retry-After": String(Math.ceil((rl.resetAt - Date.now()) / 1000)) },
      },
    );
  }

  const body = await req.json().catch(() => null);
  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Please check your details." }, { status: 400 });
  }

  const { name, image } = parsed.data;

  if (image !== undefined && image.length > MAX_IMAGE_CHARS) {
    return NextResponse.json({ error: "Image is too large. Try a smaller photo." }, { status: 400 });
  }

  const user = await prisma.user.update({
    where: { id: session.userId },
    data: {
      ...(name !== undefined ? { name } : {}),
      ...(image !== undefined ? { image: image || null } : {}),
    },
  });

  const token = await encrypt({
    userId: user.id,
    name: user.name,
    email: user.email,
    image: user.image,
  });

  const res = NextResponse.json({
    success: true,
    user: { name: user.name, email: user.email, image: user.image },
  });
  res.cookies.set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
  });
  return res;
}
