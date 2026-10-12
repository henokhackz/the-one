"use client";

import React, { useRef, useState, useMemo } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { useTexture, Text } from "@react-three/drei";
import { Project } from "@/lib/projects-data";
import {
  portalPreviewVertexShader,
  portalPreviewFragmentShader,
} from "@/shaders/fidel-shaders";

interface ProjectPortalProps {
  project: Project;
  position: [number, number, number];
  rotation?: [number, number, number];
  onSelect: (project: Project) => void;
  onHoverChange: (isHovered: boolean, worldPos: THREE.Vector3) => void;
  isActive: boolean;
  locale: "en" | "am";
  isMobile: boolean;
}

export function ProjectPortal({
  project,
  position,
  rotation = [0, 0, 0],
  onSelect,
  onHoverChange,
  isActive,
  locale,
  isMobile,
}: ProjectPortalProps) {
  const meshRef = useRef<THREE.Mesh | null>(null);
  const materialRef = useRef<THREE.ShaderMaterial | null>(null);
  const [hovered, setHovered] = useState(false);
  const hoverFactorRef = useRef(0);

  // Load project thumbnail texture
  const texture = useTexture(project.thumbnail);
  texture.minFilter = THREE.LinearFilter;
  texture.generateMipmaps = false;

  // Custom live shader material with wave ripple & tilet gold border
  const shaderMaterial = useMemo(() => {
    return new THREE.ShaderMaterial({
      vertexShader: portalPreviewVertexShader,
      fragmentShader: portalPreviewFragmentShader,
      uniforms: {
        uTexture: { value: texture },
        uTime: { value: 0 },
        uHover: { value: 0 },
        uAccent: { value: new THREE.Color("#E8A838") },
        uResolution: { value: new THREE.Vector2(16, 10) },
      },
      side: THREE.DoubleSide,
    });
  }, [texture]);

  useFrame(({ clock }, delta) => {
    if (!materialRef.current || !meshRef.current) return;
    const time = clock.getElapsedTime();
    materialRef.current.uniforms.uTime.value = time;

    // Smooth hover interpolation
    const targetHover = hovered || isActive ? 1.0 : 0.0;
    hoverFactorRef.current = THREE.MathUtils.damp(
      hoverFactorRef.current,
      targetHover,
      4.0,
      delta
    );
    materialRef.current.uniforms.uHover.value = hoverFactorRef.current;

    // Subtle gentle floating bobbing
    const bob = Math.sin(time * 1.2 + position[0]) * 0.08;
    meshRef.current.position.y = position[1] + bob;

    // Gentle rotation reaction
    if (hovered) {
      meshRef.current.scale.lerp(new THREE.Vector3(1.05, 1.05, 1.05), delta * 5);
    } else {
      meshRef.current.scale.lerp(new THREE.Vector3(1.0, 1.0, 1.0), delta * 5);
    }
  });

  const handlePointerOver = (e: any) => {
    e.stopPropagation();
    setHovered(true);
    if (meshRef.current) {
      const worldPos = new THREE.Vector3();
      meshRef.current.getWorldPosition(worldPos);
      onHoverChange(true, worldPos);
    }
  };

  const handlePointerOut = () => {
    setHovered(false);
    if (meshRef.current) {
      const worldPos = new THREE.Vector3();
      meshRef.current.getWorldPosition(worldPos);
      onHoverChange(false, worldPos);
    }
  };

  const handleClick = (e: any) => {
    e.stopPropagation();
    onSelect(project);
  };

  const planeWidth = isMobile ? 3.2 : 4.4;
  const planeHeight = planeWidth * (10 / 16);

  return (
    <group position={position} rotation={rotation}>
      {/* 3D Physical Monolith Portal Slab */}
      <mesh
        ref={meshRef}
        onPointerOver={(e) => {
          document.body.style.cursor = "pointer";
          handlePointerOver(e);
        }}
        onPointerOut={() => {
          document.body.style.cursor = "auto";
          handlePointerOut();
        }}
        onClick={handleClick}
      >
        <planeGeometry args={[planeWidth, planeHeight, 32, 20]} />
        <primitive object={shaderMaterial} ref={materialRef} attach="material" />
      </mesh>

      {/* Ge'ez Numeral Stamp in 3D */}
      <Text
        position={[-planeWidth / 2 + 0.35, planeHeight / 2 + 0.3, 0.1]}
        fontSize={isMobile ? 0.22 : 0.3}
        color="#E8A838"
        anchorX="left"
        anchorY="bottom"
      >
        {locale === "am" ? project.geezNumeral : `0${project.id}`}
      </Text>

      {/* 3D Project Title */}
      <Text
        position={[-planeWidth / 2 + (isMobile ? 0.9 : 1.2), planeHeight / 2 + 0.3, 0.1]}
        fontSize={isMobile ? 0.22 : 0.3}
        color="#f4f0e8"
        anchorX="left"
        anchorY="bottom"
      >
        {project.title.toUpperCase()}
      </Text>

      {/* Primary Tech Stack pill in 3D */}
      <Text
        position={[planeWidth / 2 - 0.2, planeHeight / 2 + 0.3, 0.1]}
        fontSize={isMobile ? 0.14 : 0.18}
        color="#9e988e"
        anchorX="right"
        anchorY="bottom"
      >
        {project.technologies.slice(0, 3).join(" • ")}
      </Text>
    </group>
  );
}
