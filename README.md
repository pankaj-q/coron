# Coron

> AI-powered smart planner — type a goal, let Gemini turn it into a prioritized, perfectly-timed plan.

Coron takes a single sentence like *"prepare for my data-science interview on Friday"* and produces a living, step-by-step plan: **what to do, when to do it, how to do it, and in what order** — rendered as an animated 3D-style timeline with priority levels (high / medium / low), time slots, and live progress tracking.

---

## Features

### 🧠 AI planning engine
- Gemini builds a structured, JSON-validated plan: steps with how-to guidance, time windows, durations, and priority
- Model fallback chain (`GEMINI_MODEL` → `gemini-2.5-pro` → `gemini-2.5-flash` → `gemini-2.0-flash`) keeps generation resilient
- Strict-JSON prompt with deterministic parsing and value clamping

### 🎨 Experience
- Cinematic landing page with a **real-time 3D hero** (React Three Fiber), scroll-reveal sections, GSAP-powered footer
- Plan timeline that **draws itself**, pulsing "up next" step, priority glow, live progress ring
- 🎉 Confetti on every check-off and a completion celebration
- Fully responsive dark glassmorphism design system

### 🔐 Accounts & security
- Signup / login with bcrypt-hashed passwords and signed JWT session cookies (httpOnly, sameSite)
- **Email verification** with 6-digit codes sent via **Resend** (dev-mode fallback prints the code on-screen — no domain required for testing)
- **User profiles** with avatar upload (client-side resized to 256×256) and display-name editing
- In-memory **rate limiting** on every auth & plan API
- Route protection via Next.js 16 `proxy`; server-side ownership checks on every plan request

### 💾 Storage
- Per-user persistence in **SQLite** via Prisma 7 (`dev.db`), including avatar images
- Swap to PostgreSQL by changing the datasource adapter — no code changes required

---

## Tech stack

| Layer | Technology |
| --- | --- |
| Framework | Next.js 16 (Turbopack, App Router) · React 19 |
| Styling | Tailwind CSS v4 |
| Animation | Framer Motion · GSAP (ScrollTrigger) |
| 3D | React Three Fiber · drei |
| Database / ORM | SQLite · Prisma 7 (better-sqlite3 adapter) |
| Auth | jose (JWT) · bcryptjs |
| AI | @google/generative-ai |
| Email | Resend |
| Validation | zod |
| Extras | canvas-confetti |

---

## Getting started

### Prerequisites
- Node.js 20+
- A [Google AI Studio](https://aistudio.google.com/) API key for Gemini
- *(Optional)* A [Resend](https://resend.com/) API key for real verification emails

### Installation

```bash
# 1. Install dependencies
npm install

# 2. Copy the environment template
cp .env.example .env

# 3. Fill in your keys (see Configuration)
# 4. Apply the database schema
npx prisma migrate deploy

# 5. Start the dev server
npm run dev          # → http://localhost:3000
```

### Configuration

| Variable | Required | Description |
| --- | --- | --- |
| `DATABASE_URL` | ✅ | SQLite file path (`file:./dev.db`) |
| `GEMINI_API_KEY` | ✅ | Gemini API key from Google AI Studio |
| `GEMINI_MODEL` | ✅ | Model name, e.g. `gemini-2.5-pro` |
| `AUTH_SECRET` | ✅ | 32-byte secret — `openssl rand -base64 32` |
| `RESEND_API_KEY` | optional | Enables real verification emails |
| `RESEND_FROM_EMAIL` | optional | Verified sender, e.g. `Coron <noreply@yourdomain.com>` |

> **No Resend key?** Verification codes are logged to the server console *and* shown on the verify page ("Testing mode") so you can test the full flow locally.

---

## Project layout

```
app/
├── page.tsx                    # Landing (3D hero, features, showcase)
├── login/ · signup/            # Glassmorphism auth
├── verify-email/               # 6-digit code verification
├── dashboard/                  # Plan list, create form, stats
├── dashboard/plans/[id]/       # Animated plan timeline
├── dashboard/profile/          # Profile & avatar editing
└── api/
    ├── auth/register · login · logout · verify · resend · profile
    └── plans/ · plans/[id]/    # CRUD + Gemini generation
components/
├── landing/ · dashboard/ · plan/ · auth/ · profile/ · ui/
lib/
├── prisma.ts · session.ts · dal.ts
├── gemini.ts · prompt.ts · verify.ts · mail.ts
├── rate-limit.ts · serialize.ts · types.ts
proxy.ts                        # Auth redirects (Next 16 replaces middleware)
prisma/schema.prisma            # User / VerificationCode / Plan / Step
```

---

## API overview

| Method | Endpoint | Purpose | Rate limit |
| --- | --- | --- | --- |
| POST | `/api/auth/register` | Create account + send verification code | 10/min |
| POST | `/api/auth/login` | Sign in (blocked until email verified) | 15/min |
| POST | `/api/auth/logout` | Destroy session | — |
| POST | `/api/auth/verify` | Verify 6-digit code, create session | 8/min |
| POST | `/api/auth/resend` | Re-issue verification code | 3/min |
| PATCH | `/api/auth/profile` | Update name / avatar | 10/min |
| GET/POST | `/api/plans` | List / create plans (POST calls Gemini) | 6/5min |
| GET/PATCH/DELETE | `/api/plans/[id]` | Fetch / update / delete a plan | 60/min |

---

## Security

- Passwords hashed with **bcrypt** (10 rounds); sessions are httpOnly, sameSite, signed JWTs (HS256, 30-day)
- Verification codes stored as **SHA-256 hashes**, expire after 15 minutes, single-use; old codes invalidate on resend
- Avatar uploads validated (type + size) and stored in-database as data URLs
- Every plan route re-verifies the session and **plan ownership** before reading or mutating
- In-memory rate limiting protects registration, login, verification, and plan generation endpoints

---

## Scripts

```bash
npm run dev      # Start dev server (Turbopack, port 3000)
npm run build    # Production build
npm run start    # Serve the production build
npx tsc --noEmit # Typecheck
npx eslint .     # Lint
```

---

## Roadmap

- [x] Email verification
- [x] User profiles & avatar upload
- [ ] Change email / password
- [ ] PostgreSQL adapter + hosted deploys
- [ ] File attachments (S3)

---

<p align="center"><sub>Built with Next.js, React Three Fiber & Gemini. Not affiliated with Google.</sub></p>
