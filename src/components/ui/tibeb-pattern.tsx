"use client";

import React from "react";

interface TibebProps {
  className?: string;
  variant?: "divider" | "corner" | "border" | "badge";
  color?: string;
  accentColor?: string;
}

/**
 * Procedural Tibeb (ጥበብ) - Traditional Ethiopian woven textile pattern
 * Handcrafted mathematical SVG geometry representing Habesha cross and diamond weaves.
 * Light as a feather (<1KB vector), sharp at any resolution, zero external assets.
 */
export function TibebDivider({
  className = "",
  color = "currentColor",
  accentColor = "var(--color-accent)",
}: {
  className?: string;
  color?: string;
  accentColor?: string;
}) {
  return (
    <div
      className={`w-full overflow-hidden flex items-center justify-center py-6 select-none ${className}`}
      aria-hidden="true"
    >
      <div className="flex items-center w-full max-w-[1600px] px-4 opacity-75">
        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-border to-border" />
        
        {/* Repeating Habesha Tibeb geometric center weave */}
        <div className="flex items-center gap-1.5 px-3">
          <svg
            width="88"
            height="18"
            viewBox="0 0 88 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="text-muted"
          >
            {/* Center diamond cross weave */}
            <path
              d="M10 9L15 4L20 9L15 14L10 9Z"
              stroke={accentColor}
              strokeWidth="1.2"
              fill="none"
            />
            <path
              d="M15 6.5L17.5 9L15 11.5L12.5 9L15 6.5Z"
              fill={accentColor}
              fillOpacity="0.3"
            />
            
            <path
              d="M26 9L31 4L36 9L31 14L26 9Z"
              stroke={color}
              strokeWidth="1.2"
              strokeDasharray="2 2"
              fill="none"
            />
            
            {/* Focal central cross */}
            <g transform="translate(44, 9)">
              <rect
                x="-4"
                y="-4"
                width="8"
                height="8"
                transform="rotate(45)"
                fill={accentColor}
              />
              <circle cx="0" cy="0" r="1.5" fill="var(--color-background)" />
              <line x1="-9" y1="0" x2="-5" y2="0" stroke={accentColor} strokeWidth="1" />
              <line x1="5" y1="0" x2="9" y2="0" stroke={accentColor} strokeWidth="1" />
            </g>
            
            <path
              d="M52 9L57 4L62 9L57 14L52 9Z"
              stroke={color}
              strokeWidth="1.2"
              strokeDasharray="2 2"
              fill="none"
            />
            
            <path
              d="M68 9L73 4L78 9L73 14L68 9Z"
              stroke={accentColor}
              strokeWidth="1.2"
              fill="none"
            />
            <path
              d="M73 6.5L75.5 9L73 11.5L70.5 9L73 6.5Z"
              fill={accentColor}
              fillOpacity="0.3"
            />
          </svg>
        </div>

        <div className="h-px flex-1 bg-gradient-to-l from-transparent via-border to-border" />
      </div>
    </div>
  );
}

/**
 * Tibeb Border Strip - For top/bottom edges of hero, banners, or modal headers
 */
export function TibebBorderStrip({ className = "" }: { className?: string }) {
  return (
    <div
      className={`w-full h-2.5 overflow-hidden flex items-center justify-center opacity-40 select-none ${className}`}
      aria-hidden="true"
    >
      <svg
        width="100%"
        height="10"
        viewBox="0 0 400 10"
        preserveAspectRatio="repeat-x"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full text-accent"
      >
        <pattern
          id="tibeb-pattern-repeat"
          x="0"
          y="0"
          width="40"
          height="10"
          patternUnits="userSpaceOnUse"
        >
          <path
            d="M0 5L5 0L10 5L5 10L0 5Z"
            fill="none"
            stroke="currentColor"
            strokeWidth="0.8"
          />
          <path
            d="M10 5L15 0L20 5L15 10L10 5Z"
            fill="currentColor"
            fillOpacity="0.2"
          />
          <path
            d="M20 5L25 0L30 5L25 10L20 5Z"
            fill="none"
            stroke="currentColor"
            strokeWidth="0.8"
          />
          <circle cx="35" cy="5" r="1.5" fill="currentColor" />
        </pattern>
        <rect width="100%" height="10" fill="url(#tibeb-pattern-repeat)" />
      </svg>
    </div>
  );
}

/**
 * Decorative Ge'ez / Tibeb corner stamp for editorial blocks
 */
export function TibebCornerStamp({
  geezNumeral = "፩",
  className = "",
}: {
  geezNumeral?: string;
  className?: string;
}) {
  return (
    <div
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 font-mono text-[11px] font-semibold tracking-widest uppercase border border-accent/30 bg-accent/5 text-accent rounded-sm select-none ${className}`}
    >
      <span className="font-serif text-xs text-accent">◈</span>
      <span className="font-ethiopic font-bold">{geezNumeral}</span>
    </div>
  );
}
