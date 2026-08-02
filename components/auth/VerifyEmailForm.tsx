"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { LogoMark } from "@/components/ui/Logo";

const RESEND_COOLDOWN = 30;

export function VerifyEmailForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email") ?? "";
  const urlCode = searchParams.get("code") ?? "";

  const [digits, setDigits] = useState<string[]>(() =>
    /^\d{6}$/.test(urlCode) ? urlCode.split("") : Array(6).fill(""),
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [resent, setResent] = useState(false);
  const [cooldown, setCooldown] = useState(0);
  const [devCode, setDevCode] = useState<string | null>(() =>
    /^\d{6}$/.test(urlCode) ? urlCode : null,
  );
  const inputsRef = useRef<Array<HTMLInputElement | null>>([]);

  useEffect(() => {
    inputsRef.current[0]?.focus();
  }, []);

  useEffect(() => {
    if (cooldown <= 0) return;
    const interval = setInterval(() => setCooldown((c) => Math.max(0, c - 1)), 1000);
    return () => clearInterval(interval);
  }, [cooldown]);

  const code = digits.join("");

  function handleChange(index: number, value: string) {
    const clean = value.replace(/\D/g, "");
    const next = [...digits];
    next[index] = clean.slice(-1);
    setDigits(next);
    if (clean && index < 5) inputsRef.current[index + 1]?.focus();
  }

  function handleKeyDown(index: number, e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Backspace" && !digits[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  }

  function handlePaste(e: React.ClipboardEvent) {
    const text = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
    if (!text) return;
    e.preventDefault();
    const next = Array(6).fill("");
    for (let i = 0; i < text.length; i++) next[i] = text[i];
    setDigits(next);
    inputsRef.current[Math.min(text.length, 5)]?.focus();
  }

  async function handleSubmit(e?: React.FormEvent) {
    e?.preventDefault();
    if (!email || code.length !== 6 || loading) return;
    setError(null);
    setLoading(true);

    try {
      const res = await fetch("/api/auth/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, code }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(data.error ?? "Couldn't verify that code. Try again.");
        setDigits(Array(6).fill(""));
        inputsRef.current[0]?.focus();
        return;
      }
      router.push("/dashboard");
      router.refresh();
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  async function handleResend() {
    if (!email || cooldown > 0 || loading) return;
    setError(null);
    setResent(false);
    try {
      const res = await fetch("/api/auth/resend", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(data.error ?? "Couldn't resend the code.");
        return;
      }
      setResent(true);
      setCooldown(RESEND_COOLDOWN);
      if (/^\d{6}$/.test(data.devCode ?? "")) {
        setDigits(data.devCode.split(""));
        setDevCode(data.devCode);
      }
    } catch {
      setError("Network error. Please try again.");
    }
  }

  return (
    <div className="relative flex min-h-screen items-center justify-center px-5 py-16">
      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="w-full max-w-md"
      >
        <div className="relative">
          <div className="absolute -inset-3 rounded-[2rem] bg-gradient-to-br from-violet-600/30 via-transparent to-cyan-500/30 blur-2xl" />

          <div className="glass-strong glow-border relative rounded-3xl p-8 shadow-2xl shadow-black/50 sm:p-10">
            <div className="mb-8 flex flex-col items-center text-center">
              <motion.div
                initial={{ scale: 0.7, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.15, type: "spring", stiffness: 220 }}
                className="mb-5"
              >
                <LogoMark className="h-14 w-14" />
              </motion.div>
              <h1 className="font-display text-3xl font-bold tracking-tight text-white">
                Verify your email
              </h1>
              <p className="mt-2 text-sm text-slate-400">
                {email ? (
                  <>
                    We sent a 6-digit code to <span className="font-semibold text-slate-200">{email}</span>
                  </>
                ) : (
                  "Enter the 6-digit code from your email."
                )}
              </p>
            </div>

            {devCode && (
              <motion.div
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-5 rounded-xl border border-cyan-500/30 bg-cyan-500/10 px-4 py-3 text-center text-sm text-cyan-200"
              >
                <span className="mb-1 block text-[11px] font-semibold uppercase tracking-wider text-cyan-400">
                  Testing mode — no email needed
                </span>
                Your code is{" "}
                <span className="font-mono text-lg font-bold tracking-[0.3em] text-white">{devCode}</span>
              </motion.div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="flex justify-center gap-2.5" onPaste={handlePaste}>
                {digits.map((d, i) => (
                  <input
                    key={i}
                    ref={(el) => {
                      inputsRef.current[i] = el;
                    }}
                    inputMode="numeric"
                    autoComplete={i === 0 ? "one-time-code" : "off"}
                    maxLength={1}
                    value={d}
                    onChange={(e) => handleChange(i, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(i, e)}
                    disabled={loading}
                    aria-label={`Digit ${i + 1}`}
                    className="h-14 w-11 rounded-xl border border-white/10 bg-white/5 text-center text-xl font-bold text-white outline-none transition focus:border-violet-400/60 focus:ring-2 focus:ring-violet-500/20 disabled:opacity-50 sm:h-16 sm:w-12"
                  />
                ))}
              </div>

              {error && (
                <motion.p
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="rounded-xl border border-rose-500/30 bg-rose-500/10 px-4 py-3 text-center text-sm text-rose-300"
                >
                  {error}
                </motion.p>
              )}

              {resent && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-3 text-center text-sm text-emerald-300"
                >
                  A new code is on its way.
                </motion.p>
              )}

              <button
                type="submit"
                disabled={code.length !== 6 || loading}
                className="group relative w-full overflow-hidden rounded-2xl bg-gradient-to-r from-violet-600 via-fuchsia-500 to-cyan-500 bg-[length:200%_auto] px-6 py-3.5 text-base font-bold text-white shadow-xl shadow-violet-600/30 transition-all hover:bg-right active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-70"
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  {loading && (
                    <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-90" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
                    </svg>
                  )}
                  {loading ? "Verifying…" : "Verify & continue"}
                </span>
                <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
              </button>
            </form>

            <div className="mt-6 flex items-center justify-center gap-2 text-sm text-slate-400">
              <span>Didn&apos;t get it?</span>
              <button
                onClick={handleResend}
                disabled={cooldown > 0 || loading}
                className="font-semibold text-cyan-300 transition-colors hover:text-cyan-200 disabled:cursor-not-allowed disabled:text-slate-500"
              >
                {cooldown > 0 ? `Resend in ${cooldown}s` : "Resend code"}
              </button>
            </div>
          </div>
        </div>

        <Link
          href="/login"
          className="mt-6 flex items-center justify-center gap-2 text-sm text-slate-400 transition-colors hover:text-white"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4">
            <path d="M19 12H5m0 0l6-6m-6 6l6 6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Back to log in
        </Link>
      </motion.div>
    </div>
  );
}
