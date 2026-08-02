import { cache } from "react";
import { cookies } from "next/headers";
import { decrypt, SESSION_COOKIE, type SessionPayload } from "@/lib/session";

export const getSession = cache(async (): Promise<SessionPayload | null> => {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE)?.value;
  return decrypt(token);
});
