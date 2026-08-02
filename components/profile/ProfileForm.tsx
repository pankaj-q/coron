"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";

async function processImage(file: File): Promise<string> {
  const url = URL.createObjectURL(file);
  const img = new Image();
  img.src = url;
  await new Promise((res, rej) => {
    img.onload = () => res(null);
    img.onerror = () => rej(new Error("load"));
  });

  const size = 256;
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d");
  if (!ctx) {
    URL.revokeObjectURL(url);
    throw new Error("canvas");
  }

  const min = Math.min(img.width, img.height);
  const sx = (img.width - min) / 2;
  const sy = (img.height - min) / 2;
  ctx.drawImage(img, sx, sy, min, min, 0, 0, size, size);
  URL.revokeObjectURL(url);
  return canvas.toDataURL("image/jpeg", 0.85);
}

export function ProfileForm({
  user,
}: {
  user: { name: string; email: string; image: string | null };
}) {
  const router = useRouter();
  const [name, setName] = useState(user.name);
  const [image, setImage] = useState<string | null>(user.image);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);
  const [dragging, setDragging] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const dirty = name !== user.name || image !== user.image;

  async function handleFile(file: File | undefined | null) {
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      setError("Please choose an image file (JPG, PNG or WebP).");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setError("Image is too large. Keep it under 5 MB.");
      return;
    }
    try {
      const dataUrl = await processImage(file);
      setImage(dataUrl);
      setError(null);
    } catch {
      setError("Couldn't read that image. Try another one.");
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!dirty || loading) return;
    setError(null);
    setSaved(false);
    setLoading(true);

    try {
      const res = await fetch("/api/auth/profile", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, image: image ?? "" }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(data.error ?? "Couldn't save your profile.");
        return;
      }
      setSaved(true);
      router.refresh();
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  const initial = (name.trim() || "U").charAt(0).toUpperCase();

  return (
    <div className="mx-auto max-w-2xl px-5 pb-24 pt-10 sm:px-6">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <a
          href="/dashboard"
          className="mb-4 inline-flex items-center gap-1.5 text-sm text-slate-400 transition-colors hover:text-white"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4">
            <path d="M15 12H3m0 0l6-6m-6 6l6 6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Back to dashboard
        </a>
        <h1 className="font-display text-3xl font-bold tracking-tight text-white">Profile</h1>
        <p className="mt-2 text-slate-400">Your photo and display name across Coron.</p>
      </motion.div>

      <motion.form
        onSubmit={handleSubmit}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03]"
      >
        <div className="border-b border-white/5 px-6 py-5">
          <h2 className="font-display text-lg font-bold text-white">Account details</h2>
        </div>

        <div className="p-6 sm:p-8">
          <div className="flex flex-col items-center gap-6 sm:flex-row sm:items-start">
            <button
              type="button"
              onClick={() => fileRef.current?.click()}
              onDragOver={(e) => {
                e.preventDefault();
                setDragging(true);
              }}
              onDragLeave={() => setDragging(false)}
              onDrop={(e) => {
                e.preventDefault();
                setDragging(false);
                handleFile(e.dataTransfer.files[0]);
              }}
              className={`group relative grid h-32 w-32 shrink-0 place-items-center overflow-hidden rounded-full ring-4 transition-all ${
                dragging
                  ? "ring-cyan-400/70"
                  : "ring-white/10 group-hover:ring-violet-400/60"
              }`}
            >
              {image ? (
                <img src={image} alt={name} className="h-full w-full object-cover" />
              ) : (
                <span className="grid h-full w-full place-items-center bg-gradient-to-br from-violet-600/40 to-cyan-500/40 text-5xl font-bold text-white">
                  {initial}
                </span>
              )}
              <span className="absolute inset-0 grid place-items-center bg-black/55 opacity-0 transition-opacity group-hover:opacity-100">
                <span className="flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur-sm">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-3.5 w-3.5">
                    <path d="M12 16V4m0 0l-4 4m4-4l4 4M4 20h16" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  Change photo
                </span>
              </span>
              <input
                ref={fileRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  handleFile(e.target.files?.[0]);
                  e.target.value = "";
                }}
              />
            </button>

            <div className="flex-1 text-center sm:text-left">
              <h3 className="font-display text-xl font-bold text-white">{name || "Your name"}</h3>
              <p className="mt-0.5 text-sm text-slate-500">{user.email}</p>
              <p className="mt-3 text-sm text-slate-400">
                Click the photo to upload, or drag &amp; drop. Photos are resized to 256&times;256.
              </p>
              {image && (
                <button
                  type="button"
                  onClick={() => setImage(null)}
                  className="mt-3 text-sm font-semibold text-rose-300 transition-colors hover:text-rose-200"
                >
                  Remove photo
                </button>
              )}
            </div>
          </div>

          <div className="mt-8">
            <label htmlFor="name" className="mb-1.5 block text-sm font-semibold text-slate-300">
              Display name
            </label>
            <input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              minLength={2}
              maxLength={60}
              className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3.5 text-base text-white placeholder:text-slate-500 outline-none transition focus:border-violet-400/60 focus:ring-2 focus:ring-violet-500/20"
            />
          </div>

          <div className="mt-6">
            <label htmlFor="email" className="mb-1.5 block text-sm font-semibold text-slate-300">
              Email
            </label>
            <input
              id="email"
              value={user.email}
              disabled
              className="w-full cursor-not-allowed rounded-2xl border border-white/5 bg-white/[0.02] px-4 py-3.5 text-base text-slate-500 outline-none"
            />
            <p className="mt-1.5 text-xs text-slate-500">Your email can&apos;t be changed yet.</p>
          </div>

          <AnimatePresence>
            {error && (
              <motion.p
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-6 overflow-hidden rounded-xl border border-rose-500/30 bg-rose-500/10 px-4 py-3 text-sm text-rose-300"
              >
                {error}
              </motion.p>
            )}
            {saved && (
              <motion.p
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-6 overflow-hidden rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-300"
              >
                Profile saved.
              </motion.p>
            )}
          </AnimatePresence>

          <div className="mt-8 flex items-center gap-3">
            <motion.button
              whileTap={{ scale: 0.97 }}
              type="submit"
              disabled={!dirty || loading}
              className="rounded-2xl bg-emerald-500 px-7 py-3 text-base font-bold text-slate-950 shadow-xl shadow-emerald-500/25 transition-colors hover:bg-emerald-400 disabled:cursor-not-allowed disabled:opacity-40"
            >
              {loading ? "Saving…" : "Save changes"}
            </motion.button>
            {!dirty && (
              <span className="text-sm text-slate-500">No changes yet</span>
            )}
          </div>
        </div>
      </motion.form>
    </div>
  );
}
