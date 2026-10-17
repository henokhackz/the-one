"use client";

import React, { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { TibebCornerStamp } from "@/components/ui/tibeb-pattern";
import { useLocale } from "@/lib/locale-context";
import { Reveal } from "@/components/ui/reveal";
import { RuledFrame } from "@/components/ui/ruled-frame";

interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  avatarText: string;
  quote: string;
}

export function TestimonialsCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartXRef = useRef<number | null>(null);
  const { locale } = useLocale();

  const testimonials: Testimonial[] = [
    {
      id: "1",
      name: "Abel Mekonnen",
      role: "Founder & CEO",
      company: "Habesha Tech Ventures",
      avatarText: "AM",
      quote:
        "Lantumo built our entire web platform from scratch. He has that rare dual strength: our UI feels fluid and visually captivating, while our backend APIs and Stripe webhooks have run without a single failure since launch.",
    },
    {
      id: "2",
      name: "Hiwot Bekele",
      role: "Engineering Director",
      company: "Fintech Systems Africa",
      avatarText: "HB",
      quote:
        "Lantumo's understanding of Next.js Server Components and PostgreSQL optimization is world-class. He reduced our catalog page load by over 60% and turned complex database race conditions into rock-solid transactional logic.",
    },
    {
      id: "3",
      name: "Dr. Yonas Tadesse",
      role: "Dean of Academic Systems",
      company: "Arba Minch University",
      avatarText: "YT",
      quote:
        "The Smart Dorm and Cafe system Lantumo engineered solved an operational bottleneck our university had suffered for years. Scanning thousands of students in sub-300ms eliminated hours of daily line congestion.",
    },
    {
      id: "4",
      name: "Meron Assefa",
      role: "Product Lead",
      company: "Creative Digital Labs",
      avatarText: "MA",
      quote:
        "Working with Lantumo was refreshing. He communicates clearly, delivers ahead of schedules, and has an art director's instinct for typography paired with an engineer's rigor for high-framerate WebGL code.",
    },
  ];

  const count = testimonials.length;

  const next = () => setCurrentIndex((prev) => (prev + 1) % count);
  const prev = () => setCurrentIndex((prev) => (prev - 1 + count) % count);

  // Calm auto-advance (every 6.5s), pauses on hover
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      next();
    }, 6500);
    return () => clearInterval(timer);
  }, [isPaused, count]);

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") {
      prev();
    } else if (e.key === "ArrowRight") {
      next();
    }
  };

  // Mobile swipe gestures
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartXRef.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartXRef.current === null) return;
    const diff = e.changedTouches[0].clientX - touchStartXRef.current;
    if (Math.abs(diff) > 40) {
      if (diff > 0) {
        prev();
      } else {
        next();
      }
    }
    touchStartXRef.current = null;
  };

  const current = testimonials[currentIndex];

  return (
    <section
      id="testimonials"
      className="relative z-10 w-full max-w-[1600px] mx-auto px-4 sm:px-6 md:px-12 py-24 scroll-mt-20 bg-background"
      aria-label="Client and Team Endorsements"
    >
      {/* Header */}
      <div className="pb-8 border-b border-border/80">
        <div className="flex items-center gap-3 mb-2">
          <TibebCornerStamp geezNumeral="፫" />
          <span className="font-mono text-xs tracking-[0.25em] text-accent uppercase font-medium">
            {locale === "am" ? "የስራ ባልደረቦች እና ደንበኞች" : "Client & Engineering Endorsements"}
          </span>
        </div>
        <Reveal variant="ink" duration={900}>
          <h2
            className={`text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-foreground ${
              locale === "am" ? "font-ethiopic" : "font-heading"
            }`}
          >
            {locale === "am" ? "የስራ ምስክርነቶች" : "Recommendations"}
          </h2>
        </Reveal>
      </div>

      {/* Carousel Card with RuledFrame border */}
      <RuledFrame
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onKeyDown={handleKeyDown}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        tabIndex={0}
        className="mt-12 relative p-8 sm:p-12 md:p-16 rounded-[1px] border border-border/80 bg-transparent outline-none focus-visible:ring-1 focus-visible:ring-accent"
        aria-roledescription="carousel"
        aria-label="Testimonials Carousel"
      >
        <Quote className="w-12 h-12 text-muted/20 absolute top-8 right-8 pointer-events-none" />

        <div className="max-w-4xl mx-auto flex flex-col justify-between min-h-[220px]">
          {/* Quote Body: Ink-written manuscript style */}
          <blockquote className="text-xl sm:text-2xl md:text-3xl font-serif italic text-foreground leading-relaxed sm:leading-snug">
            "{current.quote}"
          </blockquote>

          {/* Author Details: Handwritten signature note */}
          <div className="mt-8 pt-6 border-t border-border/60 flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-4">
              <div className="w-11 h-11 border border-border bg-transparent flex items-center justify-center font-mono font-bold text-accent text-sm">
                {current.avatarText}
              </div>
              <div>
                <h3 className="font-serif italic font-bold text-lg sm:text-xl text-foreground tracking-wide">
                  {current.name}
                </h3>
                <p className="font-mono text-xs text-muted">
                  {current.role} • <span className="text-accent">{current.company}</span>
                </p>
              </div>
            </div>

            {/* Navigation Buttons and Dots */}
            <div className="flex items-center gap-4">
              {/* Dots */}
              <div className="flex items-center gap-1.5">
                {testimonials.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentIndex(i)}
                    className={`h-1.5 transition-all ${
                      i === currentIndex
                        ? "w-6 bg-accent"
                        : "w-1.5 bg-border hover:bg-muted"
                    }`}
                    aria-label={`Go to slide ${i + 1}`}
                  />
                ))}
              </div>

              {/* Prev / Next Buttons */}
              <div className="flex items-center gap-2">
                <button
                  onClick={prev}
                  className="btn-ink p-2 border border-border hover:border-foreground text-foreground transition-colors"
                  aria-label="Previous testimonial"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={next}
                  className="btn-ink p-2 border border-border hover:border-foreground text-foreground transition-colors"
                  aria-label="Next testimonial"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </RuledFrame>
    </section>
  );
}
