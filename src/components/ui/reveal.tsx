"use client";

import React, { useEffect, useRef, useState } from "react";

export interface RevealProps {
  children: React.ReactNode;
  variant?: "rise" | "ink";
  delay?: number; // Milliseconds to delay transition
  duration?: number; // Milliseconds for transition duration
  className?: string;
  as?: React.ElementType;
}

/**
 * Reusable manuscript Reveal component.
 * - Single-fire IntersectionObserver that disconnects once triggered.
 * - "rise": soft opacity + 14px upward drift.
 * - "ink": left-to-right clip-path wipe (manuscript line being penned).
 * - Zero layout shift (CLS 0): reserves full layout space before revealing.
 * - Honors prefers-reduced-motion by revealing immediately without transform or clip-path.
 */
export function Reveal({
  children,
  variant = "rise",
  delay = 0,
  duration = 800,
  className = "",
  as: Component = "div",
}: RevealProps) {
  const ref = useRef<HTMLElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Reveal immediately if reduced motion is preferred
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setIsVisible(true);
      return;
    }

    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -40px 0px",
      }
    );

    observer.observe(node);

    return () => {
      observer.disconnect();
    };
  }, []);

  const variantStyles =
    variant === "ink"
      ? {
          clipPath: isVisible ? "inset(0 0% 0 0)" : "inset(0 100% 0 0)",
          opacity: isVisible ? 1 : 0.001,
          transition: `clip-path ${duration}ms cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms, opacity ${Math.min(
            duration,
            500
          )}ms ease ${delay}ms`,
        }
      : {
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? "translateY(0)" : "translateY(14px)",
          transition: `opacity ${duration}ms cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms, transform ${duration}ms cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms`,
        };

  const Comp = (Component || "div") as any;

  return (
    <Comp
      ref={ref as any}
      style={variantStyles}
      className={`will-change-[opacity,transform,clip-path] ${className}`}
    >
      {children}
    </Comp>
  );
}
