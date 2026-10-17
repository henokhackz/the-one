"use client";

import React, { useEffect, useState, useRef } from "react";

interface GlyphDissolveProps {
  geezNumeral?: string;
  title?: string;
  subtitle?: string;
  isReady?: boolean; // When passed, holds until isReady is true!
  minDuration?: number; // Minimum display time in ms (prevents flash on fast loads)
  maxTimeout?: number; // Fallback timeout in ms (prevents infinite lock if WebGL delayed)
  onFinish?: () => void;
}

/**
 * Ge'ez Manuscript Glyph Dissolve Loader
 * Displays an authentic birana manuscript seal with a prominent Ge'ez Fidel glyph,
 * rotating concentric diamond weave, and delicate ink ruling line.
 * Dissolves smoothly into the scene once the underlying Three.js grid is fully loaded.
 */
export function GlyphDissolve({
  geezNumeral = "ፊደል",
  title,
  subtitle,
  isReady,
  minDuration = 700,
  maxTimeout = 2200,
  onFinish,
}: GlyphDissolveProps) {
  const [mounted, setMounted] = useState(true);
  const [fading, setFading] = useState(false);
  const startTimeRef = useRef(Date.now());
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Respect user's motion preference: skip if prefers-reduced-motion
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setMounted(false);
      onFinish?.();
      return;
    }

    const triggerDissolve = () => {
      setFading(true);
      setTimeout(() => {
        setMounted(false);
        onFinish?.();
      }, 550);
    };

    if (isReady !== undefined) {
      // Controlled mode (e.g. Hero Three.js glyph grid loading)
      if (isReady) {
        const elapsed = Date.now() - startTimeRef.current;
        const remaining = Math.max(0, minDuration - elapsed);
        timerRef.current = setTimeout(triggerDissolve, remaining);
      } else {
        // Safety timeout so user is never stuck on low-end or disabled WebGL devices
        const safetyTimer = setTimeout(triggerDissolve, maxTimeout);
        return () => clearTimeout(safetyTimer);
      }
    } else {
      // Uncontrolled mode (e.g. case study quick transition)
      const holdTimer = setTimeout(() => {
        setFading(true);
      }, minDuration);

      const removeTimer = setTimeout(() => {
        setMounted(false);
        onFinish?.();
      }, minDuration + 400);

      return () => {
        clearTimeout(holdTimer);
        clearTimeout(removeTimer);
      };
    }

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [isReady, minDuration, maxTimeout, onFinish]);

  if (!mounted) return null;

  return (
    <div
      aria-hidden="true"
      className={`fixed inset-0 z-50 pointer-events-none flex flex-col items-center justify-center bg-background transition-all duration-500 ease-out ${
        fading ? "opacity-0 scale-[1.02]" : "opacity-100 scale-100"
      }`}
    >
      {/* Authentic Birana Manuscript Seal Frame */}
      <div className="relative flex flex-col items-center justify-center p-8 sm:p-12">
        {/* Subtle decorative concentric diamond weave */}
        <div className="relative flex items-center justify-center w-28 h-28 sm:w-36 sm:h-36 mb-4">
          {/* Outer ruled diamond */}
          <div className="absolute inset-0 border border-accent/40 rotate-45 transition-transform duration-700 animate-pulse" />
          <div className="absolute inset-2 border border-border/70 rotate-45" />

          {/* Golden Ge'ez Glyph */}
          <span className="font-ethiopic text-5xl sm:text-7xl font-bold text-accent select-none drop-shadow-sm">
            {geezNumeral}
          </span>
        </div>

        {/* Title and Subtitle */}
        <div className="flex flex-col items-center gap-1.5 text-center mt-2">
          {title && (
            <span className="font-mono text-xs sm:text-sm font-semibold tracking-[0.28em] uppercase text-foreground">
              {title}
            </span>
          )}
          {subtitle && (
            <span className="font-ethiopic text-xs tracking-wider text-muted">
              {subtitle}
            </span>
          )}
        </div>

        {/* Delicate manuscript ink ruling line */}
        <div className="mt-6 w-24 h-px bg-gradient-to-r from-transparent via-accent to-transparent opacity-60" />
      </div>
    </div>
  );
}
