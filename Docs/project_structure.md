# Project Structure: Visual Talent Map

## Root Directory Structure

```
visual-talent-map/
├── public/
│   └── assets/
│       ├── images/
│       ├── favicon.ico
│       ├── manifest.json
│       └── robots.txt
├── src/
│   ├── components/
│   ├── contexts/
│   ├── data/
│   ├── hooks/
│   ├── models/
│   ├── pages/
│   ├── styles/
│   ├── utils/
│   ├── App.jsx
│   ├── Routes.jsx
│   └── index.jsx
├── Docs/
│   ├── Implementation.md
│   ├── project_structure.md
│   ├── UI_UX_doc.md
│   └── Bug_tracking.md
├── .gitignore
├── design.json
├── index.html
├── package.json
├── tailwind.config.js
├── vite.config.mjs
└── README.md
```

---

## Detailed Structure

### `/src/components/` - Reusable UI Components

```
components/
├── ui/
│   ├── Button.jsx              # Primary/secondary buttons
│   ├── Input.jsx               # Form inputs
│   ├── Select.jsx              # Dropdowns
│   ├── Badge.jsx               # Tech stack tags, availability badges
│   ├── Card.jsx                # Project cards, stat cards
│   ├── Modal.jsx               # Overlays, dialogs
│   └── Header.jsx              # Global navigation
├── StudentDetail.jsx           # Side panel for student profiles
├── TechStackTag.jsx            # Color-coded tech stack pills
├── ProjectCard.jsx             # Individual project display
├── FilterSidebar.jsx           # Map filtering controls
├── NodeTooltip.jsx             # Hover tooltip for map nodes
├── ErrorBoundary.jsx           # Error handling wrapper
└── ScrollToTop.jsx             # Route change scroll reset
```

**Purpose:** Shared, reusable components following the design system. Keep them small and focused.

---

### `/src/pages/` - Route-Level Components

```
pages/
├── landing/
│   ├── index.jsx               # Main landing page
│   └── components/
│       ├── Hero.jsx            # Value prop section
│       ├── ProblemSolution.jsx # Pain points + solution
│       └── MapPreview.jsx      # Animated map teaser
├── talent-map/
│   ├── index.jsx               # Main map view
│   └── components/
│       ├── ForceGraph.jsx      # D3 visualization wrapper
│       ├── MapControls.jsx     # Zoom, pan, reset controls
│       └── ClusterLegend.jsx   # Tech stack color key
├── profile-builder/
│   ├── index.jsx               # Multi-step form container
│   └── components/
│       ├── BasicInfoStep.jsx   # Name, email, GitHub
│       ├── ProjectsStep.jsx    # Add projects
│       ├── AvailabilityStep.jsx # Bio, availability
│       └── ProfilePreview.jsx  # Final review before save
├── recruiter/
│   ├── index.jsx               # Recruiter dashboard
│   └── components/
│       ├── SavedCandidates.jsx # Bookmarked students list
│       └── RecruiterControls.jsx # Filter, save, contact
└── student/
    └── [id].jsx                # Individual student public profile (optional)
```

**Purpose:** Each page is a route. Components folder contains page-specific sub-components.

---

### `/src/contexts/` - Global State Management

```
contexts/
├── DataContext.jsx             # Student profiles, projects data
├── AuthContext.jsx             # User authentication state (stub for MVP)
└── RecruiterContext.jsx        # Saved candidates, filters
```

**Purpose:** React Context providers for global state. Avoid prop drilling.

**Example DataContext:**
```javascript
// Provides: students, projects, addStudent, updateStudent
<DataProvider>
  <App />
</DataProvider>
```

---

### `/src/data/` - Mock Data & Generators

```
data/
├── mockData.js                 # 20-30 sample student profiles
├── techStacks.js               # Predefined tech stack list with colors
└── seedData.js                 # Data generation utilities
```

**Purpose:** Centralized mock data for demo. Easy to swap with real API later.

**Example mockData.js:**
```javascript
export const students = [
  {
    id: 1,
    name: "Yuki Tanaka",
    location: "Tokyo",
    githubUrl: "github.com/yukitanaka",
    bio: "Full-stack dev passionate about Rust and WebAssembly",
    availability: "available",
    techStack: ["Rust", "React", "WebAssembly"],
    projects: [
      {
        id: 101,
        title: "Real-time Chat Engine",
        description: "Built a WebSocket-based chat with Rust backend",
        techStack: ["Rust", "WebSocket", "React"],
        impact: "Handles 10k concurrent users"
      }
    ]
  },
  // ... more students
];
```

---

### `/src/models/` - Type Definitions & Schemas

```
models/
├── types.js                    # JSDoc type definitions
└── schemas.js                  # Validation schemas (optional)
```

**Purpose:** Centralized type definitions for better IDE support and documentation.

**Example types.js:**
```javascript
/**
 * @typedef {Object} Student
 * @property {number} id
 * @property {string} name
 * @property {string} email
 * @property {string} location
 * @property {string} githubUrl
 * @property {string} bio
 * @property {'available'|'open'|'not-looking'} availability
 * @property {string[]} techStack
 * @property {Project[]} projects
 */

/**
 * @typedef {Object} Project
 * @property {number} id
 * @property {string} title
 * @property {string} description
 * @property {string[]} techStack
 * @property {string} impact
 */
```

---

### `/src/hooks/` - Custom React Hooks

```
hooks/
├── useLocalStorage.js          # Persist data to localStorage
├── useDebounce.js              # Debounce search/filter inputs
└── useMapInteraction.js        # D3 zoom/pan state management
```

**Purpose:** Reusable logic extracted from components.

---

### `/src/styles/` - Global Styles

```
styles/
├── index.css                   # Global resets, base styles
├── tailwind.css                # Tailwind imports
└── map.css                     # D3-specific styles (SVG, nodes)
```

**Purpose:** Global CSS and Tailwind configuration. Component styles use Tailwind classes.

---

### `/src/utils/` - Helper Functions

```
utils/
├── cn.js                       # Tailwind class merging (already exists)
├── colors.js                   # Tech stack color mapping
├── clustering.js               # Map clustering logic
└── formatters.js               # Date, text formatting utilities
```

**Purpose:** Pure functions for data transformation and utilities.

**Example colors.js:**
```javascript
export const techStackColors = {
  React: "#61DAFB",
  Rust: "#CE422B",
  Python: "#3776AB",
  Go: "#00ADD8",
  ML: "#FF6F00",
  // ... more
};
```

---

### `/Docs/` - Project Documentation

```
Docs/
├── Implementation.md           # Full implementation plan (this file)
├── project_structure.md        # This file
├── UI_UX_doc.md               # Design system, component specs
└── Bug_tracking.md            # Known issues, solutions
```

**Purpose:** Living documentation for the project. Update as you build.

---

## File Naming Conventions

### Components
- **PascalCase** for component files: `StudentDetail.jsx`, `TechStackTag.jsx`
- **camelCase** for utility files: `mockData.js`, `colors.js`
- **kebab-case** for CSS files: `map.css`, `talent-map.css`

### Folders
- **kebab-case** for page folders: `talent-map/`, `profile-builder/`
- **camelCase** for utility folders: `contexts/`, `hooks/`

---

## Module Organization Patterns

### Component Structure
```javascript
// StudentDetail.jsx
import React from 'react';
import { TechStackTag } from './TechStackTag';
import { ProjectCard } from './ProjectCard';

export function StudentDetail({ student, onClose }) {
  // Component logic
  return (
    <div className="student-detail-panel">
      {/* JSX */}
    </div>
  );
}
```

### Context Provider Pattern
```javascript
// DataContext.jsx
import React, { createContext, useContext, useState } from 'react';
import { students as mockStudents } from '../data/mockData';

const DataContext = createContext();

export function DataProvider({ children }) {
  const [students, setStudents] = useState(mockStudents);
  
  const addStudent = (student) => {
    setStudents([...students, student]);
  };

  return (
    <DataContext.Provider value={{ students, addStudent }}>
      {children}
    </DataContext.Provider>
  );
}

export const useData = () => useContext(DataContext);
```

---

## Configuration Files

### Root Level
- **package.json** - Dependencies, scripts
- **vite.config.mjs** - Vite build configuration
- **tailwind.config.js** - Tailwind theme customization
- **postcss.config.js** - PostCSS plugins
- **jsconfig.json** - Path aliases, IDE support
- **design.json** - Design system tokens

### Environment-Specific
- **.env.local** - Local environment variables (not committed)
- **.env.production** - Production environment variables

---

## Asset Organization

```
public/assets/
├── images/
│   ├── logo.svg
│   ├── hero-visual.png
│   └── avatars/              # Student placeholder avatars
├── favicon.ico
├── manifest.json             # PWA manifest
└── robots.txt
```

**Purpose:** Static assets served directly. No processing by Vite.

---

## Build & Deployment Structure

### Development
```bash
npm run dev          # Start Vite dev server (port 5173)
```

### Production Build
```bash
npm run build        # Output to /dist
npm run preview      # Preview production build locally
```

### Deployment
- **Vercel:** Connect GitHub repo, auto-deploy on push
- **Netlify:** Drag-and-drop `/dist` folder or connect repo

---

## Import Path Aliases (jsconfig.json)

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@components/*": ["src/components/*"],
      "@pages/*": ["src/pages/*"],
      "@contexts/*": ["src/contexts/*"],
      "@data/*": ["src/data/*"],
      "@utils/*": ["src/utils/*"],
      "@hooks/*": ["src/hooks/*"]
    }
  }
}
```

**Usage:**
```javascript
// Instead of: import { Button } from '../../../components/ui/Button';
import { Button } from '@components/ui/Button';
```

---

## Key Principles

1. **Separation of Concerns**
   - Pages = routes
   - Components = reusable UI
   - Contexts = global state
   - Utils = pure functions

2. **Colocation**
   - Page-specific components live in `pages/[page]/components/`
   - Shared components live in `components/`

3. **Single Responsibility**
   - Each file does one thing well
   - Components are small and focused

4. **Scalability**
   - Easy to add new pages (create folder in `pages/`)
   - Easy to add new components (drop in `components/`)
   - Easy to swap mock data with real API (update `DataContext`)

---

## Migration from Job Board Template

### Files to Remove
- All job board specific pages:
  - `src/pages/job-search-browse/`
  - `src/pages/job-posting-creation-management/`
  - `src/pages/company-registration-profile-setup/`
  - `src/pages/admin-moderation-management/`
  - `src/pages/recruiter-dashboard-analytics/`

### Files to Keep & Adapt
- `src/components/ui/*` - Reuse Button, Input, Select
- `src/components/ErrorBoundary.jsx` - Keep as-is
- `src/styles/*` - Keep Tailwind setup
- `src/utils/cn.js` - Keep utility

### Files to Create (New)
- All `/src/pages/talent-map/*` - Core feature
- All `/src/contexts/*` - State management
- All `/src/data/*` - Mock data
- `/src/components/StudentDetail.jsx` - Key component
- `/src/components/TechStackTag.jsx` - Key component

---

**This structure supports rapid hackathon development while remaining clean and maintainable.**
