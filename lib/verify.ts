import { createHash, randomInt } from "node:crypto";
import { prisma } from "@/lib/prisma";
import { sendVerificationCode } from "@/lib/mail";

const CODE_TTL_MS = 15 * 60 * 1000;

export function generateCode() {
  return String(randomInt(100000, 1000000));
}

function hashCode(code: string) {
  return createHash("sha256").update(code).digest("hex");
}

export class VerifyError extends Error {
  constructor(public code: "USER_NOT_FOUND" | "EXPIRED" | "INVALID") {
    super(code);
  }
}

export async function issueVerificationCode(email: string): Promise<string> {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) throw new VerifyError("USER_NOT_FOUND");

  await prisma.verificationCode.updateMany({
    where: { userId: user.id, used: false },
    data: { used: true },
  });

  const code = generateCode();
  await prisma.verificationCode.create({
    data: {
      userId: user.id,
      codeHash: hashCode(code),
      expiresAt: new Date(Date.now() + CODE_TTL_MS),
    },
  });

  await sendVerificationCode({ to: user.email, name: user.name, code });
  return code;
}

export async function verifyEmailCode(email: string, code: string) {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) throw new VerifyError("INVALID");

  const record = await prisma.verificationCode.findFirst({
    where: { userId: user.id, used: false },
    orderBy: { createdAt: "desc" },
  });

  if (!record) throw new VerifyError("INVALID");
  if (record.expiresAt < new Date()) throw new VerifyError("EXPIRED");
  if (hashCode(code) !== record.codeHash) throw new VerifyError("INVALID");

  await prisma.$transaction([
    prisma.verificationCode.update({ where: { id: record.id }, data: { used: true } }),
    prisma.user.update({ where: { id: user.id }, data: { emailVerified: new Date() } }),
  ]);

  return user;
}
