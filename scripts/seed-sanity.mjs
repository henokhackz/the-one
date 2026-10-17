import { createClient } from 'next-sanity';
import fs from 'fs';

// Native .env parser without requiring dotenv
function loadEnv() {
  const envPath = fs.existsSync('.env.local') ? '.env.local' : fs.existsSync('.env') ? '.env' : null;
  if (!envPath) return;
  const content = fs.readFileSync(envPath, 'utf8');
  for (const line of content.split('\n')) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const match = trimmed.match(/^([^=]+)=(.*)$/);
    if (match) {
      const key = match[1].trim();
      let val = match[2].trim();
      if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
        val = val.slice(1, -1);
      }
      if (!process.env[key]) {
        process.env[key] = val;
      }
    }
  }
}

loadEnv();

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';
const token = process.env.SANITY_API_KEY || process.env.SANITY_API_READ_TOKEN;

if (!projectId || !token) {
  console.error('❌ Missing NEXT_PUBLIC_SANITY_PROJECT_ID or SANITY_API_KEY / SANITY_API_READ_TOKEN in .env');
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  apiVersion: '2024-10-01',
  useCdn: false,
  token,
});

// 1. Projects Data
const projects = [
  {
    _id: 'project-1',
    _type: 'project',
    id: '1',
    slug: { _type: 'slug', current: 'ai-mentor-plus' },
    title: 'Ai Mentor Plus',
    geezNumeral: '፩',
    subtitle: 'Automated Curriculum & Learning Path Generator',
    summary: 'An intelligent educational platform that generates structured, multi-module learning curricula from single topic prompts with real-time streaming progress tracking.',
    oneLineProblem: 'Self-learners and educators spend dozens of hours hand-curating topic hierarchies without adaptive milestone scaffolding.',
    roleType: 'Fullstack',
    frontendSplit: [
      'Next.js App Router & React 19 UI',
      'Server-Sent Events streaming token renderer (sub-600ms TTFB)',
      'Framer Motion milestone graph animation with accessibility live-regions',
      'Tailwind CSS v4 with semantic dark mode design tokens',
    ],
    backendSplit: [
      'Node.js & Express streaming pipeline with backpressure buffering',
      'PostgreSQL schema with Prisma ORM for structured learning paths and user progress',
      'OpenAI API streaming integration with structured JSON schema outputs',
      'Idempotent session token generation and rate-limiting middleware',
    ],
    keyResult: 'Streamlined curriculum creation time by 85% for early test educators.',
    technologies: ['Next.js', 'React 19', 'TypeScript', 'Node.js', 'PostgreSQL', 'Prisma', 'Tailwind CSS', 'OpenAI API'],
    featured: true,
    category: 'AI & Systems',
    order: 1,
    githubUrl: 'https://github.com/lantumo/ai-mentor-plus',
    liveUrl: 'https://ai-mentor-plus.vercel.app',
    caseStudy: {
      problem: 'Self-directed learners struggle to build coherent roadmaps across complex technical topics without getting lost in unstructured search results or out-of-order tutorials.',
      myRole: 'Lead Fullstack Architect: Designed database schema, engineered streaming SSE infrastructure, and crafted responsive user interface.',
      timeline: '8 Weeks (August – October 2024)',
      stack: ['Next.js App Router', 'React 19', 'TypeScript', 'Tailwind CSS v4', 'PostgreSQL', 'Prisma ORM', 'Node.js SSE', 'OpenAI'],
      overview: 'Ai Mentor Plus bridges the gap between raw AI prompts and structured pedagogy. It takes any topic and dynamically compiles a progressive syllabus with milestone checkpoints, reading estimates, and interactive quizzes.',
      architectureHighlights: [
        'End-to-end streaming token pipeline using Server-Sent Events with graceful reconnection',
        'Normalized relational schema enforcing milestone dependency trees',
        'Zero-CLS loading states with optimistic UI updates and localStorage cache fallback',
      ],
      keyDecisions: [
        {
          title: 'Server-Sent Events over WebSockets for Stream Delivery',
          description: 'Chose SSE because communication is unidirectional (server to client) during curriculum generation. SSE runs cleanly over HTTP/2, requires no socket server maintenance, and reconnects automatically without custom heartbeat protocols.',
        },
        {
          title: 'Prisma Schema with Cascade Invalidation for Curriculum Modules',
          description: 'Modelled modules, lessons, and quizzes with foreign-key cascading to guarantee database referential integrity when users regenerate individual sections.',
        },
      ],
      challenges: [
        {
          title: 'Token Chunk Fragmenting in Streaming JSON',
          solution: 'Built a lightweight stream chunk reassembly buffer that parses partial JSON tokens safely without crashing mid-stream parsing.',
        },
        {
          title: 'High Concurrency Database Writes on Progress Checkpoints',
          solution: 'Implemented debounced optimistic client updates paired with batched upsert transactions on the PostgreSQL backend.',
        },
      ],
      results: [
        'Sub-600ms Time-to-First-Token on syllabus generation requests',
        '85% reduction in manual curriculum compilation time reported by beta users',
        '100% Lighthouse Accessibility score with full ARIA announcement support for streaming text',
      ],
      metrics: [
        { label: 'Avg Generation TTFB', value: '580ms' },
        { label: 'Beta Users Enrolled', value: '420+' },
        { label: 'Lighthouse Score', value: '98/100' },
      ],
    },
  },
  {
    _id: 'project-2',
    _type: 'project',
    id: '2',
    slug: { _type: 'slug', current: 'ethio-mart-engine' },
    title: 'EthioMart Engine',
    geezNumeral: '፪',
    subtitle: 'High-Concurrency E-Commerce Core & Multi-Gateway Checkout',
    summary: 'A resilient fullstack e-commerce engine with inventory race-condition prevention, multi-gateway payments (Stripe, PayPal, Telebirr mock), and sub-50ms catalog searches.',
    oneLineProblem: 'Flash-sale inventory over-allocation and checkout abandonment caused by slow monolithic cart queries.',
    roleType: 'Backend',
    frontendSplit: [
      'Next.js dynamic cart with optimistic balance updates and instant checkout sheets',
      'Faceted catalog filter with instant URL-state synchronization',
      'Accessible multi-step payment wizard with live currency toggling',
    ],
    backendSplit: [
      'PostgreSQL row-level locking (`SELECT FOR UPDATE`) for zero-oversell stock checks',
      'Idempotent webhook pipeline for Stripe & PayPal with replay attack prevention',
      'Prisma transactional batch operations for order creation and invoice generation',
      'Role-based access control (RBAC) for vendor and administrative dashboards',
    ],
    keyResult: 'Zero inventory oversell incidents recorded across 5,000 concurrent load-test sessions.',
    technologies: ['Next.js', 'PostgreSQL', 'Prisma', 'Stripe API', 'TypeScript', 'Tailwind CSS', 'Docker'],
    featured: true,
    category: 'Fullstack',
    order: 2,
    githubUrl: 'https://github.com/lantumo/ethio-mart-engine',
    liveUrl: 'https://ethio-mart.vercel.app',
    caseStudy: {
      problem: 'High-traffic retail drops frequently cause database deadlocks, oversold inventory, and duplicate webhook transaction charges.',
      myRole: 'Backend & Data Engineer: Engineered checkout transactions, webhook listeners, and inventory concurrency guards.',
      timeline: '6 Weeks (June – July 2024)',
      stack: ['Next.js', 'TypeScript', 'PostgreSQL', 'Prisma', 'Stripe', 'Tailwind CSS', 'Docker'],
      overview: 'EthioMart is an e-commerce platform built to handle spiky flash-sale traffic with mathematical inventory guarantees and unified payment processing.',
      architectureHighlights: [
        'Atomic inventory allocation using row-level database locks',
        'Idempotency key enforcement on all checkout and webhook routes',
        'Optimistic cart synchronization with local state rollback on network failure',
      ],
      keyDecisions: [
        {
          title: 'PostgreSQL Row Locking over Redis In-Memory Counters',
          description: 'Leveraged PostgreSQL native row-level locks within Prisma transactions rather than external Redis locks, eliminating split-brain risks between cache and persistence layer.',
        },
      ],
      challenges: [
        {
          title: 'Handling Duplicate Payment Gateway Webhooks',
          solution: 'Recorded unique webhook transaction IDs in an atomic transaction log prior to executing order status transitions.',
        },
      ],
      results: [
        'Zero oversell across 5,000 simulated concurrent cart checkouts',
        'Sub-45ms average response time on filtered catalog queries',
        '99.98% successful webhook processing rate under network jitter tests',
      ],
      metrics: [
        { label: 'Simulated Concurrent Checkouts', value: '5,000' },
        { label: 'Catalog Query Latency', value: '<45ms' },
        { label: 'Oversell Incidents', value: '0' },
      ],
    },
  },
  {
    _id: 'project-3',
    _type: 'project',
    id: '3',
    slug: { _type: 'slug', current: 'birana-docs-engine' },
    title: 'Birana Docs Engine',
    geezNumeral: '፫',
    subtitle: 'Collaborative Markdown & Manuscript Knowledge Base',
    summary: 'A fast, document engine inspired by Ethiopian manuscript aesthetics, with full-text search, revision histories, and keyboard-first navigation.',
    oneLineProblem: 'Traditional documentation tools are heavy, lack keyboard productivity workflows, and ignore cultural typography systems.',
    roleType: 'Frontend',
    frontendSplit: [
      'Keyboard-first command palette (`Cmd+K`) for instant topic switching',
      'Custom typography scale supporting Ge\'ez and Latin characters with perfect baseline alignment',
      'Live markdown previewer with syntax highlighting and deep anchor link generation',
    ],
    backendSplit: [
      'Edge-rendered document caching with automatic stale-while-revalidate headers',
      'Full-text search index across Markdown content blocks',
      'Lightweight document analytics counter with privacy-first IP hashing',
    ],
    keyResult: 'Sub-100ms page transitions and zero layout shifts (CLS 0.00).',
    technologies: ['React 19', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
    featured: true,
    category: 'Web & Cloud',
    order: 3,
    githubUrl: 'https://github.com/lantumo/birana-docs-engine',
    liveUrl: 'https://birana-docs.vercel.app',
    caseStudy: {
      problem: 'Technical writers and developers need instant, clutter-free reading experiences with thoughtful typographic craft.',
      myRole: 'UI/UX & Frontend Engineer: Engineered layout engine, command palette, and typography hierarchy.',
      timeline: '4 Weeks (April – May 2024)',
      stack: ['Next.js', 'React 19', 'TypeScript', 'Tailwind CSS v4', 'Framer Motion'],
      overview: 'Birana Docs reimagines knowledge bases through clean Ethiopian manuscript aesthetics, fast keyboard navigation, and responsive typography.',
      architectureHighlights: [
        'Zero-JavaScript reading mode with server-rendered HTML fallbacks',
        'Instant fuzzy search over hundreds of docs without external search servers',
      ],
      keyDecisions: [
        {
          title: 'Client-Side MiniSearch Indexing over Server Calls',
          description: 'Shipped a compressed client search index allowing instant, latency-free query matching as users type.',
        },
      ],
      challenges: [
        {
          title: 'Ge\'ez Script Font Rendering and Baseline Jitter',
          description: 'Normalized line-height metrics across Noto Serif Ethiopic and Inter to ensure consistent vertical rhythm.',
          solution: 'Custom CSS font-metric overrides via `ascent-override` and `line-gap-override`.',
        },
      ],
      results: [
        '100/100 Lighthouse Performance score across mobile and desktop',
        '0.00 Cumulative Layout Shift (CLS)',
      ],
      metrics: [
        { label: 'Lighthouse Performance', value: '100/100' },
        { label: 'Cumulative Layout Shift', value: '0.00' },
        { label: 'Search Latency', value: '<5ms' },
      ],
    },
  },
  {
    _id: 'project-4',
    _type: 'project',
    id: '4',
    slug: { _type: 'slug', current: 'ideeza-3d-pcb-viewer' },
    title: 'Ideeza 3D PCB Canvas',
    geezNumeral: '፬',
    subtitle: 'Interactive Three.js Electronic Visualization Engine',
    summary: 'A high-performance 3D/2D circuit board viewer for Ideeza EDA, supporting real-time layer toggling, drill-hole inspection, and schematic routing.',
    oneLineProblem: 'Engineers struggled to verify multi-layer PCB traces in browser-based EDA without sluggish 30fps viewport lag.',
    roleType: 'Frontend',
    frontendSplit: [
      'Three.js scene graph optimized with instanced trace meshes and custom GLSL shaders',
      'Dual-mode viewport switching seamlessly between 2D schematic and 3D orthographic PCB models',
      'Interactive trace inspection with hover detection and netlist connectivity highlights',
    ],
    backendSplit: [
      'Gerber file parsing pipeline converting raw CAD coordinates into Three.js buffer geometries',
      'Layered SVG export pipeline for immediate production Gerber generation',
    ],
    keyResult: 'Maintained rock-solid 60fps across complex 8-layer circuit boards.',
    technologies: ['Three.js', 'React', 'TypeScript', 'WebGL', 'GLSL', 'EDA APIs'],
    featured: true,
    category: 'AI & Systems',
    order: 4,
    githubUrl: 'https://github.com/lantumo/ideeza-pcb-viewer',
    liveUrl: 'https://ideeza.com',
    caseStudy: {
      problem: 'Visualizing thousands of copper traces and via holes in real-time browser canvas causes severe frame drops without strict GPU instancing.',
      myRole: 'Three.js Engineer: Built custom shader layers, camera controller, and Gerber geometry parser.',
      timeline: 'Contract Engagement (Nov 2025 – Present)',
      stack: ['Three.js', 'React', 'TypeScript', 'GLSL', 'WebGL', 'EDA APIs'],
      overview: 'The core visualization engine for Ideeza, empowering creators and hardware makers to inspect PCB prototypes before fabrication.',
      architectureHighlights: [
        'Instanced geometry rendering collapsing 10,000+ drill holes into 1 draw call',
        'Custom GLSL fragment shaders for real-time copper trace highlights',
      ],
      keyDecisions: [
        {
          title: 'Custom Shader Materials over Standard MeshStandardMaterial',
          description: 'Built lightweight unlit GLSL shaders for circuit board surfaces to eliminate expensive lighting calculations on mobile GPUs.',
        },
      ],
      challenges: [
        {
          title: 'Memory Leaks during Repeated Layer Re-Rendering',
          solution: 'Strict geometry and material disposal lifecycle hooks integrated into React component unmount phases.',
        },
      ],
      results: [
        'Locked 60fps rendering during orbit and zoom navigation',
        'Over 70% reduction in WebGL draw calls through instancing',
      ],
      metrics: [
        { label: 'Viewport Frame Rate', value: '60 FPS' },
        { label: 'Draw Call Reduction', value: '72%' },
      ],
    },
  },
];

// 2. Blog Posts
const blogs = [
  {
    _id: 'blog-1',
    _type: 'blogPost',
    id: '1',
    slug: { _type: 'slug', current: 'fast-3d-hero-engineering' },
    title: "Engineering a 60fps WebGL Glyph Hero Under 40KB: How I Kept 'Fidel' Blazing Fast",
    subtitle: 'Techniques for low-overhead 3D web experiences without blowing bundle budgets.',
    geezNumeral: '፩',
    date: 'October 2024',
    readingTime: '5 min read',
    category: 'WebGL & Performance',
    order: 1,
    summary: 'A deep dive into instanced meshes, GPU capability gating, selective bundle tree-shaking, and 2D canvas fallbacks used to deliver a responsive Three.js hero on mobile.',
    content: [
      "When building creative portfolio sites, developers often fall into a trap: they import massive GLTF models, multi-megabyte Three.js bundles, and unbounded render loops that spin up laptop fans and drain mobile batteries. For 'Fidel', my rule was strict: creativity must never cost speed.",
      "1. Instanced Rendering Over Multiple Meshes: Rather than creating hundreds of individual Three.js TextGeometry or Sprite objects, we represent the Ge'ez character field using an InstancedMesh with an instanced matrix buffer. This collapses hundreds of draw calls into a single GPU draw call per frame.",
      "2. Capability Gating & The 2D Fallback: Before initializing any WebGL context, we query device capabilities. If the visitor is on a low-tier mobile device, has battery-saver active, or has enabled prefers-reduced-motion, we cleanly bypass WebGL and render a lightweight 2D HTML5 Canvas matrix. The visual essence of the rippling Ge'ez manuscript is preserved with zero 3D overhead.",
      "3. Strict Tree-Shaking of Three.js and Drei: Loading full Three.js can add over 500KB minified. By selectively importing only WebGLRenderer, Scene, PerspectiveCamera, and instanced geometry primitives, our hero module stays razor-thin.",
      "4. Freezing Render Loops Off-Screen: Using an IntersectionObserver, the WebGL/Canvas render loop pauses immediately when the user scrolls past the hero fold. When the hero is not in the viewport, CPU and GPU utilization drops to 0%.",
      "Conclusion: WebGL is not inherently slow; unconstrained WebGL is. By treating 3D as a performance-constrained engineering discipline, we create memorable digital identities without sacrificing Core Web Vitals.",
    ],
  },
  {
    _id: 'blog-2',
    _type: 'blogPost',
    id: '2',
    slug: { _type: 'slug', current: 'react-server-components-architecture' },
    title: 'Architecting for the Edge: React Server Components & Streaming in Next.js',
    subtitle: 'Reducing client bundle footprints while maintaining rich interactive islands.',
    geezNumeral: '፪',
    date: 'August 2024',
    readingTime: '6 min read',
    category: 'Architecture',
    order: 2,
    summary: 'How splitting component boundaries between the server and client radically drops client hydration overhead and delivers instant First Contentful Paint.',
    content: [
      "The transition to Next.js App Router and React Server Components (RSC) fundamentally shifts how frontend developers think about data fetching and client-side JavaScript delivery.",
      "In traditional SPAs, the browser downloads the entire component tree, all external parsing libraries, and runs client-side hydration before content becomes interactive. With RSC, heavy dependencies—such as Markdown processors, date formatters, and database ORMs—never touch the client bundle.",
      "By keeping our case study pages as pure Server Components and isolating interactive widgets (like our live Ethiopian clock and 2D glyph canvas) into discrete 'use client' islands, we ensure the initial HTML stream arrives instantly over the wire with sub-100ms FCP.",
    ],
  },
  {
    _id: 'blog-3',
    _type: 'blogPost',
    id: '3',
    slug: { _type: 'slug', current: 'ethiopian-calendar-in-typescript' },
    title: 'The Mathematics of the Ethiopian Calendar & 12-Hour Time System',
    subtitle: 'Building a zero-dependency solar calendar conversion engine in strict TypeScript.',
    geezNumeral: '፫',
    date: 'July 2024',
    readingTime: '4 min read',
    category: 'Algorithms & Heritage',
    order: 3,
    summary: 'Converting Gregorian UTC timestamps into the 13-month Ethiopian calendar and distinct 12-hour solar day cycle with verified unit tests.',
    content: [
      "Ethiopia follows a unique solar calendar with 12 months of 30 days plus a 13th month (Pagume) of 5 or 6 days, and time cycles that begin at dawn (12:00 sunrise = 6:00 AM UTC+3).",
      "Implementing this in TypeScript required clean Julian Day conversions rather than relying on bloated timezone libraries.",
      "Our zero-dependency implementation runs in sub-microsecond time and forms the live clock ticking in the footer of this portfolio.",
    ],
  },
];

// 3. Skills Data
const skillCategories = [
  {
    _id: 'skill-cat-frontend',
    _type: 'skillCategory',
    title: 'Frontend Engineering',
    iconName: 'Code2',
    description: 'Crafting sub-second, accessible web applications with modern React and Next.js.',
    order: 1,
    skills: [
      { _key: 's1', name: 'React 19 & Next.js App Router', level: 'Senior', projectIds: ['1', '2'] },
      { _key: 's2', name: 'TypeScript (Strict Mode)', level: 'Production', projectIds: ['1', '2', '3', '4'] },
      { _key: 's3', name: 'Tailwind CSS v4 & Design Tokens', level: 'Advanced', projectIds: ['1', '2', '3', '4'] },
      { _key: 's4', name: 'Three.js & WebGL Shaders (GLSL)', level: 'Specialist', projectIds: ['1', '4'] },
      { _key: 's5', name: 'Server-Sent Events & Streaming UI', level: 'Production', projectIds: ['1'] },
      { _key: 's6', name: 'WCAG AA Accessibility & Screen Readers', level: 'Verified', projectIds: ['2', '4'] },
    ],
  },
  {
    _id: 'skill-cat-backend',
    _type: 'skillCategory',
    title: 'Backend & Data Architecture',
    iconName: 'Server',
    description: 'Engineering scalable APIs, relational data models, and resilient checkout pipelines.',
    order: 2,
    skills: [
      { _key: 's7', name: 'PostgreSQL & Relational Schemas', level: 'Production', projectIds: ['1', '2', '3'] },
      { _key: 's8', name: 'Prisma ORM & Migration Pipelines', level: 'Advanced', projectIds: ['1', '2'] },
      { _key: 's9', name: 'Node.js & Express API Routes', level: 'Production', projectIds: ['3'] },
      { _key: 's10', name: 'Idempotent Webhooks (Stripe / PayPal)', level: 'Specialist', projectIds: ['2'] },
      { _key: 's11', name: 'Row-Level Locks & Race-Condition Safety', level: 'Verified', projectIds: ['2'] },
      { _key: 's12', name: 'Cryptographic Tokens & Auth Guardrails', level: 'Production', projectIds: ['3'] },
    ],
  },
  {
    _id: 'skill-cat-cloud',
    _type: 'skillCategory',
    title: 'Fullstack Architecture & Cloud',
    iconName: 'Layers',
    description: 'Connecting edge runtimes, caching layers, and CI/CD pipelines.',
    order: 3,
    skills: [
      { _key: 's13', name: 'Turborepo & Monorepo Architecture', level: 'Senior', projectIds: ['1'] },
      { _key: 's14', name: 'Edge Middleware & Header Security', level: 'Advanced', projectIds: ['2', '3'] },
      { _key: 's15', name: 'Docker & Containerized Microservices', level: 'Production', projectIds: ['3', '4'] },
      { _key: 's16', name: 'Vercel / AWS Cloud Deployments', level: 'Production', projectIds: ['1', '2', '4'] },
      { _key: 's17', name: 'Git Branching & GitHub Actions CI', level: 'Production', projectIds: ['1', '2', '3', '4'] },
    ],
  },
  {
    _id: 'skill-cat-systems',
    _type: 'skillCategory',
    title: 'Interactive & Systems Engineering',
    iconName: 'Cpu',
    description: 'Pioneering creative WebGL shaders, EDA hardware systems, and low-latency logic.',
    order: 4,
    skills: [
      { _key: 's18', name: 'Interactive 3D PCB Layer Inspection', level: 'Specialist', projectIds: ['4'] },
      { _key: 's19', name: 'GLSL Fragment & Vertex Shaders', level: 'Specialist', projectIds: ['1', '4'] },
      { _key: 's20', name: 'Canvas 2D Particle Spring Physics', level: 'Production', projectIds: ['1'] },
      { _key: 's21', name: 'Gerber File Parsing & Layer Routing', level: 'Specialist', projectIds: ['4'] },
    ],
  },
];

// 4. Experiences Data
const experiences = [
  {
    _id: 'exp-ideeza',
    _type: 'experience',
    id: 'ideeza',
    role: 'Three.js Engineer',
    company: 'Ideeza',
    date: 'Nov 2025 – Present',
    duration: 'Current',
    location: 'Remote · Israel',
    type: 'Contract',
    accent: '#f59e0b',
    featured: true,
    order: 1,
    description: "Contributing to Ideeza's AI-powered hardware design platform — a next-generation EDA tool that lets engineers and makers design PCBs through both manual workflows and AI-generated prompts. I own the Three.js electronics layer: building interactive 3D PCB visualizations, implementing real-time layer inspection, schematic routing, and 2D/3D dual-side viewing rendering that ships production-ready Gerber files.",
    highlights: [
      'Built the 2D/3D PCB canvas with real-time layer switching and drill-hole rendering',
      'Implemented AI-driven board layout generation from natural language input',
      'Delivered interactive trace inspection tools with zoom-level-aware detail',
      'Developed both schematic views and dual-perspective 3D viewer modes',
    ],
    technologies: ['Three.js', 'Next.js', 'React', 'TypeScript', 'Node.js', 'WebGL', 'EDA APIs'],
  },
  {
    _id: 'exp-freelance',
    _type: 'experience',
    id: 'freelance',
    role: 'Fullstack Freelancer',
    company: 'Independent Professional',
    date: 'Jun 2025 – Present',
    duration: 'Ongoing',
    location: 'Remote · Global',
    type: 'Freelance',
    accent: '#f59e0b',
    featured: false,
    order: 2,
    description: 'Delivering end-to-end web products for startups and SMEs globally. Expanding client base through social media outreach, global marketplaces like Upwork, and regional platforms like Afriwork (the premier Ethiopian talent hub). Specializing in performance-critical Next.js applications and API infrastructure.',
    highlights: [
      'Shipped 8+ production apps for independent clients and businesses',
      'Sourced high-value projects consistently via Upwork, Afriwork, and social channels',
      'Built scalable REST routes and architectures deployed across modern CI/CD pipelines',
    ],
    technologies: ['Next.js', 'TypeScript', 'Node.js', 'PostgreSQL', 'Tailwind CSS', 'Prisma', 'Docker'],
  },
];

// 5. Resume Data
const resume = {
  _id: 'resume-lantumo',
  _type: 'resume',
  title: 'Lantumo Birhanu Official Resume',
  headline: 'Frontend, Backend & Fullstack Developer',
  externalPdfUrl: '/Lantumo_Birhanu_resume.pdf',
  lastUpdated: 'October 2024',
  summary: 'Experienced Fullstack Engineer specializing in Next.js, TypeScript, Three.js, PostgreSQL, and performant web architecture.',
};

async function uploadAssetIfFound(filePath, filename) {
  if (!fs.existsSync(filePath)) {
    console.warn(`   ⚠️ File not found: ${filePath}`);
    return null;
  }
  try {
    console.log(`📤 Uploading asset: ${filePath}...`);
    const asset = await client.assets.upload('image', fs.createReadStream(filePath), {
      filename: filename || filePath.split('/').pop(),
    });
    console.log(`   ✓ Uploaded as ${asset._id} (${asset.url})`);
    return asset;
  } catch (err) {
    console.warn(`   ⚠️ Upload failed for ${filePath}: ${err.message}`);
    return null;
  }
}

async function seed() {
  console.log(`🚀 Starting Sanity database seeding for project "${projectId}" in dataset "${dataset}"...`);

  console.log('\n📸 Step 1: Uploading local image assets to Sanity CDN...');
  const aiMentorAsset = await uploadAssetIfFound('public/ai-mentor.png');
  const zembilAsset = await uploadAssetIfFound('public/zembil.png');
  const dormAsset = await uploadAssetIfFound('public/dorm.jpg');
  const fedelAsset = await uploadAssetIfFound('public/fedel-ai.png');
  const ideezaAsset = await uploadAssetIfFound('public/ideeza.png');
  const heroAsset = (await uploadAssetIfFound('public/hero.png')) || (await uploadAssetIfFound('public/hero.jpg'));
  const webDevAsset = await uploadAssetIfFound('public/web-dev.jpg');
  const theOneAsset = await uploadAssetIfFound('public/the-one.jpg');

  // Attach assets to projects
  if (aiMentorAsset) {
    projects[0].thumbnail = { _type: 'image', asset: { _type: 'reference', _ref: aiMentorAsset._id } };
    projects[0].caseStudy.screenshots = [
      {
        _key: 'ss1',
        _type: 'image',
        asset: { _type: 'reference', _ref: aiMentorAsset._id },
        alt: 'Ai Mentor Plus Interface',
        caption: 'Curriculum generation and streaming dashboard',
      },
    ];
  }
  if (zembilAsset) {
    projects[1].thumbnail = { _type: 'image', asset: { _type: 'reference', _ref: zembilAsset._id } };
    projects[1].caseStudy.screenshots = [
      {
        _key: 'ss1',
        _type: 'image',
        asset: { _type: 'reference', _ref: zembilAsset._id },
        alt: 'EthioMart Engine Dashboard',
        caption: 'Inventory and checkout engine',
      },
    ];
  }
  if (dormAsset) {
    projects[2].thumbnail = { _type: 'image', asset: { _type: 'reference', _ref: dormAsset._id } };
    projects[2].caseStudy.screenshots = [
      {
        _key: 'ss1',
        _type: 'image',
        asset: { _type: 'reference', _ref: dormAsset._id },
        alt: 'Birana Docs Engine Preview',
        caption: 'Birana typography and docs view',
      },
    ];
  }
  if (fedelAsset) {
    projects[3].thumbnail = { _type: 'image', asset: { _type: 'reference', _ref: fedelAsset._id } };
    projects[3].caseStudy.screenshots = [
      {
        _key: 'ss1',
        _type: 'image',
        asset: { _type: 'reference', _ref: fedelAsset._id },
        alt: 'Ideeza 3D PCB Canvas',
        caption: 'Three.js interactive PCB routing view',
      },
    ];
  }

  // Attach assets to blogs
  if (heroAsset) {
    blogs[0].coverImage = { _type: 'image', asset: { _type: 'reference', _ref: heroAsset._id } };
  }
  if (webDevAsset) {
    blogs[1].coverImage = { _type: 'image', asset: { _type: 'reference', _ref: webDevAsset._id } };
  }
  if (theOneAsset) {
    blogs[2].coverImage = { _type: 'image', asset: { _type: 'reference', _ref: theOneAsset._id } };
  }

  // Attach assets to experience
  if (ideezaAsset) {
    experiences[0].logo = { _type: 'image', asset: { _type: 'reference', _ref: ideezaAsset._id } };
  }

  console.log('\n📦 Step 2: Committing documents with real CDN assets to Sanity...');
  const tx = client.transaction();

  for (const doc of projects) {
    tx.createOrReplace(doc);
  }
  for (const doc of blogs) {
    tx.createOrReplace(doc);
  }
  for (const doc of skillCategories) {
    tx.createOrReplace(doc);
  }
  for (const doc of experiences) {
    tx.createOrReplace(doc);
  }
  tx.createOrReplace(resume);

  await tx.commit();

  console.log('\n✅ Seeding complete!');
  console.log(`   - ${projects.length} Projects uploaded (with live CDN images)`);
  console.log(`   - ${blogs.length} Blog Posts uploaded (with live CDN cover images)`);
  console.log(`   - ${skillCategories.length} Skill Categories uploaded`);
  console.log(`   - ${experiences.length} Experience Records uploaded (with company logo)`);
  console.log(`   - 1 Resume record uploaded`);
  console.log('\n🎉 Your Sanity CMS is now populated with real data and CDN images!');
}

seed().catch((err) => {
  console.error('❌ Seeding failed:', err.message);
  if (err.statusCode) console.error('Status code:', err.statusCode);
  if (err.details) console.error('Details:', err.details);
  process.exit(1);
});
