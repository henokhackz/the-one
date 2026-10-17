"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Github, ExternalLink } from "lucide-react";
import { PROJECTS, Project } from "@/lib/projects-data";
import { TibebDivider, TibebCornerStamp } from "@/components/ui/tibeb-pattern";
import { useLocale } from "@/lib/locale-context";
import { ProjectImageLightbox } from "@/components/work/project-image-lightbox";

export function SelectedWork() {
  const [activeProject, setActiveProject] = useState<Project | null>(PROJECTS[0]);
  const { locale, t } = useLocale();

  return (
    <section
      id="selected-work"
      className="w-full max-w-[1600px] mx-auto px-6 md:px-12 py-20"
      aria-label="Selected Engineering Work"
    >
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-border">
        <div>
          <div className="flex items-center gap-3 mb-3">
            <TibebCornerStamp geezNumeral={locale === "am" ? "ሥራ" : "01"} />
            <span className="font-mono text-xs tracking-[0.25em] text-muted uppercase">
              {t.selectedWork.tag}
            </span>
          </div>
          <h2 className={`text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-foreground ${locale === "am" ? "font-ethiopic" : "font-heading"}`}>
            {t.selectedWork.title}
          </h2>
        </div>

        <Link
          href="/work"
          className="group inline-flex items-center gap-2 font-mono text-xs tracking-widest uppercase text-muted hover:text-accent transition-colors"
        >
          <span>{t.selectedWork.viewArchive}</span>
          <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </Link>
      </div>

      {/* Main Editorial List with Interactive Preview */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pt-8">
        {/* Left: Editorial Project Rows (7 Columns) */}
        <div className="lg:col-span-7 flex flex-col divide-y divide-border/60">
          {PROJECTS.map((project, index) => {
            const isHovered = activeProject?.id === project.id;
            return (
              <div
                key={project.id}
                onMouseEnter={() => setActiveProject(project)}
                className={`group relative py-10 transition-colors cursor-pointer ${
                  isHovered ? "px-4 -mx-4 rounded-sm" : ""
                }`}
              >
                <Link href={`/work/${project.slug}`} className="block" data-cursor="view">
                  <div className="flex items-start justify-between gap-4">
                    {/* Index indicator */}
                    <div className="flex items-baseline gap-3">
                      <span className={locale === "am" ? "font-ethiopic text-sm text-accent font-bold" : "font-mono text-xs text-muted/80"}>
                        {locale === "am" ? project.geezNumeral : `0${index + 1}`}
                      </span>
                      <h3 className="font-heading text-2xl sm:text-3xl md:text-4xl font-semibold text-foreground group-hover:text-accent transition-colors">
                        {project.title}
                      </h3>
                    </div>

                    <ArrowUpRight className="w-6 h-6 text-muted group-hover:text-accent transition-all group-hover:translate-x-1 group-hover:-translate-y-1 shrink-0 mt-1" />
                  </div>

                  <p className="mt-3 text-sm sm:text-base text-muted font-light leading-relaxed max-w-xl pl-8">
                    {project.summary}
                  </p>

                  {/* Tech stack tags */}
                  <div className="mt-4 flex flex-wrap items-center gap-2 pl-8">
                    {project.technologies.slice(0, 4).map((tech) => (
                      <span
                        key={tech}
                        className="px-2.5 py-1 font-mono text-[10px] tracking-wider uppercase border border-border/80 text-muted"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 4 && (
                      <span className="font-mono text-[10px] text-muted/70">
                        +{project.technologies.length - 4} more
                      </span>
                    )}
                  </div>
                </Link>

                {/* Direct quick links */}
                <div className="mt-4 pl-8 flex items-center gap-4 text-xs font-mono">
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-muted hover:text-accent transition-colors"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <ExternalLink className="w-3 h-3" />
                      <span>{t.selectedWork.liveSite}</span>
                    </a>
                  )}
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-muted hover:text-accent transition-colors"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Github className="w-3 h-3" />
                    <span>{t.selectedWork.sourceCode}</span>
                  </a>
                  <Link
                    href={`/work/${project.slug}`}
                    className="text-accent underline hover:opacity-80 transition-opacity ml-auto"
                  >
                    {t.selectedWork.caseStudy}
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right: Sticky Image Preview Container (5 Columns - Desktop) */}
        <div className="hidden lg:block lg:col-span-5 relative">
          <div className="sticky top-28 w-full border border-border p-4 rounded-sm">
            <div className="relative aspect-[16/10] w-full overflow-hidden border border-border/60">
              {activeProject && (
                <ProjectImageLightbox
                  src={activeProject.thumbnail}
                  alt={`${activeProject.title} interface preview`}
                  className="absolute inset-0 h-full w-full"
                  sizes="(max-width: 1200px) 50vw, 33vw"
                  imageClassName="object-contain p-2 sm:p-3 transition-transform duration-300 group-hover/image:scale-[1.015]"
                  priority={true}
                />
              )}
            </div>

            {activeProject && (
              <div className="mt-4 flex flex-col gap-2">
                <div className="flex items-center justify-between font-mono text-xs">
                  <span className="text-accent font-semibold tracking-wider uppercase">
                    {activeProject.category}
                  </span>
                  <span className="text-muted">
                    {activeProject.caseStudy.timeline}
                  </span>
                </div>
                <p className="text-xs text-muted leading-relaxed">
                  {activeProject.subtitle}
                </p>
                <Link
                  href={`/work/${activeProject.slug}`}
                  className="mt-2 w-full py-2.5 text-center border border-border hover:border-accent text-foreground hover:text-accent font-mono text-[11px] tracking-widest uppercase transition-colors"
                >
                  {t.selectedWork.exploreCaseStudy}
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>

      <TibebDivider className="mt-16" />
    </section>
  );
}
