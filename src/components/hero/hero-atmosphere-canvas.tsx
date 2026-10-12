"use client";

import React, { useRef, useMemo, useEffect, useState } from "react";
import * as THREE from "three";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { FidelStaticGrid } from "./fidel-static-grid";
import { detectDeviceTier } from "@/lib/gpu-tier";

interface HeroAtmosphereCanvasProps {
  heroFade: number; // 1.0 = full hero, 0.0 = scrolled past
}

function SceneContent({ heroFade, isMobile }: { heroFade: number; isMobile: boolean }) {
  const { camera, raycaster } = useThree();
  const plane = useMemo(() => new THREE.Plane(new THREE.Vector3(0, 0, 1), 0), []);
  const pointerRef = useRef({
    x: 0,
    y: 0,
    active: false,
    worldPos: new THREE.Vector3(0, 0, 0),
  });

  // Track window pointer for subtle hero hover interaction
  useEffect(() => {
    const handlePointerMove = (e: MouseEvent) => {
      // Only track if hero is partially in view
      if (heroFade <= 0.01) {
        pointerRef.current.active = false;
        return;
      }
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = -(e.clientY / window.innerHeight) * 2 - 1;
      pointerRef.current.x = x;
      pointerRef.current.y = y;
      pointerRef.current.active = true;
    };

    const handlePointerLeave = () => {
      pointerRef.current.active = false;
    };

    window.addEventListener("mousemove", handlePointerMove, { passive: true });
    window.addEventListener("mouseleave", handlePointerLeave);
    return () => {
      window.removeEventListener("mousemove", handlePointerMove);
      window.removeEventListener("mouseleave", handlePointerLeave);
    };
  }, [heroFade]);

  useFrame(() => {
    const ptr = pointerRef.current;
    if (ptr.active) {
      raycaster.setFromCamera(new THREE.Vector2(ptr.x, ptr.y), camera);
      const hit = new THREE.Vector3();
      raycaster.ray.intersectPlane(plane, hit);
      if (hit) {
        ptr.worldPos.copy(hit);
      }
    }
  });

  return (
    <FidelStaticGrid
      pointerRef={pointerRef}
      heroFade={heroFade}
      isMobile={isMobile}
    />
  );
}

export function HeroAtmosphereCanvas({ heroFade }: HeroAtmosphereCanvasProps) {
  const [canRun, setCanRun] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const tier = detectDeviceTier();
    setCanRun(tier.canRun3D);
    setIsMobile(tier.isMobile);
  }, []);

  if (!canRun || heroFade <= 0.001) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 pointer-events-none z-0 transition-opacity duration-300"
      style={{ opacity: heroFade }}
      aria-hidden="true"
    >
      <Canvas
        camera={{ position: [0, 0, 8.2], fov: 45 }}
        dpr={[1, typeof window !== "undefined" ? Math.min(1.5, window.devicePixelRatio) : 1.5]}
        frameloop={heroFade > 0.01 ? "always" : "never"}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
          depth: false,
        }}
      >
        <SceneContent heroFade={heroFade} isMobile={isMobile} />
      </Canvas>
    </div>
  );
}
