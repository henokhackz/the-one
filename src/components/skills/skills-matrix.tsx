"use client";

import React, { useState } from "react";
import { Code2, Server, Layers, Cpu, CheckCircle2 } from "lucide-react";
import { TibebCornerStamp } from "@/components/ui/tibeb-pattern";
import { useLocale } from "@/lib/locale-context";

interface SkillItem {
  name: string;
  level: string;
  projectIds: string[];
}

interface SkillCategory {
  title: string;
  icon: React.ReactNode;
  description: string;
  skills: SkillItem[];
}

interface SkillsMatrixProps {
  onHoverSkillProject?: (projectId: string | null) => void;
}

export function SkillsMatrix({ onHoverSkillProject }: SkillsMatrixProps) {
  const [activeSkill, setActiveSkill] = useState<string | null>(null);
  const { locale } = useLocale();

  const categories: SkillCategory[] = [
    {
      title: "Frontend Engineering",
      icon: <Code2 className="w-5 h-5 text-accent" />,
      description: "Crafting sub-second, accessible web applications with modern React and Next.js.",
      skills: [
        { name: "React 19 & Next.js App Router", level: "Senior", projectIds: ["1", "2"] },
        { name: "TypeScript (Strict Mode)", level: "Production", projectIds: ["1", "2", "3", "4"] },
        { name: "Tailwind CSS v4 & Design Tokens", level: "Advanced", projectIds: ["1", "2", "3", "4"] },
        { name: "Three.js & WebGL Shaders (GLSL)", level: "Specialist", projectIds: ["1", "4"] },
        { name: "Server-Sent Events & Streaming UI", level: "Production", projectIds: ["1"] },
        { name: "WCAG AA Accessibility & Screen Readers", level: "Verified", projectIds: ["2", "4"] },
      ],
    },
    {
      title: "Backend & Data Architecture",
      icon: <Server className="w-5 h-5 text-accent" />,
      description: "Engineering scalable APIs, relational data models, and resilient checkout pipelines.",
      skills: [
        { name: "PostgreSQL & Relational Schemas", level: "Production", projectIds: ["1", "2", "3"] },
        { name: "Prisma ORM & Migration Pipelines", level: "Advanced", projectIds: ["1", "2"] },
        { name: "Node.js & Express API Routes", level: "Production", projectIds: ["3"] },
        { name: "Idempotent Webhooks (Stripe / PayPal)", level: "Specialist", projectIds: ["2"] },
        { name: "Row-Level Locks & Race-Condition Safety", level: "Verified", projectIds: ["2"] },
        { name: "Cryptographic Tokens & Auth Guardrails", level: "Production", projectIds: ["3"] },
      ],
    },
    {
      title: "Fullstack Architecture & Cloud",
      icon: <Layers className="w-5 h-5 text-accent" />,
      description: "Connecting edge runtimes, caching layers, and CI/CD pipelines.",
      skills: [
        { name: "React Server Components (RSC)", level: "Architect", projectIds: ["1", "2"] },
        { name: "Vercel Edge Functions & Edge Runtime", level: "Production", projectIds: ["1", "4"] },
        { name: "Web Workers & Background Parsing", level: "Specialist", projectIds: ["3"] },
        { name: "OpenAI API Structured Outputs (Zod)", level: "Production", projectIds: ["1", "4"] },
        { name: "TanStack React Query Optimistic Sync", level: "Advanced", projectIds: ["3"] },
        { name: "Git Workflow & Automated Deployments", level: "Production", projectIds: ["1", "2", "3", "4"] },
      ],
    },
  ];

  const handleMouseEnter = (skill: SkillItem) => {
    setActiveSkill(skill.name);
    if (onHoverSkillProject && skill.projectIds.length > 0) {
      onHoverSkillProject(skill.projectIds[0]);
    }
  };

  const handleMouseLeave = () => {
    setActiveSkill(null);
    if (onHoverSkillProject) {
      onHoverSkillProject(null);
    }
  };

  return (
    <section
      id="skills"
      className="relative z-10 w-full max-w-[1600px] mx-auto px-4 sm:px-6 md:px-12 py-24 scroll-mt-20 bg-background"
      aria-label="Technical Skills and Architectural Capabilities"
    >
      {/* Header */}
      <div className="pb-8 border-b border-border/80">
        <div className="flex items-center gap-3 mb-2">
          <TibebCornerStamp geezNumeral={locale === "am" ? "ችሎታ" : "02"} />
          <span className="font-mono text-xs tracking-[0.25em] text-accent uppercase font-medium">
            {locale === "am" ? "የቴክኖሎጂ እና የስርዓት ቁጥጥር" : "Fullstack Competencies & Proof"}
          </span>
        </div>
        <h2
          className={`text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-foreground ${
            locale === "am" ? "font-ethiopic" : "font-heading"
          }`}
        >
          {locale === "am" ? "የምህንድስና ችሎታዎች" : "Technical Capabilities"}
        </h2>
        <p className="text-sm text-muted mt-2 max-w-xl">
          {locale === "am"
            ? "በእውነተኛ ምርቶች ላይ የተረጋገጡ የፍሮንትኤንድ፣ ባክኤንድ እና የደመና ቴክኖሎጂዎች። ማንኛውንም ችሎታ በመጫን የተገነባበትን ፕሮጀክት ይመልከቱ።"
            : "Hover any skill pill to highlight the corresponding production project below, proving real-world implementation."}
        </p>
      </div>

      {/* 3-Column Architectural Cards */}
      <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {categories.map((cat, idx) => (
          <div
            key={idx}
            className="p-6 sm:p-8 rounded-sm border border-border bg-surface/90 backdrop-blur-xs flex flex-col justify-between shadow-md hover:border-accent/60 transition-colors"
          >
            <div>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-sm bg-accent/10 border border-accent/30 flex items-center justify-center">
                  {cat.icon}
                </div>
                <h3 className="font-heading text-xl font-bold text-foreground">
                  {cat.title}
                </h3>
              </div>

              <p className="text-xs text-muted leading-relaxed mb-6">
                {cat.description}
              </p>

              {/* Skills Grid */}
              <div className="space-y-2.5">
                {cat.skills.map((skill, sIdx) => {
                  const isActive = activeSkill === skill.name;
                  return (
                    <div
                      key={sIdx}
                      onMouseEnter={() => handleMouseEnter(skill)}
                      onMouseLeave={handleMouseLeave}
                      className={`group/skill px-3.5 py-2.5 rounded-xs border text-xs transition-all cursor-pointer flex items-center justify-between ${
                        isActive
                          ? "bg-foreground text-background border-foreground font-semibold shadow-xs"
                          : "bg-background/80 hover:bg-surface border-border text-foreground hover:border-accent"
                      }`}
                    >
                      <span className="flex items-center gap-2">
                        <CheckCircle2
                          className={`w-3.5 h-3.5 ${
                            isActive ? "text-accent" : "text-muted group-hover/skill:text-accent"
                          }`}
                        />
                        <span>{skill.name}</span>
                      </span>

                      <span
                        className={`font-mono text-[10px] uppercase tracking-wider px-1.5 py-0.5 rounded-xs ${
                          isActive
                            ? "bg-background text-foreground"
                            : "bg-surface text-muted"
                        }`}
                      >
                        {skill.level}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-border/50 text-[11px] font-mono text-muted flex items-center justify-between">
              <span>Verified in Production</span>
              <span className="text-accent">● Active</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
