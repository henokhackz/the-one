'use client'

import React from 'react'
import { Briefcase } from 'lucide-react'

const experiences = [
    {
        role: 'Fullstack Freelancer',
        company: 'Freelance Consultant',
        date: 'June 2025 – current',
        location: 'Addis Ababa, Ethiopia',
        description:
            'Delivered end-to-end solutions using the MERN stack and Next.js with TypeScript and JavaScript. Focused on performance optimization, scalable workflows, and modern web practices.',
        technologies: ['MongoDB', 'Express', 'React', 'Node.js', 'Next.js', 'TypeScript', 'JavaScript'],
    },
    {
        role: 'Full Stack Developer Intern',
        company: 'Ethio Telecom',
        date: 'Jan 2024 – March 2025',
        location: 'On site in Hawassa, Ethiopia',
        description:
            'Developed internal tools and built REST APIs. Integrated frontend and backend systems with proper authentication and state management. Participated in weekly code reviews and deployments.',
        technologies: ['Next.js', 'Node.js', 'Prisma', 'PostgreSQL'],
    },
    {
        role: ' Web Developer Intern',
        company: 'Nile Techonologies',
        date: 'sempt 15 - 2025',
        location: 'Remote',
        description:
            ' building landing pages for AI-based online learning  platform.Designed fast, SEO-friendly web interfaces.',
        technologies: ['Markdown', 'SEO', 'Next.js', 'Tailwind CSS', 'Content Writing'],
    },
]

const Experience = () => {
  return (
    <section className="w-full px-6 md:px-12 lg:px-24 py-16 space-y-12">
      <div className="text-center">
        <h2 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-fuchsia-500 to-cyan-500 bg-clip-text text-transparent">
          Experience
        </h2>
        <p className="mt-2 text-gray-600 dark:text-gray-400 text-lg max-w-2xl mx-auto">
          A journey of hands-on learning, professional collaboration, and impact-driven work.
        </p>
      </div>

      <div className="space-y-12">
        {experiences.map((exp, index) => (
          <div
            key={index}
            className="border-l-4 border-fuchsia-500 pl-6 relative group hover:border-cyan-500 transition-all rounded-2xl"
          > 
            <div className="absolute -left-[50px] top-1/2 flex items-center justify-center bg-gradient-to-r from-fuchsia-500 to-cyan-500 rounded-full w-8 h-8 text-white shadow-md">
              <Briefcase className="w-4 h-4" />
            </div>
            <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">{exp.role}</h3>
            <div className="text-sm text-gray-600 dark:text-gray-400 font-medium mb-2">
              {exp.company} • {exp.location} • {exp.date}
            </div>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-2">{exp.description}</p>
            <div className="flex flex-wrap gap-2">
              {exp.technologies.map((tech, i) => (
                <span
                  key={i}
                  className="bg-gray-200 dark:bg-gray-800 text-sm px-3 py-1 rounded-full text-gray-800 dark:text-gray-200"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Experience
