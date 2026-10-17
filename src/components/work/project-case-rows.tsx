"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Github, ExternalLink } from "lucide-react";
import { PROJECTS, Project } from "@/lib/projects-data";
import { getProjects } from "@/sanity/lib/api";
import { TibebCornerStamp } from "@/components/ui/tibeb-pattern";
import { useLocale } from "@/lib/locale-context";
import { Reveal } from "@/components/ui/reveal";
import { RuledFrame } from "@/components/ui/ruled-frame";
import { CountUp } from "@/components/ui/count-up";

interface ProjectCaseRowsProps {
  highlightedProjectId?: string | null;
  projects?: Project[];
}

export function ProjectCaseRows({ highlightedProjectId, projects: initialProjects }: ProjectCaseRowsProps) {
  const [filter, setFilter] = useState<"All" | "Frontend" | "Backend" | "Fullstack">("All");
  const [projectsList, setProjectsList] = useState<Project[]>(initialProjects || PROJECTS);
  const { locale, t } = useLocale();

  useEffect(() => {
    if (initialProjects) {
      setProjectsList(initialProjects);
    } else {
      getProjects().then((data) => {
        if (data && data.length > 0) setProjectsList(data);
      });
    }
  }, [initialProjects]);

  const filteredProjects = projectsList.filter((p) => {
    if (filter === "All") return true;
    return p.roleType === filter || (filter === "Fullstack" && (p.roleType === "Fullstack" || p.category === "Fullstack"));
  });

  return (
    <section
      id="projects"
      className="relative z-10 w-full max-w-[1600px] mx-auto px-4 sm:px-6 md:px-12 py-24 scroll-mt-20 bg-background"
      aria-label="Engineered Projects Portfolio"
    >
      {/* Section Header with Filters */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-border/80">
        <div className="flex items-center gap-4 mb-3 md:mb-0">
          <TibebCornerStamp geezNumeral="፩" />
          <Reveal variant="ink" duration={900}>
            <h2
              className={`text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-foreground ${
                locale === "am" ? "font-ethiopic" : "font-heading"
              }`}
            >
              {locale === "am" ? "የተመረጡ ስራዎች" : "Featured Projects"}
            </h2>
          </Reveal>
        </div>

        {/* Filter Pills with self-drawing ruled accents */}
        <div className="flex flex-wrap items-center gap-2">
          {(["All", "Fullstack", "Frontend", "Backend"] as const).map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-3.5 py-1.5 font-mono text-xs uppercase tracking-wider transition-all duration-200 border rounded-[1px] ${
                filter === cat
                  ? "bg-foreground text-background border-foreground font-semibold"
                  : "bg-transparent text-muted hover:text-foreground border-border hover:border-accent"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Case Rows Stack */}
      <div className="mt-12 flex flex-col gap-12 sm:gap-16">
        {filteredProjects.map((project, index) => {
          const isHighlighted = highlightedProjectId === project.id;
          return (
            <RuledFrame
              key={project.id}
              as="article"
              delay={Math.min(index * 60, 240)}
              className={`group relative rounded-[1px] transition-colors duration-300 card-ink p-6 sm:p-8 md:p-10 ${
                isHighlighted
                  ? "border-2 border-accent"
                  : "border border-border/80 hover:border-border-strong"
              }`}
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                {/* 1. Browser-Frame Mockup with subtle internal parallax (6%) and overflow hidden */}
                <div className="lg:col-span-6 flex flex-col">
                  <div className="rounded-none bg-surface-elevated/40 border border-border border-b-0 px-4 py-2.5 flex items-center gap-3">
                    <div className="flex items-center gap-1.5 shrink-0">
                      <span className="w-2.5 h-2.5 rounded-full bg-red-600/70 inline-block" />
                      <span className="w-2.5 h-2.5 rounded-full bg-amber-600/70 inline-block" />
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-600/70 inline-block" />
                    </div>
                    <span className="font-mono text-[11px] text-muted/80 truncate">
                      {project.liveUrl || `https://${project.slug}.vercel.app`}
                    </span>
                  </div>

                  <div className="relative aspect-[16/10] w-full overflow-hidden bg-background/50 border border-border rounded-none">
                    <div className="relative w-full h-[106%] -top-[3%] overflow-hidden transition-transform duration-700 ease-out group-hover:scale-[1.04] group-hover:-translate-y-[2%]">
                      <Image
                        src={project.thumbnail}
                        alt={`${project.title} Interface Preview`}
                        fill
                        sizes="(max-width: 1024px) 100vw, 50vw"
                        className="object-cover object-top transition-transform duration-700 ease-out"
                        priority={index < 2}
                      />
                    </div>
                  </div>
                </div>

                {/* 2. Detailed Technical Dossier on Solid Surface */}
                <div className="lg:col-span-6 flex flex-col gap-5">
                  {/* Top Bar: Index + Role Tag + Timeline */}
                  <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-1">
                    <div className="inline-flex items-center gap-2.5">
                      <span className="font-ethiopic text-sm text-accent font-bold">
                        {locale === "am" ? project.geezNumeral : `0${index + 1}`}
                      </span>
                      <span className="px-2.5 py-1 rounded-[1px] text-[10px] font-mono tracking-widest uppercase border border-accent/30 bg-accent/10 text-accent font-semibold">
                        {project.roleType} DEVELOPER
                      </span>
                    </div>

                    <span className="font-mono text-xs text-muted">
                      {project.caseStudy.timeline}
                    </span>
                  </div>

                  {/* Title & Subtitle */}
                  <div>
                    <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-foreground group-hover:text-accent transition-colors">
                      {project.title}
                    </h3>
                    <p className="font-mono text-xs text-muted mt-1 uppercase tracking-wider">
                      {project.subtitle}
                    </p>
                  </div>

                  {/* Story: Problem -> Stack -> Result (Staggered automatically ~120ms with no click) */}
                  <div className="space-y-4">
                    <Reveal variant="rise" delay={0} duration={700}>
                      <div>
                        <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted mb-1">
                          The Problem
                        </div>
                        <p className="text-sm text-foreground/90 leading-relaxed">
                          {project.oneLineProblem}
                        </p>
                      </div>
                    </Reveal>

                    {project.technologies && project.technologies.length > 0 && (
                      <Reveal variant="rise" delay={120} duration={700}>
                        <div>
                          <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted mb-1">
                            Tech Stack
                          </div>
                          <p className="font-mono text-xs text-foreground/80 leading-relaxed">
                            {project.technologies.join("  ·  ")}
                          </p>
                        </div>
                      </Reveal>
                    )}

                    <Reveal variant="rise" delay={240} duration={700}>
                      <div>
                        <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-accent mb-1">
                          Result
                        </div>
                        <p className="text-sm font-medium text-foreground leading-relaxed">
                          <CountUp text={project.keyResult} duration={1100} />
                        </p>
                      </div>
                    </Reveal>
                  </div>

                  {/* Action CTAs: Live Demo + Code + Case Study (Equal width and aligned on mobile) */}
                  <div className="pt-3 flex flex-wrap sm:flex-nowrap items-center gap-3 font-mono text-xs w-full">
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-ink flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-5 py-2.5 border border-foreground text-foreground font-semibold tracking-wider uppercase hover:bg-foreground/5 transition-all active:translate-y-[1px] text-center min-w-[120px]"
                      >
                        <span>Live Demo</span>
                        <ExternalLink className="w-3.5 h-3.5 shrink-0" />
                      </a>
                    )}

                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`btn-ink ${project.liveUrl ? "flex-1 sm:flex-initial" : "w-full sm:w-auto"} inline-flex items-center justify-center gap-2 px-5 py-2.5 border border-border hover:border-foreground text-foreground font-semibold tracking-wider uppercase transition-colors active:translate-y-[1px] text-center min-w-[120px]`}
                    >
                      <Github className="w-3.5 h-3.5 shrink-0" />
                      <span>Code</span>
                    </a>

                    <Link
                      href={`/work/${project.slug}`}
                      className="ink-link w-full sm:w-auto sm:ml-auto inline-flex items-center justify-center sm:justify-end gap-1.5 pt-1 sm:pt-0 text-accent font-semibold tracking-wider uppercase text-center"
                    >
                      <span>Deep Case Study</span>
                      <ArrowUpRight className="w-3.5 h-3.5 shrink-0" />
                    </Link>
                  </div>
                </div>
              </div>
            </RuledFrame>
          );
        })}
      </div>
    </section>
  );
}
