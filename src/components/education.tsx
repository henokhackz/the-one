"use client"

import React, { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ExternalLink, Award, ChevronRight } from "lucide-react"
import { motion } from "motion/react"
import { educationData } from "@/lib/constants"

export function Education() {
  const accent = '#10b981'

  return (
    <section id="education" className="relative w-full py-24 md:py-32 bg-black overflow-hidden">
      {/* Ambient background glow */}
      <div
        className="absolute bottom-0 right-0 w-[600px] h-[600px] pointer-events-none"
        style={{
          background: 'radial-gradient(circle at bottom right, rgba(16,185,129,0.03) 0%, transparent 60%)',
        }}
      />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Header */}
        <div className="flex flex-col items-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="flex flex-col items-center text-center"
          >
            <div className="flex items-center gap-3 mb-5">
              <div className="h-px w-6 bg-emerald-500" />
              <span className="text-[9px] font-mono text-emerald-400 uppercase tracking-[0.4em]">
                Knowledge & Certifications
              </span>
              <div className="h-px w-6 bg-emerald-500" />
            </div>
            
            <h2 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight">
              Education & Courses
            </h2>
            <p className="mt-4 text-sm text-white/40 max-w-lg leading-relaxed">
              Academic foundation and continuous learning paths focused on advancing modern software engineering capabilities.
            </p>
          </motion.div>
        </div>

        {/* University Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="relative max-w-4xl mx-auto mb-20 group"
        >
          <div 
            className="flex flex-col md:flex-row w-full items-center bg-[#0a0a0a] border border-white/10 p-8 md:p-10 relative overflow-hidden transition-all duration-500 hover:border-emerald-500/40"
            style={{ boxShadow: `0 10px 40px -10px ${accent}05` }}
          >
            {/* Corner styling */}
            <div 
              className="absolute top-0 right-0 w-16 h-16 pointer-events-none transition-opacity duration-500"
              style={{
                background: `linear-gradient(135deg, transparent 50%, ${accent}15 100%)`,
                opacity: 0.5
              }}
            />
            <div className="absolute top-0 right-0 w-px h-16 pointer-events-none" style={{ background: `linear-gradient(to bottom, ${accent}50, transparent)` }} />
            <div className="absolute top-0 right-0 w-16 h-px pointer-events-none" style={{ background: `linear-gradient(to left, ${accent}50, transparent)` }} />

            <div className="flex-shrink-0 relative w-32 h-32 md:w-40 md:h-40 flex items-center justify-center bg-black/40 border border-white/10 overflow-hidden mb-8 md:mb-0 group-hover:border-emerald-500/30 transition-colors duration-500">
              <div className="absolute inset-0 bg-gradient-to-tr from-emerald-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <Image
                src={educationData.university.logo || '/arbaminch-logo.png'}
                alt={`${educationData.university.name} Logo`}
                fill
                className="object-contain p-6 w-full filter brightness-75 group-hover:brightness-100 transition-all duration-500"
                priority
              />
            </div>
            
            <div className="flex flex-col justify-center border-l md:border-l-white/10 md:border-t-0 border-t border-white/10 pl-0 md:pl-10 pt-8 md:pt-0 w-full">
              <div className="flex items-center gap-3 mb-3">
                <span className="flex items-center justify-center w-6 h-6 rounded bg-emerald-500/10 border border-emerald-500/20 text-emerald-500">
                  <Award className="w-3.5 h-3.5" />
                </span>
                <span className="text-[10px] uppercase font-mono tracking-widest text-emerald-500">
                  {educationData.university.period}
                </span>
              </div>
              <h3 className="text-3xl font-bold text-white tracking-wide mb-2 group-hover:text-emerald-50 transition-colors">
                {educationData.university.name}
              </h3>
              <p className="text-white/60 text-[11px] font-mono tracking-[0.2em] uppercase mb-5">
                {educationData.university.degree}
              </p>
              <p className="text-white/50 leading-relaxed text-[0.9rem] max-w-xl">
                {educationData.university.description}
              </p>
            </div>

            {/* Bottom accent line */}
            <div className="absolute bottom-0 left-0 h-px bg-emerald-500 transition-all duration-700 ease-out w-0 group-hover:w-full opacity-0 group-hover:opacity-70" />
          </div>
        </motion.div>

        {/* Courses Section Title */}
        <div className="flex flex-col items-center mb-12">
          <h3 className="text-xl md:text-2xl font-bold text-white tracking-tight">Specialized Certifications</h3>
        </div>

        {/* Udemy Courses Grid */}
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3 max-w-7xl mx-auto">
          {educationData.udemyCourses.map((course, index) => (
            <motion.div
              key={course.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="h-full"
            >
              <CourseCard course={course} accent={accent} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

function CourseCard({ course, accent }: { course: any, accent: string }) {
  const [hovered, setHovered] = useState(false)

  return (
    <Link
      href={course.url}
      target="_blank"
      rel="noopener noreferrer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group relative flex flex-col h-full bg-[#0a0a0a] transition-all duration-500 overflow-hidden block"
      style={{
        border: `1px solid ${hovered ? accent + '40' : '#ffffff10'}`,
        boxShadow: hovered ? `0 10px 40px -10px ${accent}15` : 'none',
      }}
    >
      {/* Corner cut-out / accent effect */}
      <div 
        className="absolute top-0 right-0 w-12 h-12 pointer-events-none z-20 transition-opacity duration-500"
        style={{
          background: `linear-gradient(135deg, transparent 50%, ${accent}20 100%)`,
          opacity: hovered ? 1 : 0
        }}
      />
      <div className="absolute top-0 right-0 w-px h-12 pointer-events-none z-20" style={{ background: `linear-gradient(to bottom, ${hovered ? accent : 'transparent'}60, transparent)` }} />
      <div className="absolute top-0 right-0 w-12 h-px pointer-events-none z-20" style={{ background: `linear-gradient(to left, ${hovered ? accent : 'transparent'}60, transparent)` }} />

      <div className="relative w-full h-44 overflow-hidden border-b border-white/5 bg-black">
        <Image
          src={course.certificateImage}
          alt={`${course.title} Certificate`}
          fill
          className="object-cover transition-transform duration-1000 group-hover:scale-[1.05] filter grayscale-[40%] group-hover:grayscale-0 opacity-80 group-hover:opacity-100"
          priority={false}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent opacity-90" />
        
        {/* Play/View Button overlay */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/20 backdrop-blur-[2px]">
          <div className="w-10 h-10 rounded-full border border-emerald-500/50 bg-emerald-500/20 flex items-center justify-center text-emerald-400">
            <ExternalLink className="w-4 h-4 ml-0.5" />
          </div>
        </div>
      </div>

      <div className="p-6 flex flex-col flex-grow justify-between relative bg-gradient-to-b from-transparent to-white/[0.01]">
        <div>
          <div className="flex items-center gap-2 mb-3">
             <span className="px-2 py-0.5 border border-white/10 text-white/40 text-[8px] font-mono uppercase tracking-[0.2em] bg-white/5 rounded-sm">
               {course.provider}
             </span>
             <span className="text-[9px] font-mono tracking-widest text-emerald-500/80">
               {course.date}
             </span>
          </div>
          <h4 className="text-base font-bold text-white/90 tracking-wide leading-snug group-hover:text-emerald-400 transition-colors">
            {course.title}
          </h4>
        </div>
        
        <div className="mt-6 flex items-center text-[9px] font-mono uppercase tracking-[0.2em] text-white/30 group-hover:text-white/70 transition-colors">
          <span>View Credential</span>
          <ChevronRight className="w-3 h-3 ml-1 transition-transform group-hover:translate-x-1" />
        </div>
      </div>
      
      {/* Animated bottom line */}
      <div 
        className="absolute bottom-0 left-0 h-px bg-emerald-500 transition-all duration-500 ease-out"
        style={{ width: hovered ? '100%' : '0%', opacity: hovered ? 0.7 : 0 }}
      />
    </Link>
  )
}
