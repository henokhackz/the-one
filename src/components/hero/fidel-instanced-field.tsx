"use client";

import React, { useRef, useMemo, useEffect } from "react";
import * as THREE from "three";
import { useFrame, useThree } from "@react-three/fiber";
import { createGeezGlyphAtlas } from "@/lib/geez-atlas";
import { generateNameTargetPoints } from "@/lib/glyph-targets";
import {
  fidelFieldVertexShader,
  fidelFieldFragmentShader,
} from "@/shaders/fidel-shaders";

interface FidelInstancedFieldProps {
  instanceCount: number;
  pointerRef: React.MutableRefObject<{
    x: number;
    y: number;
    active: boolean;
    worldPos: THREE.Vector3;
  }>;
  assembleTarget?: number;
  locale: "en" | "am";
  isMobile: boolean;
}

export function FidelInstancedField({
  instanceCount,
  pointerRef,
  assembleTarget = 1.0,
  locale,
  isMobile,
}: FidelInstancedFieldProps) {
  const meshRef = useRef<THREE.InstancedMesh | null>(null);
  const materialRef = useRef<THREE.ShaderMaterial | null>(null);
  const assembleProgressRef = useRef(0.0);
  const { viewport } = useThree();

  // 1. Prepare Glyph Atlas
  const atlas = useMemo(() => {
    if (typeof window === "undefined") return null;
    return createGeezGlyphAtlas();
  }, []);

  // 2. Generate Assembly Target Coordinates
  const targetPoints = useMemo(() => {
    const text = locale === "am" ? "ላንቱሞ" : "LANTUMO";
    return generateNameTargetPoints(text, instanceCount, isMobile);
  }, [locale, instanceCount, isMobile]);

  // 3. Setup Instanced Buffer Attributes
  const { initialPositions, targetPositions, glyphIndices, seeds } = useMemo(() => {
    const initPos = new Float32Array(instanceCount * 3);
    const targPos = new Float32Array(instanceCount * 3);
    const indices = new Float32Array(instanceCount);
    const sd = new Float32Array(instanceCount * 3);

    const totalGlyphs = atlas ? atlas.totalGlyphs : 64;

    for (let i = 0; i < instanceCount; i++) {
      // Volumetric cloud distribution
      const spreadX = isMobile ? 12 : 24;
      const spreadY = isMobile ? 10 : 16;
      const spreadZ = 22;

      initPos[i * 3 + 0] = (Math.random() - 0.5) * spreadX;
      initPos[i * 3 + 1] = (Math.random() - 0.5) * spreadY;
      initPos[i * 3 + 2] = (Math.random() - 0.5) * spreadZ - 4.0;

      // Target position
      const [tx, ty, tz] = targetPoints[i] || [0, 0, 0];
      targPos[i * 3 + 0] = tx;
      targPos[i * 3 + 1] = ty;
      targPos[i * 3 + 2] = tz;

      // Uniformly sample across the Ge'ez character bank
      indices[i] = Math.floor(Math.random() * totalGlyphs);

      // Seed attributes: [phase, speed, baseScale]
      sd[i * 3 + 0] = Math.random() * Math.PI * 2; // phase
      sd[i * 3 + 1] = 0.5 + Math.random() * 0.8;   // speed
      // Scale: small atmospheric drifting particles vs larger focal ones
      const isFocal = i < 400;
      sd[i * 3 + 2] = isFocal
        ? (isMobile ? 0.32 : 0.42)
        : (isMobile ? 0.16 : 0.22 + Math.random() * 0.12);
    }

    return {
      initialPositions: initPos,
      targetPositions: targPos,
      glyphIndices: indices,
      seeds: sd,
    };
  }, [instanceCount, targetPoints, atlas, isMobile]);

  // 4. Custom Instanced Shader Material
  const shaderMaterial = useMemo(() => {
    if (!atlas) return null;

    return new THREE.ShaderMaterial({
      vertexShader: fidelFieldVertexShader,
      fragmentShader: fidelFieldFragmentShader,
      uniforms: {
        uAtlas: { value: atlas.texture },
        uTime: { value: 0 },
        uPointer: { value: new THREE.Vector3(0, 0, 0) },
        uPointerActive: { value: 0.0 },
        uAssembleProgress: { value: 0.0 },
        uCols: { value: atlas.gridCols },
        uRows: { value: atlas.gridRows },
        uColorBase: { value: new THREE.Color("#c8c0b2") },
        uColorAccent: { value: new THREE.Color("#E8A838") }, // Radiant Ethiopian Saffron Gold
        uFogColor: { value: new THREE.Color("#0a0908") },    // Obsidian
        uFogNear: { value: 1.0 },
        uFogFar: { value: 24.0 },
        uOpacity: { value: 0.88 },
      },
      transparent: true,
      depthWrite: false,
      blending: THREE.NormalBlending,
    });
  }, [atlas]);

  // Re-apply target buffer when language changes
  useEffect(() => {
    if (!meshRef.current) return;
    const geom = meshRef.current.geometry;
    geom.setAttribute("aTargetPos", new THREE.InstancedBufferAttribute(targetPositions, 3));
    geom.attributes.aTargetPos.needsUpdate = true;
  }, [targetPositions]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (shaderMaterial) {
        shaderMaterial.dispose();
      }
    };
  }, [shaderMaterial]);

  // 5. Zero-Allocation Animation Frame Loop
  useFrame(({ clock }, delta) => {
    if (!materialRef.current) return;

    const time = clock.getElapsedTime();
    materialRef.current.uniforms.uTime.value = time;

    // Smoothly interpolate assembly progress
    const target = assembleTarget;
    assembleProgressRef.current = THREE.MathUtils.damp(
      assembleProgressRef.current,
      target,
      1.8,
      delta
    );
    materialRef.current.uniforms.uAssembleProgress.value = assembleProgressRef.current;

    // Update pointer uniforms
    const ptr = pointerRef.current;
    if (ptr.active) {
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
      args={[undefined, undefined, instanceCount]}
      frustumCulled={false}
    >
      <planeGeometry args={[1, 1]}>
        <instancedBufferAttribute
          attach="attributes-aInitialPos"
          args={[initialPositions, 3]}
        />
        <instancedBufferAttribute
          attach="attributes-aTargetPos"
          args={[targetPositions, 3]}
        />
        <instancedBufferAttribute
          attach="attributes-aGlyphIndex"
          args={[glyphIndices, 1]}
        />
        <instancedBufferAttribute
          attach="attributes-aSeed"
          args={[seeds, 3]}
        />
      </planeGeometry>
      <primitive object={shaderMaterial} ref={materialRef} attach="material" />
    </instancedMesh>
  );
}
