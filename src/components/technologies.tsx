"use client";

import React, { useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Stars } from "@react-three/drei";
import { DiVisualstudio } from "react-icons/di";
import {
  FaReact,
  FaNodeJs,
  FaJava,
  FaGitAlt,
  FaGithub,
  FaBootstrap,
  FaAws,
} from "react-icons/fa";
import { MdJavascript } from "react-icons/md";
import {
  SiTypescript,
  SiTailwindcss,
  SiVercel,
  SiPostman,
  SiMongodb,
  SiPostgresql,
  SiPrisma,
  SiNextdotjs,
  SiFigma,
  SiPython,
  SiExpress,
} from "react-icons/si";
import { motion, AnimatePresence } from "motion/react";
import * as THREE from "three";

const stackCategories = [
  {
    id: "frontend",
    title: "Frontend & UI",
    desc: "I enjoy creating interfaces that feel extremely fast, look beautiful, and are easy for anyone to use. My goal is to make sure your users have a fantastic experience from the moment they land on your page.",
    items: [
      { name: "React", icon: <FaReact size={24} /> },
      { name: "Next.js", icon: <SiNextdotjs size={24} /> },
      { name: "TypeScript", icon: <SiTypescript size={24} /> },
      { name: "JavaScript", icon: <MdJavascript size={28} /> },
      { name: "Tailwind CSS", icon: <SiTailwindcss size={24} /> },
      { name: "Figma", icon: <SiFigma size={24} /> },
    ],
  },
  {
    id: "backend",
    title: "Backend & Data",
    desc: "I build solid systems securely behind the scenes. From designing databases that grow rapidly with your business to writing secure logic, I make sure the technical foundation is incredibly reliable.",
    items: [
      { name: "Node.js", icon: <FaNodeJs size={24} /> },
      { name: "Express.js", icon: <SiExpress size={24} /> },
      { name: "PostgreSQL", icon: <SiPostgresql size={24} /> },
      { name: "MongoDB", icon: <SiMongodb size={24} /> },
      { name: "Prisma", icon: <SiPrisma size={24} /> },
      { name: "Python", icon: <SiPython size={24} /> },
      { name: "Java", icon: <FaJava size={24} /> },
    ],
  },
  {
    id: "workflow",
    title: "Cloud & Workflow",
    desc: "I focus on clear communication and smooth delivery. Using tools that keep remote work organized, I make sure we stay connected and that bringing our code to production is safe and completely stress free.",
    items: [
      { name: "AWS", icon: <FaAws size={24} /> },
      { name: "Vercel", icon: <SiVercel size={24} /> },
      { name: "Git", icon: <FaGitAlt size={24} /> },
      { name: "GitHub", icon: <FaGithub size={24} /> },
      { name: "Postman", icon: <SiPostman size={24} /> },
      { name: "VS Code", icon: <DiVisualstudio size={24} /> },
    ],
  },
];

// Animated 3D Globe
const AbstractCore = ({ activeTab }: { activeTab: string }) => {
  const globeRef = useRef<THREE.Mesh>(null);
  const linesGroupRef = useRef<THREE.Group>(null);

  // Map tabs to globe glow/line colors
  const colors = {
    frontend: "#f59e0b",
    backend: "#fbbf24",
    workflow: "#e5e7eb",
  };
  const lineColor = colors[activeTab as keyof typeof colors] || "#f59e0b";

  useFrame((state, delta) => {
    if (globeRef.current) {
      globeRef.current.rotation.y += delta * 0.12;
    }
    if (linesGroupRef.current) {
      linesGroupRef.current.rotation.y += delta * 0.12;
    }
  });

  // Build lat/lon lines geometry
  const latLines = React.useMemo(() => {
    const groups: JSX.Element[] = [];
    const radius = 2.01;
    const latCount = 10;
    const lonCount = 16;

    // Latitude circles
    for (let i = 1; i < latCount; i++) {
      const phi = (Math.PI * i) / latCount;
      const r = radius * Math.sin(phi);
      const y = radius * Math.cos(phi);
      const pts: THREE.Vector3[] = [];
      for (let j = 0; j <= 64; j++) {
        const theta = (2 * Math.PI * j) / 64;
        pts.push(
          new THREE.Vector3(r * Math.cos(theta), y, r * Math.sin(theta)),
        );
      }
      const geo = new THREE.BufferGeometry().setFromPoints(pts);
      groups.push(
        <line key={`lat-${i}`} geometry={geo}>
          <lineBasicMaterial color={lineColor} opacity={0.35} transparent />
        </line>,
      );
    }

    // Longitude lines
    for (let j = 0; j < lonCount; j++) {
      const theta = (2 * Math.PI * j) / lonCount;
      const pts: THREE.Vector3[] = [];
      for (let i = 0; i <= 48; i++) {
        const phi = (Math.PI * i) / 48;
        pts.push(
          new THREE.Vector3(
            radius * Math.sin(phi) * Math.cos(theta),
            radius * Math.cos(phi),
            radius * Math.sin(phi) * Math.sin(theta),
          ),
        );
      }
      const geo = new THREE.BufferGeometry().setFromPoints(pts);
      groups.push(
        <line key={`lon-${j}`} geometry={geo}>
          <lineBasicMaterial color={lineColor} opacity={0.35} transparent />
        </line>,
      );
    }

    return groups;
  }, [lineColor]);

  return (
    <>
      {/* Sun-like directional light from above */}
      <directionalLight
        position={[0, 10, 3]}
        intensity={4.5}
        color="#fffbea"
        castShadow
      />
      {/* Soft warm fill to reveal lit hemisphere */}
      <pointLight position={[4, 4, 6]} intensity={1.2} color="#fde68a" />
      {/* Rim light from below-back for depth */}
      <pointLight position={[-3, -6, -3]} intensity={0.4} color="#7dd3fc" />
      {/* Enough ambient so dark side has shape */}
      <ambientLight intensity={0.25} />

      {/* Globe sphere */}
      <mesh ref={globeRef}>
        <sphereGeometry args={[2, 128, 128]} />
        <meshStandardMaterial
          color="#1e3a5f"
          roughness={0.25}
          metalness={0.85}
          envMapIntensity={1.2}
        />
      </mesh>

      {/* Lat / lon wireframe overlay — rotates with globe */}
      <group ref={linesGroupRef}>{latLines}</group>

      {/* Subtle outer glow halo */}
      <mesh>
        <sphereGeometry args={[2.18, 64, 64]} />
        <meshBasicMaterial
          color={lineColor}
          transparent
          opacity={0.12}
          side={THREE.BackSide}
        />
      </mesh>
    </>
  );
};

const Technologies = () => {
  const [activeTab, setActiveTab] = useState(stackCategories[0].id);

  return (
    <section className="w-full relative  bg-black overflow-hidden flex items-center min-h-[80vh]">
      <div className=" px-16 mx-auto relative z-10 px-6 w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Left Side: Copy & Tech Stack */}
        <div className="flex flex-col space-y-4">
          <div>
            <p className="text-xl md:text-2xl font-bold text-white/50 tracking-wide mb-8">
              (TECHNOLOGIES)
            </p>
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-white tracking-tighter uppercase drop-shadow-lg leading-none">
              ENGINEERED FOR <span className="text-yellow-400">DELIVERY.</span>
              <br />
              <span className="mt-2 block">
                BUILT FOR <span className="text-white">SCALE.</span>
              </span>
            </h2>
            <p className="text-white/60 text-base md:text-lg max-w-xl leading-relaxed mt-8 font-light">
              I bring a reliable and proven selection of tools to every project.
              Whether I am quickly building a prototype for a freelance client
              or delivering robust features within a remote team, I focus on
              what works best to get the job done right.
            </p>
          </div>

          <div className="flex flex-col space-y-8">
            <div className="flex flex-wrap gap-3">
              {stackCategories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setActiveTab(category.id)}
                  className={`px-5 md:px-6 py-3 rounded-md text-xs md:text-sm font-bold uppercase tracking-widest transition-all duration-300 backdrop-blur-md ${
                    activeTab === category.id
                      ? "bg-[#f59e0b]/10 text-[#f59e0b] border border-[#f59e0b]/50 shadow-[0_0_20px_rgba(245,158,11,0.15)]"
                      : "bg-white/5 text-white/50 border border-white/5 hover:border-white/20 hover:text-white/80"
                  }`}
                >
                  {category.title}
                </button>
              ))}
            </div>

            <div className="relative min-h-[300px] md:min-h-[260px]">
              <AnimatePresence mode="wait">
                {stackCategories.map(
                  (category) =>
                    activeTab === category.id && (
                      <motion.div
                        key={category.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.3 }}
                        className="absolute inset-0 flex flex-col space-y-8"
                      >
                        <p className="text-[#a1a1aa] text-sm md:text-base leading-relaxed max-w-md font-light">
                          {category.desc}
                        </p>

                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                          {category.items.map((tech, idx) => (
                            <div
                              key={idx}
                              className="flex items-center gap-3 p-4 rounded-xl bg-white/5 backdrop-blur-md border border-white/10 hover:bg-[#f59e0b]/10 hover:border-[#f59e0b]/30 hover:shadow-[0_0_20px_rgba(245,158,11,0.1)] transition-all duration-300 group cursor-pointer"
                            >
                              <div className="text-white/40 group-hover:text-[#f59e0b] transition-colors duration-300 group-hover:scale-110 transform">
                                {tech.icon}
                              </div>
                              <span className="text-sm font-bold tracking-wide text-white/60 group-hover:text-white transition-colors">
                                {tech.name}
                              </span>
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    ),
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Right Side: 3D Globe */}
        <div className="h-[500px] lg:h-[600px] w-full relative rounded-3xl overflow-hidden bg-[#050505] shadow-[0_0_60px_rgba(0,0,0,0.9)] group">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(245,158,11,0.03)_1px,transparent_1px)] bg-[size:24px_24px]" />
          <Canvas camera={{ position: [0, 0, 6], fov: 45 }}>
            <Stars
              radius={50}
              depth={50}
              count={1500}
              factor={4}
              saturation={0}
              fade
              speed={1}
            />
            <OrbitControls
              enableZoom={false}
              enablePan={false}
              autoRotate
              autoRotateSpeed={0.8}
            />
            <AbstractCore activeTab={activeTab} />
          </Canvas>

          <div className="absolute inset-0 pointer-events-none rounded-3xl shadow-[inset_0_0_80px_rgba(0,0,0,0.9)]" />
        </div>
      </div>
    </section>
  );
};

export default Technologies;
