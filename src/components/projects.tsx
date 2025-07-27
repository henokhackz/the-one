'use client'

import { useState } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { ExternalLink, Github } from "lucide-react"
import Link from "next/link"
import { allProjects } from "../lib/dummy-data"

export function Projects() {
  const [showAll, setShowAll] = useState(false)
  const router = useRouter()

  const projectsToShow = showAll
    ? allProjects
    : allProjects.filter((p) => p.featured)

  return (
    <section className="w-full  bg-gray-100 dark:bg-slate-900" id="projects">
      <h2 className="text-xl lg:text-3xl font-extrabold text-center mb-12 bg-gradient-to-r from-fuchsia-500 to-cyan-500 bg-clip-text text-transparent">
        Featured Projects
      </h2>

      <div className="grid gap-10 md:grid-cols-2 xl:grid-cols-3 w-full">
        {projectsToShow.map((project) => (
          <div
            key={project.id}
            className="group bg-gradient-to-r from-fuchsia-500 to-cyan-500 p-[2px] rounded-xl transition-transform hover:scale-[1.01] cursor-pointer"
            onClick={() => router.push(`/projects/${project.id}`)}
          >
            <div className="bg-white group-hover:bg-gray-100 dark:bg-slate-800 rounded-xl overflow-hidden shadow-md h-full flex flex-col">
              {/* Image */}
              <div className="relative h-48 w-full overflow-hidden">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover transition group-hover:brightness-75 rounded-2xl p-1"
                />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 bg-black/40 transition">
                  <span className="px-4 py-1.5 bg-gradient-to-r from-fuchsia-500 to-cyan-500 text-white text-sm font-medium rounded-full shadow-md">
                    View Details
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-5 flex flex-col justify-between flex-grow">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-bold text-gray-800 dark:text-white">{project.title}</h3>
                    <span className="text-xs text-green-600 dark:text-green-400">{project.status}</span>
                  </div>
                  <p className="text-sm text-gray-700 dark:text-gray-300 line-clamp-3">{project.description}</p>
                  <div className="flex flex-wrap gap-2 pt-2">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="text-xs bg-slate-200 dark:bg-slate-700 text-gray-800 dark:text-white px-2 py-0.5 rounded"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex gap-4 mt-4">
                  <Link
                    href={project.live}
                    target="_blank"
                    onClick={(e) => e.stopPropagation()}
                    className="text-sm text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1"
                  >
                    <ExternalLink className="w-4 h-4" />
                    Live
                  </Link>
                  <Link
                    href={project.github}
                    target="_blank"
                    onClick={(e) => e.stopPropagation()}
                    className="text-sm text-gray-700 dark:text-gray-300 hover:underline flex items-center gap-1"
                  >
                    <Github className="w-4 h-4" />
                    GitHub
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {!showAll && (
        <div className="mt-16 flex justify-center">
          <button
            onClick={() => setShowAll(true)}
            className="px-6 py-2 rounded-xl text-white font-medium bg-gradient-to-r from-fuchsia-500 to-cyan-500 hover:opacity-90 shadow"
          >
            Load More Projects
          </button>
        </div>
      )}
    </section>
  )
}
