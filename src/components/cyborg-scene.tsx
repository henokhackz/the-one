"use client";

import React, { useRef, Suspense, useState, useMemo, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  PerspectiveCamera,
  useGLTF,
  OrbitControls,
  useProgress,
  Html,
  Environment,
  Center,
  ContactShadows,
  MeshReflectorMaterial,
  Float,
} from "@react-three/drei";
import * as THREE from "three";

function Loader() {
  const { progress } = useProgress();
  return (
    <Html center>
      <div className="flex flex-col items-center justify-center min-w-max">
        <div className="w-64 h-[2px] bg-white/5 rounded-full overflow-hidden backdrop-blur-sm border border-white/5">
          <div
            className="h-full bg-gradient-to-r from-blue-500 via-white to-blue-500 transition-all duration-500 ease-out shadow-[0_0_15px_rgba(255,255,255,0.5)]"
            style={{ width: `${progress}%`, backgroundSize: "200% 100%" }}
          />
        </div>
        <div className="mt-4 flex flex-col items-center gap-1">
          <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-white/50">
            Initializing Neural Link
          </span>
          <span className="text-[10px] font-mono font-bold text-white tracking-widest">
            {Math.round(progress)}%
          </span>
        </div>
      </div>
    </Html>
  );
}

function Model({
  zoomed,
  setZoomed,
}: {
  zoomed: boolean;
  setZoomed: (v: boolean) => void;
}) {
  const { scene } = useGLTF("/assets/scene.gltf");
  const group = useRef<THREE.Group>(null!);

  useEffect(() => {
    scene.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        if (mesh.material) {
          const mat = mesh.material as THREE.MeshStandardMaterial;
          mat.envMapIntensity = 2.5;
          mat.metalness = 1;
          mat.roughness = 0.1;
        }
      }
    });
  }, [scene]);

  const targetScale = zoomed ? 1.8 : 1.5;

  useFrame((_state, delta) => {
    if (group.current) {
      // Remove all floating and rotation animations for a clean professional look
      group.current.scale.setScalar(
        THREE.MathUtils.lerp(group.current.scale.x, targetScale, delta * 4),
      );
    }
  });

  return (
    <Center top>
      <primitive
        ref={group}
        object={scene}
        onClick={(e: any) => {
          e.stopPropagation();
          setZoomed(!zoomed);
        }}
        onPointerOver={() => (document.body.style.cursor = "pointer")}
        onPointerOut={() => (document.body.style.cursor = "auto")}
      />
    </Center>
  );
}

function TechMarkers() {
  const techs = useMemo(
    () => [
      // Head / Neck area
      { name: "Next.js", pos: [0.35, 1.8, 0.1], color: "#ffffff" },
      { name: "TypeScript", pos: [-0.4, 1.7, 0.2], color: "#3178c6" },
      { name: "JavaScript", pos: [0.1, 1.95, -0.1], color: "#f7df1e" },

      // Chest / Upper Torso
      { name: "React", pos: [0, 1.4, 0.45], color: "#61dafb" },
      { name: "Tailwind", pos: [0.55, 1.3, 0.3], color: "#06b6d4" },
      { name: "Node.js", pos: [-0.6, 1.35, 0.25], color: "#339933" },

      // Mid Torso / Arms
      { name: "PostgreSQL", pos: [0.65, 0.9, 0.4], color: "#336791" },
      { name: "Prisma", pos: [-0.6, 0.8, 0.4], color: "#5a67d8" },
      { name: "Python", pos: [0.75, 0.6, 0.2], color: "#3776ab" },
      { name: "MongoDB", pos: [-0.7, 0.5, 0.25], color: "#47a248" },

      // Waste / Hips
      { name: "AWS", pos: [0.4, 0.2, 0.5], color: "#ff9900" },
      { name: "Docker", pos: [-0.45, 0.1, 0.5], color: "#2496ed" },
      { name: "GitHub", pos: [0.6, -0.2, 0.35], color: "#ffffff" },

      // Legs
      { name: "Express", pos: [0.4, -0.6, 0.4], color: "#ffffff" },
      { name: "Git", pos: [-0.4, -0.7, 0.4], color: "#f1502f" },
      { name: "Vercel", pos: [0.3, -1.1, 0.5], color: "#ffffff" },
      { name: "Figma", pos: [-0.3, -1.2, 0.5], color: "#f24e1e" },

      // Sides / Back
      { name: "Three.js", pos: [0.5, 1.1, -0.3], color: "#ffffff" },
      { name: "Postman", pos: [-0.5, 0.7, -0.3], color: "#ff6c37" },
      { name: "C++", pos: [0, 2.1, 0], color: "#00599c" },
    ],
    [],
  );

  return (
    <group>
      {techs.map((tech, i) => (
        <Float key={i} speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
          <Html
            position={new THREE.Vector3(...tech.pos)}
            center
            distanceFactor={3.5}
            // Use occlude to show items only when they aren't hidden by the body
            occlude
          >
            <div className="flex items-center gap-2 px-2.5 py-1  backdrop-blur-md border border-white/10 rounded-full whitespace-nowrap active:scale-95 transition-all duration-300 group cursor-pointer hover:border-white/40 hover:bg-black/60 shadow-[0_0_15px_rgba(0,0,0,0.3)]">
              <div
                className="w-1.5 h-1.5 rounded-full animate-pulse shadow-[0_0_8px_currentColor]"
                style={{ backgroundColor: tech.color, color: tech.color }}
              />
              <span className="text-[8px] font-mono text-white/80 tracking-[0.2em] uppercase font-bold group-hover:text-white transition-colors">
                {tech.name}
              </span>
            </div>
          </Html>
        </Float>
      ))}
    </group>
  );
}

function SceneContent() {
  const [zoomed, setZoomed] = useState(false);

  return (
    <>
      {/* Zoomed in camera for better detail */}
      <PerspectiveCamera makeDefault position={[0, 1.2, 4.5]} fov={35} />
      <Environment preset="city" />
      <ambientLight intensity={0.15} />
      {/* Dramatic Studio Lighting */}
      <spotLight
        position={[0, 10, 5]}
        angle={0.15}
        penumbra={1}
        intensity={800}
        color="#ffffff"
        castShadow
        shadow-bias={-0.00001}
      />
      {/* Sharp side highlights */}
      <pointLight position={[5, 2, 2]} intensity={80} color="#3b82f6" />
      <pointLight position={[-5, 2, 2]} intensity={60} color="#ffffff" />
      <pointLight position={[0, 2, -5]} intensity={40} color="#ffffff" />{" "}
      {/* Back light for depth */}
      <Suspense fallback={<Loader />}>
        <group position={[0, -1.2, 0]}>
          <Model zoomed={zoomed} setZoomed={setZoomed} />
          <TechMarkers />

          <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
            <planeGeometry args={[30, 30]} />
            <MeshReflectorMaterial
              blur={[400, 100]}
              resolution={1024}
              mixBlur={1}
              mixStrength={40}
              roughness={1}
              depthScale={1}
              minDepthThreshold={0.4}
              maxDepthThreshold={1.4}
              color="#030712"
              metalness={0.5}
              mirror={0.9}
            />
          </mesh>
        </group>

        <ContactShadows
          position={[0, -1.2, 0]}
          opacity={0.8}
          scale={15}
          blur={2}
          far={4}
        />
      </Suspense>
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        enableDamping={true}
        dampingFactor={0.05}
        rotateSpeed={0.5}
        minPolarAngle={Math.PI / 2}
        maxPolarAngle={Math.PI / 2}
        makeDefault
      />
      <fog attach="fog" args={["#030712", 5, 15]} />
    </>
  );
}

export function CyborgScene() {
  return (
    <div className="absolute inset-0 w-full h-full z-0 overflow-hidden pointer-events-none">
      <Canvas
        shadows
        dpr={[1, 2]}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
          toneMapping: THREE.ACESFilmicToneMapping,
          outputColorSpace: THREE.SRGBColorSpace,
        }}
        className="w-full h-full pointer-events-auto"
      >
        <SceneContent />
      </Canvas>
    </div>
  );
}

useGLTF.preload("/assets/scene.gltf");
