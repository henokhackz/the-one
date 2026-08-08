"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";
import Badge from "./badge";

export function Hero() {
  return (
    <section className="relative w-full min-h-[80vh] bg-black overflow-hidden text-white flex flex-col">
      {/* ── Portrait Photo (right side, full-bleed) ── */}
      <div className="absolute inset-0 z-0">
        {/* Photo – covers right ~65% */}
        <div className="absolute right-0 top-0 h-full w-[65%]">
          <Image
            src="/me.png"
            alt="Lantumo Birhanu"
            fill
            priority
            className="object-cover object-top"
          />
          {/* Gradient: solid black on left, transparent on right */}
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent" />
          {/* Bottom fade for text legibility */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        </div>

        {/* Hard black panel on the left 35% so headline always reads */}
        <div className="absolute left-0 top-0 h-full w-[36%] bg-black" />
      </div>

      {/* ── Vertical grid lines ── */}
      <div className="absolute inset-0 z-[1] pointer-events-none">
        <div className="h-full w-px bg-white/8 absolute left-1/3" />
        <div className="h-full w-px bg-white/8 absolute right-1/3" />
      </div>

      {/* ── Main content ── */}
      <div className="relative z-10 flex flex-col flex-1 px-6 md:px-12 xl:px-16">
        {/* Top label bar */}
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="flex justify-between items-center pt-10 md:pt-14 text-[9px] md:text-[11px] tracking-[0.3em] text-white/50 uppercase font-medium"
        >
          <span>[ HIGH PERFORMANCE ]</span>
          <span>FRONTEND ARCHITECTURE</span>
          <span>[ PIXEL PERFECT ]</span>
        </motion.div>

        {/* ── Body row: fills remaining vertical space ── */}
        <div className="flex flex-1 flex-col justify-end pb-12 md:pb-16">
          <div className="flex items-end justify-between w-full gap-8">
            {/* Left: Massive 3-line headline */}
            <div className="relative flex-shrink-0">
              {/* ® mark */}
              <span className="absolute -top-5 right-0 text-[10px] text-white/40 font-light">
                ®
              </span>

              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
                className="text-[13vw] md:text-[11vw] lg:text-[10vw] xl:text-[9rem] font-black uppercase tracking-tighter leading-[0.88] select-none"
              >
                <div className="text-white">ENGINEER</div>
                <div className="text-[#f59e0b]">FOR FRONTEND</div>
                <div className="text-white">DELIVER</div>
              </motion.div>
            </div>

            {/* Right: Description + CTA + Badge */}
            <div className="flex flex-col items-start gap-8 w-full max-w-xs md:max-w-sm xl:max-w-md pb-2 flex-shrink-0">
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.9, delay: 0.45 }}
                className="text-sm md:text-base text-white/70 leading-relaxed font-light"
              >
                I am a Frontend Developer focusing on high-performance web
                applications. I craft immersive, intuitive interfaces with a
                dedication to seamless user experiences, helping startups ship
                products that scale.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.6 }}
                className="flex items-stretch h-12 md:h-14 gap-2"
              >
                <Link
                  href="/contact"
                  className="bg-white text-black text-xs md:text-sm font-bold tracking-widest uppercase px-5 md:px-7 flex items-center justify-center hover:bg-gray-200 transition-colors h-full rounded-sm whitespace-nowrap"
                >
                  LET'S CONTACT
                </Link>
                <Link
                  href="/contact"
                  className="bg-[#f59e0b] text-black w-12 md:w-14 flex items-center justify-center hover:bg-[#d97706] transition-colors h-full rounded-sm flex-shrink-0"
                >
                  <ArrowUpRight className="w-5 h-5" />
                </Link>
              </motion.div>
            </div>
          </div>

          {/* Badge – bottom right, absolutely positioned to not disturb flow */}
          <div className="absolute bottom-10 right-10 md:right-14 z-20">
            <Badge />
          </div>
        </div>
      </div>
    </section>
  );
}
