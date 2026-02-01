# Handoff Notes (TalentMap)

## Overview
TalentMap is a visual talent discovery platform for startup tech hiring in Japan. It is not a job board or ATS. Recruiters explore student profiles on a clustered, interactive map.

**Positioning:** "A visual talent map for startup tech hiring in Japan — see real builders, not resumes."

## Current Status

### ✅ Completed
- **Foundation:** mock data, tech stack definitions, Data/Recruiter contexts.
- **Landing:** warm, human-centered hero + CTA flow.
- **Talent Map:** D3 force layout with cluster halos + labels, networked clusters, zoom/pan + auto-fit, hover previews, saved glow, and “freeze layout”.
- **Profile Builder:** multi-step form with validation, live preview, GitHub import, and draft autosave.
- **Recruiter Dashboard:** saved candidates, search/filter, export, and embedded map.
- **Auth + Persistence:** Clerk auth, Supabase persistence, seed script.

### 🚧 In Progress / Next
- Performance tuning for large datasets.
- Map clarity at low zoom (cluster-only mode, labels, counts).
- Mobile-first map UX polish.
- Testing + CI.

## Tech Stack
- **Framework:** Next.js 15 (App Router)
- **UI:** React 18 + Tailwind CSS
- **Visualization:** D3 v7
- **Auth:** Clerk
- **Data:** Supabase

## Key Routes
- `/` Landing
- `/map` Talent Map
- `/profile/create` Profile Builder
- `/recruiter` Recruiter Dashboard
- `/sign-in`, `/sign-up` Clerk auth

## Project Structure (high-level)
```
src/
├── app/                 # Next.js routes
├── pages/               # Feature modules reused by app routes
├── components/          # Shared UI components
├── contexts/            # Data + recruiter providers
├── data/                # Mock data + tech stack definitions
├── lib/                 # Supabase client
└── styles/              # Global styles
```

## Key Files
- `src/pages/talent-map/components/ForceGraph.jsx` - D3 map core.
- `src/components/recruiter/RecruiterDashboard.jsx` - Recruiter workspace.
- `src/pages/profile-builder/*` - Profile builder steps + preview.
- `src/contexts/RecruiterContext.jsx` - Supabase-backed saves.
- `scripts/seedSupabase.js` - Supabase seed script.
- `supabase/schema.sql` - Schema.

## Dev Commands
```bash
npm run dev
npm run build
npm run start
npm run seed
```

## Environment Vars
Use `.env.example` to configure:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY` (seed script)
- `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`
- `CLERK_SECRET_KEY`
