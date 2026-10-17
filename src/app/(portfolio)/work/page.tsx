"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, Github, ExternalLink, Filter } from "lucide-react";
import { PROJECTS, Project } from "@/lib/projects-data";
import { getProjects } from "@/sanity/lib/api";
import { TibebCornerStamp, TibebDivider } from "@/components/ui/tibeb-pattern";
import { useLocale } from "@/lib/locale-context";

export default function WorkPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [projectsList, setProjectsList] = useState<Project[]>(PROJECTS);
  const { locale, t } = useLocale();

  useEffect(() => {
    getProjects().then((data) => {
      if (data && data.length > 0) setProjectsList(data);
    });
  }, []);

  const categories = [
    { key: "All", label: t.workPage.allCategories },
    { key: "AI & Systems", label: t.workPage.aiCategory },
    { key: "Fullstack", label: t.workPage.fullstackCategory },
  ];

  const filteredProjects =
    selectedCategory === "All"
      ? projectsList
      : projectsList.filter((p) => p.category === selectedCategory);

  return (
    <div className="w-full min-h-screen pt-28 pb-20">
      <div className="max-w-[1600px] mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="pb-12 border-b border-border">
          <div className="flex items-center gap-3 mb-4">
            <TibebCornerStamp geezNumeral={locale === "am" ? "ሥራ" : "01"} />
            <span className="font-mono text-xs tracking-[0.25em] text-muted uppercase">
              {t.workPage.tag}
            </span>
          </div>

          <h1 className={`text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-foreground leading-tight ${locale === "am" ? "font-ethiopic" : "font-heading"}`}>
            {t.workPage.title}
          </h1>

          <p className="max-w-2xl text-base sm:text-lg text-muted font-light mt-6 leading-relaxed">
            {t.workPage.description}
          </p>

          {/* Filter Bar */}
          <div className="mt-10 flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2 text-muted text-xs font-mono mr-2">
              <Filter className="w-3.5 h-3.5 text-accent" />
              <span>{t.workPage.categoryLabel}</span>
            </div>
            {categories.map((cat) => (
              <button
                key={cat.key}
                onClick={() => setSelectedCategory(cat.key)}
                className={`px-4 py-2 font-mono text-xs tracking-widest uppercase transition-all border ${
                  selectedCategory === cat.key
                    ? "border-accent bg-accent text-accent-foreground font-semibold"
                    : "border-border bg-surface/40 text-muted hover:text-foreground hover:border-accent/50"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Project Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 pt-12">
          {filteredProjects.map((project, index) => (
            <article
              key={project.id}
              className="group border border-border bg-surface/30 rounded-sm overflow-hidden flex flex-col justify-between hover:border-accent/80 transition-all duration-300"
            >
              <div>
                {/* Visual Thumbnail */}
                <Link
                  href={`/work/${project.slug}`}
                  data-cursor="view"
                  className="block relative aspect-[16/10] w-full overflow-hidden bg-background border-b border-border group-hover:opacity-95"
                >
                  <Image
                    src={project.thumbnail}
                    alt={project.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute top-4 left-4 z-10">
                    <span className="px-3 py-1 bg-background/90 backdrop-blur-md border border-border font-mono text-[10px] tracking-widest text-accent font-bold uppercase">
                      {locale === "am" ? project.geezNumeral : `0${index + 1}`}
                    </span>
                  </div>
                </Link>

                {/* Content */}
                <div className="p-6 md:p-8">
                  <div className="flex items-center justify-between font-mono text-xs text-muted mb-2">
                    <span className="text-accent uppercase tracking-wider font-medium">
                      {project.category}
                    </span>
                    <span>{project.caseStudy.timeline}</span>
                  </div>

                  <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground group-hover:text-accent transition-colors">
                    <Link href={`/work/${project.slug}`}>{project.title}</Link>
                  </h2>

                  <p className="mt-3 text-sm text-muted font-light leading-relaxed">
                    {project.summary}
                  </p>

                  {/* Tech stack */}
                  <div className="mt-6 flex flex-wrap gap-2">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-2.5 py-1 font-mono text-[10px] tracking-wider uppercase border border-border bg-background/50 text-muted"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Bar */}
              <div className="p-6 md:p-8 pt-0 border-t border-border/40 mt-6 flex items-center justify-between font-mono text-xs">
                <div className="flex items-center gap-4">
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-muted hover:text-accent transition-colors"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      <span>{t.selectedWork.liveSite}</span>
                    </a>
                  )}
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-muted hover:text-accent transition-colors"
                  >
                    <Github className="w-3.5 h-3.5" />
                    <span>{t.selectedWork.sourceCode}</span>
                  </a>
                </div>

                <Link
                  href={`/work/${project.slug}`}
                  className="inline-flex items-center gap-1 text-accent font-semibold hover:underline"
                >
                  <span>{t.workPage.caseStudyBtn}</span>
                  <ArrowUpRight className="w-4 h-4" />
                </Link>
              </div>
            </article>
          ))}
        </div>

        <TibebDivider className="mt-20" />
      </div>
    </div>
  );
}
