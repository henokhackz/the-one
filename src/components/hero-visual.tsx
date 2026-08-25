"use client";

import { useCallback, useMemo, useRef, useState } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useReducedMotion,
} from "motion/react";

interface TechNode {
  id: string;
  label: string;
  x: number;
  y: number;
  w: number;
  delay: number;
}

const CENTER = { x: 300, y: 300 };

const TECH_NODES: TechNode[] = [
  { id: "nextjs", label: "NEXT.JS", x: 135, y: 112, w: 96, delay: 0.2 },
  { id: "react", label: "REACT", x: 478, y: 128, w: 82, delay: 0.4 },
  { id: "typescript", label: "TYPESCRIPT", x: 82, y: 322, w: 118, delay: 0.6 },
  { id: "javascript", label: "JAVASCRIPT", x: 486, y: 342, w: 112, delay: 0.8 },
  { id: "html", label: "HTML", x: 188, y: 502, w: 70, delay: 1.0 },
  { id: "tailwind", label: "TAILWIND", x: 300, y: 522, w: 96, delay: 1.2 },
  { id: "css", label: "CSS", x: 436, y: 496, w: 62, delay: 1.4 },
];

/** Builds a 45° PCB-style trace from one point to another */
function buildTrace(
  from: { x: number; y: number },
  to: { x: number; y: number },
) {
  const dx = to.x - from.x;
  const dy = to.y - from.y;
  const diag = Math.min(Math.abs(dx), Math.abs(dy));
  const cornerX = from.x + Math.sign(dx) * diag;
  const cornerY = from.y + Math.sign(dy) * diag;
  return `M ${from.x} ${from.y} L ${cornerX} ${cornerY} L ${to.x} ${to.y}`;
}

/** Samples a point along a 2-3 segment polyline path at t (0..1) */
function samplePath(path: string, t: number) {
  const nums = path.match(/-?\d+(\.\d+)?/g)?.map(Number) ?? [];
  const pts: { x: number; y: number }[] = [];
  for (let i = 0; i + 1 < nums.length; i += 2)
    pts.push({ x: nums[i], y: nums[i + 1] });
  if (pts.length < 2) return { x: 0, y: 0 };

  const segLens: number[] = [];
  let total = 0;
  for (let i = 0; i < pts.length - 1; i++) {
    const len = Math.hypot(pts[i + 1].x - pts[i].x, pts[i + 1].y - pts[i].y);
    segLens.push(len);
    total += len;
  }

  let d = t * total;
  for (let i = 0; i < segLens.length; i++) {
    if (d <= segLens[i] || i === segLens.length - 1) {
      const segT = segLens[i] === 0 ? 0 : d / segLens[i];
      return {
        x: pts[i].x + (pts[i + 1].x - pts[i].x) * segT,
        y: pts[i].y + (pts[i + 1].y - pts[i].y) * segT,
      };
    }
    d -= segLens[i];
  }
  return pts[pts.length - 1];
}

// Subtle PCB texture — short routed stubs
const DECOR_TRACES = [
  "M 76 56 L 110 56 L 122 44",
  "M 524 44 L 524 78 L 536 90",
  "M 124 556 L 110 556 L 98 544",
  "M 544 548 L 520 548 L 508 536",
];

// Plated through-hole vias
const VIAS = [
  { x: 168, y: 60 },
  { x: 436, y: 60 },
  { x: 56, y: 420 },
  { x: 544, y: 300 },
  { x: 240, y: 556 },
  { x: 390, y: 556 },
];

const CHIP_PINS_X = [-60, -36, -12, 12, 36, 60];
const CHIP_PINS_Y = [-44, -22, 0, 22, 44];

interface TechNodeChipProps {
  node: TechNode;
  onHoverChange: (id: string, active: boolean) => void;
  reducedMotion: boolean | null;
}

function TechNodeChip({
  node,
  onHoverChange,
  reducedMotion,
}: TechNodeChipProps) {
  const [active, setActive] = useState(false);
  const nodeRef = useRef<SVGGElement>(null);

  // Directional hover offset — moves toward cursor, max ±6px
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 180, damping: 22 });
  const sy = useSpring(my, { stiffness: 180, damping: 22 });
  const ox = useTransform(sx, (v) => v * 12);
  const oy = useTransform(sy, (v) => v * 12);

  const handleMove = (e: React.MouseEvent) => {
    if (reducedMotion) return;
    const rect = nodeRef.current?.getBoundingClientRect();
    if (!rect) return;
    mx.set((e.clientX - rect.left) / rect.width - 0.5);
    my.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const startX = node.x - node.w / 2;

  return (
    <motion.g
      ref={nodeRef}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: node.delay + 0.6 }}
      onMouseMove={handleMove}
      onHoverStart={() => {
        setActive(true);
        onHoverChange(node.id, true);
      }}
      onHoverEnd={() => {
        setActive(false);
        onHoverChange(node.id, false);
      }}
      style={reducedMotion ? undefined : { x: ox, y: oy }}
      className="cursor-pointer"
    >
      <title>{node.label}</title>
      {/* chip body — transparent, stroke only */}
      <rect
        x={startX}
        y={node.y - 14}
        width={node.w}
        height={28}
        rx={5}
        fill={active ? "rgba(245,158,11,0.1)" : "transparent"}
        stroke={active ? "rgba(245,158,11,0.95)" : "rgba(245,158,11,0.6)"}
        strokeWidth={active ? 1.4 : 1}
      />
      {/* pin stubs */}
      <line
        x1={startX + 4}
        y1={node.y - 7}
        x2={startX}
        y2={node.y - 7}
        stroke="rgba(245,158,11,0.45)"
        strokeWidth="1"
      />
      <line
        x1={startX + 4}
        y1={node.y + 7}
        x2={startX}
        y2={node.y + 7}
        stroke="rgba(245,158,11,0.45)"
        strokeWidth="1"
      />
      {/* LED — subtle ambient glow */}
      <motion.circle
        cx={startX + 14}
        cy={node.y}
        r={2}
        fill="#f59e0b"
        animate={reducedMotion ? undefined : { opacity: [0.3, 0.7, 0.3] }}
        transition={{
          duration: 2.6,
          repeat: Infinity,
          ease: "easeInOut",
          delay: node.delay,
        }}
      />
      {/* label */}
      <text
        x={startX + 22}
        y={node.y + 3.5}
        fill={active ? "#fbbf24" : "rgba(245,158,11,0.92)"}
        fontSize={9.5}
        letterSpacing="0.14em"
        style={{ fontFamily: "monospace", fontWeight: 600 }}
      >
        {node.label}
      </text>
    </motion.g>
  );
}

export function HeroVisual({ className = "" }: { className?: string }) {
  const reducedMotion = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState<string | null>(null);

  const traces = useMemo(
    () => TECH_NODES.map((n) => ({ id: n.id, path: buildTrace(CENTER, n) })),
    [],
  );

  const pulses = useMemo(
    () =>
      TECH_NODES.flatMap((n, i) => {
        const path = buildTrace(CENTER, n);
        const kf = Array.from({ length: 11 }, (_, j) =>
          samplePath(path, j / 10),
        );
        return [0, 1].map((p) => ({
          id: `${n.id}-p${p}`,
          kf,
          delay: i * 0.4 + p * 1.9,
          duration: 3.4 + p * 0.8,
        }));
      }),
    [],
  );

  // ── Mouse parallax ──
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 40, damping: 15, mass: 0.4 });
  const springY = useSpring(mouseY, { stiffness: 40, damping: 15, mass: 0.4 });

  const decorX = useTransform(springX, (v) => v * 14);
  const decorY = useTransform(springY, (v) => v * 14);
  const systemX = useTransform(springX, (v) => v * 18);
  const systemY = useTransform(springY, (v) => v * 18);
  const centerX = useTransform(springX, (v) => v * 26);
  const centerY = useTransform(springY, (v) => v * 26);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (reducedMotion) return;
      const rect = containerRef.current?.getBoundingClientRect();
      if (!rect) return;
      mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
      mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
    },
    [mouseX, mouseY, reducedMotion],
  );

  const handleMouseLeave = useCallback(() => {
    mouseX.set(0);
    mouseY.set(0);
  }, [mouseX, mouseY]);

  const handleHoverChange = useCallback((id: string, active: boolean) => {
    setHovered(active ? id : null);
  }, []);

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`relative w-full h-full select-none rounded-3xl ${className}`}
      role="img"
      aria-label="Circuit board diagram of frontend technologies: Next.js, React, TypeScript, JavaScript, HTML, CSS, Tailwind CSS"
    >
      <svg
        viewBox="0 0 600 600"
        className="hero-circuit absolute inset-0 w-full h-full"
        style={{ color: "var(--color-hero-ink)" }}
        fill="none"
      >
        <defs>
          <linearGradient id="chip-surface" x1="222" y1="247" x2="378" y2="353" gradientUnits="userSpaceOnUse">
            <stop stopColor="#171717" />
            <stop offset="0.52" stopColor="#0a0a0a" />
            <stop offset="1" stopColor="#14110a" />
          </linearGradient>
          <linearGradient id="die-surface" x1="252" y1="270" x2="348" y2="322" gradientUnits="userSpaceOnUse">
            <stop stopColor="rgba(245,158,11,0.22)" />
            <stop offset="1" stopColor="rgba(245,158,11,0.03)" />
          </linearGradient>
          <filter id="chip-glow" x="-60%" y="-60%" width="220%" height="220%">
            <feGaussianBlur stdDeviation="5" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
          <pattern id="die-grid" width="8" height="8" patternUnits="userSpaceOnUse">
            <path d="M 8 0 L 0 0 0 8" fill="none" stroke="rgba(245,158,11,0.16)" strokeWidth="0.5" />
          </pattern>
        </defs>
        {/* ── Decor layer (parallax slow) — PCB texture ── */}
        <motion.g style={reducedMotion ? undefined : { x: decorX, y: decorY }}>
          {DECOR_TRACES.map((d) => (
            <path
              key={d}
              d={d}
              stroke="currentColor" strokeOpacity="0.07"
              strokeWidth="1"
            />
          ))}
          {VIAS.map((v) => (
            <g key={`${v.x}-${v.y}`}>
              <circle
                cx={v.x}
                cy={v.y}
                r={4}
                stroke="currentColor" strokeOpacity="0.14"
                strokeWidth="1"
              />
              <circle cx={v.x} cy={v.y} r={1.2} fill="currentColor" fillOpacity="0.2" />
            </g>
          ))}
        </motion.g>

        {/* ── System layer (parallax mid) — traces, pulses, tech nodes ── */}
        <motion.g
          style={reducedMotion ? undefined : { x: systemX, y: systemY }}
        >
          {/* circuit traces */}
          {traces.map((t) => (
            <motion.path
              key={t.id}
              d={t.path}
              fill="none"
              strokeWidth={hovered === t.id ? 1.6 : 1}
              initial={{ opacity: 0 }}
              animate={{
                opacity: 1,
                stroke: hovered === t.id ? "#f59e0b" : "currentColor",
                strokeOpacity: hovered === t.id ? 0.95 : 0.4,
              }}
              transition={{ duration: 0.45 }}
            />
          ))}

          {/* energy dash on hovered trace */}
          {traces.map((t) =>
            hovered === t.id ? (
              <motion.path
                key={`${t.id}-energy`}
                d={t.path}
                fill="none"
                stroke="#f59e0b"
                strokeWidth={1.2}
                strokeDasharray="4 10"
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.7, strokeDashoffset: [0, -28] }}
                transition={{ duration: 1.4, repeat: Infinity, ease: "linear" }}
              />
            ) : null,
          )}

          {/* electrical pulses — restrained ambient activity */}
          {!reducedMotion &&
            pulses.map((p) => (
              <motion.circle
                key={p.id}
                r="2.4"
                fill="#f59e0b"
                initial={{ cx: p.kf[0].x, cy: p.kf[0].y, opacity: 0 }}
                animate={{
                  cx: p.kf.map((k) => k.x),
                  cy: p.kf.map((k) => k.y),
                  opacity: [0, 0, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0, 0],
                }}
                transition={{
                  duration: p.duration,
                  delay: p.delay,
                  repeat: Infinity,
                  ease: "linear",
                }}
              />
            ))}

          {/* technology nodes — stable until hover */}
          {TECH_NODES.map((node) => (
            <TechNodeChip
              key={node.id}
              node={node}
              onHoverChange={handleHoverChange}
              reducedMotion={reducedMotion}
            />
          ))}
        </motion.g>

        {/* ── Center processing module (parallax fast) ── */}
        <motion.g
          style={reducedMotion ? undefined : { x: centerX, y: centerY }}
        >
          <motion.g
            initial={{ opacity: 0, scale: reducedMotion ? 1 : 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.55 }}
          >
            <title>Frontend</title>
            {/* soft system rings make the module feel integrated, not boxed in */}
            <circle cx={300} cy={300} r={94} stroke="rgba(245,158,11,0.11)" strokeWidth="1" strokeDasharray="3 8" />
            <circle cx={300} cy={300} r={82} stroke="currentColor" strokeOpacity="0.08" strokeWidth="1" strokeDasharray="1 11" />
            <path d="M 300 200 L 300 219 M 300 381 L 300 400 M 200 300 L 219 300 M 381 300 L 400 300" stroke="rgba(245,158,11,0.52)" strokeWidth="1" />
            {/* chip shadow and machined package */}
            <rect x={227} y={252} width={156} height={106} rx={10} fill="rgba(0,0,0,0.42)" />
            <rect
              x={222}
              y={247}
              width={156}
              height={106}
              rx={10}
              fill="url(#chip-surface)"
              stroke="rgba(245,158,11,0.68)"
              strokeWidth={1.3}
            />
            <path d="M232 248 H368 M223 257 V343 M377 257 V343" stroke="currentColor" strokeOpacity="0.13" strokeWidth="1" />
            <path d="M238 252 H362" stroke="rgba(245,158,11,0.22)" strokeWidth="1" />
            {/* pins — top / bottom */}
            {CHIP_PINS_X.map((px) => (
              <rect
                key={`pt${px}`}
                x={300 + px - 3}
                y={240}
                width={6}
                height={7}
                rx={1}
                fill="rgba(245,158,11,0.45)"
              />
            ))}
            {CHIP_PINS_X.map((px) => (
              <rect
                key={`pb${px}`}
                x={300 + px - 3}
                y={353}
                width={6}
                height={7}
                rx={1}
                fill="rgba(245,158,11,0.45)"
              />
            ))}
            {/* pins — left / right */}
            {CHIP_PINS_Y.map((py) => (
              <rect
                key={`pl${py}`}
                x={216}
                y={300 + py - 3}
                width={7}
                height={6}
                rx={1}
                fill="rgba(245,158,11,0.45)"
              />
            ))}
            {CHIP_PINS_Y.map((py) => (
              <rect
                key={`pr${py}`}
                x={377}
                y={300 + py - 3}
                width={7}
                height={6}
                rx={1}
                fill="rgba(245,158,11,0.45)"
              />
            ))}
            {/* inner die */}
            <rect
              x={252}
              y={270}
              width={96}
              height={52}
              rx={4}
              fill="url(#die-surface)"
              stroke="rgba(245,158,11,0.45)"
              strokeWidth="1"
            />
            <rect x={256} y={274} width={88} height={44} rx={2} fill="url(#die-grid)" opacity="0.8" />
            <path d="M262 278 H278 V286 H288 M338 278 H322 V286 H312 M262 314 H278 V306 H288 M338 314 H322 V306 H312" stroke="rgba(245,158,11,0.45)" strokeWidth="1" />
            <text
              x={300}
              y={294}
              textAnchor="middle"
              fill="#fbbf24"
              fontSize={10}
              letterSpacing="0.28em"
              style={{ fontFamily: "monospace", fontWeight: 600 }}
            >
              UI / CORE
            </text>
            <text x={300} y={340} textAnchor="middle" fill="currentColor" fillOpacity="0.36" fontSize={6.5} letterSpacing="0.18em" style={{ fontFamily: "monospace" }}>
              INTERFACE SYSTEM 01
            </text>
            {/* core LED — subtle pulse */}
            <motion.rect
              x={296.5}
              y={300}
              width={7}
              height={7}
              fill="#f59e0b"
              filter="url(#chip-glow)"
              animate={reducedMotion ? undefined : { opacity: [0.3, 0.8, 0.3] }}
              transition={{
                duration: 2.8,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </motion.g>
        </motion.g>
      </svg>
    </div>
  );
}
