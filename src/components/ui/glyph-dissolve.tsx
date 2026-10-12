"use client";

import React, { useEffect, useState } from "react";

interface GlyphDissolveProps {
  geezNumeral?: string;
  title?: string;
}

export function GlyphDissolve({ geezNumeral = "ፊደል", title }: GlyphDissolveProps) {
  const [mounted, setMounted] = useState(true);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    // Respect user's motion preference: skip if prefers-reduced-motion
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setMounted(false);
      return;
    }

    // Snappy reveal sequence (150ms hold -> 400ms fadeout)
    const holdTimer = setTimeout(() => {
      setFading(true);
    }, 180);

    const removeTimer = setTimeout(() => {
      setMounted(false);
    }, 550);

    return () => {
      clearTimeout(holdTimer);
      clearTimeout(removeTimer);
    };
  }, []);

  if (!mounted) return null;

  return (
    <div
      aria-hidden="true"
      className={`fixed inset-0 z-50 pointer-events-none flex flex-col items-center justify-center bg-background/95 backdrop-blur-md transition-opacity duration-400 ease-out ${
        fading ? "opacity-0" : "opacity-100"
      }`}
    >
      <div className="flex flex-col items-center gap-3">
        <span className="font-ethiopic text-7xl sm:text-9xl font-bold text-accent select-none transition-transform duration-500 scale-100">
          {geezNumeral}
        </span>
        {title && (
          <span className="font-mono text-xs tracking-[0.25em] uppercase text-muted">
            {title}
          </span>
        )}
      </div>
    </div>
  );
}
