"use client";

import React from "react";

/**
 * Birana Parchment Surface
 * Authentic Ethiopian goat-skin manuscript texture.
 * Features:
 * 1. Warm parchment base tones with subtle uneven candlelit variation.
 * 2. Static SVG feTurbulence tactile grain at 4-5% opacity.
 * 3. 100% static, GPU-cached, zero runtime overhead (0 FPS cost).
 */
export function BiranaParchmentSurface() {
  return (
    <div
      className="fixed inset-0 pointer-events-none z-[1] select-none overflow-hidden"
      aria-hidden="true"
    >
      {/* 1. Large soft uneven parchment lighting tones (candlelit vellum) */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_15%_15%,rgba(232,217,181,0.35),transparent_70%)] dark:bg-[radial-gradient(ellipse_80%_60%_at_15%_15%,rgba(48,40,29,0.40),transparent_70%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_75%_55%_at_85%_80%,rgba(223,208,172,0.30),transparent_65%)] dark:bg-[radial-gradient(ellipse_75%_55%_at_85%_80%,rgba(38,32,23,0.35),transparent_65%)]" />

      {/* 2. Static SVG feTurbulence grain */}
      <svg
        className="absolute inset-0 w-full h-full opacity-[0.048] mix-blend-multiply dark:mix-blend-overlay pointer-events-none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <filter id="birana-noise" x="0%" y="0%" width="100%" height="100%">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.68"
            numOctaves="3"
            stitchTiles="stitch"
          />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#birana-noise)" />
      </svg>
    </div>
  );
}
