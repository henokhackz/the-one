"use client";

import React, { useEffect, useRef, useState } from "react";

interface RuledFrameProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  accent?: boolean;
  as?: React.ElementType;
}

/**
 * Self-Drawing Ruled Manuscript Border
 * Draws its 1px borders with scaleX (top/bottom) and scaleY (left/right) on pseudo-elements
 * when entering view via IntersectionObserver.
 * Zero box-shadows, strictly ruled lines.
 */
export function RuledFrame({
  children,
  className = "",
  delay = 0,
  accent = false,
  as: Component = "div",
  ...props
}: RuledFrameProps) {
  const ref = useRef<HTMLElement | null>(null);
  const [isDrawn, setIsDrawn] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setIsDrawn(true);
      return;
    }

    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsDrawn(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const Comp = (Component || "div") as any;

  return (
    <Comp
      ref={ref as any}
      className={`ruled-frame ${isDrawn ? "frame-drawn" : ""} ${
        accent ? "frame-gold" : ""
      } ${className}`}
      style={
        {
          "--ruled-delay": `${delay}ms`,
          ...props.style,
        } as React.CSSProperties
      }
      {...props}
    >
      {children}
    </Comp>
  );
}
