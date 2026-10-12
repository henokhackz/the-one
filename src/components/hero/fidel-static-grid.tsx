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
    worldPos: THREE.Vector3;
  }>;
  heroFade: number;
  isMobile: boolean;
}

export function FidelStaticGrid({
  pointerRef,
  heroFade,
  isMobile,
}: FidelStaticGridProps) {
  const meshRef = useRef<THREE.InstancedMesh | null>(null);
  const materialRef = useRef<THREE.ShaderMaterial | null>(null);
  const wakeTimeRef = useRef(0);
  const { resolvedTheme } = useTheme();

  // Grid dimensions: 24x14 on desktop, 12x8 on mobile
  const cols = isMobile ? 12 : 24;
  const rows = isMobile ? 8 : 14;
  const totalCount = cols * rows;

  const atlas = useMemo(() => {
    if (typeof window === "undefined") return null;
    return createGeezGlyphAtlas();
  }, []);

  // Compute strictly static grid positions and authentic Fidel syllable indices
  const { basePositions, gridNorms, glyphIndices } = useMemo(() => {
    const basePos = new Float32Array(totalCount * 3);
    const normPos = new Float32Array(totalCount * 2);
    const indices = new Float32Array(totalCount);

    const stepX = isMobile ? 0.72 : 0.64;
    const stepY = isMobile ? 0.72 : 0.64;
    const startX = -((cols - 1) * stepX) / 2;
    const startY = ((rows - 1) * stepY) / 2;

    let idx = 0;
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        // Static position
        basePos[idx * 3 + 0] = startX + c * stepX;
        basePos[idx * 3 + 1] = startY - r * stepY;
        basePos[idx * 3 + 2] = 0;

        // Normalized grid coordinates [0..1]
        normPos[idx * 2 + 0] = cols > 1 ? c / (cols - 1) : 0.5;
        normPos[idx * 2 + 1] = rows > 1 ? r / (rows - 1) : 0.5;

        // Authentic Fidel Syllable Chart Order:
        // Consonant family row (r), vowel order (c % 7)
        // Wraps cleanly through consonant groups
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
  }, [cols, rows, totalCount, isMobile, atlas]);

  const shaderMaterial = useMemo(() => {
    if (!atlas) return null;

    return new THREE.ShaderMaterial({
      vertexShader: fidelGridVertexShader,
      fragmentShader: fidelGridFragmentShader,
      uniforms: {
        uAtlas: { value: atlas.texture },
        uCols: { value: atlas.gridCols },
        uRows: { value: atlas.gridRows },
        uPointer: { value: new THREE.Vector3(0, 0, 0) },
        uPointerActive: { value: 0.0 },
        uWakeTime: { value: 0.0 },
        uThemeIsDark: { value: resolvedTheme === "dark" ? 1.0 : 0.0 },
        uHeroFade: { value: 1.0 },
      },
      transparent: true,
      depthWrite: false,
      blending: THREE.NormalBlending,
    });
  }, [atlas, resolvedTheme]);

  useEffect(() => {
    if (materialRef.current) {
      materialRef.current.uniforms.uThemeIsDark.value =
        resolvedTheme === "dark" ? 1.0 : 0.0;
    }
  }, [resolvedTheme]);

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

    // 1. Wake-up wave: runs once on load, 1.2s max, then stops forever
    if (wakeTimeRef.current < 1.3) {
      wakeTimeRef.current += delta;
      materialRef.current.uniforms.uWakeTime.value = Math.min(1.2, wakeTimeRef.current);
    }

    // 2. Sync hero fade
    materialRef.current.uniforms.uHeroFade.value = heroFade;

    // 3. Sync pointer
    const ptr = pointerRef.current;
    if (ptr.active && heroFade > 0.05) {
      materialRef.current.uniforms.uPointer.value.copy(ptr.worldPos);
      materialRef.current.uniforms.uPointerActive.value = 1.0;
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
