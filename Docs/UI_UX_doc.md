# UI/UX Documentation: Visual Talent Map

## Design Philosophy

**Core Principle:** Visual exploration over list scrolling. The interface should feel like exploring a city map, not reading a spreadsheet.

**Aesthetic:** Soft neumorphic analytics dashboard meets interactive data visualization. Calm, airy, data-forward.

**Tone:** Modern, builder-first, anti-corporate, anti-ATS.

---

## Design System Specifications

### Color Palette (from design.json)

#### Backgrounds
- **App Base:** `#EEF1FA` - Main canvas background
- **Panel Base:** `#F6F8FF` - Elevated panels
- **Card Base:** `#FFFFFF` - Content cards

#### Brand Colors
- **Primary:** `#6C63FF` - Primary actions, active states
- **Secondary:** `#4DA3FF` - Secondary actions, links
- **Accent Pink:** `#F178B6` - Highlights, special states
- **Accent Orange:** `#FF9F68` - Warnings, attention
- **Accent Green:** `#4FD1C5` - Success, available status

#### Text Colors
- **Primary:** `#1F2937` - Headings, important text
- **Secondary:** `#6B7280` - Body text, descriptions
- **Tertiary:** `#9CA3AF` - Subtle text, placeholders
- **Inverse:** `#FFFFFF` - Text on colored backgrounds

#### Tech Stack Color Mapping
```javascript
const techStackColors = {
  // Frontend
  React: "#61DAFB",
  Vue: "#42B883",
  Angular: "#DD0031",
  Svelte: "#FF3E00",
  
  // Backend
  Node: "#339933",
  Python: "#3776AB",
  Go: "#00ADD8",
  Rust: "#CE422B",
  Java: "#007396",
  
  // Mobile
  ReactNative: "#61DAFB",
  Flutter: "#02569B",
  Swift: "#FA7343",
  
  // Data/ML
  ML: "#FF6F00",
  AI: "#FF6F00",
  DataScience: "#3776AB",
  
  // Infrastructure
  Docker: "#2496ED",
  Kubernetes: "#326CE5",
  AWS: "#FF9900",
  
  // Other
  WebAssembly: "#654FF0",
  Blockchain: "#F0B90B",
  GraphQL: "#E10098"
};
```

---

## Typography

**Font Family:** `Inter, system-ui, sans-serif`

### Type Scale
- **H1 (Hero):** 36px / 700 weight - Landing page headlines
- **H2 (Section):** 28px / 700 weight - Page titles
- **H3 (Subsection):** 22px / 600 weight - Card titles
- **Metric:** 40px / 700 weight - Large numbers, stats
- **Body:** 14px / 400 weight - Paragraph text
- **Label:** 12px / 500 weight - Form labels, captions

### Usage Guidelines
- Use H1 sparingly (once per page)
- Body text should have 1.6 line-height for readability
- Labels should be uppercase with letter-spacing: 0.05em

---

## Component Specifications

### 1. Tech Stack Tag (Pill)

**Visual:**
- Shape: Pill (border-radius: 999px)
- Height: 28px
- Padding: 6px 12px
- Background: Tech stack color at 15% opacity
- Border: 1px solid tech stack color at 30% opacity
- Text: Tech stack color (darkened for contrast)
- Font: 12px / 500 weight

**States:**
- Default: As above
- Hover: Background opacity → 25%
- Active/Selected: Background → full tech stack color, text → white

**Example:**
```jsx
<span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium"
      style={{
        backgroundColor: `${techColor}26`, // 15% opacity
        borderColor: `${techColor}4D`,     // 30% opacity
        color: techColor
      }}>
  React
</span>
```

---

### 2. Student Node (Map Visualization)

**Visual:**
- Shape: Circle
- Diameter: 40px (default), 50px (hover), 60px (has many projects)
- Fill: Gradient based on primary tech stack
- Border: 2px solid white
- Shadow: `0 4px 12px rgba(0,0,0,0.1)`
- Inner content: Initials or avatar

**States:**
- Default: 40px, subtle shadow
- Hover: 50px, stronger shadow, show tooltip
- Selected: 50px, primary color border (3px)
- Dimmed (filtered out): 30px, opacity 0.3

**Clustering:**
- Nodes cluster by primary tech stack
- Use D3 force simulation with:
  - Charge: -100 (repulsion)
  - Link distance: 80
  - Collision radius: 25

---

### 3. Student Detail Panel (Side Drawer)

**Layout:**
- Position: Fixed right side
- Width: 400px (desktop), 100% (mobile)
- Height: 100vh
- Background: `#FFFFFF`
- Shadow: `-4px 0 24px rgba(0,0,0,0.12)`
- Animation: Slide in from right (300ms ease-out)

**Structure:**
```
┌─────────────────────────────┐
│ [Close X]                   │
│                             │
│ [Avatar]  Name              │
│           Location          │
│           [Availability]    │
│                             │
│ Bio                         │
│ Lorem ipsum dolor sit...    │
│                             │
│ Tech Stack                  │
│ [React] [Rust] [Docker]     │
│                             │
│ Projects                    │
│ ┌─────────────────────────┐ │
│ │ Project Title           │ │
│ │ Description...          │ │
│ │ [Tags]                  │ │
│ │ Impact: ...             │ │
│ └─────────────────────────┘ │
│                             │
│ [GitHub] [Contact]          │
└─────────────────────────────┘
```

**Sections:**
1. Header: Avatar, name, location, availability badge
2. Bio: 2-3 lines, secondary text color
3. Tech Stack: Horizontal pill list
4. Projects: Stacked cards (see Project Card spec)
5. Actions: GitHub link + Contact button

---

### 4. Project Card

**Visual:**
- Background: `#F6F8FF` (panel base)
- Border: None
- Border-radius: 16px
- Padding: 16px
- Shadow: `0 2px 8px rgba(0,0,0,0.04)`
- Margin-bottom: 12px

**Structure:**
```
┌─────────────────────────────────┐
│ Project Title (H3)              │
│                                 │
│ Description text in secondary   │
│ color, 2-3 lines max...         │
│                                 │
│ [React] [Node] [PostgreSQL]     │
│                                 │
│ 💡 Impact: Handles 10k users    │
│                                 │
│ [GitHub →]                      │
└─────────────────────────────────┘
```

**Elements:**
- Title: 18px / 600 weight, primary text color
- Description: 14px / 400 weight, secondary text color
- Tech tags: Horizontal pill list (wrap if needed)
- Impact: 13px / 500 weight, with emoji prefix
- GitHub link: Small button, secondary style

---

### 5. Filter Sidebar

**Layout:**
- Position: Fixed left side (or collapsible drawer)
- Width: 240px
- Background: `#FFFFFF`
- Border-right: 1px solid `rgba(17,24,39,0.06)`
- Padding: 24px

**Structure:**
```
Filters
───────────────

Tech Stack
□ React (12)
□ Rust (8)
□ Python (15)
□ Go (6)
...

Availability
□ Available (20)
□ Open to Offers (10)
□ Not Looking (5)

[Reset Filters]
```

**Elements:**
- Section title: 12px / 600 weight, uppercase, tertiary color
- Checkboxes: Custom styled, primary color when checked
- Count badges: (N) in tertiary color
- Reset button: Text button, secondary color

---

### 6. Buttons

#### Primary Button
- Background: Linear gradient `135deg, #6C63FF 0%, #4DA3FF 100%`
- Text: White, 14px / 500 weight
- Padding: 12px 24px
- Border-radius: 999px (pill)
- Shadow: `0 4px 12px rgba(108,99,255,0.3)`
- Hover: Brightness 1.05, shadow stronger

#### Secondary Button
- Background: `#FFFFFF`
- Text: Primary color `#6C63FF`
- Border: 1px solid `rgba(108,99,255,0.15)`
- Padding: 12px 24px
- Border-radius: 999px
- Hover: Background → `#F6F8FF`

#### Ghost Button
- Background: Transparent
- Text: Secondary color `#6B7280`
- Padding: 8px 16px
- Hover: Background → `rgba(0,0,0,0.04)`

---

### 7. Availability Badge

**Visual:**
- Shape: Pill
- Height: 24px
- Padding: 4px 10px
- Font: 11px / 600 weight, uppercase

**States:**
- **Available:** Background `#4FD1C5` (green), text white
- **Open to Offers:** Background `#FF9F68` (orange), text white
- **Not Looking:** Background `#9CA3AF` (gray), text white

---

### 8. Map Controls (Zoom/Pan)

**Layout:**
- Position: Fixed bottom-right of map canvas
- Background: `#FFFFFF`
- Border-radius: 12px
- Shadow: `0 4px 16px rgba(0,0,0,0.1)`
- Padding: 8px

**Buttons:**
- Zoom In: `+` icon
- Zoom Out: `-` icon
- Reset View: `⟲` icon
- Size: 36px × 36px each
- Hover: Background → `#F6F8FF`

---

## Responsive Design Requirements

### Breakpoints
- **Mobile:** < 768px
- **Tablet:** 768px - 1024px
- **Desktop:** > 1024px

### Mobile Adaptations
- **Talent Map:** Full screen, no sidebar filters (use bottom sheet)
- **Student Detail:** Full screen overlay (not side panel)
- **Filter Sidebar:** Bottom sheet or modal
- **Navigation:** Hamburger menu

### Desktop Optimizations
- **Talent Map:** Large canvas (70% width), filters on left (20%), detail on right (30%)
- **Multi-column layouts** for project grids
- **Hover states** fully utilized

---

## User Journey Maps

### Journey 1: Student Creates Profile

```
Landing Page
    ↓ Click "Create Builder Profile"
Auth Stub (Email Input)
    ↓
Profile Builder - Step 1: Basic Info
    ↓ Next
Profile Builder - Step 2: Add Projects
    ↓ Add Project (repeat)
    ↓ Next
Profile Builder - Step 3: Availability & Bio
    ↓ Submit
Talent Map (with new profile visible)
```

**Key Screens:**
1. Landing page with clear CTA
2. Simple auth (email only for MVP)
3. Multi-step form with progress indicator
4. Project input with tech stack selector
5. Final review before submit
6. Success state → redirect to map

---

### Journey 2: Recruiter Explores Talent

```
Landing Page
    ↓ Click "Explore Talent Map"
Talent Map (Full View)
    ↓ Hover over nodes (see tooltips)
    ↓ Apply filters (tech stack, availability)
    ↓ Click a node
Student Detail Panel Opens
    ↓ Review projects, tech stack
    ↓ Click "Save Candidate"
Saved to Recruiter's List
    ↓ Click "Contact"
Email Client Opens (pre-filled)
```

**Key Screens:**
1. Landing page with "Explore" CTA
2. Talent map with visible clusters
3. Filter sidebar (left)
4. Student detail panel (right)
5. Saved candidates list (separate view or sidebar)

---

## Accessibility Standards

### WCAG 2.1 AA Compliance

#### Color Contrast
- Text on white: Minimum 4.5:1 ratio
- Large text (18px+): Minimum 3:1 ratio
- Tech stack tags: Ensure darkened text color for contrast

#### Keyboard Navigation
- All interactive elements must be keyboard accessible
- Tab order: Logical flow (filters → map → detail panel)
- Focus indicators: 2px solid primary color, 2px offset
- Escape key: Close modals/panels

#### Screen Reader Support
- All images have alt text
- Map nodes have aria-labels: "Student: [Name], Tech: [Stack]"
- Form inputs have associated labels
- Status messages announced (e.g., "Profile saved")

#### Interactive Elements
- Minimum touch target: 44px × 44px (mobile)
- Minimum click target: 32px × 32px (desktop)
- Clear hover/focus states

---

## Animation & Transitions

### Principles
- **Subtle, not distracting**
- **Fast (200-300ms)**
- **Easing: ease-out for entrances, ease-in for exits**

### Key Animations

#### Student Detail Panel
```css
.detail-panel-enter {
  transform: translateX(100%);
  opacity: 0;
}
.detail-panel-enter-active {
  transform: translateX(0);
  opacity: 1;
  transition: all 300ms ease-out;
}
```

#### Map Node Hover
```css
.map-node {
  transition: all 200ms ease-out;
}
.map-node:hover {
  transform: scale(1.2);
  filter: drop-shadow(0 4px 12px rgba(0,0,0,0.2));
}
```

#### Filter Application
- Map re-clusters with smooth force simulation
- Filtered-out nodes fade to 30% opacity (300ms)
- Active nodes scale up slightly (1.05x)

---

## Component Library Organization

### Atomic Design Structure

#### Atoms (Basic building blocks)
- Button
- Input
- Badge
- TechStackTag
- Avatar

#### Molecules (Simple combinations)
- ProjectCard
- FilterCheckbox
- MapControl
- NodeTooltip

#### Organisms (Complex components)
- StudentDetail
- FilterSidebar
- TalentMap
- ProfileBuilder

#### Templates (Page layouts)
- LandingTemplate
- MapTemplate
- DashboardTemplate

#### Pages (Specific instances)
- Landing
- TalentMap
- ProfileBuilder
- RecruiterDashboard

---

## Wireframe References

### Landing Page Wireframe
```
┌─────────────────────────────────────────────────┐
│ [Logo]                    [Explore] [Sign Up]   │
├─────────────────────────────────────────────────┤
│                                                 │
│         Visualize Talent, Don't Scroll          │
│                  Resumes                        │
│                                                 │
│   A visual talent map for startup tech hiring  │
│                  in Japan                       │
│                                                 │
│     [Create Builder Profile] [Explore Map]      │
│                                                 │
│              [Map Preview Visual]               │
│                                                 │
├─────────────────────────────────────────────────┤
│  For Students          │    For Recruiters      │
│  • No resume black     │    • See real builders │
│    hole                │    • Visual exploration│
│  • Show real projects  │    • No ATS hell       │
└─────────────────────────────────────────────────┘
```

---

### Talent Map Wireframe
```
┌──────────┬─────────────────────────┬──────────────┐
│ Filters  │   Talent Map Canvas     │   Detail     │
│          │                         │   Panel      │
│ Tech     │    ●  ●    ●           │              │
│ Stack    │  ●      ●              │   [Close]    │
│ □ React  │      ●    ●   ●        │              │
│ □ Rust   │   ●          ●         │   Avatar     │
│ □ Python │        ●  ●            │   Name       │
│          │  ●   ●       ●         │   Location   │
│ Avail.   │     ●    ●    ●        │              │
│ □ Avail  │                         │   Bio...     │
│          │   [Zoom Controls]       │              │
│          │                         │   Projects   │
│ [Reset]  │                         │   [Card]     │
│          │                         │   [Card]     │
└──────────┴─────────────────────────┴──────────────┘
```

---

## Design Tool Integration

### Figma
- Use Figma for high-fidelity mockups (optional for hackathon)
- Export assets as SVG for scalability
- Use Figma's component variants for button states

### Design Tokens
- All colors, spacing, shadows defined in `design.json`
- Import into Tailwind config for consistency
- Use CSS variables for dynamic theming (future)

---

## Style Guide Summary

### Do's ✅
- Use soft shadows for elevation
- Use gradients sparingly (buttons, backgrounds only)
- Color-code tech stacks consistently
- Keep text hierarchy clear
- Use whitespace generously
- Animate transitions smoothly

### Don'ts ❌
- Don't use gradients on text
- Don't add borders where shadows exist
- Don't use brand gradients on icons
- Don't mix heatmap colors into UI controls
- Don't darken backgrounds on hover (use elevation)
- Don't overcrowd the map (30-50 nodes max)

---

## Performance Considerations

### Map Rendering
- Limit visible nodes to 50 for smooth interactions
- Use canvas rendering for large datasets (future)
- Debounce filter updates (300ms)
- Lazy load student details on click

### Image Optimization
- Use WebP format for images
- Lazy load off-screen content
- Compress avatars to < 50KB

### Animation Performance
- Use `transform` and `opacity` for animations (GPU-accelerated)
- Avoid animating `width`, `height`, `top`, `left`
- Use `will-change` sparingly

---

**This design system ensures a cohesive, modern, and accessible user experience that clearly differentiates the product from traditional job boards.**
