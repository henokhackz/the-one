"use client";

import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { ArrowUpRight, ArrowDown, X, ExternalLink, Github, Send, FileText } from "lucide-react";
import { HeroFidel } from "@/components/hero/hero-fidel";
import { PROJECTS, Project } from "@/lib/projects-data";
import { EthiopianClock } from "@/components/layout/ethiopian-clock";
import { TibebCornerStamp } from "@/components/ui/tibeb-pattern";
import { useLocale } from "@/lib/locale-context";

export default function Home() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const { locale, t } = useLocale();

  // 1. Page load resolve sequence (1.5s max)
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 200);
    return () => clearTimeout(timer);
  }, []);

  // 2. Track smooth scroll progress along continuous 3D path
  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll <= 0) return;
      const progress = Math.min(1, Math.max(0, window.scrollY / totalScroll));
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Keyboard accessibility: ESC closes active project modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && activeProject) {
        setActiveProject(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeProject]);

  const scrollToSection = (targetProgress: number) => {
    const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
    window.scrollTo({
      top: totalScroll * targetProgress,
      behavior: "smooth",
    });
  };

  // Determine which project is closest along the spline corridor
  const activeCorridorIndex = Math.min(
    PROJECTS.length - 1,
    Math.max(0, Math.floor((scrollProgress - 0.22) / 0.14))
  );
  const currentCorridorProject = PROJECTS[activeCorridorIndex] || PROJECTS[0];

  return (
    <div className="relative w-full min-h-[380vh] text-foreground selection:bg-accent selection:text-accent-foreground">
      {/* =========================================================================
          CONTINUOUS FULL-SCREEN 3D WEBGL ARCHITECTURE SCENE
          Primary interface: 3k instanced Ge'ez glyph field + 3D project portals
      ========================================================================= */}
      <HeroFidel
        scrollProgress={scrollProgress}
        activeProject={activeProject}
        onSelectProject={setActiveProject}
      />

      {/* =========================================================================
          STATION 0: HERO THRESHOLD (0.0 - 0.22 Scroll Progress)
          Strict Text Budget: Name, ONE line role, ONE primary action (<25 words)
      ========================================================================= */}
      <section
        className={`fixed inset-0 z-20 pointer-events-none flex flex-col justify-between px-6 md:px-16 pt-24 pb-12 transition-opacity duration-700 ${
          scrollProgress < 0.22 ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        aria-label="Hero Overview"
      >
        <div />

        {/* Hero Core: Strictly Under 25 Words */}
        <div className="max-w-4xl space-y-4">
          <h1
            className={`text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black tracking-tight text-foreground leading-[0.95] drop-shadow-md ${
              locale === "am" ? "font-ethiopic" : "font-heading"
            } transition-all duration-1000 ${
              isLoaded ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
            }`}
          >
            {locale === "am" ? "ላንቱሞ ብርሃኑ" : "Lantumo Birhanu"}
          </h1>

          <p
            className={`font-mono text-xs sm:text-sm md:text-base tracking-[0.25em] text-accent uppercase font-semibold transition-all duration-1000 delay-150 ${
              isLoaded ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
            }`}
          >
            {locale === "am"
              ? "ፉልስታክ እና ስሪ.ጄኤስ ፈጣሪ ኢንጂነር"
              : "Fullstack Developer & Three.js Engineer"}
          </p>

          <div
            className={`pt-4 transition-all duration-1000 delay-300 ${
              isLoaded ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
            }`}
          >
            <button
              onClick={() => scrollToSection(0.32)}
              className="pointer-events-auto group inline-flex items-center gap-3 px-8 py-4 bg-foreground text-background font-mono text-xs font-semibold tracking-[0.2em] uppercase hover:bg-accent hover:text-accent-foreground transition-all duration-300 shadow-lg active:scale-95 focus-visible:ring-2 focus-visible:ring-accent"
            >
              <span>{locale === "am" ? "የስራ ማህደር አስስ ↓" : "Explore Architecture ↓"}</span>
              <ArrowDown className="w-4 h-4 transition-transform group-hover:translate-y-0.5" />
            </button>
          </div>
        </div>

        {/* Bottom Status Indicator */}
        <div className="flex items-center justify-between text-xs font-mono text-muted/80">
          <span className="tracking-widest uppercase">
            {locale === "am" ? "አዲስ አበባ • ኢትዮጵያ" : "Addis Ababa • Ethiopia"}
          </span>
          <span className="tracking-widest uppercase">
            {locale === "am" ? "ወደ ታች ይሸብልሉ" : "Scroll to traverse 3D space"}
          </span>
        </div>
      </section>

      {/* =========================================================================
          STATION 1: MONOLITH GALLERY HUD (0.22 - 0.72 Scroll Progress)
          Contextual HUD for 3D Project Portals in the Scene
      ========================================================================= */}
      <section
        className={`fixed inset-x-6 md:inset-x-16 bottom-12 z-20 pointer-events-none transition-all duration-500 ${
          scrollProgress >= 0.22 && scrollProgress < 0.72 && !activeProject
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-6 pointer-events-none"
        }`}
        aria-label="Active Project Portal HUD"
      >
        <div className="max-w-xl p-6 bg-surface/90 border border-border/80 backdrop-blur-md rounded-sm shadow-2xl pointer-events-auto space-y-3">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-baseline gap-2.5">
              <span className="font-ethiopic text-sm text-accent font-bold">
                {locale === "am"
                  ? currentCorridorProject.geezNumeral
                  : `0${currentCorridorProject.id}`}
              </span>
              <h2 className="font-heading text-xl sm:text-2xl font-bold text-foreground">
                {currentCorridorProject.title}
              </h2>
            </div>
            <button
              onClick={() => setActiveProject(currentCorridorProject)}
              className="font-mono text-[10px] text-accent hover:underline uppercase tracking-widest shrink-0"
            >
              {locale === "am" ? "ዝርዝር ተመልከት →" : "Inspect Portal →"}
            </button>
          </div>

          <p className="text-xs sm:text-sm text-muted font-light leading-relaxed">
            {currentCorridorProject.summary}
          </p>

          <div className="flex flex-wrap items-center gap-1.5 pt-1">
            {currentCorridorProject.technologies.slice(0, 4).map((tech) => (
              <span
                key={tech}
                className="px-2 py-0.5 font-mono text-[9px] uppercase tracking-wider bg-background/60 border border-border/80 text-muted"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          STATION 2: THE INNER SANCTUM & HEARTH (0.75 - 1.0 Scroll Progress)
          Ethiopic Calendar, Philosophy & Direct Connection Hub
      ========================================================================= */}
      <section
        className={`fixed inset-0 z-20 pointer-events-none flex flex-col justify-center items-center px-6 transition-all duration-700 ${
          scrollProgress >= 0.75 && !activeProject
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-8 pointer-events-none"
        }`}
        aria-label="Inner Sanctum & Contact Hub"
      >
        <div className="w-full max-w-2xl bg-surface/90 border border-border p-8 sm:p-12 backdrop-blur-xl rounded-sm shadow-2xl pointer-events-auto space-y-6 text-center">
          <div className="flex justify-center">
            <TibebCornerStamp geezNumeral={locale === "am" ? "መቅደስ" : "SANCTUM"} />
          </div>

          <h2
            className={`text-3xl sm:text-5xl font-bold tracking-tight text-foreground ${
              locale === "am" ? "font-ethiopic" : "font-heading"
            }`}
          >
            {locale === "am" ? "የፊደል አርክቴክቸር" : "Fidel as Architecture"}
          </h2>

          <p className="text-sm sm:text-base text-muted font-light max-w-lg mx-auto leading-relaxed">
            {locale === "am"
              ? "የኢትዮጵያ ቅርስ እና የፊደል ጥበብ በዘመናዊ ስሪ.ጄኤስ እና ዌብጂኤል ጥልቀት ውስጥ የተገነባ የፈጠራ ስራ።"
              : "Synthesizing ancient Ethiopic spatial geometry with high-performance WebGL systems and fullstack architecture."}
          </p>

          <div className="pt-2 flex justify-center">
            <EthiopianClock showDate={true} />
          </div>

          <div className="pt-4 flex flex-wrap items-center justify-center gap-4 font-mono text-xs">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2.5 px-6 py-3.5 bg-foreground text-background font-semibold tracking-widest uppercase hover:bg-accent hover:text-accent-foreground transition-all shadow-md active:scale-95"
            >
              <span>{t.hero.connect}</span>
              <Send className="w-3.5 h-3.5" />
            </Link>

            <a
              href="https://t.me/lyzon1"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-3.5 border border-border hover:border-accent text-foreground hover:text-accent font-semibold tracking-widest uppercase transition-colors"
            >
              <span>Telegram</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>

            <a
              href="/Lantumo_Birhanu_resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-3.5 border border-border hover:border-accent text-muted hover:text-foreground font-semibold tracking-widest uppercase transition-colors"
            >
              <FileText className="w-3.5 h-3.5 text-accent" />
              <span>Resume (PDF)</span>
            </a>
          </div>
        </div>
      </section>

      {/* =========================================================================
          ACTIVE 3D PROJECT CASE STUDY DRAWER (FLY-IN VIEW)
      ========================================================================= */}
      {activeProject && (
        <div
          className="fixed inset-y-0 right-0 w-full max-w-lg z-50 bg-background/95 border-l border-border backdrop-blur-2xl p-6 sm:p-8 flex flex-col justify-between overflow-y-auto animate-in slide-in-from-right duration-300 shadow-2xl"
          role="dialog"
          aria-modal="true"
          aria-label={activeProject.title}
        >
          <div className="space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-border/60">
              <div className="flex items-center gap-3">
                <span className="font-ethiopic text-base text-accent font-bold">
                  {locale === "am" ? activeProject.geezNumeral : `0${activeProject.id}`}
                </span>
                <span className="font-mono text-xs uppercase tracking-widest text-muted">
                  {activeProject.category}
                </span>
              </div>
              <button
                onClick={() => setActiveProject(null)}
                className="p-2 border border-border hover:border-accent text-muted hover:text-foreground transition-colors"
                aria-label="Close portal view"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div>
              <h3 className="font-heading text-3xl sm:text-4xl font-bold text-foreground">
                {activeProject.title}
              </h3>
              <p className="font-mono text-xs text-accent uppercase tracking-wider mt-1">
                {activeProject.subtitle}
              </p>
            </div>

            <p className="text-sm text-muted font-light leading-relaxed">
              {activeProject.summary}
            </p>

            <div className="space-y-2">
              <span className="font-mono text-[11px] uppercase tracking-widest text-foreground font-semibold">
                Architecture & Decisions:
              </span>
              <ul className="space-y-2 text-xs text-muted leading-relaxed">
                {activeProject.caseStudy.architectureHighlights.map((hl, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-accent">•</span>
                    <span>{hl}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-2">
              <span className="font-mono text-[11px] uppercase tracking-widest text-foreground font-semibold">
                Technology Stack:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {activeProject.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="px-2.5 py-1 font-mono text-[10px] tracking-wider uppercase border border-border bg-surface text-muted"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="pt-6 border-t border-border flex flex-col gap-3 font-mono text-xs">
            <div className="flex items-center gap-3">
              {activeProject.liveUrl && (
                <a
                  href={activeProject.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 inline-flex items-center justify-center gap-2 py-3 bg-foreground text-background font-semibold uppercase tracking-widest hover:bg-accent hover:text-accent-foreground transition-colors"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>Live Site</span>
                </a>
              )}
              <a
                href={activeProject.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 inline-flex items-center justify-center gap-2 py-3 border border-border hover:border-accent text-foreground hover:text-accent font-semibold uppercase tracking-widest transition-colors"
              >
                <Github className="w-3.5 h-3.5" />
                <span>Source</span>
              </a>
            </div>

            <Link
              href={`/work/${activeProject.slug}`}
              className="w-full py-3 text-center border border-border hover:border-accent text-accent font-semibold uppercase tracking-widest transition-colors"
            >
              Deep Case Study →
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
