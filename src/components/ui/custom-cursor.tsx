"use client";

import React, { useEffect, useState, useRef } from "react";

export function CustomCursor() {
  const [enabled, setEnabled] = useState(false);
  const [inHero, setInHero] = useState(true);
  const [cursorState, setCursorState] = useState<"default" | "link" | "fidel">("default");
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const cursorRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // Only enable on desktop pointer devices and when reduced motion is not preferred
    const hasFinePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (!hasFinePointer || prefersReducedMotion) {
      return;
    }

    setEnabled(true);

    const onMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });

      // Check if pointer is within the hero fold
      const heroEl = document.getElementById("hero");
      if (heroEl) {
        const rect = heroEl.getBoundingClientRect();
        const insideHero = e.clientY >= rect.top && e.clientY <= rect.bottom;
        setInHero(insideHero);
        if (!insideHero) return;
      }

      const target = e.target as HTMLElement | null;
      if (!target) return;

      const interactiveTarget = target.closest("a, button, input, [role='button']");
      if (interactiveTarget) {
        setCursorState("link");
        return;
      }

      if (target.tagName.toLowerCase() === "canvas") {
        setCursorState("fidel");
        return;
      }

      setCursorState("default");
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", onMouseMove);
    };
  }, []);

  if (!enabled || !inHero) return null;

  const isLink = cursorState === "link";
  const isFidel = cursorState === "fidel";

  return (
    <div
      ref={cursorRef}
      aria-hidden="true"
      className="fixed top-0 left-0 pointer-events-none z-[9999] transition-transform duration-75 ease-out"
      style={{
        transform: `translate3d(${position.x}px, ${position.y}px, 0)`,
      }}
    >
      <div
        className={`-translate-x-1/2 -translate-y-1/2 transition-all duration-150 rounded-full ${
          isLink
            ? "w-6 h-6 border border-foreground bg-foreground/10"
            : "w-1.5 h-1.5 bg-foreground"
        }`}
      />
    </div>
  );
}
