"use client";

import React, { useEffect, useRef, useState } from "react";

interface CountUpProps {
  text: string;
  className?: string;
  duration?: number;
}

/**
 * Single-fire CountUp for project metric results.
 * Extracts numbers from strings like "85%+", "< 300ms", "60%", and animates 0 -> target.
 * Fires once when entering view via IntersectionObserver, then disconnects.
 */
export function CountUp({ text, className = "", duration = 1000 }: CountUpProps) {
  const containerRef = useRef<HTMLSpanElement | null>(null);
  const [displayText, setDisplayText] = useState(text);
  const hasAnimatedRef = useRef(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setDisplayText(text);
      return;
    }

    const match = text.match(/(\d+(?:\.\d+)?)/);
    if (!match) {
      setDisplayText(text);
      return;
    }

    const targetNum = parseFloat(match[1]);
    const prefix = text.slice(0, match.index);
    const suffix = text.slice((match.index ?? 0) + match[1].length);

    // Initial state before entering view: start at 0
    setDisplayText(`${prefix}0${suffix}`);

    const node = containerRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimatedRef.current) {
          hasAnimatedRef.current = true;
          observer.disconnect();

          let startTime: number | null = null;
          const animate = (timestamp: number) => {
            if (!startTime) startTime = timestamp;
            const progress = Math.min((timestamp - startTime) / duration, 1);
            // Ease out cubic: 1 - Math.pow(1 - progress, 3)
            const ease = 1 - Math.pow(1 - progress, 3);
            const currentVal = Math.round(targetNum * ease);
            setDisplayText(`${prefix}${currentVal}${suffix}`);

            if (progress < 1) {
              requestAnimationFrame(animate);
            } else {
              setDisplayText(text);
            }
          };

          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(node);

    return () => observer.disconnect();
  }, [text, duration]);

  return (
    <span ref={containerRef} className={className}>
      {displayText}
    </span>
  );
}
