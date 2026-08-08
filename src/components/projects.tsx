"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ExternalLink, Github, ArrowRight } from "lucide-react";
import Link from "next/link";
import { motion } from "motion/react";
import { allProjects } from "@/lib/dummy-data";

export function Projects() {
  const [showAll, setShowAll] = useState(false);
  const router = useRouter();

  const featuredProjects = allProjects.filter((p) => p.featured);

  // Take first 4 for the grid
  const gridProjects = featuredProjects.slice(0, 4);

  // The rest depends on if showAll is active
  const remainingProjects = showAll
    ? allProjects.filter((p) => !gridProjects.includes(p))
    : featuredProjects.slice(4); // If there are more than 4 featured

  const accent = "#f59e0b";

  return (
    <section
      className="relative w-full py-16 md:py-24 bg-black overflow-hidden flex justify-center text-white"
      id="projects"
    >
      <div className="w-full px-6 md:px-16 flex flex-col relative z-10">
        {/* Header */}
        <div className="flex flex-col mb-12">
          <p className="text-2xl md:text-3xl font-bold text-white/50 mb-4">
            (FEATURED WORK)
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6 w-full mb-8">
          {gridProjects.map((project, index) => {
            // Assign grid col spans
            let colSpanClasses = "";
            if (index === 0) colSpanClasses = "md:col-span-5";
            else if (index === 1) colSpanClasses = "md:col-span-7";
            else if (index === 2) colSpanClasses = "md:col-span-7";
            else if (index === 3) colSpanClasses = "md:col-span-5";

            return (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className={`h-full min-h-[400px] lg:min-h-[500px] ${colSpanClasses}`}
              >
                <BentoCard
                  project={project}
                  accent={accent}
                  router={router}
                  index={index}
                />
              </motion.div>
            );
          })}
        </div>

        {/* Regular Grid for Remaining Projects */}

        {/* Load More Button */}
        {!showAll && (
          <div className="mt-16 flex justify-center w-full">
            <div className="flex h-12 md:h-14 gap-2 group cursor-pointer w-full max-w-[320px]">
              <button
                onClick={() => setShowAll(true)}
                className="bg-white text-black text-xs md:text-sm font-bold tracking-widest uppercase px-4 md:px-6 flex items-center justify-center hover:bg-gray-200 transition-colors h-full rounded-md whitespace-nowrap flex-1"
              >
                VIEW ALL PROJECTS
              </button>
              <button
                onClick={() => setShowAll(true)}
                className="bg-[#f59e0b] text-black w-14 md:w-16 flex items-center justify-center hover:bg-[#d97706] transition-colors h-full rounded-md flex-shrink-0"
              >
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

function BentoCard({
  project,
  accent,
  router,
  index,
}: {
  project: any;
  accent: string;
  router: any;
  index: number;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onClick={() => router.push(`/projects/${project.id}`)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group relative flex flex-col h-full rounded-2xl overflow-hidden cursor-pointer bg-white/10"
    >
      {/* Background Image */}
      <div className="absolute inset-0 z-0 bg-transparent">
        <Image
          src={project.image}
          alt={project.title}
          fill
          className="object-cover transition-transform duration-1000 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-black/60 group-hover:bg-black/40 transition-colors duration-500" />
      </div>

      <div className="absolute inset-0 border border-white/10 rounded-2xl z-20 pointer-events-none transition-colors duration-500 group-hover:border-white/20" />

      {/* Content */}
      <div className="relative z-10 flex flex-col justify-between h-full p-8 md:p-10">
        <div className="relative z-10 max-w-sm">
          <h3 className="text-2xl md:text-3xl lg:text-2xl font-bold uppercase text-white mb-2 leading-tight">
            {project.title}
          </h3>
        </div>

        <div className="flex items-end justify-between mt-auto">
          <div className="flex items-center gap-2 text-white/70 text-sm md:text-base font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-white" />
            <span>2024</span>
          </div>

          <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-black/20 backdrop-blur-xl flex items-center justify-center border border-white/20 transition-all duration-300 opacity-0 group-hover:opacity-100 shadow-xl group-hover:-translate-y-1 group-hover:-translate-x-1">
            <ArrowRight className="w-5 h-5 md:w-6 md:h-6 text-white transform -rotate-45" />
          </div>
        </div>
      </div>
    </div>
  );
}

function RegularCard({
  project,
  accent,
  router,
}: {
  project: any;
  accent: string;
  router: any;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onClick={() => router.push(`/projects/${project.id}`)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group relative flex flex-col h-full bg-white/5 rounded-2xl overflow-hidden border border-white/10 cursor-pointer transition-colors hover:bg-white/10"
    >
      <div className="relative h-56 w-full overflow-hidden">
        <Image
          src={project.image}
          alt={project.title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent opacity-90" />

        {/* Status Badge */}
        <div className="absolute top-4 left-4 z-10 flex items-center gap-2 px-3 py-1.5 text-xs font-medium backdrop-blur-md bg-white/10 text-white rounded-full border border-white/10">
          <span
            className="w-1.5 h-1.5 rounded-full"
            style={{ background: accent }}
          />
          <span>{project.status}</span>
        </div>
      </div>

      <div className="p-6 md:p-8 flex flex-col flex-grow">
        <h3 className="text-xl md:text-2xl font-bold text-white mb-3 line-clamp-1 uppercase tracking-tight">
          {project.title}
        </h3>
        <p className="text-sm md:text-base text-gray-400 font-light mb-6 line-clamp-2 leading-relaxed">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-2 mt-auto pb-6">
          {project.technologies.slice(0, 3).map((tech: string) => (
            <span
              key={tech}
              className="text-xs text-white/50 bg-white/5 px-3 py-1.5 rounded-md tracking-wider uppercase font-medium"
            >
              {tech}
            </span>
          ))}
        </div>

        <div className="flex justify-between items-center pt-5 border-t border-white/10">
          <div className="flex gap-4">
            <Link
              href={project.live}
              target="_blank"
              onClick={(e) => e.stopPropagation()}
              className="text-white/40 hover:text-white transition-colors p-1"
            >
              <ExternalLink className="w-5 h-5" />
            </Link>
            <Link
              href={project.github}
              target="_blank"
              onClick={(e) => e.stopPropagation()}
              className="text-white/40 hover:text-white transition-colors p-1"
            >
              <Github className="w-5 h-5" />
            </Link>
          </div>
          <ArrowRight className="w-5 h-5 text-white/40 group-hover:text-[#f59e0b] group-hover:translate-x-1 transition-all" />
        </div>
      </div>
    </div>
  );
}
