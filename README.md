# PlanPilot 🚀

An AI-powered smart planner. Type a goal → Gemini builds a **prioritized, perfectly-timed, step-by-step plan** → see it as a living 3D-styled animated timeline: what to do, when to do it, how to do it, and in what order — at a glance.

Built with **Next.js 16 · React 19 · Tailwind v4 · Framer Motion · React Three Fiber · Prisma + SQLite · Gemini AI**.

## Features
- 🎬 Animated landing page with a real-time **3D hero** (React Three Fiber)
- 🔐 User accounts (signup / login) — hashed passwords (bcrypt) + signed JWT session cookies
- 🧠 Gemini builds a structured plan: steps, priority (high/medium/low), time slots, how-to, durations
- ✨ Animated plan timeline that **draws itself**, pulsing "up next" step, priority glow
- 🎉 Confetti on every check-off + a completion celebration
- 📊 Live progress ring, dashboard stats, per-user storage
- 🛡️ Rate limiting on auth + plan-generation APIs, route protection via `proxy`
- 💾 Storage: **SQLite per-user** (Prisma). Swap to PostgreSQL by changing the adapter.

## Setup
```bash
npm install

# 1. Configure environment (copy the template)
cp .env.example .env

# 2. Add your Gemini key to .env
GEMINI_API_KEY="your-real-key"
GEMINI_MODEL="gemini-2.5-pro"   # or gemini-1.5-pro / gemini-2.0-flash

# 3. Generate a real session secret
openssl rand -base64 32   # paste into AUTH_SECRET

# 4. Init database (already migrated for fresh clones)
npx prisma migrate deploy

# 5. Run
npm run dev        # → http://localhost:3000
npm run build      # production build
```

## Project layout
```
app/
  page.tsx                  # landing (3D hero, how-it-works, features, showcase)
  login/ · signup/          # glassmorphism auth
  dashboard/                # plan list + create form
  dashboard/plans/[id]/     # animated plan timeline
  api/auth/{register,login,logout}/
  api/plans/                # list / create (calls Gemini)
  api/plans/[id]/           # get / toggle step / delete
components/
  landing/  dashboard/  plan/  auth/  ui/
lib/
  prisma.ts  session.ts  dal.ts  gemini.ts  prompt.ts  rate-limit.ts  serialize.ts  types.ts
proxy.ts                  # auth redirects (Next 16 replaces middleware)
prisma/schema.prisma      # User / Plan / Step
```

## Storage notes
- Plans are stored per-user in SQLite (`dev.db`).
- If you add file attachments later, AWS S3 slots in via `@aws-sdk/client-s3` — no schema change needed.

## Security
- Passwords hashed with bcrypt (10 rounds); sessions are httpOnly, sameSite cookies signed with JWT
- Rate limits: register 10/min · login 15/min · plan generation 6/5min · updates 60/min (per IP/user)
- Route handlers re-verify session + plan ownership on every request
