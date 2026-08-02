import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { issueVerificationCode, VerifyError } from "@/lib/verify";
import { rateLimit } from "@/lib/rate-limit";

const schema = z.object({
  email: z.string().email().max(120),
});

export async function POST(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for") ?? "unknown";
  const body = await req.json().catch(() => null);
  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Please provide a valid email." }, { status: 400 });
  }

  const email = parsed.data.email.toLowerCase();
  const rl = rateLimit(`resend:${ip}:${email}`, 3, 60_000);
  if (!rl.allowed) {
    return NextResponse.json(
      { error: "Too many requests. Please wait a moment." },
      {
        status: 429,
        headers: { "Retry-After": String(Math.ceil((rl.resetAt - Date.now()) / 1000)) },
      },
    );
  }

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    return NextResponse.json({ success: true });
  }

  if (user.emailVerified) {
    return NextResponse.json({ success: true });
  }

  const code = await issueVerificationCode(email).catch((err) => {
    if (err instanceof VerifyError) return null;
    console.error("[resend] unexpected:", err);
    return null;
  });

  if (code === null) {
    return NextResponse.json({ error: "Something went wrong. Please try again." }, { status: 500 });
  }

  return NextResponse.json({
    success: true,
    devCode: process.env.NODE_ENV === "production" ? undefined : code,
  });
}
