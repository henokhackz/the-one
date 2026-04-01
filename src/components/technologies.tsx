'use client'

import React, { useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float, OrbitControls, Sphere, MeshDistortMaterial, Stars } from '@react-three/drei'
import { DiVisualstudio } from 'react-icons/di'
import { FaReact, FaNodeJs, FaJava, FaGitAlt, FaGithub, FaBootstrap, FaAws } from 'react-icons/fa'
import { MdJavascript } from 'react-icons/md'
import {
  SiTypescript, SiTailwindcss, SiVercel, SiPostman, SiMongodb, SiPostgresql,
  SiPrisma, SiNextdotjs, SiFigma, SiPython, SiExpress
} from 'react-icons/si'
import { motion, AnimatePresence } from 'motion/react'
import * as THREE from 'three'

const stackCategories = [
  {
    id: 'frontend',
    title: 'Frontend & UI',
    desc: 'I enjoy creating interfaces that feel extremely fast, look beautiful, and are easy for anyone to use. My goal is to make sure your users have a fantastic experience from the moment they land on your page.',
    items: [
      { name: 'React', icon: <FaReact size={24} /> },
      { name: 'Next.js', icon: <SiNextdotjs size={24} /> },
      { name: 'TypeScript', icon: <SiTypescript size={24} /> },
      { name: 'JavaScript', icon: <MdJavascript size={28} /> },
      { name: 'Tailwind CSS', icon: <SiTailwindcss size={24} /> },
      { name: 'Figma', icon: <SiFigma size={24} /> },
    ]
  },
  {
    id: 'backend',
    title: 'Backend & Data',
    desc: 'I build solid systems securely behind the scenes. From designing databases that grow rapidly with your business to writing secure logic, I make sure the technical foundation is incredibly reliable.',
    items: [
      { name: 'Node.js', icon: <FaNodeJs size={24} /> },
      { name: 'Express.js', icon: <SiExpress size={24} /> },
      { name: 'PostgreSQL', icon: <SiPostgresql size={24} /> },
      { name: 'MongoDB', icon: <SiMongodb size={24} /> },
      { name: 'Prisma', icon: <SiPrisma size={24} /> },
      { name: 'Python', icon: <SiPython size={24} /> },
      { name: 'Java', icon: <FaJava size={24} /> },
    ]
  },
  {
    id: 'workflow',
    title: 'Cloud & Workflow',
    desc: 'I focus on clear communication and smooth delivery. Using tools that keep remote work organized, I make sure we stay connected and that bringing our code to production is safe and completely stress free.',
    items: [
      { name: 'AWS', icon: <FaAws size={24} /> },
      { name: 'Vercel', icon: <SiVercel size={24} /> },
      { name: 'Git', icon: <FaGitAlt size={24} /> },
      { name: 'GitHub', icon: <FaGithub size={24} /> },
      { name: 'Postman', icon: <SiPostman size={24} /> },
      { name: 'VS Code', icon: <DiVisualstudio size={24} /> },
    ]
  }
]

// Animated 3D element representing a "Global Tech Core"
const AbstractCore = ({ activeTab }: { activeTab: string }) => {
  const meshRef = useRef<THREE.Mesh>(null)
  const groupRef = useRef<THREE.Group>(null)

  // Map tabs to colors (Green / Emerald / White theme)
  const colors = {
    frontend: '#10b981', // emerald-500
    backend: '#22c55e',  // green-500
    workflow: '#ffffff'  // white
  }
  const targetColor = new THREE.Color(colors[activeTab as keyof typeof colors] || '#10b981')
  const materialRef = useRef<any>(null)

  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.2
      groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.5) * 0.2
    }
    if (meshRef.current) {
      meshRef.current.rotation.y -= delta * 0.1
      meshRef.current.rotation.z += delta * 0.1
    }
    if (materialRef.current) {
      materialRef.current.color.lerp(targetColor, 0.05)
    }
  })

  return (
    <group ref={groupRef}>
      <Float speed={2} rotationIntensity={1} floatIntensity={1.5}>
        <mesh ref={meshRef}>
          <icosahedronGeometry args={[2, 0]} />
          <meshStandardMaterial ref={materialRef} wireframe />
        </mesh>
        
        <Sphere args={[1.2, 32, 32]}>
          <MeshDistortMaterial
            color="#050505"
            envMapIntensity={1}
            clearcoat={1}
            clearcoatRoughness={0}
            metalness={0.9}
            roughness={0.1}
            distort={0.3}
            speed={3}
          />
        </Sphere>
      </Float>
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      <pointLight position={[-10, 0, -10]} intensity={2} color="#ffffff" />
    </group>
  )
}

const Technologies = () => {
  const [activeTab, setActiveTab] = useState(stackCategories[0].id)

  return (
    <section className="w-full relative py-20 bg-black overflow-hidden flex items-center min-h-[80vh]">
      {/* Background ambient glow - Subdued green */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-green-900/10 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto relative z-10 px-6 w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        
        {/* Left Side: Copy & Tech Stack */}
        <div className="flex flex-col space-y-8">
          <div className="space-y-4">
            <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight uppercase drop-shadow-lg">
              Engineered for <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-green-500">Delivery.</span>
              <br />
              Built for <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-200">Scale.</span>
            </h2>
            <p className="text-white/70 text-lg md:text-xl max-w-lg leading-relaxed">
              I bring a reliable and proven selection of tools to every project. Whether I am quickly building a prototype for a freelance client or delivering robust features within a remote team, I focus on what works best to get the job done right.
            </p>
          </div>

          <div className="flex flex-col space-y-6">
            <div className="flex flex-wrap gap-3">
              {stackCategories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setActiveTab(category.id)}
                  className={`px-6 py-3 rounded-xl text-sm font-bold uppercase tracking-widest transition-all duration-300 backdrop-blur-md ${
                    activeTab === category.id 
                      ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/50 shadow-[0_0_20px_rgba(16,185,129,0.15)]' 
                      : 'bg-white/5 text-white/50 border border-white/5 hover:border-white/10 hover:text-white/80'
                  }`}
                >
                  {category.title}
                </button>
              ))}
            </div>

            <div className="relative min-h-[260px] md:min-h-[220px]">
              <AnimatePresence mode="wait">
                {stackCategories.map((category) => (
                  activeTab === category.id && (
                    <motion.div
                      key={category.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.3 }}
                      className="absolute inset-0 flex flex-col space-y-6"
                    >
                      <p className="text-white/60 text-sm leading-relaxed max-w-md font-medium">
                        {category.desc}
                      </p>
                      
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                        {category.items.map((tech, idx) => (
                          <div 
                            key={idx}
                            className="flex items-center gap-3 p-3 rounded-xl bg-black/40 backdrop-blur-md border border-white/10 hover:bg-emerald-500/10 hover:border-emerald-500/30 hover:shadow-[0_0_15px_rgba(16,185,129,0.1)] transition-all duration-300 group cursor-pointer"
                          >
                            <div className="text-white/50 group-hover:text-emerald-400 transition-colors duration-300 group-hover:scale-110 transform">
                              {tech.icon}
                            </div>
                            <span className="text-sm font-bold text-white/60 group-hover:text-white transition-colors">
                              {tech.name}
                            </span>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )
                ))}
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Right Side: 3D Visualization */}
        <div className="h-[400px] lg:h-[600px] w-full relative rounded-3xl overflow-hidden bg-black/40 backdrop-blur-xl border border-white/10 shadow-[0_0_40px_rgba(0,0,0,0.8)] group">
          <div className="absolute top-6 right-6 z-10 text-[10px] font-mono text-emerald-500/50 tracking-widest uppercase transition-colors group-hover:text-emerald-400">
            // Interactive 3D Node
          </div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(16,185,129,0.03)_1px,transparent_1px)] bg-[size:24px_24px]" />
          
          <Canvas camera={{ position: [0, 0, 6], fov: 45 }}>
            <Stars radius={50} depth={50} count={1500} factor={4} saturation={0} fade speed={1} />
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
  )
}

export default Technologies
