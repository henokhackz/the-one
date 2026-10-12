"use client";

import React, { useRef, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { FidelStaticGrid } from "./fidel-static-grid";
import { detectDeviceTier } from "@/lib/gpu-tier";

interface HeroAtmosphereCanvasProps {
  heroFade: number; // 1.0 = full hero, 0.0 = scrolled past
}

function SceneContent({
  heroFade,
  isMobile,
  isDebug,
}: {
  heroFade: number;
  isMobile: boolean;
  isDebug: boolean;
}) {
  const pointerRef = useRef({
    x: 0,
    y: 0,
    active: false,
  });

  // Track window pointer and touch events normalized strictly to the #hero element's bounding rect
  useEffect(() => {
    const updatePointer = (clientX: number, clientY: number, forceActive?: boolean) => {
      if (heroFade <= 0.01) {
        pointerRef.current.active = false;
        return;
      }

      const heroEl = document.getElementById("hero");
      const rect = heroEl
        ? heroEl.getBoundingClientRect()
        : {
            left: 0,
            top: 0,
            right: window.innerWidth,
            bottom: window.innerHeight,
            width: window.innerWidth,
            height: window.innerHeight,
          };

      const isInside =
        clientX >= rect.left - 40 &&
        clientX <= rect.right + 40 &&
        clientY >= rect.top - 40 &&
        clientY <= rect.bottom + 40;

      // In pixel-space orthographic camera, origin (0,0) is at the center of the viewport/canvas
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      pointerRef.current.x = clientX - centerX;
      pointerRef.current.y = -(clientY - centerY); // Three.js Y is inverted relative to DOM
      pointerRef.current.active = forceActive ?? isInside;
    };

    const handlePointerMove = (e: PointerEvent) => {
      updatePointer(e.clientX, e.clientY);
    };

    const handlePointerLeave = () => {
      pointerRef.current.active = false;
    };

    // Touch support: tap or drag creates the same predictable spring ripple
    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        updatePointer(e.touches[0].clientX, e.touches[0].clientY, true);
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        updatePointer(e.touches[0].clientX, e.touches[0].clientY, true);
      }
    };

    const handleTouchEnd = () => {
      pointerRef.current.active = false;
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    window.addEventListener("pointerleave", handlePointerLeave, { passive: true });
    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: true });
    window.addEventListener("touchend", handleTouchEnd, { passive: true });

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerleave", handlePointerLeave);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, [heroFade]);

  return (
    <FidelStaticGrid
      pointerRef={pointerRef}
      heroFade={heroFade}
      isMobile={isMobile}
      isDebug={isDebug}
    />
  );
}

export function HeroAtmosphereCanvas({ heroFade }: HeroAtmosphereCanvasProps) {
  const [canRun, setCanRun] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [isDebug, setIsDebug] = useState(false);

  useEffect(() => {
    const tier = detectDeviceTier();
    setCanRun(tier.canRun3D);
    setIsMobile(tier.isMobile);
    if (typeof window !== "undefined") {
      setIsDebug(window.location.search.includes("debug=grid"));
    }
  }, []);

  if (!canRun || heroFade <= 0.001) {
    return null;
  }

  const [debugPointer, setDebugPointer] = useState<{ x: number; y: number; active: boolean } | null>(null);

  useEffect(() => {
    if (!isDebug) return;
    const handleMove = (e: PointerEvent) => {
      setDebugPointer({ x: e.clientX, y: e.clientY, active: true });
    };
    const handleLeave = () => {
      setDebugPointer(null);
    };
    window.addEventListener("pointermove", handleMove, { passive: true });
    window.addEventListener("pointerleave", handleLeave);
    return () => {
      window.removeEventListener("pointermove", handleMove);
      window.removeEventListener("pointerleave", handleLeave);
    };
  }, [isDebug]);

  return (
    <div
      className="fixed inset-0 pointer-events-none z-0 transition-opacity duration-300"
      style={{ opacity: heroFade }}
      aria-hidden="true"
    >
      <Canvas
        orthographic
        camera={{
          position: [0, 0, 10],
          zoom: 1,
          near: -100,
          far: 100,
        }}
        dpr={[1, typeof window !== "undefined" ? Math.min(1.5, window.devicePixelRatio) : 1.5]}
        frameloop={heroFade > 0.01 ? "always" : "never"}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
          depth: false,
        }}
      >
        <SceneContent heroFade={heroFade} isMobile={isMobile} isDebug={isDebug} />
      </Canvas>

      {/* Visual Debug Radius Ring for ?debug=grid */}
      {isDebug && debugPointer && debugPointer.active && (
        <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
          <svg className="w-full h-full">
            <circle
              cx={debugPointer.x}
              cy={debugPointer.y}
              r={140}
              fill="rgba(232, 168, 56, 0.05)"
              stroke="#E8A838"
              strokeWidth="1.5"
              strokeDasharray="4 4"
            />
            <circle cx={debugPointer.x} cy={debugPointer.y} r={3} fill="#E8A838" />
            <text
              x={debugPointer.x + 8}
              y={debugPointer.y - 8}
              fill="#E8A838"
              fontSize="10"
              fontFamily="monospace"
            >
              140px Hover Radius
            </text>
          </svg>
        </div>
      )}
    </div>
  );
}

