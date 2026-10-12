"use client";

import React, { useRef, useMemo, useEffect, useState } from "react";
import * as THREE from "three";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { FidelInstancedField } from "./fidel-instanced-field";
import { ProjectPortal } from "./project-portal";
import { CinematicAtmosphere } from "./cinematic-atmosphere";
import { PROJECTS, Project } from "@/lib/projects-data";
import { DeviceTier } from "@/lib/gpu-tier";

interface SceneControllerProps {
  scrollProgress: number;
  activeProject: Project | null;
  onSelectProject: (p: Project | null) => void;
  hoveredProjectPos: THREE.Vector3 | null;
  setHoveredProjectPos: (pos: THREE.Vector3 | null) => void;
  pointerRef: React.MutableRefObject<{
    x: number;
    y: number;
    active: boolean;
    worldPos: THREE.Vector3;
  }>;
  locale: "en" | "am";
  tier: DeviceTier;
}

// 3D Catmull-Rom architectural fly-through spline
const cameraSpline = new THREE.CatmullRomCurve3([
  new THREE.Vector3(0, 0, 7.5),     // Station 0: Hero Entry
  new THREE.Vector3(0, -0.3, 3.0),   // Transition corridor
  new THREE.Vector3(-1.4, -0.6, -7), // Approaching Project 1
  new THREE.Vector3(1.4, -0.8, -12), // Approaching Project 2
  new THREE.Vector3(-1.2, -0.6, -17),// Approaching Project 3
  new THREE.Vector3(1.2, -0.8, -22), // Approaching Project 4
  new THREE.Vector3(0, -1.2, -28),   // Station 2: Sanctum Hub
]);

function CameraController({
  scrollProgress,
  activeProject,
  tier,
}: {
  scrollProgress: number;
  activeProject: Project | null;
  tier: DeviceTier;
}) {
  const { camera } = useThree();
  const currentPosRef = useRef(new THREE.Vector3(0, 0, 7.5));
  const currentLookRef = useRef(new THREE.Vector3(0, 0, 0));

  useFrame((_, delta) => {
    // If a project is actively selected, fly camera directly in front of the project plane
    if (activeProject) {
      let targetCamPos = new THREE.Vector3(0, 0, 0);
      let targetLookAt = new THREE.Vector3(0, 0, 0);

      if (activeProject.id === "1") {
        targetCamPos.set(-3.2, -0.6, -6.2);
        targetLookAt.set(-3.2, -0.6, -9);
      } else if (activeProject.id === "2") {
        targetCamPos.set(3.2, -0.8, -11.2);
        targetLookAt.set(3.2, -0.8, -14);
      } else if (activeProject.id === "3") {
        targetCamPos.set(-3.0, -0.6, -16.2);
        targetLookAt.set(-3.0, -0.6, -19);
      } else {
        targetCamPos.set(3.0, -0.8, -21.2);
        targetLookAt.set(3.0, -0.8, -24);
      }

      currentPosRef.current.lerp(targetCamPos, delta * 3.5);
      currentLookRef.current.lerp(targetLookAt, delta * 3.5);
      camera.position.copy(currentPosRef.current);
      camera.lookAt(currentLookRef.current);
      return;
    }

    // Default: Follow Catmull-Rom spline driven by smooth scroll progress
    const t = THREE.MathUtils.clamp(scrollProgress, 0.0, 1.0);
    const splinePos = cameraSpline.getPoint(t);
    const forwardT = Math.min(1.0, t + 0.04);
    const splineLookAt = cameraSpline.getPoint(forwardT);

    currentPosRef.current.lerp(splinePos, delta * 4.0);
    currentLookRef.current.lerp(splineLookAt, delta * 4.0);

    camera.position.copy(currentPosRef.current);
    camera.lookAt(currentLookRef.current);
  });

  return null;
}

function ExperienceWorld({
  scrollProgress,
  activeProject,
  onSelectProject,
  hoveredProjectPos,
  setHoveredProjectPos,
  pointerRef,
  locale,
  tier,
}: SceneControllerProps) {
  const { camera, raycaster, scene } = useThree();
  const planeGeo = useMemo(() => new THREE.Plane(new THREE.Vector3(0, 0, 1), 0), []);

  // Update world pointer position via raycasting against interactive Z plane
  useFrame(() => {
    const ptr = pointerRef.current;
    if (ptr.active) {
      const ndc = new THREE.Vector2(ptr.x, ptr.y);
      raycaster.setFromCamera(ndc, camera);
      const hitPoint = new THREE.Vector3();
      raycaster.ray.intersectPlane(planeGeo, hitPoint);
      if (hitPoint) {
        ptr.worldPos.copy(hitPoint);
      }
    }
  });

  // Project Monoliths spatial coordinates in the Fidel architecture
  const projectPositions: [number, number, number][] = useMemo(
    () => [
      [-3.2, -0.6, -9],
      [3.2, -0.8, -14],
      [-3.0, -0.6, -19],
      [3.0, -0.8, -24],
    ],
    []
  );

  const projectRotations: [number, number, number][] = useMemo(
    () => [
      [0, 0.22, 0],
      [0, -0.22, 0],
      [0, 0.18, 0],
      [0, -0.18, 0],
    ],
    []
  );

  return (
    <>
      <CameraController
        scrollProgress={scrollProgress}
        activeProject={activeProject}
        tier={tier}
      />

      {/* Warm Golden Fog against Near-Black Obsidian */}
      <color attach="background" args={["#0a0908"]} />
      <fog attach="fog" args={["#0a0908", 4, 30]} />

      <ambientLight intensity={0.7} />
      <directionalLight position={[5, 10, 7]} intensity={0.8} color="#f5e6cc" />

      {/* 1. Volumetric Instanced Ge'ez Glyph Field (2,500 - 3,500 instances) */}
      <FidelInstancedField
        instanceCount={tier.instanceCount}
        pointerRef={pointerRef}
        assembleTarget={scrollProgress < 0.2 ? 1.0 : 0.0}
        locale={locale}
        isMobile={tier.isMobile}
      />

      {/* 2. Physical 3D Project Portals along the Spline Corridor */}
      {PROJECTS.slice(0, 4).map((project, idx) => (
        <ProjectPortal
          key={project.id}
          project={project}
          position={projectPositions[idx]}
          rotation={projectRotations[idx]}
          onSelect={(p) => onSelectProject(activeProject?.id === p.id ? null : p)}
          onHoverChange={(isHovered, pos) => {
            if (isHovered) {
              setHoveredProjectPos(pos);
            } else {
              setHoveredProjectPos(null);
            }
          }}
          isActive={activeProject?.id === project.id}
          locale={locale}
          isMobile={tier.isMobile}
        />
      ))}

      {/* 3. Cinematic Atmosphere: subtle gold vignette & manuscript grain */}
      {tier.enablePostProcessing && <CinematicAtmosphere enabled={true} />}
    </>
  );
}

export function FidelExperienceScene({
  scrollProgress,
  activeProject,
  onSelectProject,
  locale,
  tier,
}: {
  scrollProgress: number;
  activeProject: Project | null;
  onSelectProject: (p: Project | null) => void;
  locale: "en" | "am";
  tier: DeviceTier;
}) {
  const pointerRef = useRef({
    x: 0,
    y: 0,
    active: false,
    worldPos: new THREE.Vector3(0, 0, 0),
  });

  const [hoveredProjectPos, setHoveredProjectPos] = useState<THREE.Vector3 | null>(null);

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
    pointerRef.current.x = x;
    pointerRef.current.y = y;
    pointerRef.current.active = true;
  };

  const handlePointerLeave = () => {
    pointerRef.current.active = false;
  };

  return (
    <div
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      className="fixed inset-0 w-full h-full pointer-events-auto z-0"
      aria-label="3D Fidel Architectural Experience Canvas"
    >
      <Canvas
        camera={{ position: [0, 0, 7.5], fov: 46 }}
        dpr={[1, Math.min(2, typeof window !== "undefined" ? window.devicePixelRatio : 1.5)]}
        gl={{
          antialias: true,
          alpha: false,
          powerPreference: "high-performance",
        }}
      >
        <ExperienceWorld
          scrollProgress={scrollProgress}
          activeProject={activeProject}
          onSelectProject={onSelectProject}
          hoveredProjectPos={hoveredProjectPos}
          setHoveredProjectPos={setHoveredProjectPos}
          pointerRef={pointerRef}
          locale={locale}
          tier={tier}
        />
      </Canvas>
    </div>
  );
}
