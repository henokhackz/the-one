"use client";

import React, { useState, useEffect, Suspense } from "react";
import dynamic from "next/dynamic";
import { Hero2D } from "./hero-2d";
import { detectDeviceTier, DeviceTier } from "@/lib/gpu-tier";
import { Project } from "@/lib/projects-data";
import { useLocale } from "@/lib/locale-context";

// Dynamic import with ssr: false for Three.js Canvas
const FidelExperienceScene = dynamic(
  () =>
    import("./fidel-experience-scene").then(
      (mod) => mod.FidelExperienceScene
    ),
  {
    ssr: false,
    loading: () => <Hero2D />,
  }
);

interface HeroFidelProps {
  scrollProgress: number;
  activeProject: Project | null;
  onSelectProject: (p: Project | null) => void;
}

export function HeroFidel({
  scrollProgress,
  activeProject,
  onSelectProject,
}: HeroFidelProps) {
  const [tier, setTier] = useState<DeviceTier | null>(null);
  const { locale } = useLocale();

  useEffect(() => {
    const detected = detectDeviceTier();
    setTier(detected);
  }, []);

  // SSR or determining capability
  if (tier === null) {
    return <Hero2D />;
  }

  // Fallback to static accessible 2D if user prefers reduced motion or WebGL is unsupported
  if (!tier.canRun3D) {
    return <Hero2D />;
  }

  return (
    <Suspense fallback={<Hero2D />}>
      <FidelExperienceScene
        scrollProgress={scrollProgress}
        activeProject={activeProject}
        onSelectProject={onSelectProject}
        locale={locale as "en" | "am"}
        tier={tier}
      />
    </Suspense>
  );
}
