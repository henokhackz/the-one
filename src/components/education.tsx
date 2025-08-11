"use client"

import React from "react"
import Image from "next/image"
import Link from "next/link"
import { ExternalLink } from "lucide-react"
import { educationData } from "@/lib/constants"


export function Education() {
  return (
    <section
      id="education"
      className="w-full   rounded-e-2xl dark:bg-slate-900 py-12 px-6 max-w-7xl mx-auto shadow-none"
    >
      <h2 className="text-center text-3xl font-extrabold mb-12 bg-gradient-to-r from-fuchsia-500 to-cyan-500 bg-clip-text text-transparent">
        Education and  Courses
      </h2>

      {/* University Card */}
      <div className="flex w-full items-center bg-white dark:bg-slate-800 rounded-xl shadow-md p-6 mb-12 max-w-4xl mx-auto gap-6">
        <div className="relative w-24 h-24 flex-shrink-0 rounded-lg overflow-hidden border border-gray-200 dark:border-slate-700">
          <Image
            src={educationData.university.logo || '/arbaminch-logo.png'}
            alt={`${educationData.university.name} Logo`}
            fill
            className="object-contain p-3 w-full"
            priority
          />
        </div>
        <div className="flex flex-col justify-center">
          <h3 className="text-2xl font-semibold text-gray-800 dark:text-white">
            {educationData.university.name}
          </h3>
          <p className="text-gray-600 dark:text-gray-300 font-medium">
            {educationData.university.degree}
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
            {educationData.university.period}
          </p>
          <p className="text-gray-700 dark:text-gray-200 max-w-lg leading-relaxed">
            {educationData.university.description}
          </p>
        </div>
      </div>

      {/* Udemy Courses Grid */}
      <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3 max-w-7xl mx-auto">
        {educationData.udemyCourses.map((course) => (
          <div
            key={course.id}
            className="group bg-gradient-to-r from-fuchsia-500 to-cyan-500 p-[2px] rounded-xl cursor-pointer transition-transform hover:scale-[1.02]"
          >
            <div className="bg-white dark:bg-slate-800 rounded-xl shadow-md overflow-hidden flex flex-col h-full">
              <div className="relative w-full h-48 overflow-hidden rounded-t-xl">
                <Image
                  src={course.certificateImage}
                  alt={`${course.title} Certificate`}
                  fill
                  className="object-cover group-hover:brightness-90 transition"
                  priority={false}
                />
              </div>

              <div className="p-5 flex flex-col flex-grow justify-between">
                <div>
                  <h4 className="text-lg font-semibold text-gray-800 dark:text-white mb-1">
                    {course.title}
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                    {course.provider} • {course.date}
                  </p>
                </div>
                <Link
                  href={course.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-blue-600 dark:text-blue-400 hover:underline mt-3"
                  onClick={(e) => e.stopPropagation()}
                >
                  View Certificate <ExternalLink className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
