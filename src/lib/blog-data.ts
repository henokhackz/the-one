export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  geezNumeral: string;
  date: string;
  readingTime: string;
  category: string;
  summary: string;
  content: string[];
}

export const BLOG_POSTS: BlogPost[] = [
  {
    id: "1",
    slug: "fast-3d-hero-engineering",
    title: "Engineering a 60fps WebGL Glyph Hero Under 40KB: How I Kept 'Fidel' Blazing Fast",
    subtitle: "Techniques for low-overhead 3D web experiences without blowing bundle budgets.",
    geezNumeral: "፩",
    date: "October 2024",
    readingTime: "5 min read",
    category: "WebGL & Performance",
    summary:
      "A deep dive into instanced meshes, GPU capability gating, selective bundle tree-shaking, and 2D canvas fallbacks used to deliver a responsive Three.js hero on mobile.",
    content: [
      "When building creative portfolio sites, developers often fall into a trap: they import massive GLTF models, multi-megabyte Three.js bundles, and unbounded render loops that spin up laptop fans and drain mobile batteries. For 'Fidel', my rule was strict: creativity must never cost speed.",
      "1. Instanced Rendering Over Multiple Meshes: Rather than creating hundreds of individual Three.js TextGeometry or Sprite objects, we represent the Ge'ez character field using an InstancedMesh with an instanced matrix buffer. This collapses hundreds of draw calls into a single GPU draw call per frame.",
      "2. Capability Gating & The 2D Fallback: Before initializing any WebGL context, we query device capabilities. If the visitor is on a low-tier mobile device, has battery-saver active, or has enabled `prefers-reduced-motion`, we cleanly bypass WebGL and render a lightweight 2D HTML5 Canvas matrix. The visual essence of the rippling Ge'ez manuscript is preserved with zero 3D overhead.",
      "3. Strict Tree-Shaking of Three.js and Drei: Loading full Three.js can add over 500KB minified. By selectively importing only `WebGLRenderer`, `Scene`, `PerspectiveCamera`, and instanced geometry primitives, our hero module stays razor-thin.",
      "4. Freezing Render Loops Off-Screen: Using an IntersectionObserver, the WebGL/Canvas render loop pauses immediately when the user scrolls past the hero fold. When the hero is not in the viewport, CPU and GPU utilization drops to 0%.",
      "Conclusion: WebGL is not inherently slow; unconstrained WebGL is. By treating 3D as a performance-constrained engineering discipline, we create memorable digital identities without sacrificing Core Web Vitals.",
    ],
  },
  {
    id: "2",
    slug: "react-server-components-architecture",
    title: "Architecting for the Edge: React Server Components & Streaming in Next.js",
    subtitle: "Reducing client bundle footprints while maintaining rich interactive islands.",
    geezNumeral: "፪",
    date: "August 2024",
    readingTime: "6 min read",
    category: "Architecture",
    summary:
      "How splitting component boundaries between the server and client radically drops client hydration overhead and delivers instant First Contentful Paint.",
    content: [
      "The transition to Next.js App Router and React Server Components (RSC) fundamentally shifts how frontend developers think about data fetching and client-side JavaScript delivery.",
      "In traditional SPAs, the browser downloads the entire component tree, all external parsing libraries, and runs client-side hydration before content becomes interactive. With RSC, heavy dependencies—such as Markdown processors, date formatters, and database ORMs—never touch the client bundle.",
      "By keeping our case study pages as pure Server Components and isolating interactive widgets (like our live Ethiopian clock and 2D glyph canvas) into discrete `'use client'` islands, we ensure the initial HTML stream arrives instantly over the wire with sub-100ms FCP.",
    ],
  },
  {
    id: "3",
    slug: "ethiopian-calendar-in-typescript",
    title: "The Mathematics of the Ethiopian Calendar & 12-Hour Time System",
    subtitle: "Building a zero-dependency solar calendar conversion engine in strict TypeScript.",
    geezNumeral: "፫",
    date: "July 2024",
    readingTime: "4 min read",
    category: "Algorithms & Heritage",
    summary:
      "An explanation of Julian Day Number astronomical math, the 13-month solar calendar, and the 6-hour dawn offset of Ethiopian local time.",
    content: [
      "Ethiopia observes a unique calendar system (ዓመተ ምሕረት) consisting of 12 months of 30 days plus a 13th month, Pagume (ጳጉሜ), of 5 or 6 days. Furthermore, the Ethiopian day is divided into a 12-hour cycle beginning at sunrise (6:00 AM Gregorian = 12:00 ጠዋት).",
      "To build our live header widget without heavy external libraries, we implemented an astronomical Julian Day Number (JDN) mapping function in pure TypeScript. By converting Gregorian timestamps to JDN and then projecting into the Ethiopian epoch (August 29, 8 CE Julian), we achieve deterministic date conversions in sub-millisecond execution time.",
      "Unit testing against historical Ethiopian New Year (Enkutatash) dates ensures verified accuracy across leap years and timezone boundaries.",
    ],
  },
];

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find((p) => p.slug === slug || p.id === slug);
}
