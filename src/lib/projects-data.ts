export interface CaseStudy {
  problem: string;
  myRole: string;
  timeline: string;
  stack: string[];
  keyDecisions: {
    title: string;
    description: string;
  }[];
  challenges: {
    title: string;
    solution: string;
  }[];
  results: string[];
  metrics?: { label: string; value: string }[];
  overview: string;
  architectureHighlights: string[];
  screenshots: {
    src: string;
    alt: string;
    caption: string;
  }[];
}

export interface Project {
  id: string;
  slug: string;
  title: string;
  geezNumeral: string;
  subtitle: string;
  summary: string;
  oneLineProblem: string;
  roleType: "Frontend" | "Backend" | "Fullstack";
  frontendSplit: string[];
  backendSplit: string[];
  keyResult: string;
  technologies: string[];
  thumbnail: string;
  githubUrl: string;
  liveUrl?: string;
  featured: boolean;
  category: "Fullstack" | "AI & Systems" | "Web & Cloud";
  caseStudy: CaseStudy;
}

export const PROJECTS: Project[] = [
  {
    id: "1",
    slug: "ai-mentor-plus",
    title: "Ai Mentor Plus",
    geezNumeral: "፩",
    subtitle: "Automated Curriculum & Learning Path Generator",
    summary:
      "An intelligent educational platform that generates structured, multi-module learning curricula from single topic prompts with real-time streaming progress tracking.",
    oneLineProblem:
      "Self-learners and educators spend dozens of hours hand-curating topic hierarchies without adaptive milestone scaffolding.",
    roleType: "Fullstack",
    frontendSplit: [
      "Next.js App Router & React 19 UI",
      "Server-Sent Events streaming token renderer (sub-600ms TTFB)",
      "Interactive progress tree & client-side state caching",
    ],
    backendSplit: [
      "OpenAI Structured Outputs with strict Zod schema guards",
      "PostgreSQL relational persistence via Prisma ORM",
      "Vercel Edge API route handlers with optimistic retry logic",
    ],
    keyResult: "Generated complete modular curricula in under 3 seconds with streaming real-time feedback.",
    technologies: ["Next.js", "React", "TypeScript", "Tailwind CSS", "OpenAI API", "PostgreSQL", "Prisma"],
    thumbnail: "/ai-mentor.png",
    githubUrl: "https://github.com/lyzon1",
    liveUrl: "https://ai-mentor-plus.vercel.app/",
    featured: true,
    category: "AI & Systems",
    caseStudy: {
      problem:
        "Educators and independent self-taught developers frequently struggle with structuring amorphous learning paths. Manually curating course syllabus outlines, prerequisite hierarchies, and practice modules consumes dozens of hours per topic.",
      myRole:
        "Lead Fullstack Developer — Designed the generative curriculum schema, structured streaming API endpoints, and built the responsive study dashboard.",
      timeline: "3 Months (2024)",
      stack: ["Next.js App Router", "TypeScript", "Tailwind CSS", "OpenAI API", "PostgreSQL", "Prisma"],
      overview:
        "Ai Mentor Plus transforms ambiguous course topics into granular step-by-step masteries. The application decomposes high-level concepts into digestible milestones, accompanied by auto-generated quizzes and interactive code snippets.",
      keyDecisions: [
        {
          title: "Streaming Responses over Batch Generation",
          description:
            "Curriculum generation takes 8–15 seconds for extensive syllabi. Implemented Server-Sent Events (SSE) and Vercel AI SDK streams to progressively render modules in the UI, eliminating user wait anxiety and dropping perceived latency to sub-600ms.",
        },
        {
          title: "Deterministic JSON Schema Enforcement",
          description:
            "Utilized OpenAI structured outputs with strict Zod validation to eliminate hallucinated JSON formatting, ensuring bulletproof UI rendering of nested module trees.",
        },
      ],
      challenges: [
        {
          title: "Handling Edge Case Hallucinations & Deep Recursive Nesting",
          solution:
            "Engineered recursive validation guards and hierarchical schema clamps that gracefully truncate malformed branches and automatically re-prompt incomplete course segments.",
        },
      ],
      results: [
        "Enabled end-to-end syllabus creation within seconds from a single title input.",
        "Zero-layout-shift responsive study view optimized across mobile and desktop devices.",
        "Full dark and light manuscript mode contrast compliance.",
      ],
      architectureHighlights: [
        "Edge-ready Next.js route handlers for token streaming",
        "Zod validation for LLM structural output certainty",
        "Client-side optimistic persistence with local storage fallback",
      ],
      screenshots: [
        {
          src: "/ai-mentor.png",
          alt: "Ai Mentor Plus Dashboard View",
          caption: "Generative curriculum overview with module hierarchy and progress tracker.",
        },
      ],
    },
  },
  {
    id: "2",
    slug: "zembil-ecommerce",
    title: "Zembil E-Commerce",
    geezNumeral: "፪",
    subtitle: "Modern Multi-Gateway Digital Marketplace",
    summary:
      "A high-performance modern storefront featuring dual global and regional checkout gateways, real-time inventory synchronization, and comprehensive merchant analytics.",
    oneLineProblem:
      "Regional e-commerce platforms suffer from fragile checkout flows, slow mobile catalog rendering, and missing multi-gateway payment rails.",
    roleType: "Fullstack",
    frontendSplit: [
      "Fast product catalog rendered via React Server Components",
      "Optimistic cart state management with Zustand",
      "Accessible high-contrast gallery and slide-over checkout drawer",
    ],
    backendSplit: [
      "Idempotent Stripe & PayPal webhook verification pipelines",
      "PostgreSQL row-level locking preventing concurrent overselling",
      "Role-based merchant management API and secure sessions",
    ],
    keyResult: "Sub-200ms catalog page transitions and zero double-charge anomalies under stress testing.",
    technologies: [
      "Next.js",
      "TypeScript",
      "PostgreSQL",
      "Prisma",
      "Tailwind CSS",
      "Stripe",
      "PayPal",
      "Zustand",
    ],
    thumbnail: "/zembil.png",
    githubUrl: "https://github.com/lyzon1",
    liveUrl: "https://zembil-self.vercel.app/",
    featured: true,
    category: "Fullstack",
    caseStudy: {
      problem:
        "Many Ethiopian and regional commerce platforms suffer from brittle checkout architectures, sluggish mobile loading, and lack of integration with international payment rails (Stripe, PayPal) alongside regional currencies.",
      myRole:
        "Fullstack Architecture & Payment Engineer — Modeled relational schema in PostgreSQL/Prisma, integrated webhook-verified payment gateways, and built the merchant admin dashboard.",
      timeline: "4 Months (2024)",
      stack: [
        "Next.js (App Router)",
        "TypeScript",
        "Tailwind CSS",
        "PostgreSQL",
        "Prisma ORM",
        "Stripe SDK",
        "PayPal SDK",
      ],
      overview:
        "Named after 'Zembil' (ዘንቢል — traditional Ethiopian woven shopping basket), this platform merges Habesha cultural familiarity with world-class payment engineering and sub-second catalog navigation.",
      keyDecisions: [
        {
          title: "Idempotent Webhook Processing Architecture",
          description:
            "Implemented cryptographic webhook verification with database-level idempotency keys to ensure zero double-charging or missed order state dispatches even during network interruptions.",
        },
        {
          title: "Hybrid Server Components & Client Cart State",
          description:
            "Rendered product catalogs statically via React Server Components with incremental cache revalidation, while isolating cart and checkout mutations to lightweight client islands.",
        },
      ],
      challenges: [
        {
          title: "Race Conditions During Concurrent Inventory Depletion",
          solution:
            "Utilized PostgreSQL row-level locks within Prisma transactional blocks (`tx.$executeRaw`) during checkout validation to prevent overselling limited-stock products.",
        },
      ],
      results: [
        "Instant checkout feedback with zero double-charge anomalies across stress tests.",
        "Smooth mobile responsive purchasing flow tested across varied network throttling.",
        "Fully typed end-to-end data pipelines from database queries to front-end components.",
      ],
      architectureHighlights: [
        "Prisma schema with indexing on high-traffic category and search fields",
        "Secure cookie sessions and role-based permissions for merchant admins",
        "Accessible, high-contrast product gallery and checkout modals",
      ],
      screenshots: [
        {
          src: "/zembil.png",
          alt: "Zembil E-Commerce Storefront",
          caption: "Curated product catalog showcasing clean typography, fast filters, and cart drawer.",
        },
      ],
    },
  },
  {
    id: "3",
    slug: "smart-dorm-cafe",
    title: "Smart Dorm & Cafe",
    geezNumeral: "፫",
    subtitle: "Campus Operations & QR Attendance Management System",
    summary:
      "An automated campus logistics platform replacing manual paper registers with sub-300ms QR-driven turnstile dining access, automatic room allocation, and batch spreadsheet sync.",
    oneLineProblem:
      "University dining halls and dorms track thousands of students daily using paper ledgers, causing 45-minute queues and reconciliation errors.",
    roleType: "Backend",
    frontendSplit: [
      "Sub-second WebRTC camera QR scanner integration",
      "Optimistic scanner state updates with TanStack React Query",
      "Intuitive administrative room occupancy visualizer",
    ],
    backendSplit: [
      "Background Web Worker ExcelJS chunk parser for 5,000+ student rosters",
      "Time-based cryptographic QR token authentication with offline cache",
      "PostgreSQL relational transactional room assignment engine",
    ],
    keyResult: "Turnstile scan throughput reduced to sub-300ms, eliminating cafeteria line congestion.",
    technologies: ["Next.js", "React Query", "ExcelJS", "Node.js", "Tailwind CSS", "PostgreSQL"],
    thumbnail: "/dorm.jpg",
    githubUrl: "https://github.com/lyzon1",
    liveUrl: "https://quick-bite-indol-omega.vercel.app/",
    featured: true,
    category: "Fullstack",
    caseStudy: {
      problem:
        "University dining halls and student dormitories in Ethiopia regularly handle thousands of students daily using paper registers, leading to hour-long cafeteria queues, impersonation, and chaotic Excel manual reconciliations.",
      myRole:
        "Lead Software Engineer — Architected student QR credential verification, Excel batch parser for administrative imports, and room quota allocation engines.",
      timeline: "3 Months (2023 - 2024)",
      stack: ["Next.js", "TypeScript", "React Query", "ExcelJS", "Tailwind CSS", "Node.js"],
      overview:
        "A smart institutional operations system engineered for speed under high volume. Cafeteria turnstiles scan student QR codes in sub-300ms, immediately checking meal allowance eligibility and preventing duplicate claims.",
      keyDecisions: [
        {
          title: "Client-Side Excel Chunk Parsing with Web Workers",
          description:
            "Administrators upload spreadsheets with 5,000+ student records. Leveraged ExcelJS in background workers to parse and validate batch datasets without freezing the browser thread.",
        },
        {
          title: "Offline-Resilient QR Verification Mode",
          description:
            "Implemented time-based encrypted QR tokens with local cache verification so dining staff can process attendance even during campus internet dropouts.",
        },
      ],
      challenges: [
        {
          title: "Peak Hour Latency Spikes during Lunch Rush",
          solution:
            "Engineered optimistic query updates with TanStack Query and batched background audit syncs, keeping the scanner screen responsive without blocking.",
        },
      ],
      results: [
        "Replaced manual paper tracking with instant digital validation.",
        "Eliminated duplicate meal check-ins and streamlined dorm assignment logistics.",
        "Allowed administrative officers to upload thousands of student records seamlessly.",
      ],
      architectureHighlights: [
        "Real-time QR barcode scanner integration via WebRTC camera APIs",
        "ExcelJS dynamic data serialization and template generation",
        "Role-based privilege guards for proctors, cafeteria managers, and university admins",
      ],
      screenshots: [
        {
          src: "/dorm.jpg",
          alt: "Smart Dorm and Cafe Management View",
          caption: "Administrative overview showing room allocation statuses and dining turnstile logs.",
        },
      ],
    },
  },
  {
    id: "4",
    slug: "fedel-ai",
    title: "Fedel AI",
    geezNumeral: "፬",
    subtitle: "Contextual Video Subtitle Language Learning Engine",
    summary:
      "A contextual language acquisition engine that parses subtitle dialogue files, isolates idiomatic colloquial phrases, and synthesizes interactive comprehension quizzes.",
    oneLineProblem:
      "Isolated flashcards lack emotional context; learners fail to grasp authentic conversational nuances from textbook exercises alone.",
    roleType: "Frontend",
    frontendSplit: [
      "Custom synced subtitle player with interactive word tapping",
      "Dynamic comprehension quiz engine with instant validation feedback",
      "High-contrast manuscript typography with smooth dark/light theming",
    ],
    backendSplit: [
      "Custom SRT parsing regex engine extracting timestamped idioms",
      "OpenAI API semantic difficulty classifier with token budgeting",
      "Stateless edge API route caching reducing external API overhead",
    ],
    keyResult: "Parsed feature-length subtitle files (1,500+ lines) and produced adaptive quizzes in under 1.5 seconds.",
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "OpenAI API", "SRT Parser Engine"],
    thumbnail: "/fedel-ai.png",
    githubUrl: "https://github.com/lyzon1",
    liveUrl: "https://fedel-ai.vercel.app",
    featured: true,
    category: "AI & Systems",
    caseStudy: {
      problem:
        "Traditional vocabulary flashcards lack organic emotional context. Language learners memorize words in isolation and struggle to grasp idiomatic cadence, colloquial phrasings, and situational humor present in authentic spoken dialogues.",
      myRole:
        "Sole Creator & Frontend/AI Engineer — Built the custom SRT file parser, vocabulary difficulty classifier, and interactive quiz generation pipeline.",
      timeline: "2 Months (2024)",
      stack: ["Next.js", "TypeScript", "Tailwind CSS", "OpenAI API", "Web Audio API"],
      overview:
        "Fedel AI transforms movie and TV subtitles into personalized language immersion curricula. By analyzing dialogue difficulty and generating contextual multiple-choice queries, it makes colloquial fluency accessible.",
      keyDecisions: [
        {
          title: "Deterministic Regex-Based SRT Tokenizer",
          description:
            "Built a zero-dependency subtitle parsing tokenizer in pure TypeScript, normalizing timecode boundaries and extracting dialogue words at 60fps without performance drops.",
        },
        {
          title: "Semantic Word Frequency Pruning",
          description:
            "Filtered out elementary words using frequency distribution lists, focusing generative AI prompts only on advanced idioms to conserve LLM token expenditure.",
        },
      ],
      challenges: [
        {
          title: "Encoding Variations in Multilingual SRT Files",
          solution:
            "Engineered encoding detection fallbacks (UTF-8, UTF-16, ISO-8859) to prevent corrupted character rendering across international subtitle archives.",
        },
      ],
      results: [
        "Parsed full-length movie subtitle files in under 200ms on client devices.",
        "Automated quiz generation workflow with zero manual question drafting required.",
        "Accessible, high-contrast quiz interface built for rapid keyboard navigation.",
      ],
      architectureHighlights: [
        "Lightweight client-side file parsing without server roundtrips",
        "Accessible ARIA attributes on interactive dialogue tokens",
        "Edge caching of common subtitle vocabulary models",
      ],
      screenshots: [
        {
          src: "/fedel-ai.png",
          alt: "Fedel AI Subtitle Learning Interface",
          caption: "Interactive subtitle viewer highlighting extracted vocabulary with contextual definitions.",
        },
      ],
    },
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return PROJECTS.find((p) => p.slug === slug || p.id === slug);
}

export function getNextProject(currentId: string): Project {
  const currentIndex = PROJECTS.findIndex(
    (p) => p.id === currentId || p.slug === currentId
  );
  if (currentIndex === -1 || currentIndex === PROJECTS.length - 1) {
    return PROJECTS[0];
  }
  return PROJECTS[currentIndex + 1];
}
