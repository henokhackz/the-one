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
      "An intelligent educational platform that generates structured, multi-module learning curricula from single topic prompts with real-time progress tracking.",
    technologies: ["Next.js", "React", "TypeScript", "Tailwind CSS", "OpenAI API", "PostgreSQL"],
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
      "A high-performance modern e-commerce storefront with dual global and local checkout gateways, real-time inventory synchronization, and comprehensive merchant analytics.",
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
      "An automated campus logistics platform replacing manual recordkeeping with QR-driven dining access, automated room allocations, and batch Excel synchronization.",
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
      "A contextual language acquisition tool that parses real movie and series subtitles, extracts nuanced vocabulary, and generates interactive comprehension quizzes.",
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
      timeline: "Ongoing (Active Project)",
      stack: ["Next.js App Router", "TypeScript", "Tailwind CSS", "OpenAI API", "Framer Motion"],
      overview:
        "Named 'Fedel' (ፊደል — the letters and building blocks of knowledge), this platform allows users to upload any SRT subtitle file. It analyzes dialogue timestamps, identifies CEFR-graded vocabulary, and builds contextual exercises directly from the movie scenes.",
      keyDecisions: [
        {
          title: "Custom Zero-Dependency SRT Timestamp Parser",
          description:
            "Wrote a clean, lightweight regex-based SRT parser that extracts timecodes, dialogues, and speaker transitions without bloating bundle size with heavy third-party libraries.",
        },
        {
          title: "CEFR Vocabulary Filtering & Difficulty Bucketing",
          description:
            "Mapped extracted dialogues against frequency dictionaries to highlight B2/C1/C2 vocabulary, allowing users to target high-yield advanced expressions.",
        },
      ],
      challenges: [
        {
          title: "Parsing Messy & Non-Standard Subtitle Encoding Files",
          solution:
            "Implemented fallback character encoding detection (UTF-8, Latin-1, Windows-1252) and stripping of non-dialogue bracketed audio cues (`[dramatic music]`).",
        },
      ],
      results: [
        "Processes full 2-hour movie subtitle files in under 200ms on the client.",
        "Generates multi-choice and fill-in-the-blank quizzes grounded in dialogue context.",
        "Minimalist, typography-driven reading interface with dark and light parchment modes.",
      ],
      architectureHighlights: [
        "Custom streaming SRT subtitle lexical tokenizer",
        "Contextual flashcards linked to exact scene timestamps",
        "Accessible keyboard navigation for quiz drills",
      ],
      screenshots: [
        {
          src: "/fedel-ai.png",
          alt: "Fedel AI Subtitle Workspace",
          caption: "Dialogue analyzer highlighting idiomatic vocabulary with instant contextual definitions.",
        },
      ],
    },
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return PROJECTS.find((p) => p.slug === slug || p.id === slug);
}

export function getNextProject(currentSlug: string): Project {
  const currentIndex = PROJECTS.findIndex(
    (p) => p.slug === currentSlug || p.id === currentSlug
  );
  const nextIndex = (currentIndex + 1) % PROJECTS.length;
  return PROJECTS[nextIndex];
}
