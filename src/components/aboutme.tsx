"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "motion/react";
import { ArrowUpRight } from "lucide-react";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const STACK = [
  "NEXT.JS",
  "REACT",
  "TYPESCRIPT",
  "JAVASCRIPT",
  "TAILWIND",
  "HTML",
  "CSS",
];

const FOCUS = ["PERFORMANCE", "USABILITY", "RESPONSIVE", "CLEAN CODE"];

// ── Small PCB process visual: IDEA → DESIGN → CODE → TEST → SHIP ──
const PROCESS_STAGES = [
  { label: "IDEA", x: 0 },
  { label: "DESIGN", x: 1 },
  { label: "CODE", x: 2 },
  { label: "TEST", x: 3 },
  { label: "SHIP", x: 4 },
];

function ProcessCircuit() {
  const reducedMotion = useReducedMotion();

  const stageX = (i: number) => 40 + i * 130;

  return (
    <div
      className="relative w-full max-w-[640px] select-none"
      aria-hidden="true"
    >
      <svg viewBox="0 0 600 90" className="w-full h-auto" fill="none">
        {/* main trace */}
        <motion.path
          d="M 20 45 H 580"
          stroke="rgba(120,120,120,0.20)"
          strokeWidth="1"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: EASE }}
        />
        {/* branch stubs */}
        {PROCESS_STAGES.map((s, i) => (
          <g key={s.label}>
            <motion.line
              x1={stageX(i)}
              y1={45}
              x2={stageX(i)}
              y2={i % 2 === 0 ? 24 : 66}
              stroke="rgba(120,120,120,0.16)"
              strokeWidth="1"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 + i * 0.15 }}
            />
            {/* node */}
            <motion.circle
              cx={stageX(i)}
              cy={i % 2 === 0 ? 24 : 66}
              r={3}
              fill="rgba(245,158,11,0.6)"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 + i * 0.15 }}
            />
            {/* label */}
            <text
              x={stageX(i)}
              y={i % 2 === 0 ? 16 : 78}
              textAnchor="middle"
              fill="rgba(120,120,120,0.75)"
              fontSize="9"
              letterSpacing="0.22em"
              style={{ fontFamily: "monospace", fontWeight: 600 }}
            >
              {s.label}
            </text>
          </g>
        ))}
        {/* traveling pulse */}
        {!reducedMotion && (
          <motion.circle
            r="2.2"
            fill="#f59e0b"
            initial={{ cx: 20, cy: 45, opacity: 0 }}
            animate={{ cx: [20, 580], cy: [45, 45], opacity: [0, 0.9, 0.9, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          />
        )}
      </svg>
    </div>
  );
}

// ── Stable tech chip with hover-only interaction ──
function TechChip({ label }: { label: string }) {
  const reducedMotion = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 180, damping: 22 });
  const sy = useSpring(my, { stiffness: 180, damping: 22 });
  const ox = useTransform(sx, (v) => v * 8);
  const oy = useTransform(sy, (v) => v * 8);

  const handleMove = (e: React.MouseEvent) => {
    if (reducedMotion) return;
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    mx.set((e.clientX - rect.left) / rect.width - 0.5);
    my.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onHoverStart={() => setActive(true)}
      onHoverEnd={() => setActive(false)}
      style={reducedMotion ? undefined : { x: ox, y: oy }}
      className={`inline-flex items-center gap-2 px-4 py-2 border rounded-md transition-colors duration-300 cursor-default ${
        active
          ? "border-accent/70 bg-accent/5 text-accent"
          : "border-border text-muted hover:border-border"
      }`}
    >
      <span
        className={`w-1.5 h-1.5 rounded-full transition-colors duration-300 ${
          active ? "bg-accent" : "bg-accent/50"
        }`}
      />
      <span className="font-mono text-[11px] md:text-xs tracking-[0.14em] font-semibold">
        {label}
      </span>
    </motion.div>
  );
}

const AboutMe = () => {
  const reducedMotion = useReducedMotion();

  return (
    <section
      className="relative w-full py-24 md:py-32 text-foreground overflow-hidden"
      id="about"
    >
      {/* ── Same dot environment as hero ── */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 section-gradient" />
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(circle, rgba(120,120,120,0.16) 1px, transparent 1px)",
            backgroundSize: "28px 28px",
            WebkitMaskImage:
              "radial-gradient(ellipse 90% 80% at 50% 45%, black 30%, transparent 100%)",
            maskImage:
              "radial-gradient(ellipse 90% 80% at 50% 45%, black 30%, transparent 100%)",
          }}
        />
        <div className="absolute -bottom-40 left-[10%] w-[520px] h-[520px] rounded-full bg-accent/[0.04] blur-[140px]" />
      </div>

      <div className="relative z-10 w-full max-w-[1600px] mx-auto px-6 md:px-12 xl:px-16">
        {/* ── Section label ── */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: EASE }}
          className="flex items-center gap-3 mb-12 md:mb-16"
        >
          <span className="font-mono text-xs md:text-sm tracking-[0.3em] text-muted uppercase font-medium">
            About Me / 01
          </span>
        </motion.div>

        {/* ── Asymmetric two-column ── */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.1fr] gap-12 lg:gap-16">
          {/* LEFT — headline */}
          <div className="relative">
            <h2 className="font-heading text-[clamp(3rem,5vw,6rem)] leading-[0.95] tracking-[-0.02em] font-bold uppercase select-none">
              <span className="block overflow-hidden pb-1">
                <motion.span
                  initial={{ y: reducedMotion ? 0 : "110%" }}
                  whileInView={{ y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.9, delay: 0.1, ease: EASE }}
                  className="block text-foreground"
                >
                  I BUILD
                </motion.span>
              </span>
              <span className="block overflow-hidden pb-1">
                <motion.span
                  initial={{ y: reducedMotion ? 0 : "110%" }}
                  whileInView={{ y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.9, delay: 0.22, ease: EASE }}
                  className="block text-foreground"
                >
                  FOR THE
                </motion.span>
              </span>
              <span className="block overflow-hidden pb-1">
                <motion.span
                  initial={{ y: reducedMotion ? 0 : "110%" }}
                  whileInView={{ y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.9, delay: 0.34, ease: EASE }}
                  className="block text-accent"
                >
                  WEB.
                </motion.span>
              </span>
            </h2>
          </div>

          {/* RIGHT — intro + skills + focus */}
          <div className="flex flex-col">
            {/* intro paragraph */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2, ease: EASE }}
              className="text-lg md:text-xl leading-relaxed text-muted font-light max-w-xl"
            >
              I'm a frontend developer focused on building fast, responsive and
              scalable web applications. I work mainly with React, Next.js and
              TypeScript, turning ideas into clean digital products that are
              easy to use and built to perform.
            </motion.p>

            {/* WHAT I WORK WITH */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.35, ease: EASE }}
              className="mt-12"
            >
              <div className="flex items-center gap-3 mb-5">
                <span className="font-mono text-[10px] md:text-[11px] tracking-[0.3em] text-muted uppercase">
                  What I work with
                </span>
              </div>
              <div className="flex flex-wrap gap-2.5">
                {STACK.map((tech) => (
                  <TechChip key={tech} label={tech} />
                ))}
              </div>
            </motion.div>

            {/* I FOCUS ON */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.5, ease: EASE }}
              className="mt-10"
            >
              <div className="flex items-center gap-3 mb-5">
                <span className="font-mono text-[10px] md:text-[11px] tracking-[0.3em] text-muted uppercase">
                  I focus on
                </span>
              </div>
              <div className="flex flex-wrap gap-2.5">
                {FOCUS.map((f) => (
                  <span
                    key={f}
                    className="inline-flex items-center px-3.5 py-1.5 border border-border rounded-md text-[10px] md:text-[11px] font-mono tracking-[0.18em] text-muted uppercase"
                  >
                    {f}
                  </span>
                ))}
              </div>
            </motion.div>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.65, ease: EASE }}
              className="mt-12"
            >
              <Link
                href="/contact"
                className="group inline-flex items-center gap-3 border border-border hover:border-border px-6 md:px-8 py-3.5 md:py-4 text-[11px] md:text-xs font-semibold tracking-[0.28em] uppercase text-foreground transition-colors duration-300 hover:bg-foreground hover:text-background"
              >
                Let's Work Together
                <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutMe;
