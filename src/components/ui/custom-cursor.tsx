"use client";

import React, { useEffect, useState, useRef } from "react";

export function CustomCursor() {
  const [enabled, setEnabled] = useState(false);
  const [cursorState, setCursorState] = useState<"default" | "link" | "view" | "fidel">("default");
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const cursorRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const hasFinePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (!hasFinePointer || prefersReducedMotion) {
      return;
    }

    setEnabled(true);

    const onMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });

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

  if (!enabled) return null;

  const isView = cursorState === "view";
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
        className={`-translate-x-1/2 -translate-y-1/2 flex items-center justify-center transition-all duration-200 rounded-full ${
          isView
            ? "w-16 h-16 bg-accent text-accent-foreground shadow-xl border border-accent/40 scale-100"
            : isLink
            ? "w-8 h-8 bg-accent/20 border border-accent scale-100"
            : isFidel
            ? "w-6 h-6 border border-accent/60 bg-accent/10 backdrop-blur-[1px] scale-100"
            : "w-3 h-3 bg-accent/80 scale-100"
        }`}
      >
        {isView && (
          <span className="font-mono text-[9px] font-bold tracking-widest uppercase">
            VIEW
          </span>
        )}
        {isFidel && (
          <span className="w-1.5 h-1.5 rounded-full bg-accent animate-ping" />
        )}
      </div>
    </div>
  );
}
