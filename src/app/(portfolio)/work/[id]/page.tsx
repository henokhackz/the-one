import React from "react";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight, Github, ExternalLink, CheckCircle2, AlertCircle } from "lucide-react";
import { PROJECTS, getProjectBySlug, getNextProject } from "@/lib/projects-data";
import { TibebCornerStamp, TibebDivider } from "@/components/ui/tibeb-pattern";
import { GlyphDissolve } from "@/components/ui/glyph-dissolve";

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  return PROJECTS.map((project) => ({
    id: project.slug,
  }));
}

export default async function CaseStudyPage({ params }: Props) {
  const { id } = await params;
  const project = getProjectBySlug(id);

  if (!project) {
    notFound();
    return null;
  }

  const nextProject = getNextProject(project.slug);
  const { caseStudy } = project;

  return (
    <article className="w-full min-h-screen pt-28 pb-24 text-foreground relative">
      {/* Ge'ez Manuscript Glyph Dissolve Transition */}
      <GlyphDissolve geezNumeral={project.geezNumeral} title={project.title} />

      {/* Top Breadcrumb & Navigation */}
      <div className="max-w-[1200px] mx-auto px-6 md:px-12 pb-8">
        <Link
          href="/work"
          className="inline-flex items-center gap-2 font-mono text-xs tracking-widest uppercase text-muted hover:text-accent transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Work Archive</span>
        </Link>

        {/* Case Study Header */}
        <div className="border-b border-border pb-12">
          <div className="flex items-center gap-3 mb-4">
            <TibebCornerStamp geezNumeral={project.geezNumeral} />
            <span className="font-mono text-xs tracking-[0.25em] text-accent uppercase font-semibold">
              CASE STUDY 0{project.id}
            </span>
          </div>

          <h1 className="font-heading text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight leading-tight">
            {project.title}
          </h1>

          <p className="mt-4 text-xl sm:text-2xl text-muted font-light leading-relaxed max-w-3xl">
            {project.subtitle}
          </p>

          {/* Metadata Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-10 mt-10 border-t border-border/60 font-mono text-xs">
            <div>
              <span className="text-muted block uppercase tracking-wider mb-1">ROLE</span>
              <span className="text-foreground font-medium">{caseStudy.myRole}</span>
            </div>
            <div>
              <span className="text-muted block uppercase tracking-wider mb-1">TIMELINE</span>
              <span className="text-foreground font-medium">{caseStudy.timeline}</span>
            </div>
            <div>
              <span className="text-muted block uppercase tracking-wider mb-1">DOMAIN</span>
              <span className="text-foreground font-medium">{project.category}</span>
            </div>
            <div>
              <span className="text-muted block uppercase tracking-wider mb-1">LINKS</span>
              <div className="flex items-center gap-3">
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-accent hover:underline"
                  >
                    <span>Live</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                )}
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-muted hover:text-foreground hover:underline"
                >
                  <span>Code</span>
                  <Github className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Visual Preview */}
      <div className="max-w-[1200px] mx-auto px-6 md:px-12 py-8">
        <div className="relative aspect-[16/9] w-full overflow-hidden border border-border bg-surface rounded-sm">
          <Image
            src={project.thumbnail}
            alt={project.title}
            fill
            priority
            sizes="(max-width: 1200px) 100vw, 1200px"
            className="object-cover object-top"
          />
        </div>
      </div>

      {/* Main Case Study Content Sections */}
      <div className="max-w-[1000px] mx-auto px-6 md:px-12 space-y-16 py-12">
        {/* 1. Problem & Context */}
        <section className="space-y-4">
          <div className="flex items-center gap-2 font-mono text-xs tracking-widest text-accent uppercase">
            <span className="font-ethiopic font-bold">፩</span>
            <span>THE CHALLENGE</span>
          </div>
          <h2 className="font-heading text-2xl sm:text-3xl font-bold text-foreground">
            The Problem Space
          </h2>
          <p className="text-base sm:text-lg text-muted font-light leading-relaxed">
            {caseStudy.problem}
          </p>
        </section>

        {/* 2. System Architecture & Tech Stack */}
        <section className="space-y-6">
          <div className="flex items-center gap-2 font-mono text-xs tracking-widest text-accent uppercase">
            <span className="font-ethiopic font-bold">፪</span>
            <span>SYSTEM ARCHITECTURE</span>
          </div>
          <h2 className="font-heading text-2xl sm:text-3xl font-bold text-foreground">
            Technologies & Tools
          </h2>
          <div className="flex flex-wrap gap-2.5">
            {caseStudy.stack.map((item) => (
              <span
                key={item}
                className="px-3.5 py-1.5 font-mono text-xs tracking-wider uppercase border border-border bg-surface text-foreground"
              >
                {item}
              </span>
            ))}
          </div>

          <div className="p-6 border border-border/80 bg-surface/30 rounded-sm space-y-3">
            <h3 className="font-mono text-xs font-semibold tracking-wider text-accent uppercase">
              Architectural Highlights
            </h3>
            <ul className="space-y-2">
              {caseStudy.architectureHighlights.map((highlight, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-sm text-muted">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span>{highlight}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* 3. Key Decisions */}
        <section className="space-y-6">
          <div className="flex items-center gap-2 font-mono text-xs tracking-widest text-accent uppercase">
            <span className="font-ethiopic font-bold">፫</span>
            <span>ENGINEERING CHOICES</span>
          </div>
          <h2 className="font-heading text-2xl sm:text-3xl font-bold text-foreground">
            Key Architectural Decisions
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {caseStudy.keyDecisions.map((decision, idx) => (
              <div
                key={idx}
                className="p-6 border border-border bg-surface/20 rounded-sm space-y-3"
              >
                <div className="font-mono text-[10px] tracking-widest text-accent uppercase">
                  DECISION 0{idx + 1}
                </div>
                <h3 className="font-heading font-semibold text-lg text-foreground">
                  {decision.title}
                </h3>
                <p className="text-sm text-muted leading-relaxed font-light">
                  {decision.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* 4. Challenges & Technical Solutions */}
        <section className="space-y-6">
          <div className="flex items-center gap-2 font-mono text-xs tracking-widest text-accent uppercase">
            <span className="font-ethiopic font-bold">፬</span>
            <span>OBSTACLES & RESOLUTION</span>
          </div>
          <h2 className="font-heading text-2xl sm:text-3xl font-bold text-foreground">
            Challenges Faced
          </h2>

          <div className="space-y-4">
            {caseStudy.challenges.map((challenge, idx) => (
              <div
                key={idx}
                className="p-6 border border-border/80 bg-surface/30 rounded-sm space-y-3"
              >
                <div className="flex items-center gap-2 text-rose-500 font-mono text-xs tracking-wider uppercase font-medium">
                  <AlertCircle className="w-4 h-4" />
                  <span>{challenge.title}</span>
                </div>
                <div className="pl-6 border-l border-border/80 mt-2">
                  <span className="font-mono text-[10px] text-muted tracking-widest uppercase block mb-1">
                    HOW IT WAS SOLVED:
                  </span>
                  <p className="text-sm text-muted leading-relaxed font-light">
                    {challenge.solution}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 5. Verified Results & Impact */}
        <section className="space-y-6">
          <div className="flex items-center gap-2 font-mono text-xs tracking-widest text-accent uppercase">
            <span className="font-ethiopic font-bold">፭</span>
            <span>VERIFIED OUTCOMES</span>
          </div>
          <h2 className="font-heading text-2xl sm:text-3xl font-bold text-foreground">
            Results & Deliverables
          </h2>

          <div className="grid grid-cols-1 gap-3">
            {caseStudy.results.map((result, idx) => (
              <div
                key={idx}
                className="p-4 border border-border bg-surface/10 rounded-sm flex items-start gap-3 text-sm text-foreground"
              >
                <span className="font-mono text-xs text-accent mt-0.5">0{idx + 1}.</span>
                <span className="leading-relaxed">{result}</span>
              </div>
            ))}
          </div>
        </section>

        <TibebDivider />

        {/* Next Project Footer Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-6 border-t border-border">
          <div className="flex flex-col">
            <span className="font-mono text-xs tracking-widest text-muted uppercase">
              NEXT CASE STUDY
            </span>
            <span className="font-heading text-2xl font-bold text-foreground mt-1">
              {nextProject.title}
            </span>
          </div>

          <Link
            href={`/work/${nextProject.slug}`}
            className="group inline-flex items-center gap-3 px-6 py-3.5 bg-foreground text-background font-mono text-xs font-semibold tracking-widest uppercase hover:bg-accent hover:text-accent-foreground transition-all"
          >
            <span>Read Next Case Study</span>
            <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>
      </div>
    </article>
  );
}
