"use client";

import React from "react";
import Link from "next/link";
import { ArrowUpRight, ArrowDown } from "lucide-react";
import { motion } from "framer-motion";
import Badge from "./badge";

export function Hero() {
  return (
    <section className="relative w-full px-16 mx-auto  min-h-screen bg-black overflow-hidden text-white flex flex-col justify-center">
      {/* Background Lighting & Elements */}
      <div className="h-full w-1 bg-yellow-200/10 absolute bottom-0 left-1/3"></div>
      <div className="h-full w-1 bg-yellow-200/10 absolute bottom-0 right-1/3"></div>
      <div className="relative z-10 w-full mx-auto flex flex-col justify-center flex-1">
        {/* Top Mini Labels */}
        <div className="flex flex-row justify-between items-center w-full mb-16 md:mb-24 text-[9px] md:text-xs tracking-widest text-white  uppercase font-medium">
          <span>[ HIGH PERFORMANCE ]</span>
          <span> [ FRONTEND ARCHITECTURE ]</span>
          <span>[ PIXEL PERFECT ]</span>
        </div>

        {/* Main Content Area */}
        <div className="w-full flex justify-between items-end">
          {/* Typography */}
          <div className="text-2xl md:text-5xl lg:text-7xl xl:text-[10rem] text-bold font-black uppercase tracking-tighter">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            >
              I'M
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
              className="text-[#f59e0b] "
            >
              FRONTEND
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            >
              DEVELOPER
            </motion.div>
          </div>

          {/* Right Side Content */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="w-full lg:w-[32%] xl:w-[28%] flex flex-col items-start gap-8 relative z-20 mt-8 lg:mt-0 pb-4 md:pb-6 space-y-4"
          >
            <p
              className="text-sm md:text-base text-white/80 leading-relaxed font-light"
              style={{ fontFamily: "var(--font-body)" }}
            >
              I am a Frontend Developer focusing on high performance web
              applications. I craft immersive, intuitive interfaces with a
              dedication to seamless user experiences, helping startups ship
              products that scale.
            </p>

            {/* Buttons Group - Added gap between items and border radii per feedback */}
            <div className="flex items-stretch h-12 md:h-14 gap-2 group cursor-pointer w-full max-w-[320px]">
              <Link
                href="/contact"
                className="bg-white text-black text-xs md:text-sm font-bold tracking-widest uppercase px-4 md:px-6 flex items-center justify-center hover:bg-gray-200 transition-colors h-full rounded-md whitespace-nowrap flex-1"
              >
                LET'S CONTACT
              </Link>
              <Link
                href="/contact"
                className="bg-[#f59e0b] text-black w-14 md:w-16 flex items-center justify-center hover:bg-[#d97706] transition-colors h-full rounded-md flex-shrink-0"
              >
                <ArrowUpRight className="w-5 h-5" />
              </Link>
            </div>
          </motion.div>

          {/* Spinning Badge - Adjusted positioning for better spacing */}
          <Badge />
        </div>
      </div>
    </section>
  );
}
