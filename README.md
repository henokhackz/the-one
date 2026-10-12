# ፊደል (Fidel) — Lantumo Birhanu's Creative Portfolio

> A distinctive, performance-first creative developer portfolio celebrating Ethiopian manuscript identity (**ፊደል**) and modern fullstack engineering.

Built with **Next.js 16 (App Router)**, **TypeScript**, **Tailwind CSS v4**, **Three.js / React Three Fiber**, **Framer Motion**, and **Lenis**.

---

## 1. Architectural Philosophy & Identity

- **Ge'ez Visual Identity (ፊደል)**: The site functions as a living Ethiopian manuscript. The hero features an interactive field of Ge'ez glyphs that ripple around cursor and touch input, settling into **"ላንቱሞ / Lantumo"**.
- **Performance-First Capability Gating**: High-end desktops run an instanced Three.js / WebGL field. Low-tier devices, mobile viewports, or visitors with `prefers-reduced-motion` are automatically served an optimized 2D Canvas fallback that loads in milliseconds with zero 3D overhead.
- **Live Ethiopian Calendar & Clock**: Displays the current Ethiopian year, month, and day in Ge'ez numerals (`ዓመተ ምሕረት`) alongside traditional 12-hour dawn-based Ethiopian cyclical time.
- **Procedural Tibeb Borders**: Culturally authentic Habesha woven patterns generated procedurally via SVG rather than heavy bitmap images.
- **Bilingual & Editorial Typography**: Paired headings with Ge'ez glyphs (`Noto Sans Ethiopic`) and metadata mono-spacing.

---

## 2. Project Structure

```
├── shaders/                          # GLSL shader definitions
│   ├── glyph-ripple.vert.glsl        # Vertex displacement for glyph mesh
│   └── glyph-ripple.frag.glsl        # Color & lighting fragment shader
├── src/
│   ├── app/                          # Next.js App Router routes
│   │   ├── (portfolio)/              # Grouped portfolio layout
│   │   │   ├── page.tsx              # Home (Hero, intro, selected work, teaser)
│   │   │   ├── work/                 # Work archive & case studies
│   │   │   │   ├── page.tsx          # Filterable project gallery
│   │   │   │   └── [id]/page.tsx     # Deep-dive engineering case studies
│   │   │   ├── about/page.tsx        # Story, timeline, skill matrices, CV
│   │   │   ├── blogs/                # Technical writing & post reader
│   │   │   │   ├── page.tsx          # Article index
│   │   │   │   └── [id]/page.tsx     # Clean reading typography
│   │   │   ├── contact/page.tsx      # Honeypot-secured form & direct links
│   │   │   └── not-found.tsx         # Ge'ez styled 404 manuscript
│   │   ├── globals.css               # Design system tokens & CSS variables
│   │   └── layout.tsx                # Font loaders & Theme provider
│   ├── components/
│   │   ├── about/                    # About teaser components
│   │   ├── hero/                     # Dual-engine hero (3D WebGL + 2D Fallback)
│   │   │   ├── hero-fidel.tsx        # Capability detector switch
│   │   │   ├── hero-webgl-canvas.tsx # Three.js instanced mesh hero
│   │   │   └── hero-2d.tsx           # Spring-physics 2D Canvas fallback
│   │   ├── layout/                   # Global header, footer, shell, ⌘K palette
│   │   │   ├── header.tsx            # Nav bar & Ethiopian live clock trigger
│   │   │   ├── command-palette.tsx   # ⌘K / Ctrl+K modal search
│   │   │   ├── ethiopian-clock.tsx   # Live Ge'ez date & 12-hr time badge
│   │   │   └── smooth-scroll.tsx     # Lenis smooth scroll provider
│   │   ├── ui/                       # Reusable UI primitives
│   │   │   ├── tibeb-pattern.tsx     # Procedural SVG woven borders & stamps
│   │   │   ├── grain-overlay.tsx     # Tactile manuscript grain texture
│   │   │   ├── custom-cursor.tsx     # Desktop dynamic pointer & project view badge
│   │   │   ├── magnetic-button.tsx   # Desktop magnetic button interactions
│   │   │   └── glyph-dissolve.tsx    # Case-study page mount transition
│   │   └── work/                     # Selected work editorial rows
│   └── lib/                          # Data, date engines & utility functions
│       ├── ethiopian-date.ts         # Ethiopian calendar & Ge'ez numeral algorithm
│       ├── gpu-tier.ts               # Hardware capability gating
│       ├── tokens.ts                 # Design tokens (colors, typography, motion)
│       ├── projects-data.ts          # Typed case studies and project records
│       └── blog-data.ts              # Typed technical articles
└── tests/
    └── ethiopian-date.test.ts        # Unit test suite for calendar & numerals
```

---

## 3. Design System & Tokens

Defined in [`src/lib/tokens.ts`](file:///C:/Users/Hp/Videos/the-one/src/lib/tokens.ts) and [`src/app/globals.css`](file:///C:/Users/Hp/Videos/the-one/src/app/globals.css):

| Token | Ink-Dark Theme | Parchment Light Theme | Description |
|---|---|---|---|
| `background` | `#0a0908` | `#f7f4eb` | Deep Ethiopian carbon ink vs aged goatskin vellum |
| `surface` | `#141210` | `#efe9da` | Layered cards & section containers |
| `foreground` | `#f4f0e8` | `#181512` | High-contrast body text (WCAG AA compliant) |
| `accent` | `#e5a93c` | `#b87c14` | Saffron Gold (ወርቅ / Meskel flower) |
| `muted` | `#9e988e` | `#6e6659` | Secondary inscriptions and metadata |
| `border` | `rgba(244,240,232,0.12)` | `rgba(24,21,18,0.12)` | Hairline manuscript guidelines |

### Motion Tokens
- **Fast (`150ms`)**: Hover reactions, micro-interactions, magnetic drag.
- **Normal (`400ms`)**: Modals, accordions, command palette reveals.
- **Deliberate (`800ms`)**: Hero glyph convergence and case-study dissolve transitions.
- **Easings**: `cubic-bezier(0.16, 1, 0.3, 1)` (snappy) and `cubic-bezier(0.65, 0, 0.35, 1)` (smooth).

---

## 4. How to Add a New Project

All project content is fully typed and stored in [`src/lib/projects-data.ts`](file:///C:/Users/Hp/Videos/the-one/src/lib/projects-data.ts).

To add a new project, add an entry to the `PROJECTS` array:

```typescript
{
  id: 5,
  slug: "my-new-project",
  title: "My New Project",
  subtitle: "One-line technical summary of what was built.",
  summary: "Comprehensive description of system impact and architecture.",
  geezNumeral: "፭", // Ge'ez numeral (1: ፩, 2: ፪, 3: ፫, 4: ፬, 5: ፭, etc.)
  category: "Fullstack", // "AI & Systems" | "Fullstack"
  technologies: ["Next.js", "TypeScript", "PostgreSQL", "Tailwind CSS"],
  thumbnail: "https://images.unsplash.com/...", // or local path
  liveUrl: "https://example.com",
  githubUrl: "https://github.com/lyzon1/example",
  caseStudy: {
    problem: "Specific engineering or market problem that this project addresses.",
    myRole: "Lead Fullstack Developer",
    timeline: "3 months (2025)",
    stack: ["Next.js 15", "PostgreSQL", "Prisma", "Docker"],
    architectureHighlights: [
      "Decoupled asynchronous worker queue with Redis",
      "Sub-50ms p95 response time across all cached endpoints"
    ],
    keyDecisions: [
      {
        title: "Selected PostgreSQL over NoSQL",
        description: "Enforced strict relational schema integrity with Prisma ORM."
      }
    ],
    challenges: [
      {
        title: "High concurrency race conditions",
        solution: "Implemented optimistic locking and atomic database transactions."
      }
    ],
    results: [
      "Achieved 99.9% uptime during peak beta testing",
      "Successfully processed 50,000+ operations without data loss"
    ]
  }
}
```

Next.js automatically discovers the slug via `generateStaticParams()` and compiles a static SSG page at `/work/my-new-project`.

---

## 5. How to Add a Blog Post

Articles are typed and stored in [`src/lib/blog-data.ts`](file:///C:/Users/Hp/Videos/the-one/src/lib/blog-data.ts).

Add an entry to the `BLOG_POSTS` array:

```typescript
{
  slug: "my-post-title",
  title: "Article Headline",
  date: "October 12, 2026",
  readingTime: "4 min read",
  tags: ["Three.js", "Performance", "Next.js"],
  summary: "Brief excerpt shown in the blog index.",
  content: `## Section 1\n\nFull markdown body of the post...`
}
```

---

## 6. Development & Testing Commands

### Run Development Server
```bash
npm run dev
```
Starts Next.js on `http://localhost:3000`.

### Run Unit Tests
```bash
npm run test
```
Executes Node test runner across the Ethiopian calendar algorithm, Ge'ez numeral generation, and 12-hour cyclical time engine in `tests/ethiopian-date.test.ts`.

### Run Type Check
```bash
npx tsc --noEmit
```
Strict TypeScript verification without compiling output.

### Build for Production
```bash
npm run build
```
Generates optimized static HTML/SSG pages for deployment on Vercel or Node servers.

---

## 7. Performance & Quality Standards

- **Zero Flash of Unstyled Content (FOUC)**: Themes are persisted in `localStorage` and resolved prior to hydration via `next-themes`.
- **Accessibility (WCAG AA)**: Color contrast ratios exceed 4.5:1 across both themes; full keyboard navigation support for modal dialogs and the ⌘K command palette; ARIA labels on all icon-only buttons.
- **Hardware-Aware Rendering**: WebGL canvas automatically falls back on low memory or battery saver constraints.
- **No Heavy 3D Models**: The hero utilizes mathematical procedural instancing and GLSL vertex shaders, loading zero external `.gltf` or `.obj` assets.
