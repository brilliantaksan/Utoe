# Implementation Plan: Visual Talent Map for Startup Tech Hiring in Japan

## Product Positioning
**"A visual talent map for startup tech hiring in Japan — see real builders, not resumes."**

This is NOT a job board. This is NOT an ATS. This is a visual exploration platform that reimagines early-career tech hiring by replacing resume lists with an interactive, project-driven talent map.

---

## Feature Analysis

### Identified Features:

#### Core Features (Must-Have for Hackathon MVP)
1. **Landing Page** - Clear value proposition with CTA
2. **Student Profile Builder** - Auth + GitHub integration + project showcase
3. **Visual Talent Map** - Interactive 2D clustered visualization (THE differentiator)
4. **Recruiter Browse View** - Filter, explore, save candidates
5. **Student Detail Panel** - Project-based "super-resume"

#### Secondary Features (Should-Have)
6. **Contact/Messaging Stub** - Basic recruiter-to-student connection
7. **Bookmark/Save System** - Recruiters save interesting candidates
8. **Filter System** - Tech stack, project type, availability

#### Nice-to-Have (Post-Hackathon)
9. **GitHub Auto-Import** - Pull repos and analyze tech stack
10. **Advanced Clustering** - ML-based similarity grouping
11. **Analytics Dashboard** - Profile views, engagement metrics

---

### Feature Categorization:

**Must-Have Features (Hackathon Demo):**
- Landing page with clear positioning
- Student profile creation (manual input)
- Visual talent map with clustering
- Recruiter exploration interface
- Student detail view (project-centric)

**Should-Have Features (Polish):**
- Save/bookmark functionality
- Basic filtering
- Contact button/email stub

**Nice-to-Have Features (Future):**
- GitHub API auto-import
- Advanced analytics
- Messaging system
- Recommendation engine

---

## Recommended Tech Stack

### Frontend
- **Framework:** React 18 + Vite
- **Justification:** Already in your template, fast dev server, perfect for hackathons
- **Documentation:** https://react.dev/ | https://vitejs.dev/

### Visualization Library
- **Library:** D3.js v7 (force-directed graph)
- **Justification:** Industry standard for interactive data viz, Observable-style interactions
- **Documentation:** https://d3js.org/
- **Alternative:** react-force-graph (simpler, less control)
- **Documentation:** https://github.com/vasturiano/react-force-graph

### Styling
- **Framework:** Tailwind CSS (already configured)
- **Justification:** Rapid prototyping, matches your design.json system
- **Documentation:** https://tailwindcss.com/

### Backend/Database
- **Option 1 (Recommended):** Supabase
  - **Justification:** Instant Postgres + Auth + real-time, zero backend code
  - **Documentation:** https://supabase.com/docs
- **Option 2:** JSON file + localStorage (fastest for demo)
  - **Justification:** Zero setup, works offline, perfect for hackathon
  - **Documentation:** Native browser APIs

### Routing
- **Library:** React Router v6 (already in template)
- **Documentation:** https://reactrouter.com/

### State Management
- **Library:** React Context + useState (keep it simple)
- **Justification:** No need for Redux/Zustand for MVP scope
- **Documentation:** https://react.dev/reference/react/useContext

---

## Implementation Stages

### Stage 1: Foundation & Data Model
**Duration:** 2-3 hours  
**Dependencies:** None

#### Sub-steps:
- [ ] Clean up existing job board pages (remove unused routes)
- [ ] Update design.json for talent map aesthetic (keep neumorphic base, adjust for exploration UI)
- [ ] Define data models (User, StudentProfile, Project, RecruiterProfile, SavedCandidate)
- [ ] Create mock data generator (20-30 realistic student profiles with projects)
- [ ] Set up data context/provider for global state
- [ ] Update routing structure (/, /profile/create, /map, /recruiter, /student/:id)

**Key Files to Create:**
- `src/data/mockData.js` - Sample students with projects
- `src/contexts/DataContext.jsx` - Global data provider
- `src/models/types.js` - TypeScript-style JSDoc types

---

### Stage 2: Landing Page & Value Prop
**Duration:** 1-2 hours  
**Dependencies:** Stage 1 completion

#### Sub-steps:
- [ ] Create landing page component (`src/pages/landing/index.jsx`)
- [ ] Hero section: "Visualize talent, don't scroll resumes"
- [ ] Problem/solution split (students vs recruiters)
- [ ] Visual preview/teaser of the talent map
- [ ] Dual CTAs: "Create Builder Profile" + "Explore Talent Map"
- [ ] Add simple navigation header

**Design Reference:**
- Clean, modern, anti-corporate aesthetic
- Use gradient backgrounds from design.json
- Emphasize visual-first approach

---

### Stage 3: Visual Talent Map (Core Differentiator)
**Duration:** 4-6 hours  
**Dependencies:** Stage 1 completion

#### Sub-steps:
- [ ] Install D3.js or react-force-graph
- [ ] Create TalentMap component (`src/pages/talent-map/index.jsx`)
- [ ] Implement force-directed graph layout
- [ ] Node rendering: student avatars/initials + tech stack color coding
- [ ] Clustering logic: group by primary tech stack (React, Rust, ML, etc.)
- [ ] Hover interactions: show student name + key tech stack
- [ ] Click interaction: open detail panel (Figma-style side panel)
- [ ] Zoom/pan controls
- [ ] Add filter sidebar (tech stack checkboxes)
- [ ] Filter updates re-cluster the map in real-time

**Technical Notes:**
- Use `d3.forceSimulation()` for physics
- Color nodes by tech stack category
- Size nodes by project count (optional)
- Keep it performant (30-50 nodes max for demo)

**UI Pattern:**
```
┌─────────────────────────┬──────────────────┐
│   Filters               │  Talent Map      │
│   □ React               │  [Interactive    │
│   □ Rust                │   Force Graph]   │
│   □ ML/AI               │                  │
│   □ Infra               │                  │
└─────────────────────────┴──────────────────┘
```

---

### Stage 4: Student Profile Builder
**Duration:** 3-4 hours  
**Dependencies:** Stage 1 completion

#### Sub-steps:
- [ ] Create profile builder page (`src/pages/profile-builder/index.jsx`)
- [ ] Simple auth stub (email input, no real auth for MVP)
- [ ] Multi-step form:
  - Step 1: Basic info (name, location, GitHub username)
  - Step 2: Add projects (title, description, tech stack tags, impact)
  - Step 3: Availability & bio
- [ ] Tech stack tag selector (predefined list: React, Vue, Rust, Go, Python, ML, etc.)
- [ ] Project card preview as you type
- [ ] Save to localStorage or mock API
- [ ] Redirect to talent map after completion

**Form Fields:**
- Name, email, location, GitHub URL
- Bio (150 chars)
- Availability (Available, Open to Offers, Not Looking)
- Projects: Title, Description, Tech Stack (multi-select), Impact statement

---

### Stage 5: Student Detail Panel
**Duration:** 2-3 hours  
**Dependencies:** Stage 3 completion

#### Sub-steps:
- [ ] Create StudentDetail component (`src/components/StudentDetail.jsx`)
- [ ] Side panel layout (Figma-style inspector)
- [ ] Header: Avatar, name, location, availability badge
- [ ] Bio section
- [ ] Projects section: Card-based layout
  - Project title
  - Tech stack tags
  - Description
  - Impact statement
  - GitHub link (if available)
- [ ] Contact button (email stub)
- [ ] Close button returns to map view
- [ ] Smooth slide-in animation

**Design:**
- White card with soft shadow
- Project cards use neumorphic style from design.json
- Tech stack tags: pill-shaped, color-coded
- GitHub icon links

---

### Stage 6: Recruiter View & Filtering
**Duration:** 2-3 hours  
**Dependencies:** Stage 3, Stage 5 completion

#### Sub-steps:
- [ ] Create recruiter dashboard (`src/pages/recruiter/index.jsx`)
- [ ] Embed talent map component
- [ ] Add recruiter-specific controls:
  - Save/bookmark button on student detail panel
  - Saved candidates list (sidebar or separate view)
  - Filter by availability
  - Filter by tech stack (multi-select)
- [ ] Saved candidates view: List of bookmarked students
- [ ] Contact action: Opens email client with pre-filled subject

**Recruiter Features:**
- Visual exploration (same map as public view)
- Bookmark candidates
- Filter and search
- Export saved list (stretch goal)

---

### Stage 7: Polish & Demo Prep
**Duration:** 2-3 hours  
**Dependencies:** All previous stages

#### Sub-steps:
- [ ] Add loading states and transitions
- [ ] Responsive design tweaks (mobile-friendly map is hard, focus on desktop)
- [ ] Add empty states (no projects, no saved candidates)
- [ ] Create demo script and walkthrough flow
- [ ] Seed realistic mock data (20-30 students, diverse tech stacks)
- [ ] Test full user journey:
  - Student creates profile
  - Recruiter explores map
  - Recruiter clicks student
  - Recruiter saves candidate
- [ ] Add subtle animations (hover effects, panel transitions)
- [ ] Final design pass: colors, spacing, shadows

**Demo Flow (3-5 minutes):**
1. Show landing page → explain problem
2. Click "Explore Talent Map" → show visual clustering
3. Hover over nodes → show quick info
4. Click a Rust engineer → detail panel opens
5. Show projects, tech stack, GitHub
6. Click "Save Candidate" (recruiter view)
7. Show saved list
8. Explain: "This is signal over noise"

---

## Resource Links

### Core Technologies
- [React Documentation](https://react.dev/)
- [Vite Documentation](https://vitejs.dev/)
- [D3.js Documentation](https://d3js.org/)
- [D3 Force Simulation](https://d3js.org/d3-force)
- [Tailwind CSS](https://tailwindcss.com/)

### Visualization Inspiration
- [Observable Force-Directed Graph](https://observablehq.com/@d3/force-directed-graph)
- [D3 Graph Gallery](https://d3-graph-gallery.com/network.html)
- [react-force-graph Examples](https://github.com/vasturiano/react-force-graph)

### UI/UX References
- [Figma Inspector Panel Pattern](https://www.figma.com/)
- [Miro Canvas Interactions](https://miro.com/)
- [Kumu Network Maps](https://kumu.io/)

### Database Options
- [Supabase Quickstart](https://supabase.com/docs/guides/getting-started/quickstarts/reactjs)
- [Supabase Auth](https://supabase.com/docs/guides/auth)

### Deployment
- [Vercel Deployment](https://vercel.com/docs)
- [Netlify Deployment](https://docs.netlify.com/)

---

## Success Metrics (Hackathon Judging)

### Technical Execution
- ✅ Working visual map with real interactions
- ✅ Smooth hover/click/zoom UX
- ✅ Clean, modern UI matching design system
- ✅ No broken links or console errors

### Product Clarity
- ✅ Judges immediately understand: "This is NOT a job board"
- ✅ Value prop is crystal clear in 30 seconds
- ✅ Visual clustering shows obvious signal (Rust devs here, React devs there)

### Demo Impact
- ✅ "Wow" moment when map appears
- ✅ Judges can explore themselves
- ✅ Student profiles feel authentic (real projects, not fluff)
- ✅ Solves a real pain point (resume black hole)

---

## Critical Path (Minimum Viable Demo)

If time is tight, prioritize in this order:

1. **Talent Map** (Stage 3) - This IS the product
2. **Student Detail Panel** (Stage 5) - Shows the "super-resume"
3. **Mock Data** (Stage 1) - Needs to feel real
4. **Landing Page** (Stage 2) - Sets up the pitch
5. **Profile Builder** (Stage 4) - Nice to have, but map is more important
6. **Recruiter Features** (Stage 6) - Can be simplified to just "explore + click"

**Absolute Minimum:**
- Landing page
- Talent map with 20 students
- Click node → see projects
- That's it. That's the demo.

---

## Notes for Implementation

### Design Philosophy
- **Visual > Textual** - Show, don't tell
- **Projects > Resumes** - Evidence over claims
- **Exploration > Search** - Discovery, not filtering
- **Startup Mindset** - Anti-corporate, anti-ATS

### Technical Constraints
- Keep it simple: No complex backend for MVP
- Optimize for demo: 30-50 nodes max
- Desktop-first: Mobile can wait
- Real data feel: Mock data must be believable

### Hackathon Strategy
- Build the map FIRST (it's the differentiator)
- Polish the demo flow, not every edge case
- Have a backup plan (screenshots if live demo fails)
- Practice the pitch: "Visualize talent, don't scroll resumes"

---

**Ready to ship. Let's build.**
