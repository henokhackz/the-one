"use client";

import React, { useState, useEffect } from "react";
import { Code2, Server, Layers, Cpu, CheckCircle2 } from "lucide-react";
import { TibebCornerStamp } from "@/components/ui/tibeb-pattern";
import { useLocale } from "@/lib/locale-context";
import { getSkillCategories, SanitySkillCategory } from "@/sanity/lib/api";
import { Reveal } from "@/components/ui/reveal";
import { RuledFrame } from "@/components/ui/ruled-frame";

interface SkillItem {
  name: string;
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

const getCategoryIcon = (iconName: string): React.ReactNode => {
  switch (iconName) {
    case "Server":
      return <Server className="w-5 h-5 text-accent" />;
    case "Layers":
      return <Layers className="w-5 h-5 text-accent" />;
    case "Cpu":
      return <Cpu className="w-5 h-5 text-accent" />;
    default:
      return <Code2 className="w-5 h-5 text-accent" />;
  }
};

export function SkillsMatrix({ onHoverSkillProject }: SkillsMatrixProps) {
  const [activeSkill, setActiveSkill] = useState<string | null>(null);
  const { locale } = useLocale();

  const [categories, setCategories] = useState<SkillCategory[]>([
    {
      title: "Frontend Development",
      icon: <Code2 className="w-5 h-5 text-accent" />,
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
      icon: <Server className="w-5 h-5 text-accent" />,
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
      icon: <Layers className="w-5 h-5 text-accent" />,
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
      icon: <Cpu className="w-5 h-5 text-accent" />,
      description: "Crafting real-time 3D and WebGL experiences.",
      skills: [
        { name: "WebGL & GLSL Shaders", projectIds: ["1", "4"] },
        { name: "3D Visualization", projectIds: ["4"] },
        { name: "Interactive Animation", projectIds: ["1"] },
        { name: "Real-time Rendering", projectIds: [] },
        { name: "EDA / PCB Interfaces", projectIds: ["4"] },
      ],
    },
  ]);

  useEffect(() => {
    getSkillCategories().then((data) => {
      if (data && data.length > 0) {
        setCategories(
          data.map((cat) => ({
            title: cat.title,
            icon: getCategoryIcon(cat.iconName),
            description: cat.description,
            skills: cat.skills || [],
          }))
        );
      }
    });
  }, []);

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
        <div className="flex items-center gap-4">
          <TibebCornerStamp geezNumeral="፪" />
          <Reveal variant="ink" duration={900}>
            <h2
              className={`text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-foreground ${
                locale === "am" ? "font-ethiopic" : "font-heading"
              }`}
            >
              {locale === "am" ? "የምህንድስና ችሎታዎች" : "Technical Capabilities"}
            </h2>
          </Reveal>
        </div>
      </div>

      {/* Balanced 2x2 Category Cards with self-drawing ruled borders */}
      <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
        {categories.map((cat, idx) => (
          <RuledFrame
            key={idx}
            delay={idx * 100}
            className="p-6 sm:p-8 rounded-[1px] border border-border/80 card-ink hover:border-border-strong transition-colors"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-none bg-accent/10 border border-accent/30 flex items-center justify-center">
                {cat.icon}
              </div>
              <h3 className="font-heading text-xl font-bold text-foreground">
                {cat.title}
              </h3>
            </div>

            <div className="flex flex-wrap gap-2">
              {cat.skills.map((skill, sIdx) => {
                const isActive = activeSkill === skill.name;
                return (
                  <div
                    key={sIdx}
                    onMouseEnter={() => handleMouseEnter(skill)}
                    onMouseLeave={handleMouseLeave}
                    className={`group/skill px-3 py-2 rounded-[1px] border text-xs transition-all cursor-pointer inline-flex items-center gap-2 ${
                      isActive
                        ? "bg-foreground text-background border-foreground font-semibold"
                        : "bg-transparent hover:bg-foreground/5 border-border text-foreground hover:border-foreground"
                    }`}
                  >
                    <CheckCircle2
                      className={`w-3.5 h-3.5 shrink-0 ${
                        isActive ? "text-accent" : "text-muted group-hover/skill:text-accent"
                      }`}
                    />
                    <span>{skill.name}</span>
                  </div>
                );
              })}
            </div>
          </RuledFrame>
        ))}
      </div>
    </section>
  );
}
