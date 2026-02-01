# TalentMap (Utoe)

A visual talent discovery platform for startup tech hiring in Japan. Recruiters explore student profiles on an interactive, clustered map instead of scrolling resumes.

## Features
- Interactive D3 talent map with clustered nodes, hover previews, and zoom/pan.
- Profile builder with multi-step onboarding, live preview, and GitHub import.
- Recruiter dashboard with saved candidates, search, filters, and CSV/JSON export.
- Clerk authentication with protected routes.
- Supabase-backed persistence (students, projects, saved candidates).

## Tech Stack
- Next.js 15 (App Router)
- React 18
- D3.js
- Tailwind CSS
- Clerk Auth
- Supabase

## Getting Started
1. Install dependencies:
   ```bash
   npm install
   ```

2. Configure environment variables:
   ```bash
   cp .env.example .env
   ```
   Fill in values for:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY` (used for seeding)
   - `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`
   - `CLERK_SECRET_KEY`

3. Run the dev server:
   ```bash
   npm run dev
   ```
   App defaults to http://localhost:3000

## Supabase Setup
- Apply schema: `supabase/schema.sql`
- In Clerk, create a JWT template named `supabase` for Supabase Auth.
- Seed sample data (optional):
  ```bash
  npm run seed
  ```
  To reset tables first:
  ```bash
  SEED_RESET=true npm run seed
  ```

## Project Structure (high-level)
```
src/
├── app/                 # Next.js routes (App Router)
├── pages/               # Feature modules reused by app routes
├── components/          # Shared UI components
├── contexts/            # Data + recruiter context providers
├── data/                # Mock data and tech stack definitions
├── lib/                 # Supabase client
└── styles/              # Global styles
```

## Scripts
- `npm run dev` - start Next dev server
- `npm run build` - production build
- `npm run start` - run production server
- `npm run seed` - push mock data into Supabase
