import { sanityFetch } from '../client';
import {
  projectsQuery,
  projectBySlugQuery,
  blogsQuery,
  blogBySlugQuery,
  skillCategoriesQuery,
  experiencesQuery,
  resumeQuery,
} from '../queries';
import { PROJECTS, Project } from '@/lib/projects-data';
import { BLOG_POSTS, BlogPost } from '@/lib/blog-data';

function normalizeProject(p: Project): Project {
  const fallback = PROJECTS.find((lp) => lp.id === p.id || lp.slug === p.slug);
  return {
    ...p,
    thumbnail: p.thumbnail && p.thumbnail.trim() !== '' ? p.thumbnail : (fallback?.thumbnail || '/ai-mentor.png'),
    caseStudy: {
      ...p.caseStudy,
      screenshots: (p.caseStudy?.screenshots && p.caseStudy.screenshots.length > 0)
        ? p.caseStudy.screenshots.map((s, idx) => ({
            ...s,
            src: s?.src && s.src.trim() !== '' ? s.src : (fallback?.caseStudy?.screenshots?.[idx]?.src || fallback?.thumbnail || '/ai-mentor.png'),
          }))
        : (fallback?.caseStudy?.screenshots || []),
    },
  };
}

function normalizeBlogPost(b: BlogPost): BlogPost {
  const fallback = BLOG_POSTS.find((lb) => lb.id === b.id || lb.slug === b.slug);
  return {
    ...b,
    coverImage: (b as any).coverImage && (b as any).coverImage.trim() !== '' ? (b as any).coverImage : (fallback ? '/hero.jpg' : ''),
  };
}

// ============================================================================
// 1. PROJECTS
// ============================================================================
export async function getProjects(): Promise<Project[]> {
  const sanityProjects = await sanityFetch<Project[]>({
    query: projectsQuery,
    tags: ['project'],
    revalidate: 60,
  });

  if (sanityProjects && sanityProjects.length > 0) {
    return sanityProjects.map(normalizeProject);
  }

  // Graceful fallback to rich local data
  return PROJECTS;
}

export async function getProjectBySlug(slug: string): Promise<Project | undefined> {
  const sanityProject = await sanityFetch<Project>({
    query: projectBySlugQuery,
    params: { slug },
    tags: [`project:${slug}`],
    revalidate: 60,
  });

  if (sanityProject) {
    return normalizeProject(sanityProject);
  }

  // Graceful fallback
  return PROJECTS.find((p) => p.slug === slug || p.id === slug);
}

// ============================================================================
// 2. BLOG POSTS
// ============================================================================
export async function getBlogPosts(): Promise<BlogPost[]> {
  const sanityBlogs = await sanityFetch<BlogPost[]>({
    query: blogsQuery,
    tags: ['blogPost'],
    revalidate: 60,
  });

  if (sanityBlogs && sanityBlogs.length > 0) {
    return sanityBlogs.map(normalizeBlogPost);
  }

  // Graceful fallback to rich local data
  return BLOG_POSTS;
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPost | undefined> {
  const sanityBlog = await sanityFetch<BlogPost>({
    query: blogBySlugQuery,
    params: { slug },
    tags: [`blogPost:${slug}`],
    revalidate: 60,
  });

  if (sanityBlog) {
    return normalizeBlogPost(sanityBlog);
  }

  // Graceful fallback
  return BLOG_POSTS.find((p) => p.slug === slug || p.id === slug);
}

// ============================================================================
// 3. SKILL CATEGORIES
// ============================================================================
export interface SanitySkillCategory {
  _id?: string;
  title: string;
  iconName: 'Code2' | 'Server' | 'Layers' | 'Cpu' | string;
  description: string;
  order?: number;
  skills: {
    name: string;
    projectIds: string[];
  }[];
}

export async function getSkillCategories(): Promise<SanitySkillCategory[]> {
  const sanityCategories = await sanityFetch<SanitySkillCategory[]>({
    query: skillCategoriesQuery,
    tags: ['skillCategory'],
    revalidate: 60,
  });

  if (sanityCategories && sanityCategories.length > 0) {
    return sanityCategories;
  }

  // Default fallback matching current SkillsMatrix
  return [
    {
      title: "Frontend Development",
      iconName: "Code2",
      description: "Building fast, accessible web interfaces with modern React.",
      skills: [
        { name: "React & Next.js", projectIds: ["1", "2"] },
        { name: "TypeScript & JavaScript", projectIds: ["1", "2", "3", "4"] },
        { name: "Tailwind CSS", projectIds: ["1", "2", "3", "4"] },
        { name: "Three.js & WebGL", projectIds: ["1", "4"] },
        { name: "Real-time & Streaming UI", projectIds: ["1"] },
        { name: "Responsive & Accessible UI", projectIds: ["2", "4"] },
      ],
    },
    {
      title: "Backend & Data",
      iconName: "Server",
      description: "Engineering reliable APIs, data models, and payment flows.",
      skills: [
        { name: "PostgreSQL", projectIds: ["1", "2", "3"] },
        { name: "Prisma ORM", projectIds: ["1", "2"] },
        { name: "Node.js & Express", projectIds: ["3"] },
        { name: "Payments (Stripe & PayPal)", projectIds: ["2"] },
        { name: "REST APIs", projectIds: ["2"] },
        { name: "Authentication & Security", projectIds: ["3"] },
      ],
    },
    {
      title: "Cloud & DevOps",
      iconName: "Layers",
      description: "Shipping and scaling products on modern cloud infrastructure.",
      skills: [
        { name: "AWS & Vercel Deployment", projectIds: ["1", "2", "4"] },
        { name: "Docker & Containers", projectIds: ["3", "4"] },
        { name: "CI/CD (GitHub Actions)", projectIds: ["1", "2", "3", "4"] },
        { name: "Git & Version Control", projectIds: [] },
        { name: "Edge & Serverless Functions", projectIds: ["2", "3"] },
        { name: "Monorepo Architecture", projectIds: ["1"] },
      ],
    },
    {
      title: "3D & Interactive",
      iconName: "Cpu",
      description: "Crafting real-time 3D and WebGL experiences.",
      skills: [
        { name: "WebGL & GLSL Shaders", projectIds: ["1", "4"] },
        { name: "3D Visualization", projectIds: ["4"] },
        { name: "Interactive Animation", projectIds: ["1"] },
        { name: "Real-time Rendering", projectIds: [] },
        { name: "EDA / PCB Interfaces", projectIds: ["4"] },
      ],
    },
  ];
}

// ============================================================================
// 4. WORK EXPERIENCE
// ============================================================================
export interface SanityExperience {
  id: string;
  role: string;
  company: string;
  logo: string | null;
  date: string;
  duration: string;
  location: string;
  type: string;
  accent: string;
  featured: boolean;
  description: string;
  highlights: string[];
  technologies: string[];
}

export async function getExperiences(): Promise<SanityExperience[]> {
  const sanityExp = await sanityFetch<SanityExperience[]>({
    query: experiencesQuery,
    tags: ['experience'],
    revalidate: 60,
  });

  if (sanityExp && sanityExp.length > 0) {
    return sanityExp.map((e) => ({
      ...e,
      logo: e.logo || (e.company === "Ideeza" || e.id === "ideeza" ? "/ideeza.png" : null),
    }));
  }

  // Default fallback matching current Experience component
  return [
    {
      id: "ideeza",
      role: "Three.js Engineer",
      company: "Ideeza",
      logo: "/ideeza.png",
      date: "Nov 2025 – Present",
      duration: "Current",
      location: "Remote · Israel",
      type: "Contract",
      accent: "#f59e0b",
      featured: true,
      description:
        "Contributing to Ideeza's AI-powered hardware design platform — a next-generation EDA tool that lets engineers and makers design PCBs through both manual workflows and AI-generated prompts. I own the Three.js electronics layer: building interactive 3D PCB visualizations, implementing real-time layer inspection, schematic routing, and 2D/3D dual-side viewing rendering that ships production-ready Gerber files.",
      highlights: [
        "Built the 2D/3D PCB canvas with real-time layer switching and drill-hole rendering",
        "Implemented AI-driven board layout generation from natural language input",
        "Delivered interactive trace inspection tools with zoom-level-aware detail",
        "Developed both schematic views and dual-perspective 3D viewer modes",
      ],
      technologies: [
        "Three.js",
        "Next.js",
        "React",
        "TypeScript",
        "Node.js",
        "WebGL",
        "EDA APIs",
      ],
    },
    {
      id: "freelance",
      role: "Fullstack Freelancer",
      company: "Independent Professional",
      logo: null,
      date: "Jun 2025 – Present",
      duration: "Ongoing",
      location: "Remote · Global",
      type: "Freelance",
      accent: "#f59e0b",
      featured: false,
      description:
        "Delivering end-to-end web products for startups and SMEs globally. Expanding client base through social media outreach, global marketplaces like Upwork, and regional platforms like Afriwork (the premier Ethiopian talent hub). Specializing in performance-critical Next.js applications and API infrastructure.",
      highlights: [
        "Shipped 8+ production apps for independent clients and businesses",
        "Sourced high-value projects consistently via Upwork, Afriwork, and social channels",
        "Built scalable REST routes and architectures deployed across modern CI/CD pipelines",
      ],
      technologies: [
        "Next.js",
        "TypeScript",
        "Node.js",
        "PostgreSQL",
        "Tailwind CSS",
        "Prisma",
        "Docker",
      ],
    },
    {
      id: "zembil",
      role: "Lead Fullstack Developer",
      company: "Zembil Online Store",
      logo: "/zembil.png",
      date: "May 2024 – Nov 2024",
      duration: "7 mos",
      location: "Addis Ababa, Ethiopia · Hybrid",
      type: "Full-time",
      accent: "#f59e0b",
      featured: true,
      description:
        "Architected and deployed Ethiopia's high-reliability e-commerce marketplace platform. Engineered end-to-end purchasing, payment webhooks, and vendor inventories with rigorous consistency guarantees.",
      highlights: [
        "Architected atomic transaction checkout handling concurrent flash-sale volume",
        "Integrated dual-gateway payment webhooks (Stripe / Local Mobile Money)",
        "Implemented row-level locking on inventory reducing overselling to 0%",
      ],
      technologies: [
        "Next.js",
        "React",
        "TypeScript",
        "Node.js",
        "PostgreSQL",
        "Prisma",
        "Tailwind CSS",
      ],
    },
  ];
}

// ============================================================================
// 5. RESUME / CV
// ============================================================================
export interface SanityResume {
  title: string;
  headline?: string;
  fileUrl: string;
  externalPdfUrl?: string;
  lastUpdated?: string;
  summary?: string;
}

export async function getResumeData(): Promise<SanityResume> {
  const sanityResume = await sanityFetch<SanityResume>({
    query: resumeQuery,
    tags: ['resume'],
    revalidate: 60,
  });

  if (sanityResume && (sanityResume.fileUrl || sanityResume.externalPdfUrl)) {
    return {
      title: sanityResume.title || "Lantumo Birhanu Resume",
      headline: sanityResume.headline,
      fileUrl: sanityResume.fileUrl || sanityResume.externalPdfUrl || "/Lantumo_Birhanu_resume.pdf",
      lastUpdated: sanityResume.lastUpdated || "October 2024",
      summary: sanityResume.summary,
    };
  }

  // Graceful fallback to local static PDF
  return {
    title: "Lantumo Birhanu Official Resume (PDF)",
    headline: "Frontend, Backend & Fullstack Developer",
    fileUrl: "/Lantumo_Birhanu_resume.pdf",
    lastUpdated: "October 2024",
  };
}
