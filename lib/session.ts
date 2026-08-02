import { SignJWT, jwtVerify } from "jose";

const secretKey = process.env.AUTH_SECRET ?? "dev-only-insecure-secret";
const encodedKey = new TextEncoder().encode(secretKey);

export type SessionPayload = {
  userId: string;
  name: string;
  email: string;
  image?: string | null;
};

const SESSION_TTL = 60 * 60 * 24 * 30;

export async function encrypt(payload: SessionPayload) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(`${SESSION_TTL}s`)
    .sign(encodedKey);
}

export async function decrypt(token?: string) {
  if (!token) return null;
  try {
    const { payload } = await jwtVerify(token, encodedKey, {
      algorithms: ["HS256"],
    });
    return payload as unknown as SessionPayload;
  } catch {
    return null;
  }
}

export const SESSION_COOKIE = "session";
