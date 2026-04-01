'use client'

import React, { useState, useEffect } from 'react'
import { siteMetadata } from '@/lib/data'
import Link from 'next/link'
import { FaTelegram } from 'react-icons/fa'
import { SiUpwork } from 'react-icons/si'
import { HeroScene } from './hero-scene'
import { motion } from 'motion/react'

export function Hero() {
  const [canvasLoaded, setCanvasLoaded] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setCanvasLoaded(true), 3000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <section className="relative w-full h-screen min-h-[700px] flex items-center bg-black overflow-hidden">

      {/* 3D SCENE — absolute, right half only */}
      <div
        className={`absolute inset-0 z-0 transition-opacity duration-[2000ms] ${canvasLoaded ? 'opacity-100' : 'opacity-0'}`}
      >
        <HeroScene onLoaded={() => setCanvasLoaded(true)} />
      </div>

      {/* Ambient glow — right side */}
      <div
        className="absolute inset-y-0 right-0 w-1/2 pointer-events-none z-[1]"
        style={{
          background:
            'radial-gradient(ellipse 65% 75% at 65% 50%, rgba(16,185,129,0.08) 0%, transparent 70%)',
        }}
      />

      {/* LAYOUT */}
      <div className="relative z-10 w-full h-full flex items-center">

        {/* LEFT — Sales Copy */}
        <div className="w-full lg:w-1/2 flex flex-col justify-center px-8 md:px-16 lg:px-24 gap-8 pt-24 pb-16">

          {/* Availability badge */}
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.55, delay: 0.1 }}
            className="flex items-center gap-3"
          >
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_6px_2px_rgba(52,211,153,0.5)]" />
            <span className="text-[10px] font-mono text-emerald-400 uppercase tracking-[0.4em]">
              Senior Developer &nbsp; Freelance &amp; Remote
            </span>
          </motion.div>

          {/* Name */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.2 }}
          >
            <h1 className="text-5xl md:text-6xl xl:text-[5.5rem] font-extrabold text-white leading-[1.02] tracking-tight">
              Lantumo
              <br />
              <span className="text-emerald-400">Birhanu</span>
            </h1>
          </motion.div>

          {/* Tagline + description */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.33 }}
            className="flex flex-col gap-3 max-w-[420px]"
          >
            <h2 className="text-xl md:text-2xl font-semibold text-white leading-snug">
              Built for <strong>Performance</strong>. Designed for{' '}
              <span className="text-emerald-400">Impact</span>.
            </h2>
            <p className="text-[0.9rem] text-white/50 leading-[1.75]">
              I craft high-performance web applications and immersive frontends,
              helping global startups ship products that scale and stand out.
            </p>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.48 }}
            className="flex items-center gap-10"
          >
            {[
              { value: '4+',   label: 'Years Experience' },
              { value: '30+',  label: 'Systems Shipped' },
              { value: '100%', label: 'Remote Reliability' },
            ].map(({ value, label }) => (
              <div key={label} className="flex flex-col gap-0.5">
                <span className="text-3xl font-black text-white tabular-nums">{value}</span>
                <span className="text-[9px] font-mono text-white/25 uppercase tracking-[0.28em]">{label}</span>
              </div>
            ))}
          </motion.div>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.62 }}
            className="flex flex-wrap items-center gap-4"
          >
            <Link
              href={siteMetadata.socials.upwork}
              target="_blank"
              className="flex items-center gap-2 px-7 py-3.5 bg-white text-black font-black text-[11px] uppercase tracking-[0.18em] transition-all duration-300 hover:bg-emerald-400 hover:text-white hover:-translate-y-0.5 active:translate-y-0"
            >
              Consult on Upwork
              <SiUpwork className="w-4 h-4" />
            </Link>

            <Link
              href={siteMetadata.socials.telegram}
              target="_blank"
              className="flex items-center gap-2 px-7 py-3.5 border border-white/10 bg-white/[0.03] backdrop-blur-xl text-white font-black text-[11px] uppercase tracking-[0.18em] transition-all duration-300 hover:border-emerald-400/60 hover:-translate-y-0.5 active:translate-y-0"
            >
              Direct Message
              <FaTelegram className="w-4 h-4 text-emerald-400" />
            </Link>
          </motion.div>

        </div>

        {/* RIGHT — reserved for 3D canvas */}
        <div className="hidden lg:block w-1/2 h-full" aria-hidden="true" />

      </div>

      {/* Vertical availability label */}
      <div className="absolute bottom-10 left-8 hidden md:block pointer-events-none z-10">
        <span className="text-[9px] font-mono text-white/15 uppercase tracking-[0.4em] rotate-180 [writing-mode:vertical-lr]">
          Available For Contracts 2026
        </span>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black to-transparent pointer-events-none z-10" />
    </section>
  )
}
