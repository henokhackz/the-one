'use client'

import React, { useRef, Suspense, useMemo, useEffect, useState, useCallback } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import {
  PerspectiveCamera,
  useProgress,
  Html,
  Environment,
  useTexture,
  RoundedBox,
} from '@react-three/drei'
import * as THREE from 'three'

// ─── Loader ────────────────────────────────────────────────────────────────────

function Loader({ onFinished }: { onFinished: () => void }) {
  const { progress } = useProgress()

  useEffect(() => {
    if (progress === 100) {
      const timer = setTimeout(onFinished, 100)
      return () => clearTimeout(timer)
    }
  }, [progress, onFinished])

  return (
    <Html center>
      <div className="flex flex-col items-center justify-center min-w-[200px]">
        <div className="text-[9px] font-mono text-emerald-500 uppercase tracking-widest mb-2">Initializing</div>
        <div className="w-32 h-[1px] bg-emerald-500/10 relative">
          <div
            className="absolute top-0 left-0 h-full bg-emerald-500 transition-all duration-300 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </Html>
  )
}

// ─── Ambient Particles ─────────────────────────────────────────────────────────

function ParticleField() {
  const pointsRef = useRef<THREE.Points>(null!)
  const count = 400

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      pos[i * 3]     = (Math.random() - 0.5) * 40
      pos[i * 3 + 1] = (Math.random() - 0.5) * 40
      pos[i * 3 + 2] = (Math.random() - 0.5) * 20 - 5
    }
    return pos
  }, [])

  return (
    <points ref={pointsRef} frustumCulled={false}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        transparent
        color="#10b981"
        size={0.04}
        sizeAttenuation={true}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        opacity={0.25}
      />
    </points>
  )
}

// ─── Two-Sided Card ────────────────────────────────────────────────────────────
// Front: profile photo | Back: pitch text (HTML overlay)
// No auto-rotation. Drag to rotate. Stays put when released.

interface CardProps {
  rotationY: React.MutableRefObject<number>
  isDragging: React.MutableRefObject<boolean>
}

function ProfileCard({ rotationY, isDragging }: CardProps) {
  const meshRef = useRef<THREE.Group>(null!)
  const texture = useTexture('/profile.jpg')

  // Current smoothed rotation
  const currentY = useRef(0)
  const currentX = useRef(0)

  // Front face material (profile photo)
  const frontMat = useMemo(() => new THREE.MeshStandardMaterial({
    map: texture,
    metalness: 0.2,
    roughness: 0.5,
    side: THREE.FrontSide,
  }), [texture])

  // Back face material (deep dark for HTML overlay)
  const backMat = useMemo(() => new THREE.MeshStandardMaterial({
    color: '#050f0a',
    metalness: 0.4,
    roughness: 0.3,
    side: THREE.BackSide,
  }), [])

  // Edge / rim material
  const edgeMat = useMemo(() => new THREE.MeshStandardMaterial({
    color: '#059669',
    metalness: 0.9,
    roughness: 0.1,
  }), [])

  useFrame((_, delta) => {
    if (!meshRef.current) return
    // Smooth lerp toward target rotation (no auto-spin)
    const speed = isDragging.current ? 0.18 : 0.06
    currentY.current = THREE.MathUtils.lerp(currentY.current, rotationY.current, speed)
    meshRef.current.rotation.y = currentY.current
    meshRef.current.rotation.x = THREE.MathUtils.lerp(meshRef.current.rotation.x, 0, 0.04)
  })

  // Determine if we're showing the back (flipped past 90 degrees)  
  // We'll render both sides and let Three.js handle it via geometry

  return (
    <group ref={meshRef} position={[0, 0, 0]}>
      {/* Card body — front face */}
      <mesh material={frontMat}>
        <planeGeometry args={[3.2, 4.2]} />
      </mesh>

      {/* Card body — back face (rotated 180°) */}
      <mesh rotation={[0, Math.PI, 0]} material={backMat}>
        <planeGeometry args={[3.2, 4.2]} />
      </mesh>

      {/* Thin edge / depth illusion */}
      <mesh material={edgeMat}>
        <boxGeometry args={[3.22, 4.22, 0.06]} />
      </mesh>

      {/* Back overlay text — only visible when flipped */}
      <mesh rotation={[0, Math.PI, 0]} position={[0, 0, 0.04]}>
        <planeGeometry args={[3.2, 4.2]} />
        <meshBasicMaterial transparent opacity={0} />
      </mesh>

      {/* Glow rim around the card */}
      <mesh position={[0, 0, -0.04]}>
        <planeGeometry args={[3.35, 4.35]} />
        <meshBasicMaterial color="#059669" transparent opacity={0.12} side={THREE.DoubleSide} />
      </mesh>
    </group>
  )
}

// ─── Back-face HTML overlay ────────────────────────────────────────────────────
// Sits in world space behind the card, visible when card is rotated past 90°

interface BackTextProps {
  rotationY: React.MutableRefObject<number>
}

function BackTextOverlay({ rotationY }: BackTextProps) {
  const ref = useRef<THREE.Group>(null!)
  const [visible, setVisible] = useState(false)

  useFrame(() => {
    if (!ref.current) return
    // Show back overlay when flipped (sin of rotY < 0 means we're looking at the back)
    const y = rotationY.current % (Math.PI * 2)
    const normalized = ((y % (Math.PI * 2)) + Math.PI * 2) % (Math.PI * 2)
    const showBack = normalized > Math.PI * 0.5 && normalized < Math.PI * 1.5
    setVisible(showBack)
    ref.current.rotation.y = rotationY.current + Math.PI
  })

  return (
    <group ref={ref} position={[0, 0, 0.05]}>
      <Html
        center
        transform
        occlude={false}
        style={{ width: '260px', pointerEvents: 'none', opacity: visible ? 1 : 0, transition: 'opacity 0.2s' }}
      >
        <div style={{
          fontFamily: 'Inter, sans-serif',
          color: '#e2e8f0',
          padding: '20px',
          textAlign: 'center',
          lineHeight: 1.5,
        }}>
          <div style={{ fontSize: '9px', letterSpacing: '0.3em', color: '#10b981', textTransform: 'uppercase', marginBottom: '12px', fontWeight: 700 }}>
            Full Stack Engineer
          </div>
          <div style={{ fontSize: '15px', fontWeight: 800, color: '#ffffff', marginBottom: '10px', lineHeight: 1.3 }}>
            Built to ship.<br />Wired to scale.
          </div>
          <div style={{ fontSize: '10px', color: '#94a3b8', marginBottom: '16px', lineHeight: 1.6 }}>
            Next.js · Three.js · Node.js<br />
            PostgreSQL · TypeScript · AWS
          </div>
          <div style={{
            display: 'inline-block',
            padding: '6px 16px',
            border: '1px solid #10b981',
            fontSize: '9px',
            letterSpacing: '0.2em',
            color: '#10b981',
            textTransform: 'uppercase',
            fontWeight: 700,
          }}>
            Open to Remote
          </div>
        </div>
      </Html>
    </group>
  )
}

// ─── Scene ─────────────────────────────────────────────────────────────────────

function Scene({
  onLoaded,
  rotationY,
  isDragging,
}: {
  onLoaded: () => void
  rotationY: React.MutableRefObject<number>
  isDragging: React.MutableRefObject<boolean>
}) {
  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 0, 8]} fov={42} />
      <Environment preset="city" />
      <ambientLight intensity={0.5} />
      <pointLight position={[5, 5, 7]}  intensity={2.5} color="#10b981" />
      <pointLight position={[-5, -3, 5]} intensity={1.0} color="#34d399" />
      <pointLight position={[0, 6, -4]}  intensity={0.5} color="#ffffff" />

      <Suspense fallback={<Loader onFinished={onLoaded} />}>
        <ParticleField />
        <ProfileCard rotationY={rotationY} isDragging={isDragging} />
        <BackTextOverlay rotationY={rotationY} />
      </Suspense>
    </>
  )
}

// ─── HeroScene (exported) ──────────────────────────────────────────────────────

export function HeroScene({ onLoaded }: { onLoaded: () => void }) {
  const rotationY    = useRef(0)
  const isDragging   = useRef(false)
  const lastX        = useRef(0)
  const [grabbing, setGrabbing] = useState(false)

  const handlePointerDown = useCallback((e: React.PointerEvent) => {
    isDragging.current = true
    setGrabbing(true)
    lastX.current = e.clientX
    ;(e.currentTarget as HTMLElement).setPointerCapture(e.pointerId)
  }, [])

  const handlePointerMove = useCallback((e: React.PointerEvent) => {
    if (!isDragging.current) return
    const dx = (e.clientX - lastX.current) / window.innerWidth
    rotationY.current += dx * Math.PI * 4
    lastX.current = e.clientX
  }, [])

  const handlePointerUp = useCallback(() => {
    isDragging.current = false
    setGrabbing(false)
  }, [])

  return (
    <div className="absolute inset-0 w-full h-full z-0" style={{ pointerEvents: 'none' }}>
      {/* Canvas occupies only the RIGHT half on desktop */}
      <div
        className="absolute top-0 right-0 h-full"
        style={{
          width: '50%',
          pointerEvents: 'auto',
          cursor: grabbing ? 'grabbing' : 'grab',
        }}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerLeave={handlePointerUp}
        onPointerCancel={handlePointerUp}
      >
        <Canvas
          shadows
          dpr={[1, 2]}
          gl={{ antialias: true, alpha: true }}
          className="w-full h-full"
        >
          <Scene onLoaded={onLoaded} rotationY={rotationY} isDragging={isDragging} />
        </Canvas>

        {/* Drag hint */}
        <div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-2 pointer-events-none"
          style={{ opacity: grabbing ? 0 : 0.45, transition: 'opacity 0.3s' }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="1.5">
            <path d="M7 4v16M17 4v16M3 8l4-4 4 4M13 8l4-4 4 4M3 16l4 4 4-4M13 16l4 4 4-4" />
          </svg>
          <span style={{ fontSize: '9px', fontFamily: 'monospace', color: '#10b981', letterSpacing: '0.25em', textTransform: 'uppercase' }}>
            Drag to flip
          </span>
        </div>
      </div>
    </div>
  )
}
