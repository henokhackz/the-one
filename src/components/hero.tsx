"use client";

import React from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { ArrowUpRight, ArrowRight } from "lucide-react";
import { HeroVisual } from "./hero-visual";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const SKILLS = ["NEXT.JS", "REACT", "TYPESCRIPT", "JAVASCRIPT"];

export function Hero() {
  const reducedMotion = useReducedMotion();

  return (
    <section
      className="relative w-full min-h-[calc(100svh-6rem)]  text-foreground overflow-hidden flex flex-col"
      id="top"
    >
      {/* ── Mobile: PCB as soft backdrop (same dot environment) ── */}
      <div className="lg:hidden absolute inset-0 z-0 opacity-[0.15] pointer-events-none">
        <HeroVisual />
      </div>

      {/* ── Content ── */}
      <div className="relative z-10 flex-1 w-full max-w-[1600px] mx-auto px-6 md:px-12 xl:px-16 flex flex-col">
        {/* Top bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="flex items-center justify-between pt-8 md:pt-10"
        >
          <div className="flex items-center gap-3">
            <span className="font-mono text-[10px] tracking-[0.35em] text-muted uppercase font-medium">
              HENOK BIRHANU
            </span>
          </div>
          <div className="hidden sm:flex items-center gap-6">
            <span className="font-mono text-[10px] tracking-[0.35em] text-muted uppercase">
              ADDIS ABABA, ET
            </span>
            <span className="w-px h-3 bg-foreground" />
            <span className="font-mono text-[10px] tracking-[0.35em] text-muted uppercase">
              01 / 04
            </span>
          </div>
        </motion.div>

        {/* ── Main two-column ── */}
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-[1fr_1.1fr] items-center gap-10 py-10">
          {/* LEFT — communication-first content */}
          <div className="relative flex flex-col">
            {/* 1. Intro */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1, ease: EASE }}
              className="flex items-center gap-3 mb-5"
            >
              <span className="font-mono text-xs md:text-sm tracking-[0.3em] text-muted uppercase font-medium">
                Frontend Developer
              </span>
            </motion.div>

            {/* 2. Main statement */}
            <h1 className="font-heading text-[clamp(3rem,5.2vw,5.75rem)] leading-[0.98] tracking-[-0.035em] font-bold select-none">
              <span className="block overflow-hidden pb-1">
                <motion.span
                  initial={{ y: reducedMotion ? 0 : "110%" }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.9, delay: 0.18, ease: EASE }}
                  className="block text-foreground"
                >
                  Clear, fast
                </motion.span>
              </span>
              <span className="block overflow-hidden pb-1">
                <motion.span
                  initial={{ y: reducedMotion ? 0 : "110%" }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.9, delay: 0.3, ease: EASE }}
                  className="block text-foreground"
                >
                  digital
                </motion.span>
              </span>
              <span className="block overflow-hidden pb-1">
                <motion.span
                  initial={{ y: reducedMotion ? 0 : "110%" }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.9, delay: 0.42, ease: EASE }}
                  className="block text-accent"
                >
                  experiences.
                </motion.span>
              </span>
            </h1>

            {/* 3. Short explanation — readable */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.55, ease: EASE }}
              className="mt-7 max-w-md text-base md:text-lg leading-relaxed text-muted font-light"
            >
              I design and build thoughtful websites and web apps that are easy
              to use, quick to load, and made to last.
            </motion.p>

            {/* 5. CTA */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8, ease: EASE }}
              className="mt-10 flex flex-wrap items-center gap-5 md:gap-8"
            >
              <Link
                href="/projects"
                className="group relative inline-flex items-center gap-3 border border-border hover:border-border px-6 md:px-8 py-3.5 md:py-4 text-[11px] md:text-xs font-semibold tracking-[0.28em] uppercase text-foreground transition-colors duration-300 hover:bg-foreground hover:text-background overflow-hidden"
              >
                <span className="relative z-10">View My Work</span>
                <ArrowUpRight className="relative z-10 w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>

              <Link
                href="/contact"
                className="group inline-flex items-center gap-2 text-[11px] md:text-xs font-semibold tracking-[0.28em] uppercase text-muted hover:text-accent transition-colors duration-300"
              >
                Let's Talk
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </motion.div>
          </div>

          {/* RIGHT — interactive frontend system module */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="hidden lg:block relative h-[540px] xl:h-[600px] -ml-8 xl:-ml-12"
          >
            <HeroVisual />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
