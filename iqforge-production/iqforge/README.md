# IQForge

Production-oriented cognitive assessment SaaS built with Next.js, TypeScript, PostgreSQL, Prisma and OpenAI.

## Important validity note
IQForge deliberately separates raw performance, estimated ability and normative/clinical IQ. The included scoring is IRT-inspired and configurable, but it is **not** a clinically standardized IQ test. Do not market the generated ability range as a diagnostic IQ score without validated norms, representative calibration data, reliability analysis and appropriate professional review.

## Stack
- Next.js App Router + TypeScript
- Tailwind CSS
- Prisma + PostgreSQL (Supabase/Neon compatible)
- Custom secure JWT session cookie
- Google OAuth + email/password
- OpenAI structured JSON analysis
- Recharts
- Vitest

## Setup
1. Install Node 20+.
2. Create a PostgreSQL database.
3. Copy `.env.example` to `.env.local` and fill `DATABASE_URL` and `SESSION_SECRET`.
4. Optional: configure `OPENAI_API_KEY` for AI analysis and `GOOGLE_CLIENT_ID/SECRET` for Google OAuth.
5. Run:

```bash
npm install
npx prisma generate
npx prisma db push
npm run db:seed
npm run dev
```

Open http://localhost:3000.

## Google OAuth
Set Google OAuth redirect URI to:
`https://YOUR_DOMAIN/api/auth/google/callback`

## Vercel
- Import the repository into Vercel.
- Set all variables from `.env.example` in Project Settings.
- Use a managed PostgreSQL provider such as Neon or Supabase.
- Run `prisma db push` or a migration in your deployment workflow before using the app.
- Set `NEXT_PUBLIC_APP_URL` to the deployed HTTPS origin.

## Architecture
`lib/scoring` owns deterministic scoring. `lib/adaptive` owns question selection. `lib/ai` only interprets the already-computed data. This separation is intentional: an LLM must never be the authority for an official assessment score.

## Security
Mutating API routes check same-origin headers where applicable, sessions are HTTP-only and SameSite, passwords are bcrypt-hashed, Prisma parameterizes database queries, and the OpenAI key is server-only.

For a larger production deployment, replace the database-backed rate limiter with a distributed Redis limiter and add transactional email delivery for verification/reset flows.

## Included product areas
Landing, email/password auth, Google OAuth, password reset, protected dashboard, adaptive assessment flow, deterministic IRT-inspired scoring, AI analysis with schema validation and fallback, result review, practice mode, AI coach, daily challenge, profile, admin metrics, SEO metadata, security headers and unit tests.

The repository is intentionally not claiming clinical validity. Normative calibration is a separate research/validation project.
