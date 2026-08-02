import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { verifyEmailCode, VerifyError } from "@/lib/verify";
import { encrypt, SESSION_COOKIE } from "@/lib/session";
import { rateLimit } from "@/lib/rate-limit";

const schema = z.object({
  email: z.string().email().max(120),
  code: z.string().regex(/^\d{6}$/, "Code must be 6 digits."),
});

export async function POST(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for") ?? "unknown";
  const body = await req.json().catch(() => null);
  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Please enter the 6-digit code from your email." }, { status: 400 });
  }

  const email = parsed.data.email.toLowerCase();
  const rl = rateLimit(`verify:${ip}:${email}`, 8, 60_000);
  if (!rl.allowed) {
    return NextResponse.json(
      { error: "Too many attempts. Please try again later." },
      {
        status: 429,
        headers: { "Retry-After": String(Math.ceil((rl.resetAt - Date.now()) / 1000)) },
      },
    );
  }

  try {
    const user = await verifyEmailCode(email, parsed.data.code);
    const token = await encrypt({
      userId: user.id,
      name: user.name,
      email: user.email,
      image: user.image,
    });
    const res = NextResponse.json({ success: true });
    res.cookies.set(SESSION_COOKIE, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 30,
    });
    return res;
  } catch (err) {
    if (err instanceof VerifyError) {
      const message =
        err.code === "EXPIRED"
          ? "That code has expired. Request a new one."
          : "That code is incorrect. Please check your email and try again.";
      return NextResponse.json({ error: message }, { status: 400 });
    }
    console.error("[verify] unexpected:", err);
    return NextResponse.json({ error: "Something went wrong. Please try again." }, { status: 500 });
  }
}
