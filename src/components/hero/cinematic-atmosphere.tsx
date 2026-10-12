"use client";

import React, { useRef, useMemo } from "react";
import * as THREE from "three";
import { useFrame, useThree } from "@react-three/fiber";

const atmosphereShader = {
  vertexShader: /* glsl */ `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = vec4(position, 1.0);
    }
  `,
  fragmentShader: /* glsl */ `
    precision mediump float;
    uniform float uTime;
    uniform vec2 uResolution;
    uniform float uAberration;
    uniform float uGrain;
    varying vec2 vUv;

    float hash(vec2 p) {
      vec3 p3 = fract(vec3(p.xyx) * 0.1031);
      p3 += dot(p3, p3.yzx + 33.33);
      return fract((p3.x + p3.y) * p3.z);
    }

    void main() {
      vec2 uv = vUv;
      vec2 center = vec2(0.5);
      float dist = length(uv - center);

      // 1. Natural manuscript parchment grain (warm tinted)
      float grainTime = fract(uTime * 0.05);
      float grain = (hash(uv * uResolution + vec2(grainTime * 73.0)) - 0.5) * uGrain;

      // 2. Deep warm obsidian vignette
      float vignette = smoothstep(0.92, 0.38, dist);

      // Gold atmospheric tint in shadows & periphery (#E8A838)
      vec3 goldHaze = vec3(0.91, 0.66, 0.22);
      vec3 color = vec3(0.0);

      // Subtle edge warmth
      color += goldHaze * (1.0 - vignette) * 0.08;
      // Warm organic grain overlay
      color += vec3(grain * 1.1, grain * 0.95, grain * 0.7);

      // Alpha is only for the subtle atmospheric texture overlay
      float alpha = clamp((1.0 - vignette) * 0.18 + abs(grain) * 1.2, 0.0, 0.45);

      gl_FragColor = vec4(color, alpha);
    }
  `,
};

export function CinematicAtmosphere({ enabled = true }: { enabled?: boolean }) {
  const meshRef = useRef<THREE.Mesh | null>(null);
  const materialRef = useRef<THREE.ShaderMaterial | null>(null);
  const { size } = useThree();

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uResolution: { value: new THREE.Vector2(size.width, size.height) },
      uAberration: { value: 0.003 },
      uGrain: { value: 0.035 },
    }),
    [size]
  );

  useFrame(({ clock }) => {
    if (!materialRef.current) return;
    materialRef.current.uniforms.uTime.value = clock.getElapsedTime();
    materialRef.current.uniforms.uResolution.value.set(size.width, size.height);
  });

  if (!enabled) return null;

  return (
    <mesh ref={meshRef} frustumCulled={false} renderOrder={999}>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={atmosphereShader.vertexShader}
        fragmentShader={atmosphereShader.fragmentShader}
        uniforms={uniforms}
        transparent={true}
        depthTest={false}
        depthWrite={false}
        blending={THREE.NormalBlending}
      />
    </mesh>
  );
}
