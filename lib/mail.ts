import { Resend } from "resend";

const apiKey = process.env.RESEND_API_KEY;
const fromEmail = process.env.RESEND_FROM_EMAIL;

const resend = apiKey ? new Resend(apiKey) : null;

function buildHtml(name: string, code: string) {
  return `
    <div style="font-family:Arial,sans-serif;background:#0b0d1a;color:#e5e7eb;padding:32px;border-radius:16px;max-width:480px;margin:0 auto;">
      <h2 style="margin:0 0 8px;color:#ffffff;">Hey ${name},</h2>
      <p style="margin:0 0 24px;font-size:15px;line-height:1.6;">
        Use the code below to verify your Coron account. It expires in 15 minutes.
      </p>
      <div style="font-size:32px;font-weight:800;letter-spacing:12px;color:#22d3ee;background:#10122a;border:1px solid #1f2340;border-radius:12px;padding:16px;text-align:center;">
        ${code}
      </div>
      <p style="margin:24px 0 0;font-size:13px;color:#64748b;">
        If you didn't create a Coron account, you can safely ignore this email.
      </p>
    </div>
  `;
}

function logToConsole(opts: { to: string; name: string; code: string }) {
  const { to, name, code } = opts;
  console.log(`\n[Coron dev] Verification code for ${to} (${name}): ${code}\n`);
}

export async function sendVerificationCode(opts: {
  to: string;
  name: string;
  code: string;
}): Promise<boolean> {
  const { to, name, code } = opts;

  if (!resend) {
    logToConsole(opts);
    return false;
  }

  const fallbackFrom = "Coron <onboarding@resend.dev>";
  const attempts = Array.from(
    new Set([fromEmail, fallbackFrom].filter((f): f is string => Boolean(f))),
  );

  for (const from of attempts) {
    try {
      const res = await resend.emails.send({
        from,
        to,
        subject: "Your Coron verification code",
        html: buildHtml(name, code),
      });
      if (res.error) throw new Error(res.error.message);
      return true;
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      console.error(`[mail] Resend send failed via ${from}: ${msg}`);
    }
  }

  logToConsole(opts);
  return false;
}
