"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowDown, ArrowUp, Send, ArrowUpRight, CheckCircle, Code2, Server } from "lucide-react";
import { HeroAtmosphereCanvas } from "@/components/hero/hero-atmosphere-canvas";
import { BiranaParchmentSurface } from "@/components/ui/birana-parchment-surface";
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
          AUTHENTIC BIRANA PARCHMENT TEXTURE LAYER
          Static SVG feTurbulence grain + gentle candlelit vellum lighting tones.
      ========================================================================= */}
      <BiranaParchmentSurface />

      {/* =========================================================================
          LAYER 1: REAL SOLID HTML CONTENT
          All sections share the paper surface, WCAG AA contrast.
          Separation via thin ink rules and diamond weave dividers.
      ========================================================================= */}
      <div className="relative z-10 w-full flex flex-col">
        {/* =====================================================================
            1. HERO SECTION: Clean, one message, ink written on Birana parchment
        ===================================================================== */}
        <section
          id="hero"
          className="relative min-h-[92vh] flex flex-col justify-center max-w-[1600px] mx-auto px-4 sm:px-6 md:px-12 py-16 sm:py-24"
          aria-label="Developer Introduction"
        >
          {/* Left-aligned text in a protected clear zone */}
          <div className="max-w-3xl space-y-6">
            {/* Status Signal: plain ink text with a small green dot before it (no container, no border, no pill) */}
            <div className="flex items-center gap-2 font-mono text-xs tracking-wider text-muted ink-reveal">
              <span>Available for Select Roles & High-Impact Contracts</span>
            </div>

            {/* Name */}
            <h1
              className={`text-5xl sm:text-7xl md:text-8xl lg:text-8xl font-bold tracking-tight text-foreground leading-[0.92] ink-reveal ${
                locale === "am" ? "font-ethiopic" : "font-heading"
              }`}
            >
              {locale === "am" ? "ላንቱሞ ብርሃኑ" : "Lantumo Birhanu"}
            </h1>

            {/* One Role Line */}
            <p className="font-mono text-sm sm:text-base md:text-lg tracking-wider text-accent font-semibold uppercase ink-reveal">
              {locale === "am"
                ? "ፍሮንትኤንድ፣ ባክኤንድ እና ፉልስታክ ሶፍትዌር ኢንጂነር"
                : "Frontend, Backend & Fullstack Developer"}
            </p>

            {/* One Proof Line: plain ink small caps text with middle-dot separator and NO container box */}
            <p className="font-mono text-xs tracking-wider uppercase text-muted py-1 flex flex-wrap items-center gap-x-3 gap-y-1 ink-reveal">
              <span className="text-foreground font-semibold">5+ Years Experience</span>
              <span className="opacity-40">•</span>
              <span className="text-foreground font-semibold">Next.js & React 19</span>
              <span className="opacity-40">•</span>
              <span className="text-foreground font-semibold">PostgreSQL & Node.js</span>
              <span className="opacity-40">•</span>
              <span>Three.js / WebGL</span>
            </p>

            {/* Two Primary Action CTAs: bordered text buttons (ink border, no fill, no shadow) */}
            <div className="pt-2 flex flex-wrap items-center gap-4 sm:gap-6 font-mono text-xs ink-reveal">
              <Magnetic>
                <a
                  href="#projects"
                  className="btn-ink inline-flex items-center gap-3 px-8 py-3.5 border border-foreground text-foreground bg-transparent font-semibold tracking-widest uppercase hover:bg-foreground/5 transition-all duration-200"
                >
                  <span>View Projects</span>
                  <ArrowDown className="w-4 h-4" />
                </a>
              </Magnetic>

              <Magnetic>
                <a
                  href="#contact"
                  className="btn-ink inline-flex items-center gap-2.5 px-7 py-3.5 border border-foreground/60 text-foreground bg-transparent font-semibold tracking-widest uppercase hover:border-foreground hover:bg-foreground/5 transition-all duration-200"
                >
                  <span>Contact Me</span>
                  <Send className="w-3.5 h-3.5" />
                </a>
              </Magnetic>
            </div>
          </div>
        </section>

        {/* Thin Ethiopian Tilet Divider: single row of small diamonds */}
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
          className="btn-ink fixed bottom-6 right-6 z-40 p-3 rounded-[1px] border border-border hover:border-foreground bg-background text-foreground transition-all duration-200 active:translate-y-[1px] animate-in fade-in"
          aria-label="Back to top"
          title="Back to top"
        >
          <ArrowUp className="w-4 h-4" />
        </button>
      )}
    </div>
  );
}
