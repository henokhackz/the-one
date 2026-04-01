'use client'

import { useState } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { ExternalLink, Github, ArrowRight } from "lucide-react"
import Link from "next/link"
import { motion } from "motion/react"
import { allProjects } from "@/lib/dummy-data"

export function Projects() {
  const [showAll, setShowAll] = useState(false)
  const router = useRouter()

  const projectsToShow = showAll
    ? allProjects
    : allProjects.filter((p) => p.featured)

  const accent = '#10b981'

  return (
    <section className="relative w-full py-24 md:py-32 bg-black overflow-hidden" id="projects">
      {/* Ambient background glow */}
      <div
        className="absolute top-1/4 left-0 w-[500px] h-[500px] pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(16,185,129,0.03) 0%, transparent 60%)',
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
                System Architecture
              </span>
              <div className="h-px w-6 bg-emerald-500" />
            </div>
            
            <h2 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight">
              Featured Projects
            </h2>
            <p className="mt-4 text-sm text-white/40 max-w-lg leading-relaxed">
              A selection of scalable systems, complex UI implementations, and full-stack solutions built for modern web standards.
            </p>
          </motion.div>
        </div>

        {/* Grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 w-full">
          {projectsToShow.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="h-full"
            >
              <ProjectCard project={project} accent={accent} router={router} />
            </motion.div>
          ))}
        </div>

        {/* Load More Button */}
        {!showAll && (
          <motion.div 
            className="mt-20 flex justify-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <button
              onClick={() => setShowAll(true)}
              className="relative group px-8 py-3.5 border border-[#10b981]/30 bg-[#10b981]/[0.02] text-white tracking-[0.2em] uppercase text-[10px] font-bold overflow-hidden transition-all duration-500"
            >
              <div className="absolute inset-0 bg-[#10b981] translate-y-[100%] group-hover:translate-y-0 transition-transform duration-500 ease-out" />
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ boxShadow: '0 0 20px 2px rgba(16,185,129,0.4) inset' }} />
              
              <span className="relative z-10 group-hover:text-black transition-colors duration-300">
                Load More Modules
              </span>
            </button>
          </motion.div>
        )}
      </div>
    </section>
  )
}

function ProjectCard({ project, accent, router }: { project: any, accent: string, router: any }) {
  const [hovered, setHovered] = useState(false)

  return (
    <div
      onClick={() => router.push(`/projects/${project.id}`)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group relative flex flex-col h-full bg-[#0a0a0a] transition-all duration-500 cursor-pointer overflow-hidden"
      style={{
        border: `1px solid ${hovered ? accent + '40' : '#ffffff10'}`,
        boxShadow: hovered ? `0 10px 40px -10px ${accent}20` : 'none',
      }}
    >
      {/* Corner cut-out / accent effect */}
      <div 
        className="absolute top-0 right-0 w-16 h-16 pointer-events-none z-20 transition-opacity duration-500"
        style={{
          background: `linear-gradient(135deg, transparent 50%, ${accent}20 100%)`,
          opacity: hovered ? 1 : 0.3
        }}
      />
      <div 
        className="absolute top-0 right-0 w-px h-16 pointer-events-none z-20"
        style={{ background: `linear-gradient(to bottom, ${accent}60, transparent)` }}
      />
      <div 
        className="absolute top-0 right-0 w-16 h-px pointer-events-none z-20"
        style={{ background: `linear-gradient(to left, ${accent}60, transparent)` }}
      />

      {/* Image Container */}
      <div className="relative h-56 w-full overflow-hidden border-b border-white/5">
        <Image
          src={project.image}
          alt={project.title}
          fill
          className="object-cover transition-transform duration-1000 group-hover:scale-[1.03] filter grayscale-[40%] group-hover:grayscale-0"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] to-transparent opacity-90" />
        
        {/* Status Badge */}
        <div className="absolute top-4 left-4 z-10 flex items-center gap-2 px-2.5 py-1 text-[8px] font-mono uppercase tracking-widest backdrop-blur-md bg-black/40 border border-white/10">
          <span className="w-1.5 h-1.5 rounded-full" style={{ background: project.status.includes('Finished') ? accent : '#f59e0b' }} />
          <span className="text-white/80">{project.status}</span>
        </div>
      </div>

      {/* Content */}
      <div className="p-7 flex flex-col justify-between flex-grow relative bg-gradient-to-b from-transparent to-white/[0.01]">
        <div className="space-y-4">
          <h3 className="text-xl font-bold text-white tracking-wide leading-snug group-hover:text-gray-200 transition-colors">
            {project.title}
          </h3>
          <p className="text-[0.85rem] text-white/50 leading-[1.7] line-clamp-3">
            {project.description}
          </p>
          
          <div className="flex flex-wrap gap-2 pt-3">
            {project.technologies.slice(0, 4).map((tech: string) => (
              <span
                key={tech}
                className="text-[9px] uppercase font-mono tracking-[0.2em] border border-white/10 text-white/40 px-2 py-1 transition-colors duration-300"
                style={{
                  color: hovered ? accent : '',
                  borderColor: hovered ? `${accent}30` : '',
                  background: hovered ? `${accent}05` : 'transparent'
                }}
              >
                {tech}
              </span>
            ))}
            {project.technologies.length > 4 && (
              <span className="text-[9px] uppercase font-mono tracking-[0.2em] border border-white/10 text-white/30 px-2 py-1">
                +{project.technologies.length - 4}
              </span>
            )}
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex justify-between items-center mt-8 pt-5 border-t border-white/10">
          <div className="flex gap-3">
            <Link
              href={project.live}
              target="_blank"
              onClick={(e) => e.stopPropagation()}
              className="text-white/30 hover:text-white transition-colors p-2 hover:bg-white/5 rounded"
            >
              <ExternalLink className="w-4 h-4" />
            </Link>
            <Link
              href={project.github}
              target="_blank"
              onClick={(e) => e.stopPropagation()}
              className="text-white/30 hover:text-white transition-colors p-2 hover:bg-white/5 rounded"
            >
              <Github className="w-4 h-4" />
            </Link>
          </div>
          <div 
            className="text-white opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300"
            style={{ color: accent }}
          >
            <ArrowRight className="w-4 h-4" />
          </div>
        </div>

        {/* Animated bottom line */}
        <div 
          className="absolute bottom-0 left-0 h-px bg-emerald-500 transition-all duration-500 ease-out"
          style={{ width: hovered ? '100%' : '0%', opacity: hovered ? 0.7 : 0 }}
        />
      </div>
    </div>
  )
}
