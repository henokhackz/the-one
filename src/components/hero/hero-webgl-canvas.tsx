"use client";

import React, { useRef, useMemo, useEffect, useState } from "react";
import Link from "next/link";
import { ArrowUpRight, ArrowDown } from "lucide-react";
import * as THREE from "three";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { EthiopianClock } from "@/components/layout/ethiopian-clock";
import { TibebCornerStamp } from "@/components/ui/tibeb-pattern";
import { Magnetic } from "@/components/ui/magnetic-button";
import { useLocale } from "@/lib/locale-context";
import { Hero2D } from "./hero-2d";

// Ge'ez Glyphs for WebGL field
const GEEZ_SAMPLE = ["ሀ", "ለ", "ሐ", "መ", "ሠ", "ረ", "ሰ", "ቀ", "በ", "ተ", "ነ", "አ", "ከ", "ወ", "ዘ", "የ", "ደ", "ገ", "ጠ", "ጰ", "ጸ", "ፈ"];

function FidelMeshScene({
  pointerPos,
}: {
  pointerPos: React.MutableRefObject<{ x: number; y: number; active: boolean }>;
}) {
  const meshRef = useRef<THREE.InstancedMesh | null>(null);
  const count = 144; // 12 x 12 grid for optimal 60fps performance

  const dummy = useMemo(() => new THREE.Object3D(), []);
  const initialPositions = useMemo(() => {
    const pos: [number, number, number][] = [];
    const step = 0.55;
    const startX = -((12 * step) / 2);
    const startY = -((12 * step) / 2);

    for (let i = 0; i < 12; i++) {
      for (let j = 0; j < 12; j++) {
        pos.push([startX + j * step, startY + i * step, 0]);
      }
    }
    return pos;
  }, []);

  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    const time = clock.getElapsedTime();
    const ptr = pointerPos.current;

    for (let i = 0; i < count; i++) {
      const [bx, by] = initialPositions[i];
      let x = bx;
      let y = by;
      let z = Math.sin(time * 2 + bx * 3 + by * 3) * 0.08;

      if (ptr.active) {
        const dx = ptr.x * 3.5 - x;
        const dy = ptr.y * 2.5 - y;
        const dist = Math.hypot(dx, dy);

        if (dist < 1.2) {
          const force = (1.2 - dist) / 1.2;
          z += Math.sin(dist * 8 - time * 6) * force * 0.45;
          x -= dx * force * 0.15;
          y -= dy * force * 0.15;
        }
      }

      dummy.position.set(x, y, z);
      dummy.scale.set(0.18, 0.18, 0.18);
      dummy.rotation.z = Math.sin(time + bx) * 0.1;
      dummy.updateMatrix();

      meshRef.current.setMatrixAt(i, dummy.matrix);
    }

    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh
      ref={meshRef}
      args={[undefined, undefined, count]}
      frustumCulled={false}
    >
      <planeGeometry args={[1, 1]} />
      <meshBasicMaterial
        color="#e5a93c"
        transparent
        opacity={0.35}
        wireframe={true}
      />
    </instancedMesh>
  );
}

export function HeroWebGLCanvas() {
  const [hasError, setHasError] = useState(false);
  const pointerPos = useRef({ x: 0, y: 0, active: false });
  const { locale, t } = useLocale();

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
    pointerPos.current = { x, y, active: true };
  };

  const handlePointerLeave = () => {
    pointerPos.current.active = false;
  };

  if (hasError) {
    return <Hero2D />;
  }

  return (
    <section
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      className="relative w-full min-h-[92vh] flex flex-col justify-between overflow-hidden border-b border-border/60 bg-background"
      aria-label="Interactive Three.js Portfolio Hero"
    >
      {/* 3D WebGL Canvas Layer */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <Canvas
          camera={{ position: [0, 0, 5], fov: 45 }}
          gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
          onCreated={({ gl }) => {
            gl.setClearColor(0x000000, 0);
          }}
          onError={() => setHasError(true)}
        >
          <ambientLight intensity={0.5} />
          <FidelMeshScene pointerPos={pointerPos} />
        </Canvas>
      </div>

      {/* Top Metadata Bar */}
      <div className="relative z-10 w-full max-w-[1600px] mx-auto px-6 md:px-12 pt-8 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <TibebCornerStamp geezNumeral={locale === "am" ? "፩" : "01"} />
          <span className="font-mono text-[11px] tracking-[0.25em] text-muted uppercase">
            {locale === "am" ? "የፊደል 3D ኢንጂነሪንግ" : "FIDEL 3D / WEBGL ENGINE"}
          </span>
        </div>

        {/* Live Ethiopian Clock & Calendar */}
        <EthiopianClock showDate={true} />
      </div>

      {/* Main Editorial Core */}
      <div className="relative z-10 w-full max-w-[1600px] mx-auto px-6 md:px-12 py-12 md:py-16 flex flex-col justify-center">
        {/* Availability Badge */}
        <div className="inline-flex items-center gap-2 mb-6 w-fit">
          <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="font-mono text-[11px] tracking-[0.2em] text-muted uppercase font-medium">
            {t.hero.badge}
          </span>
        </div>

        {/* Editorial Heading */}
        <div className="max-w-4xl">
          <h1 className={`text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight text-foreground leading-[1.05] ${locale === "am" ? "font-ethiopic" : "font-heading"}`}>
            {t.hero.name}
          </h1>

          <p className="font-mono text-xs sm:text-sm md:text-base tracking-widest text-accent font-semibold uppercase mt-4 mb-6">
            {t.hero.role}
          </p>

          <p className="max-w-2xl text-base sm:text-lg md:text-xl text-muted font-light leading-relaxed">
            {t.hero.bio}
          </p>
        </div>

        {/* Action CTAs: Equal width and aligned on mobile */}
        <div className="mt-10 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 sm:gap-6 w-full sm:w-auto">
          <Magnetic className="w-full sm:w-auto">
            <Link
              href="/work"
              className="group relative w-full sm:w-auto sm:min-w-[190px] inline-flex items-center justify-center gap-3 px-6 sm:px-7 py-3.5 bg-foreground text-background font-mono text-xs font-semibold tracking-[0.2em] uppercase transition-all duration-300 hover:bg-accent hover:text-accent-foreground shadow-sm hover:shadow-lg active:scale-95 text-center"
            >
              <span>{t.hero.viewWork}</span>
              <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 shrink-0" />
            </Link>
          </Magnetic>

          <Magnetic className="w-full sm:w-auto">
            <Link
              href="/contact"
              className="group w-full sm:w-auto sm:min-w-[190px] inline-flex items-center justify-center gap-2.5 px-6 sm:px-7 py-3.5 border border-border hover:border-accent text-foreground hover:text-accent font-mono text-xs font-semibold tracking-[0.2em] uppercase transition-all duration-300 active:scale-95 bg-surface/50 backdrop-blur-sm text-center"
            >
              <span>{t.hero.connect}</span>
              <span className="text-accent group-hover:translate-x-1 transition-transform shrink-0">→</span>
            </Link>
          </Magnetic>

          <Magnetic className="w-full sm:w-auto">
            <a
              href="/Lantumo_Birhanu_resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-3 text-muted hover:text-foreground font-mono text-xs tracking-widest uppercase transition-colors text-center"
            >
              <span>{t.hero.downloadCv}</span>
              <span className="text-[10px] text-accent shrink-0">PDF</span>
            </a>
          </Magnetic>
        </div>
      </div>

      {/* Hero Bottom Bar */}
      <div className="relative z-10 w-full max-w-[1600px] mx-auto px-6 md:px-12 pb-8 flex items-center justify-between text-muted text-xs font-mono">
        <div className="flex items-center gap-6">
          <span className="tracking-widest uppercase">{t.hero.statusRole}</span>
          <span className="hidden sm:inline opacity-30">•</span>
          <span className="hidden sm:inline tracking-widest uppercase">{t.hero.location}</span>
        </div>

        <a
          href="#selected-work"
          className="flex items-center gap-2 text-muted hover:text-foreground tracking-widest uppercase transition-colors"
          aria-label="Scroll to selected work"
        >
          <span>{t.hero.scroll}</span>
          <ArrowDown className="w-3.5 h-3.5 animate-bounce" />
        </a>
      </div>
    </section>
  );
}
