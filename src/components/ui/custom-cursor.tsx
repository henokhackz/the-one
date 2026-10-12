"use client";

import React, { useEffect, useState, useRef } from "react";

export function CustomCursor() {
  const [enabled, setEnabled] = useState(false);
  const [cursorState, setCursorState] = useState<"default" | "link" | "view">("default");
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

      // Determine hover target state
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const projectTarget = target.closest('[data-cursor="view"]');
      if (projectTarget) {
        setCursorState("view");
        return;
      }

      const interactiveTarget = target.closest("a, button, input, [role='button']");
      if (interactiveTarget) {
        setCursorState("link");
        return;
      }

      setCursorState("default");
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", onMouseMove);
    };
  }, []);

  if (!enabled) return null;

  const isView = cursorState === "view";
  const isLink = cursorState === "link";

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
        className={`-translate-x-1/2 -translate-y-1/2 flex items-center justify-center transition-all duration-200 rounded-full ${
          isView
            ? "w-16 h-16 bg-accent text-accent-foreground shadow-lg border border-accent-foreground/20 scale-100"
            : isLink
            ? "w-8 h-8 bg-accent/20 border border-accent scale-100"
            : "w-3 h-3 bg-accent/80 scale-100"
        }`}
      >
        {isView && (
          <span className="font-mono text-[9px] font-bold tracking-widest uppercase">
            VIEW
          </span>
        )}
      </div>
    </div>
  );
}
