"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowDown, ArrowUp, Send, ArrowUpRight, CheckCircle, Code2, Server } from "lucide-react";
import { HeroAtmosphereCanvas } from "@/components/hero/hero-atmosphere-canvas";
import { ProjectCaseRows } from "@/components/work/project-case-rows";
import { SkillsMatrix } from "@/components/skills/skills-matrix";
import { TestimonialsCarousel } from "@/components/testimonials/testimonials-carousel";
import { BlogSection } from "@/components/blog/blog-section";
import { ContactHub } from "@/components/contact/contact-hub";
import { TibebDivider } from "@/components/ui/tibeb-pattern";
import { Magnetic } from "@/components/ui/magnetic-button";
import { useLocale } from "@/lib/locale-context";

export default function Home() {
  const [heroFade, setHeroFade] = useState(1.0);
  const [highlightedProjectId, setHighlightedProjectId] = useState<string | null>(null);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const { locale, t } = useLocale();

  // Track hero intersection & scroll position
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const heroHeight = window.innerHeight;

      // Hero canvas fade calculation: 1.0 at top, fades to 0.0 as hero scrolls out
      const fade = Math.max(0, Math.min(1, 1.0 - scrollY / (heroHeight * 0.85)));
      setHeroFade(fade);

      setShowBackToTop(scrollY > 700);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="relative w-full text-foreground bg-background selection:bg-accent selection:text-accent-foreground">
      {/* =========================================================================
          LAYER 0: ATMOSPHERIC CANVAS
          Fixed, z-index 0, pointer-events limited to hero fold.
          Fades to 0 and pauses rendering once hero leaves the viewport.
      ========================================================================= */}
      <HeroAtmosphereCanvas heroFade={heroFade} />

      {/* =========================================================================
          LAYER 1: REAL SOLID HTML CONTENT
          All sections have solid/near-solid surfaces, WCAG AA contrast.
          Never sits over glyphs.
      ========================================================================= */}
      <div className="relative z-10 w-full flex flex-col">
        {/* =====================================================================
            1. HERO SECTION: Clean, one message, recruiter-ready in 5 seconds
        ===================================================================== */}
        <section
          id="hero"
          className="relative min-h-[92vh] flex flex-col justify-center max-w-[1600px] mx-auto px-4 sm:px-6 md:px-12 py-16 sm:py-24"
          aria-label="Developer Introduction"
        >
          {/* Left-aligned text in a protected clear zone */}
          <div className="max-w-3xl space-y-6">
            {/* Status Signal */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-border/80 bg-surface/80 backdrop-blur-xs font-mono text-[11px] uppercase tracking-widest text-muted">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse inline-block" />
              <span>Available for Select Roles & High-Impact Contracts</span>
            </div>

            {/* Name */}
            <h1
              className={`text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black tracking-tight text-foreground leading-[0.94] ${
                locale === "am" ? "font-ethiopic" : "font-heading"
              }`}
            >
              {locale === "am" ? "ላንቱሞ ብርሃኑ" : "Lantumo Birhanu"}
            </h1>

            {/* One Role Line */}
            <p className="font-mono text-base sm:text-lg md:text-xl tracking-wider text-accent font-semibold uppercase">
              {locale === "am"
                ? "ፍሮንትኤንድ፣ ባክኤንድ እና ፉልስታክ ሶፍትዌር ኢንጂነር"
                : "Frontend, Backend & Fullstack Developer"}
            </p>

            {/* One Proof Line */}
            <div className="p-3.5 rounded-sm border border-border bg-surface/90 backdrop-blur-xs inline-flex flex-wrap items-center gap-x-4 gap-y-2 font-mono text-xs text-muted max-w-2xl">
              <span className="flex items-center gap-1.5 text-foreground font-semibold">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-500" />
                <span>5+ Years Experience</span>
              </span>
              <span className="opacity-40">•</span>
              <span className="flex items-center gap-1.5 text-foreground font-semibold">
                <Code2 className="w-3.5 h-3.5 text-accent" />
                <span>Next.js & React 19</span>
              </span>
              <span className="opacity-40">•</span>
              <span className="flex items-center gap-1.5 text-foreground font-semibold">
                <Server className="w-3.5 h-3.5 text-accent" />
                <span>PostgreSQL & Node.js</span>
              </span>
              <span className="opacity-40">•</span>
              <span className="text-muted">Three.js / WebGL</span>
            </div>

            {/* Two Primary Action CTAs */}
            <div className="pt-2 flex flex-wrap items-center gap-4 sm:gap-6 font-mono text-xs">
              <Magnetic>
                <a
                  href="#projects"
                  className="inline-flex items-center gap-3 px-8 py-4 bg-foreground text-background font-semibold tracking-widest uppercase hover:bg-accent hover:text-accent-foreground transition-all duration-300 shadow-md active:scale-95"
                >
                  <span>View Projects</span>
                  <ArrowDown className="w-4 h-4" />
                </a>
              </Magnetic>

              <Magnetic>
                <a
                  href="#contact"
                  className="inline-flex items-center gap-2.5 px-7 py-4 border border-border hover:border-accent text-foreground hover:text-accent font-semibold tracking-widest uppercase transition-all bg-surface/80 backdrop-blur-xs active:scale-95"
                >
                  <span>Contact Me</span>
                  <Send className="w-3.5 h-3.5" />
                </a>
              </Magnetic>
            </div>
          </div>
        </section>

        {/* Thin Ethiopian Tilet Divider */}
        <TibebDivider className="my-2" />

        {/* =====================================================================
            2. PROJECTS: The Most Important Section (Pinned Case Rows)
        ===================================================================== */}
        <ProjectCaseRows highlightedProjectId={highlightedProjectId} />

        {/* Thin Ethiopian Tilet Divider */}
        <TibebDivider className="my-2" />

        {/* =====================================================================
            3. SKILLS: Verified Competencies Mapped to Projects
        ===================================================================== */}
        <SkillsMatrix onHoverSkillProject={setHighlightedProjectId} />

        {/* Thin Ethiopian Tilet Divider */}
        <TibebDivider className="my-2" />

        {/* =====================================================================
            4. TESTIMONIALS: Client & Colleague Endorsements
        ===================================================================== */}
        <TestimonialsCarousel />

        {/* Thin Ethiopian Tilet Divider */}
        <TibebDivider className="my-2" />

        {/* =====================================================================
            5. TECHNICAL WRITING: Architectural Essays & RSS
        ===================================================================== */}
        <BlogSection />

        {/* Thin Ethiopian Tilet Divider */}
        <TibebDivider className="my-2" />

        {/* =====================================================================
            6. CONTACT HUB: 1-Click Connection, Resume & Timezone
        ===================================================================== */}
        <ContactHub />
      </div>

      {/* Floating Back to Top Button */}
      {showBackToTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 z-40 p-3 rounded-full border border-border bg-surface/95 text-muted hover:text-accent hover:border-accent shadow-xl backdrop-blur-md transition-all duration-200 active:scale-95 animate-in fade-in"
          aria-label="Back to top"
          title="Back to top"
        >
          <ArrowUp className="w-4 h-4" />
        </button>
      )}
    </div>
  );
}
