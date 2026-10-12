"use client";

import React, { useRef, useMemo, useEffect } from "react";
import * as THREE from "three";
import { useFrame, useThree } from "@react-three/fiber";
import { useTheme } from "next-themes";
import { createGeezGlyphAtlas } from "@/lib/geez-atlas";
import {
  fidelGridVertexShader,
  fidelGridFragmentShader,
} from "@/shaders/fidel-grid-shaders";

interface FidelStaticGridProps {
  pointerRef: React.MutableRefObject<{
    x: number;
    y: number;
    active: boolean;
  }>;
  heroFade: number;
  isMobile: boolean;
  isDebug: boolean;
}

export function FidelStaticGrid({
  pointerRef,
  heroFade,
  isMobile,
  isDebug,
}: FidelStaticGridProps) {
  const meshRef = useRef<THREE.InstancedMesh | null>(null);
  const materialRef = useRef<THREE.ShaderMaterial | null>(null);
  const wakeTimeRef = useRef(0);
  const hoverSpringRef = useRef(0);
  const springVelRef = useRef(0);
  const { resolvedTheme } = useTheme();
  const { size } = useThree();

  // Cell size: ~56px desktop, ~44px mobile
  const cellSize = isMobile ? 44 : 56;

  // Compute cols and rows dynamically to cover viewport edge to edge, overscanning by 1 cell on every side (+2)
  const cols = Math.max(6, Math.ceil(size.width / cellSize) + 2);
  const rows = Math.max(6, Math.ceil(size.height / cellSize) + 2);
  const totalCount = cols * rows;

  const atlas = useMemo(() => {
    if (typeof window === "undefined") return null;
    return createGeezGlyphAtlas();
  }, []);

  // Compute strictly static pixel positions and authentic Fidel syllable order
  const { basePositions, gridNorms, glyphIndices } = useMemo(() => {
    const basePos = new Float32Array(totalCount * 3);
    const normPos = new Float32Array(totalCount * 2);
    const indices = new Float32Array(totalCount);

    const startX = -((cols - 1) * cellSize) / 2;
    const startY = ((rows - 1) * cellSize) / 2;

    let idx = 0;
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        // Pixel-mapped position (1 unit = 1 pixel)
        basePos[idx * 3 + 0] = startX + c * cellSize;
        basePos[idx * 3 + 1] = startY - r * cellSize;
        basePos[idx * 3 + 2] = 0;

        // Normalized grid coordinates [0..1]
        normPos[idx * 2 + 0] = cols > 1 ? c / (cols - 1) : 0.5;
        normPos[idx * 2 + 1] = rows > 1 ? r / (rows - 1) : 0.5;

        // Authentic Fidel Syllable Chart Order:
        // Consonant family row (r), vowel order (c % 7)
        const consonantGroup = Math.floor(c / 7);
        const consonantRow = (r * 2 + consonantGroup) % 20;
        const order = c % 7;
        const glyphIdx = consonantRow * 7 + order;

        indices[idx] = glyphIdx % (atlas ? atlas.totalGlyphs : 140);
        idx++;
      }
    }

    return {
      basePositions: basePos,
      gridNorms: normPos,
      glyphIndices: indices,
    };
  }, [cols, rows, cellSize, totalCount, atlas]);

  const isDark = resolvedTheme === "dark";

  // Palette definitions:
  // Light (parchment): ink brown #3B2A1A at 14-20% opacity at rest.
  // Dark: warm parchment #E8D9B5 at 12-18% opacity at rest.
  const inkColor = useMemo(
    () => new THREE.Color(isDark ? "#E8D9B5" : "#3B2A1A"),
    [isDark]
  );
  const restOpacity = isDark ? 0.15 : 0.17;
  const hoverOpacity = 0.55;

  // Ethiopian flag colors
  const flagGreen = useMemo(() => new THREE.Color("#078930"), []);
  const flagAmber = useMemo(() => new THREE.Color("#FCDD09"), []);
  const flagRed = useMemo(() => new THREE.Color("#DA121A"), []);

  const shaderMaterial = useMemo(() => {
    if (!atlas) return null;

    return new THREE.ShaderMaterial({
      vertexShader: fidelGridVertexShader,
      fragmentShader: fidelGridFragmentShader,
      uniforms: {
        uAtlas: { value: atlas.texture },
        uCols: { value: atlas.gridCols },
        uRows: { value: atlas.gridRows },
        uCellSize: { value: cellSize },
        uPointer: { value: new THREE.Vector2(0, 0) },
        uPointerActive: { value: 0.0 },
        uHoverSpring: { value: 0.0 },
        uWakeTime: { value: 0.0 },
        uWakeDone: { value: 0.0 },
        uInkColor: { value: inkColor },
        uRestOpacity: { value: restOpacity },
        uHoverOpacity: { value: hoverOpacity },
        uFlagGreen: { value: flagGreen },
        uFlagAmber: { value: flagAmber },
        uFlagRed: { value: flagRed },
        uHeroFade: { value: 1.0 },
        uDebug: { value: isDebug ? 1.0 : 0.0 },
        uVignetteCenter: {
          value: isMobile ? new THREE.Vector2(0.5, 0.48) : new THREE.Vector2(0.26, 0.52),
        },
        uVignetteRadius: {
          value: isMobile ? new THREE.Vector2(0.52, 0.42) : new THREE.Vector2(0.38, 0.44),
        },
      },
      transparent: true,
      depthWrite: false,
      blending: THREE.NormalBlending,
    });
  }, [atlas, cellSize, inkColor, restOpacity, hoverOpacity, flagGreen, flagAmber, flagRed, isDebug, isMobile]);

  // Sync theme changes
  useEffect(() => {
    if (materialRef.current) {
      materialRef.current.uniforms.uInkColor.value.copy(inkColor);
      materialRef.current.uniforms.uRestOpacity.value = restOpacity;
    }
  }, [inkColor, restOpacity]);

  // Clean unmount
  useEffect(() => {
    return () => {
      if (shaderMaterial) {
        shaderMaterial.dispose();
      }
    };
  }, [shaderMaterial]);

  useFrame((_, delta) => {
    if (!materialRef.current) return;

    // 1. Separate, finite wake wave (0.0 to 1.2s max on load, then hands 100% control to hover)
    if (wakeTimeRef.current < 1.25) {
      wakeTimeRef.current += delta;
      materialRef.current.uniforms.uWakeTime.value = Math.min(1.2, wakeTimeRef.current);
      if (wakeTimeRef.current >= 1.2) {
        materialRef.current.uniforms.uWakeDone.value = 1.0;
      }
    }

    // 2. Sync hero fade
    materialRef.current.uniforms.uHeroFade.value = heroFade;

    // 3. Critically damped spring for hover (~400ms settling time)
    const ptr = pointerRef.current;
    const targetHover = ptr.active && heroFade > 0.05 ? 1.0 : 0.0;
    const omega = 12.0; // Critically damped natural frequency for ~400ms settle
    const dt = Math.min(delta, 0.05);
    const diff = targetHover - hoverSpringRef.current;
    springVelRef.current += (diff * omega * omega - 2.0 * omega * springVelRef.current) * dt;
    hoverSpringRef.current += springVelRef.current * dt;
    materialRef.current.uniforms.uHoverSpring.value = Math.max(0, Math.min(1.0, hoverSpringRef.current));

    // Pointer update: smooth tracking, zero per-frame allocation
    if (ptr.active && heroFade > 0.05) {
      materialRef.current.uniforms.uPointer.value.set(ptr.x, ptr.y);
      materialRef.current.uniforms.uPointerActive.value = 1.0;
    } else if (hoverSpringRef.current > 0.005) {
      materialRef.current.uniforms.uPointerActive.value = hoverSpringRef.current;
    } else {
      materialRef.current.uniforms.uPointerActive.value = 0.0;
    }
  });

  if (!shaderMaterial) return null;

  return (
    <instancedMesh
      ref={meshRef}
      args={[undefined, undefined, totalCount]}
      frustumCulled={false}
    >
      <planeGeometry args={[1, 1]}>
        <instancedBufferAttribute
          attach="attributes-aBasePos"
          args={[basePositions, 3]}
        />
        <instancedBufferAttribute
          attach="attributes-aGridNorm"
          args={[gridNorms, 2]}
        />
        <instancedBufferAttribute
          attach="attributes-aGlyphIndex"
          args={[glyphIndices, 1]}
        />
      </planeGeometry>
      <primitive object={shaderMaterial} ref={materialRef} attach="material" />
    </instancedMesh>
  );
}

