
  import React, { use } from 'react';
  import { allProjects } from '@/lib/dummy-data';
  import Image from 'next/image';
  import Link from 'next/link';

  const Project = ({
    params,
  }: {
    params: Promise<{ id: string }>
  }) => {
    const { id } = use(params);
    const project = allProjects.find((project) => project.id === id);

    if (!project) {
      return <div className="text-center text-red-500 text-xl">Project not found</div>;
    }

    const { title, description, technologies, caseStudy, status, github, live, image } = project;

    return (
      <div className="min-h-screen w-full px-6 md:px-12 lg:px-24 py-16 space-y-16">
        {/* 🔹 Hero Section */}
        <div className="flex flex-col lg:flex-row gap-12 items-start justify-between">
          {/* 🔸 Text Content */}
          <div className="w-full lg:w-1/2 space-y-6">
            <h1 className="text-4xl md:text-5xl font-extrabold leading-tight bg-gradient-to-r from-fuchsia-500 to-cyan-500 bg-clip-text text-transparent">
              {title}
            </h1>
            <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed">{description}</p>

            {/* 🛠️ Tech Stack */}
            <div>
              <h4 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Tech Stack:</h4>
              <ul className="flex flex-wrap gap-2 mt-2">
                {technologies.map((tech, index) => (
                  <li
                    key={index}
                    className="px-3 py-1 bg-gray-200 dark:bg-gray-800 text-sm rounded-full text-gray-800 dark:text-gray-200"
                  >
                    {tech}
                  </li>
                ))}
              </ul>
            </div>

            {/* 📌 Status */}
            <p className="text-md font-medium text-gray-700 dark:text-gray-300 mt-4">📌 Status: {status}</p>

            {/* 🔗 Links */}
            <div className="flex gap-6 mt-4">
              <Link href={github} target="_blank" className="text-blue-600 hover:underline text-base">
                🔗 View Code
              </Link>
              {live && (
                <Link href={live} target="_blank" className="text-green-600 hover:underline text-base">
                  🚀 Live Site
                </Link>
              )}
            </div>
          </div>

          {/* 🔸 Project Image */}
          <div className="w-full lg:w-1/2 flex justify-center">
            <div className="rounded-2xl overflow-hidden border-4 border-transparent bg-gradient-to-r from-fuchsia-500 to-cyan-500 p-1 shadow-lg">
              <Image
                src={image}
                alt={title}
                width={500}
                height={500}
                className="rounded-2xl object-cover"
                priority
              />
            </div>
          </div>
        </div>

        {/* 📚 Case Study */}
        {caseStudy && (
          <div className="max-w-4xl mx-auto space-y-10 border border-fuchsia-800/20 p-8 rounded-2xl">
            <div>
              <h2 className="text-2xl font-bold text-fuchsia-500 mb-2">🚩 Problem</h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{caseStudy.problem}</p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-cyan-500 mb-2">💡 Solution</h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{caseStudy.solution}</p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-green-500 mb-2">🚀 Features</h2>
              <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300">
                {caseStudy.features.map((feature, i) => (
                  <li key={i}>{feature}</li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-orange-500 mb-2">👨‍💻 Role</h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{caseStudy.role}</p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-blue-500 mb-2">📘 Lessons Learned</h2>
              <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300">
                {caseStudy.lessons.map((lesson, i) => (
                  <li key={i}>{lesson}</li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    );
  };

  export default Project;
