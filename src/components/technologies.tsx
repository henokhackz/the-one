'use client'

import React from 'react'
import { DiVisualstudio } from 'react-icons/di'
import { FaReact, FaNodeJs, FaJava, FaGitAlt, FaGithub, FaBootstrap, FaAws } from 'react-icons/fa'
import { MdJavascript } from 'react-icons/md'
import {
  SiTypescript, SiTailwindcss, SiVercel, SiPostman, SiMongodb, SiPostgresql,
  SiPrisma, SiNextdotjs, SiFigma, SiPython, SiExpress
} from 'react-icons/si'

const techStack = {
  Languages: [
    { name: 'JavaScript', icon: <MdJavascript className="text-yellow-400 w-6 h-6" /> },
    { name: 'TypeScript', icon: <SiTypescript className="text-blue-500 w-6 h-6" /> },
    { name: 'Python (Basic)', icon: <SiPython className="text-yellow-500 w-6 h-6" /> },
    { name: 'Java (Basic)', icon: <FaJava className="text-red-600 w-6 h-6" /> },
  ],
  'Frameworks & Libraries': [
    { name: 'React', icon: <FaReact className="text-cyan-400 w-6 h-6" /> },
    { name: 'Next.js', icon: <SiNextdotjs className="text-black dark:text-white w-6 h-6" /> },
    { name: 'Tailwind CSS', icon: <SiTailwindcss className="text-sky-400 w-6 h-6" /> },
    { name: 'Bootstrap', icon: <FaBootstrap className="text-purple-600 w-6 h-6" /> },
  ],
  'Tools & Platforms': [
    { name: 'Git', icon: <FaGitAlt className="text-orange-500 w-6 h-6" /> },
    { name: 'GitHub', icon: <FaGithub className="text-black dark:text-white w-6 h-6" /> },
    { name: 'Vercel', icon: <SiVercel className="text-black dark:text-white w-6 h-6" /> },
    { name: 'Postman', icon: <SiPostman className="text-orange-400 w-6 h-6" /> },
    { name: 'VS Code', icon: <DiVisualstudio className="text-blue-400 w-6 h-6" /> },
    { name: 'Figma', icon: <SiFigma className="text-pink-500 w-6 h-6" /> },
  ],
  'Backend & DevOps': [
    { name: 'Node.js', icon: <FaNodeJs className="text-green-600 w-6 h-6" /> },
    { name: 'Express.js', icon: <SiExpress className="text-black dark:text-white w-6 h-6" /> },
    { name: 'MongoDB', icon: <SiMongodb className="text-green-500 w-6 h-6" /> },
    { name: 'PostgreSQL', icon: <SiPostgresql className="text-blue-600 w-6 h-6" /> },
    { name: 'Prisma ORM', icon: <SiPrisma className="text-black dark:text-white w-6 h-6" /> },
    { name: 'AWS (Basics)', icon: <FaAws className="text-orange-500 w-6 h-6" /> },
  ],
}

const Technologies = () => {
  return (
    <section className="w-full px-6 py-12 bg-gray-100 dark:bg-slate-900">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-extrabold text-center mb-10 bg-gradient-to-r from-fuchsia-500 to-cyan-500 bg-clip-text text-transparent">
          My Tech Stack
        </h2>

        {Object.entries(techStack).map(([category, techs]) => (
          <div key={category} className="mb-8">
            <h3 className="text-lg font-semibold mb-3 text-gray-800 dark:text-white">
              {category}
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {techs.map((tech, idx) => (
                <div key={idx} className="rounded-lg bg-gradient-to-r from-fuchsia-500 to-cyan-500 p-[1px]">
                  <div className="flex flex-col items-center justify-center gap-1 p-3 rounded-lg bg-white dark:bg-slate-800 shadow transition-all duration-300 hover:shadow-md">
                    <div className="transition-transform hover:scale-105">{tech.icon}</div>
                    <p className="text-xs font-medium text-gray-700 dark:text-gray-300">{tech.name}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Technologies
