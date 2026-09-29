/**
 * Central content layer for the portfolio.
 *
 * Every section consumes plain, serializable data from this file so the UI
 * never hardcodes content. When migrating to a CMS (e.g. Sanity), replace
 * these exports with fetches — the components' props stay identical.
 */

/* ── Profile ─────────────────────────────────────────────────────────────── */

export const profile = {
  firstName: "Lantumo",
  lastName: "Birhanu",
  greeting: "Hi, I'm Lantumo —",
  role: "Fullstack Developer",
  tagline:
    "I craft seamless digital experiences that merge elegant design with robust engineering.",
  location: "Addis Ababa, ET",
  email: "hbirhanu.dev@gmail.com",
  phone: "+251 989 943 757",
  /** Local resume asset served from /public */
  resumeUrl: "/Lantumo_Birhanu_resume.pdf",
  portrait: {
    src: "/me.png",
    alt: "Portrait of Lantumo Birhanu",
  },
} as const;

/* ── Navigation ──────────────────────────────────────────────────────────── */

export const navItems = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Portfolio", href: "/work" },
  { label: "Blog", href: "/blogs" },
  { label: "Contact", href: "/contact" },
] as const;

/* ── Socials ─────────────────────────────────────────────────────────────── */

export const socials = [
  {
    label: "GitHub",
    href: "https://github.com/lyzon1",
    icon: "github",
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/lantumobirhanu/",
    icon: "linkedin",
  },
  {
    label: "Telegram",
    href: "https://t.me/lyzon1",
    icon: "telegram",
  },
  {
    label: "Upwork",
    href: "https://www.upwork.com/freelancers/~014970832ba09c14d3?mp_source=share",
    icon: "upwork",
  },
] as const;

export type SocialIconName = (typeof socials)[number]["icon"];

/* ── Hero floating chips ─────────────────────────────────────────────────── */

export const heroChips = [
  { label: "Fullstack", side: "left", top: 0.18, x: 0.03, rotate: -8 },
  { label: "Developer", side: "left", top: 0.52, x: 0.09, rotate: -4 },
  { label: "Programmer", side: "right", top: 0.22, x: 0.06, rotate: 8 },
  { label: "Coder", side: "right", top: 0.55, x: 0.1, rotate: 5 },
] as const;

/* ── Services (process cards) ────────────────────────────────────────────── */

export type Service = {
  id: string;
  number: string;
  title: string;
  description: string;
  /** One of the design's hand-drawn squiggle shapes */
  squiggle: "wave" | "loop" | "zigzag";
};

export const services: Service[] = [
  {
    id: "frontend",
    number: "01",
    title: "Frontend Development",
    description:
      "Building responsive, pixel-perfect interfaces with React, Next.js and Tailwind — fast, accessible and delightful to use.",
    squiggle: "wave",
  },
  {
    id: "backend",
    number: "02",
    title: "Backend & APIs",
    description:
      "Designing reliable server-side systems, REST APIs and data models that stay secure and scale with your product.",
    squiggle: "loop",
  },
  {
    id: "fullstack",
    number: "03",
    title: "Fullstack Delivery",
    description:
      "Owning the whole journey from idea to deployment — architecture, implementation, testing and shipping to production.",
    squiggle: "zigzag",
  },
];

/* ── Testimonials ────────────────────────────────────────────────────────── */

export type Testimonial = {
  id: number;
  quote: string;
  name: string;
  role: string;
};

export const testimonials: Testimonial[] = [
  {
    id: 1,
    quote:
      "Bringing our product to life felt effortless. The communication was clear from day one, and every feature shipped looked polished and performed exactly as we imagined. I would gladly work together again.",
    name: "Abel Mekonnen",
    role: "Startup Founder",
  },
  {
    id: 2,
    quote:
      "Working with Lantumo was an absolute game-changer for our team. The perfect blend of technical depth and an exceptional eye for design resulted in a product our users genuinely love.",
    name: "Hiwot Bekele",
    role: "Engineering Lead",
  },
  {
    id: 3,
    quote:
      "He delivered high-quality code at an impressive pace while keeping everyone aligned throughout the process. I highly recommend him for any complex web application work.",
    name: "Yonas Tadesse",
    role: "Product Manager",
  },
];

/* ── Projects ────────────────────────────────────────────────────────────── */

export type Project = {
  id: string;
  slug: string;
  title: string;
  description: string;
  /** Screenshot shown inside the card's browser frame */
  image: string;
  tags: string[];
  github?: string;
  live?: string;
  featured: boolean;
  status: string;
  caseStudy: {
    problem: string;
    solution: string;
    features: string[];
    role: string;
    lessons: string[];
  };
};

export const projects: Project[] = [
  {
    id: "1",
    slug: "ai-mentor-plus",
    title: "Ai Mentor Plus",
    description:
      "A platform for creating and sharing AI-generated course content for students.",
    image: "/ai-mentor.png",
    tags: ["EdTech", "Product Design"],
    github: "https://github.com/henokhackz/ai-mentor",
    live: "https://ai-mentor-plus.vercel.app/",
    featured: true,
    status: "100% Finished",
    caseStudy: {
      problem:
        "Manually designing AI courses requires significant time and technical effort, creating a barrier for educators and independent learners.",
      solution:
        "Ai Mentor Plus simplifies course creation by generating structured AI curricula using a course title and minimal input.",
      features: [
        "AI-driven course and module generation",
        "User-friendly dashboard for managing learning content",
        "Responsive and accessible UI with dark mode",
        "Next.js App Router and Tailwind-powered design",
      ],
      role: "Full Stack Developer (AI integration, frontend, backend, UI design)",
      lessons: [
        "Learned prompt engineering for OpenAI APIs",
        "Enhanced skill in building AI-first products",
        "Optimized dynamic rendering in Next.js",
      ],
    },
  },
  {
    id: "2",
    slug: "zembil-ecommerce",
    title: "Zembil E-commerce",
    description:
      "A full-featured ecommerce platform with admin dashboard, Stripe & PayPal payments, and a responsive UI.",
    image: "/zembil.png",
    tags: ["Web App", "Fullstack"],
    github: "https://github.com/henokhackz/zembil",
    live: "https://zembil-self.vercel.app/",
    featured: true,
    status: "100% Finished",
    caseStudy: {
      problem:
        "Ethiopian online shopping platforms often lack modern features, user-friendly interfaces, and global payment options.",
      solution:
        "Zembil provides a scalable e-commerce experience with payment integrations, admin tools, and a responsive customer UI.",
      features: [
        "Stripe and PayPal checkout integration",
        "Admin dashboard with product and order control",
        "Dark/light mode UI",
        "Fully typed TypeScript + Prisma backend",
      ],
      role: "Full Stack Developer (Payments, dashboard, data modeling)",
      lessons: [
        "Implemented secure checkout with Stripe webhooks",
        "Built and optimized a scalable PostgreSQL schema",
        "Improved accessibility and mobile responsiveness",
      ],
    },
  },
  {
    id: "3",
    slug: "smart-dorm-cafe",
    title: "Smart Dorm & Cafe",
    description:
      "Automates dorm assignments, tracks equipment, and supports Excel data import for admins.",
    image: "/dorm.jpg",
    tags: ["SaaS", "Dashboard"],
    github: "https://github.com/henokhackz/quick-bite",
    live: "https://quick-bite-indol-omega.vercel.app/",
    featured: true,
    status: "100% Finished",
    caseStudy: {
      problem:
        "University dorm and cafeteria management is traditionally manual, error-prone, and inefficient.",
      solution:
        "A smart system that automates dorm assignments, equipment tracking, and cafeteria attendance via QR codes.",
      features: [
        "Excel import for student data and dorm assignments",
        "QR code-based attendance system",
        "Role-based access control",
        "Real-time data sync with React Query",
      ],
      role: "Lead Developer (architecture, ExcelJS integration, QR logic)",
      lessons: [
        "Learned to integrate ExcelJS for data import/export",
        "Handled complex UI logic using React Query and mutations",
        "Designed a scalable access-control system",
      ],
    },
  },
  {
    id: "4",
    slug: "fedel-ai",
    title: "Fedel AI",
    description:
      "Helps users learn English by leveraging subtitles from movies and series.",
    image: "/fedel-ai.png",
    tags: ["AI", "EdTech"],
    github: "https://github.com/henokhackz/fidel-ai",
    live: "https://fedel-ai.vercel.app",
    featured: true,
    status: "In Progress",
    caseStudy: {
      problem:
        "Language learners struggle to retain vocabulary and expressions without engaging, contextual resources.",
      solution:
        "Fedel AI extracts subtitles, classifies vocabulary by difficulty, and generates quizzes and examples.",
      features: [
        "Subtitle upload and parsing",
        "Vocabulary categorization using AI",
        "Quiz generator with scoring",
        "Clean, mobile-first UI",
      ],
      role: "Sole Developer (AI prompt, parser, quiz engine)",
      lessons: [
        "Developed a pipeline for SRT file processing",
        "Integrated OpenAI for categorization",
        "Built dynamic quiz logic from text data",
      ],
    },
  },
  {
    id: "5",
    slug: "form-genie-ai",
    title: "Form Genie AI",
    description:
      "AI-powered form generation with data validation and a friendly dashboard.",
    image: "/form-genie.png",
    tags: ["AI", "Product Design"],
    github: "https://github.com/henokhackz/form_genie",
    live: "https://form-genie-nu.vercel.app/",
    featured: true,
    status: "100% Finished",
    caseStudy: {
      problem:
        "Building good forms takes time — structuring questions, validation rules and logic is repetitive work.",
      solution:
        "Form Genie AI generates complete forms from a short prompt, with validation and a management dashboard.",
      features: [
        "AI-driven form generation",
        "User-friendly dashboard for managing forms",
        "Tailwind-powered responsive design",
        "Prisma for form management",
      ],
      role: "Backend and Frontend Developer",
      lessons: [
        "Built user-based access control with Next.js",
        "Designed a responsive UI using Tailwind",
        "Improved Prisma development skills",
      ],
    },
  },
  {
    id: "6",
    slug: "wisehub",
    title: "WiseHub",
    description:
      "A book lovers community that lets users enjoy reading while listening to music in real-time.",
    image: "/wisehub.png",
    tags: ["Community", "Web App"],
    github: "https://github.com/lantumo0001/wise-hub",
    live: "https://wise-hub.vercel.app/",
    featured: false,
    status: "100% Finished",
    caseStudy: {
      problem:
        "Readers often want to combine music with reading in a social and interactive space.",
      solution:
        "WiseHub synchronizes music and reading in a web-based community for book lovers.",
      features: [
        "Real-time reading rooms",
        "Firebase authentication",
        "Music player integration",
        "Firestore-based chat and sync",
      ],
      role: "Frontend Developer (UI logic, Firestore setup)",
      lessons: [
        "Practiced Firebase real-time features",
        "Built custom music controls in React",
        "Designed state-driven UI with React Context",
      ],
    },
  },
  {
    id: "7",
    slug: "ethio-voice",
    title: "Ethio Voice Portal",
    description:
      "Internal tool for Ethio Telecom to analyze employee feedback via dashboards and charts.",
    image: "/ethio-voice.png",
    tags: ["Dashboard", "Data Viz"],
    github: "https://github.com/henokhackz/ethio-voice",
    live: "https://ethio-voice.vercel.app/",
    featured: false,
    status: "100% Finished",
    caseStudy: {
      problem:
        "Manual collection and analysis of employee feedback in large organizations leads to poor decision-making.",
      solution:
        "Ethio Voice portal simplifies feedback analysis with visual insights and structured feedback data.",
      features: [
        "Custom admin charts via Chart.js",
        "Feedback sentiment scoring",
        "MongoDB schema for scalable data handling",
        "Role-based login",
      ],
      role: "Full Stack Developer (Node.js API, MongoDB, frontend charts)",
      lessons: [
        "Used Chart.js for dynamic data visualization",
        "Created RESTful Express APIs",
        "Improved skills in building admin dashboards",
      ],
    },
  },
  {
    id: "8",
    slug: "lost-and-found",
    title: "Lost & Found",
    description:
      "A platform for lost and found items, where users can post lost items and search for found items.",
    image: "/lost-and-found.png",
    tags: ["Community", "Web App"],
    github: "https://github.com/henokhackz/lost-and-found",
    live: "https://lost-and-found-murex.vercel.app/",
    featured: false,
    status: "100% Finished",
    caseStudy: {
      problem:
        "There is no digital system in universities or communities for managing lost and found items efficiently.",
      solution:
        "A community-driven platform that allows users to report and search for lost or found items in real-time.",
      features: [
        "Post creation with item image and description",
        "Search and filter functionality",
        "Contact info for item claim",
      ],
      role: "Solo Developer (design, UI logic, deployment)",
      lessons: [
        "Learned real-world use of dynamic routing",
        "Practiced UX principles for form-heavy interfaces",
        "Improved page performance on Next.js",
      ],
    },
  },
];

/* ── Experience (Who Am I table) ─────────────────────────────────────────── */

export type Experience = {
  id: string;
  role: string;
  company: string;
  start: string;
  end: string;
};

export const experience: Experience[] = [
  {
    id: "ideeza",
    role: "Three.js Engineer",
    company: "Ideeza",
    start: "2025",
    end: "Now",
  },
  {
    id: "freelance",
    role: "Fullstack Developer",
    company: "Independent",
    start: "2025",
    end: "Now",
  },
  {
    id: "ethiotelecom",
    role: "Full Stack Developer Intern",
    company: "Ethio Telecom",
    start: "2024",
    end: "2025",
  },
  {
    id: "nile",
    role: "Web Developer",
    company: "Nile Technologies",
    start: "2025",
    end: "2025",
  },
];

/* ── Blog posts ──────────────────────────────────────────────────────────── */

export type BlogPost = {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  image: string;
  category: string;
  tags: string[];
  readingTime: string;
  date: string;
  published: boolean;
};

export const blogPosts: BlogPost[] = [
  {
    id: 1,
    slug: "react-server-components",
    title: "Architecting for the Edge: React Server Components",
    excerpt:
      "React Server Components represent a paradigm shift in full-stack architecture. By splitting rendering between the server and client, we can radically reduce bundle sizes while improving SEO and core web vitals.",
    image:
      "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=1170&q=80",
    category: "Architecture",
    tags: ["React", "Server Components", "Next.js"],
    readingTime: "6 min",
    date: "2023-07-01",
    published: true,
  },
  {
    id: 2,
    slug: "scalable-webgl",
    title: "High-Performance 3D Rendering with Three.js",
    excerpt:
      "Building immersive web experiences requires more than just calling WebGL APIs. It requires deep optimization of geometry, shader management, and understanding the rendering pipeline to maintain 60fps on low-end devices.",
    image:
      "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1170&q=80",
    category: "WebGL",
    tags: ["Three.js", "WebGL", "Performance"],
    readingTime: "8 min",
    date: "2023-06-24",
    published: true,
  },
  {
    id: 3,
    slug: "ai-driven-development",
    title: "Integrating LLMs into Production Next.js Apps",
    excerpt:
      "The integration of Large Language Models (LLMs) into modern web stacks requires a careful balance of prompt engineering, streaming responses, and edge computing to ensure a seamless and performant user experience.",
    image:
      "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=1170&q=80",
    category: "AI Integration",
    tags: ["LLM", "Next.js", "OpenAI"],
    readingTime: "5 min",
    date: "2023-06-20",
    published: true,
  },
];

/* ── Contact CTA ─────────────────────────────────────────────────────────── */

export const contactCta = {
  title: "Let's Make It Happen",
  description:
    "I'm always open to new projects, collaborations and problems worth solving. Tell me what you're building and let's see if we're a good fit.",
  buttonLabel: "Get In Touch",
} as const;
