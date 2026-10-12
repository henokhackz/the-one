"use client";

import React, { useState, useEffect, Suspense } from "react";
import dynamic from "next/dynamic";
import { Hero2D } from "./hero-2d";
import { detectDeviceTier } from "@/lib/gpu-tier";

// Dynamically import WebGL Canvas with 2D Hero fallback as loading state
const WebGLCanvas = dynamic(
  () => import("./hero-webgl-canvas").then((mod) => mod.HeroWebGLCanvas),
  {
    ssr: false,
    loading: () => <Hero2D />,
  }
);

export function HeroFidel() {
  const [canRun3D, setCanRun3D] = useState<boolean | null>(null);

  useEffect(() => {
    const tier = detectDeviceTier();
    setCanRun3D(tier.canRun3D);
  }, []);

  // While detecting or if 3D is disabled/gated, render high-performance 2D canvas
  if (canRun3D === null || !canRun3D) {
    return <Hero2D />;
  }

  return (
    <Suspense fallback={<Hero2D />}>
      <WebGLCanvas />
    </Suspense>
  );
}
