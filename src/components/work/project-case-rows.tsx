"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Github, ExternalLink, Code2, Server, Layers } from "lucide-react";
import { PROJECTS, Project } from "@/lib/projects-data";
import { TibebCornerStamp } from "@/components/ui/tibeb-pattern";
import { useLocale } from "@/lib/locale-context";

interface ProjectCaseRowsProps {
  highlightedProjectId?: string | null;
}

export function ProjectCaseRows({ highlightedProjectId }: ProjectCaseRowsProps) {
  const [filter, setFilter] = useState<"All" | "Frontend" | "Backend" | "Fullstack">("All");
  const { locale, t } = useLocale();

  const filteredProjects = PROJECTS.filter((p) => {
    if (filter === "All") return true;
    return p.roleType === filter || (filter === "Fullstack" && (p.roleType === "Fullstack" || p.category === "Fullstack"));
  });

  return (
    <section
      id="projects"
      className="relative z-10 w-full max-w-[1600px] mx-auto px-4 sm:px-6 md:px-12 py-24 scroll-mt-20 bg-background"
      aria-label="Engineered Projects Portfolio"
    >
      {/* Section Header with Filter and Counter */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-border/80">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <TibebCornerStamp geezNumeral={locale === "am" ? "ሥራ" : "01"} />
            <span className="font-mono text-xs tracking-[0.25em] text-accent uppercase font-medium">
              {locale === "am" ? "የምህንድስና ስራዎች" : "Core Systems & Web Applications"}
            </span>
          </div>
          <h2
            className={`text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-foreground ${
              locale === "am" ? "font-ethiopic" : "font-heading"
            }`}
          >
            {locale === "am" ? "የተመረጡ ስራዎች" : "Featured Projects"}
          </h2>
          <p className="text-sm text-muted mt-2 max-w-xl">
            {locale === "am"
              ? "ከመጀመሪያ እስከ መጨረሻ የተገነቡ አስተማማኝ የዌብ እና ሲስተም ፕሮጀክቶች።"
              : "Production web applications built with strict TypeScript, resilient databases, and performant frontend architectures."}
          </p>
        </div>

        {/* Filter Pills and Total Counter */}
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
          <span className="font-mono text-xs text-muted/70 pl-2">
            ({filteredProjects.length.toString().padStart(2, "0")} / {PROJECTS.length.toString().padStart(2, "0")})
          </span>
        </div>
      </div>

      {/* Case Rows Stack */}
      <div className="mt-12 flex flex-col gap-12 sm:gap-16">
        {filteredProjects.map((project, index) => {
          const isHighlighted = highlightedProjectId === project.id;
          return (
            <article
              key={project.id}
              className={`group relative rounded-[1px] transition-all duration-300 card-ink p-6 sm:p-8 md:p-10 ${
                isHighlighted
                  ? "border-2 border-accent"
                  : "border border-border hover:border-border-strong"
              }`}
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                {/* 1. Browser-Frame Mockup (Straight, Unskewed, Sheet laid on parchment with thin ink frame) */}
                <div className="lg:col-span-6 flex flex-col">
                  <div className="rounded-none bg-surface-elevated/40 border border-border border-b-0 px-4 py-2.5 flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-red-600/70 inline-block" />
                      <span className="w-2.5 h-2.5 rounded-full bg-amber-600/70 inline-block" />
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-600/70 inline-block" />
                    </div>
                    <span className="font-mono text-[11px] text-muted truncate max-w-[200px] sm:max-w-xs">
                      {project.liveUrl || `https://${project.slug}.vercel.app`}
                    </span>
                    <span className="font-mono text-[10px] text-muted/60 uppercase">
                      {locale === "am" ? project.geezNumeral : `0${index + 1}`}
                    </span>
                  </div>

                  <div className="relative aspect-[16/10] w-full overflow-hidden bg-background/50 border border-border rounded-none">
                    <Image
                      src={project.thumbnail}
                      alt={`${project.title} Interface Preview`}
                      fill
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.01]"
                      priority={index < 2}
                    />
                  </div>
                </div>

                {/* 2. Detailed Technical Dossier on Solid Surface */}
                <div className="lg:col-span-6 flex flex-col justify-between space-y-4">
                  {/* Top Bar: Role Pill + Stamp */}
                  <div className="flex items-center justify-between">
                    <div className="inline-flex items-center gap-2">
                      <span className="font-ethiopic text-sm text-accent font-bold">
                        {locale === "am" ? project.geezNumeral : `0${index + 1}`}
                      </span>
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono tracking-widest uppercase bg-accent/15 text-accent border border-accent/30 font-semibold">
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

                  {/* One-Line Problem */}
                  <p className="text-sm text-muted/90 font-light leading-relaxed">
                    <strong className="text-foreground font-medium">The Problem: </strong>
                    {project.oneLineProblem}
                  </p>

                  {/* Concrete Frontend / Backend Split */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                    <div className="p-3 rounded-none border border-border/70 bg-transparent">
                      <div className="flex items-center gap-1.5 font-mono text-[11px] text-accent font-semibold uppercase tracking-wider mb-2">
                        <Code2 className="w-3.5 h-3.5" />
                        <span>Frontend Engineering</span>
                      </div>
                      <ul className="space-y-1 text-xs text-muted">
                        {project.frontendSplit.map((item, i) => (
                          <li key={i} className="flex items-start gap-1.5">
                            <span className="text-accent text-[10px] mt-0.5">•</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="p-3 rounded-none border border-border/70 bg-transparent">
                      <div className="flex items-center gap-1.5 font-mono text-[11px] text-accent font-semibold uppercase tracking-wider mb-2">
                        <Server className="w-3.5 h-3.5" />
                        <span>Backend & Data</span>
                      </div>
                      <ul className="space-y-1 text-xs text-muted">
                        {project.backendSplit.map((item, i) => (
                          <li key={i} className="flex items-start gap-1.5">
                            <span className="text-accent text-[10px] mt-0.5">•</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Impact Result Strip */}
                  <div className="px-3.5 py-2  font-mono text-xs text-foreground flex items-center gap-2">
                    <span className="font-bold">Outcome:</span>
                    <span className="text-muted">{project.keyResult}</span>
                  </div>

                  {/* Tech stack tags */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-2.5 py-0.5 font-mono text-[10px] tracking-wider uppercase border border-border bg-transparent text-muted"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Action CTAs: Live Demo + Code + Case Study */}
                  <div className="pt-3 flex flex-wrap items-center gap-3 font-mono text-xs">
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-ink inline-flex items-center gap-2 px-5 py-2.5 border border-foreground text-foreground font-semibold tracking-wider uppercase hover:bg-foreground/5 transition-all active:translate-y-[1px]"
                      >
                        <span>Live Demo</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    )}

                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-ink inline-flex items-center gap-2 px-4 py-2.5 border border-border hover:border-foreground text-foreground font-semibold tracking-wider uppercase transition-colors active:translate-y-[1px]"
                    >
                      <Github className="w-3.5 h-3.5" />
                      <span>Code</span>
                    </a>

                    <Link
                      href={`/work/${project.slug}`}
                      className="ink-link ml-auto inline-flex items-center gap-1.5 text-accent font-semibold tracking-wider uppercase"
                    >
                      <span>Deep Case Study</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
