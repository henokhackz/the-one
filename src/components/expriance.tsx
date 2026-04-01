'use client'

import React, { useRef, useState } from 'react'
import Image from 'next/image'
import { motion, useInView } from 'motion/react'

// ─── Data ──────────────────────────────────────────────────────────────────────

const experiences = [
  {
    id: 'ideeza',
    role: 'Three.js Engineer',
    company: 'Ideeza',
    logo: '/ideeza.png',
    date: 'Nov 2025 – Present',
    duration: 'Current',
    location: 'Remote · Israel',
    type: 'Contract',
    accent: '#10b981',
    featured: true,
    description:
      'Contributing to Ideeza\'s AI-powered hardware design platform — a next-generation EDA tool that lets engineers and makers design PCBs through both manual workflows and AI-generated prompts. I own the Three.js electronics layer: building interactive 3D PCB visualizations, implementing real-time layer inspection, schematic routing, and 2D/3D dual-side viewing rendering that ships production-ready Gerber files.',
    highlights: [
      'Built the 2D/3D PCB canvas with real-time layer switching and drill-hole rendering',
      'Implemented AI-driven board layout generation from natural language input',
      'Delivered interactive trace inspection tools with zoom-level-aware detail',
      'Developed both schematic views and dual-perspective 3D viewer modes',
    ],
    technologies: ['Three.js', 'Next.js', 'React', 'TypeScript', 'Node.js', 'WebGL', 'EDA APIs'],
  },
  {
    id: 'freelance',
    role: 'Fullstack Freelancer',
    company: 'Independent Professional',
    logo: null,
    date: 'Jun 2025 – Present',
    duration: 'Ongoing',
    location: 'Remote · Global',
    type: 'Freelance',
    accent: '#10b981',
    featured: false,
    description:
      'Delivering end-to-end web products for startups and SMEs globally. Expanding client base through social media outreach, global marketplaces like Upwork, and regional platforms like Afriwork (the premier Ethiopian talent hub). Specializing in performance-critical Next.js applications and API infrastructure.',
    highlights: [
      'Shipped 8+ production apps for independent clients and businesses',
      'Sourced high-value projects consistently via Upwork, Afriwork, and social channels',
      'Built scalable REST routes and architectures deployed across modern CI/CD pipelines',
    ],
    technologies: ['Next.js', 'TypeScript', 'Node.js', 'PostgreSQL', 'Prisma', 'MongoDB', 'React'],
  },
  {
    id: 'ethiotelecom',
    role: 'Full Stack Developer Intern',
    company: 'Ethio Telecom',
    logo: null,
    date: 'Jan 2024 – Mar 2025',
    duration: '14 months',
    location: 'Hawassa, Ethiopia',
    type: 'Internship',
    accent: '#10b981',
    featured: false,
    description:
      'Built internal tooling and REST APIs for one of Africa\'s largest telecom operators. Integrated frontends with backend systems, handled auth flows, and participated in weekly code reviews and production deployments.',
    highlights: [
      'Developed internal dashboards consumed by 200+ internal users',
      'Designed and integrated RESTful APIs with proper JWT auth pipelines',
      'Participated in agile sprints and production deployment cycles',
    ],
    technologies: ['Next.js', 'Node.js', 'Prisma', 'PostgreSQL'],
  },
  {
    id: 'nile',
    role: 'Web Developer',
    company: 'Nile Technologies',
    logo: null,
    date: 'Sept 2025',
    duration: 'Short-term',
    location: 'Remote',
    type: 'Contract',
    accent: '#10b981',
    featured: false,
    description:
      'Built SEO-optimised landing pages for AI-based online learning platforms. Designed fast, accessible web interfaces with a strong focus on conversion and performance scores.',
    highlights: [
      'Achieved 95+ Lighthouse scores on all delivered pages',
      'Implemented structured data markup for enhanced SERP presence',
    ],
    technologies: ['Next.js', 'Tailwind CSS', 'SEO', 'Content Writing'],
  },
]

// ─── Timeline dot ──────────────────────────────────────────────────────────────

function TimelineDot({ accent, active }: { accent: string; active: boolean }) {
  return (
    <div className="relative flex items-center justify-center flex-shrink-0 w-4 h-4">
      <div
        className="w-2.5 h-2.5 rounded-full transition-all duration-300"
        style={{
          background: accent,
          boxShadow: active ? `0 0 12px 4px ${accent}55` : 'none',
        }}
      />
    </div>
  )
}

// ─── Tech Tag ─────────────────────────────────────────────────────────────────

function TechTag({ label, accent }: { label: string; accent: string }) {
  return (
    <span
      className="text-[9px] font-mono uppercase tracking-[0.22em] px-2.5 py-1 border transition-colors duration-200"
      style={{
        color: accent,
        borderColor: `${accent}40`,
        background: `${accent}08`,
      }}
    >
      {label}
    </span>
  )
}

// ─── Experience Card ──────────────────────────────────────────────────────────

function ExperienceCard({
  exp,
  index,
  isLast,
}: {
  exp: (typeof experiences)[0]
  index: number
  isLast: boolean
}) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const [hovered, setHovered] = useState(false)

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -24 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.55, delay: index * 0.1, ease: 'easeOut' }}
      className="relative flex gap-6 md:gap-10"
    >
      {/* Timeline spine */}
      <div className="flex flex-col items-center gap-0 pt-1">
        <TimelineDot accent={exp.accent} active={hovered || exp.featured} />
        {!isLast && (
          <div
            className="w-px flex-1 mt-2"
            style={{
              background: `linear-gradient(to bottom, ${exp.accent}30, transparent)`,
              minHeight: '40px',
            }}
          />
        )}
      </div>

      {/* Card body */}
      <div
        className="flex-1 mb-10 md:mb-14 group cursor-default"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {/* Featured badge */}
        {exp.featured && (
          <div
            className="inline-flex items-center gap-1.5 mb-3 px-3 py-1 text-[8px] font-mono uppercase tracking-[0.35em]"
            style={{ color: exp.accent, border: `1px solid ${exp.accent}40`, background: `${exp.accent}0d` }}
          >
            <span
              className="w-1.5 h-1.5 rounded-full animate-pulse"
              style={{ background: exp.accent }}
            />
            Active Engagement
          </div>
        )}

        {/* Header row */}
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-4">
          <div className="flex items-center gap-3">
            {/* Logo or initial */}
            {exp.logo ? (
              <div
                className="flex-shrink-0 w-10 h-10 rounded overflow-hidden flex items-center justify-center"
                style={{ background: '#0a0a0a', border: `1px solid ${exp.accent}30` }}
              >
                <Image
                  src={exp.logo}
                  alt={exp.company}
                  width={40}
                  height={40}
                  className="object-contain w-full h-full"
                />
              </div>
            ) : (
              <div
                className="flex-shrink-0 w-10 h-10 rounded flex items-center justify-center text-xs font-black"
                style={{
                  background: `${exp.accent}15`,
                  border: `1px solid ${exp.accent}30`,
                  color: exp.accent,
                }}
              >
                {exp.company[0]}
              </div>
            )}

            <div>
              <h3 className="text-base font-bold text-white leading-tight">{exp.role}</h3>
              <p className="text-sm" style={{ color: exp.accent }}>
                {exp.company}
              </p>
            </div>
          </div>

          {/* Meta chips */}
          <div className="flex flex-wrap gap-2 text-[9px] font-mono uppercase tracking-widest">
            <span className="px-2 py-1 text-white/30 border border-white/8 bg-white/[0.02]">
              {exp.date}
            </span>
            <span
              className="px-2 py-1"
              style={{ color: exp.accent, border: `1px solid ${exp.accent}30`, background: `${exp.accent}08` }}
            >
              {exp.type}
            </span>
            <span className="px-2 py-1 text-white/20 border border-white/5">
              {exp.location}
            </span>
          </div>
        </div>

        {/* Inner card with hover glow */}
        <div
          className="relative rounded-none p-5 md:p-7 transition-all duration-300 overflow-hidden"
          style={{
            background: hovered ? `${exp.accent}06` : '#0a0a0a',
            border: `1px solid ${hovered ? exp.accent + '35' : '#ffffff10'}`,
          }}
        >
          {/* Corner accent */}
          <div
            className="absolute top-0 right-0 w-12 h-12 pointer-events-none"
            style={{
              background: `linear-gradient(135deg, transparent 50%, ${exp.accent}18 100%)`,
            }}
          />
          <div
            className="absolute top-0 right-0 w-px h-12 pointer-events-none"
            style={{ background: `linear-gradient(to bottom, ${exp.accent}50, transparent)` }}
          />
          <div
            className="absolute top-0 right-0 w-12 h-px pointer-events-none"
            style={{ background: `linear-gradient(to left, ${exp.accent}50, transparent)` }}
          />

          {/* Description */}
          <p className="text-[0.82rem] text-white/50 leading-[1.85] mb-5">
            {exp.description}
          </p>

          {/* Highlights */}
          <ul className="space-y-2 mb-6">
            {exp.highlights.map((h, i) => (
              <li key={i} className="flex items-start gap-2.5">
                <span
                  className="mt-[5px] flex-shrink-0 w-1 h-1 rounded-full"
                  style={{ background: exp.accent }}
                />
                <span className="text-[0.78rem] text-white/40 leading-relaxed">{h}</span>
              </li>
            ))}
          </ul>

          {/* Tech tags */}
          <div className="flex flex-wrap gap-2">
            {exp.technologies.map((tech) => (
              <TechTag key={tech} label={tech} accent={exp.accent} />
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  )
}

// ─── Section ──────────────────────────────────────────────────────────────────

const Experience = () => {
  const headRef = useRef<HTMLDivElement>(null)
  const headInView = useInView(headRef, { once: true })

  return (
    <section className="relative w-full py-24 md:py-32 bg-black overflow-hidden">
      {/* Ambient background glow */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(16,185,129,0.04) 0%, transparent 70%)',
        }}
      />

      <div className="max-w-4xl mx-auto px-6 md:px-12">

        {/* Section heading */}
        <motion.div
          ref={headRef}
          initial={{ opacity: 0, y: 20 }}
          animate={headInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-20"
        >
          <div className="flex items-center gap-3 mb-5">
            <div className="h-px w-6 bg-emerald-500" />
            <span className="text-[9px] font-mono text-emerald-400 uppercase tracking-[0.4em]">
              Work History
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight">
            Experience
          </h2>
          <p className="mt-3 text-sm text-white/30 leading-relaxed max-w-sm">
            Real products. Real outcomes. Shipped across startups, enterprises, and frontier tech.
          </p>
        </motion.div>

        {/* Timeline */}
        <div>
          {experiences.map((exp, index) => (
            <ExperienceCard
              key={exp.id}
              exp={exp}
              index={index}
              isLast={index === experiences.length - 1}
            />
          ))}
        </div>

      </div>
    </section>
  )
}

export default Experience
