
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
            <h1 className="text-4xl md:text-5xl font-extrabold leading-tight text-white uppercase tracking-tighter">
              {title}
            </h1>
            <p className="text-gray-400 text-lg leading-relaxed">{description}</p>

            {/* 🛠️ Tech Stack */}
            <div>
              <h4 className="text-lg font-semibold text-white">Tech Stack:</h4>
              <ul className="flex flex-wrap gap-2 mt-2">
                {technologies.map((tech, index) => (
                  <li
                    key={index}
                    className="px-3 py-1 bg-white/5 border border-white/10 text-sm rounded text-gray-300 uppercase tracking-widest text-[10px]"
                  >
                    {tech}
                  </li>
                ))}
              </ul>
            </div>

            {/* 📌 Status */}
            <p className="text-md font-medium text-gray-400 mt-4 uppercase tracking-widest text-xs">📌 Status: {status}</p>

            {/* 🔗 Links */}
            <div className="flex gap-6 mt-4">
              <Link href={github} target="_blank" className="text-white hover:underline text-xs uppercase tracking-widest border-b border-white/20 pb-1">
                🔗 View Code
              </Link>
              {live && (
                <Link href={live} target="_blank" className="text-white hover:underline text-xs uppercase tracking-widest border-b border-white/20 pb-1">
                  🚀 Live Site
                </Link>
              )}
            </div>
          </div>

          {/* 🔸 Project Image */}
          <div className="w-full lg:w-1/2 flex justify-center">
            <div className="rounded-2xl overflow-hidden border border-white/10 bg-white/5 p-1 shadow-2xl">
              <Image
                src={image}
                alt={title}
                width={500}
                height={500}
                className="rounded-2xl object-cover filter grayscale hover:grayscale-0 transition-all duration-700"
                priority
              />
            </div>
          </div>
        </div>

        {/* 📚 Case Study */}
        {caseStudy && (
          <div className="max-w-4xl mx-auto space-y-10 border border-white/10 p-8 rounded-2xl glass-panel">
            <div>
              <h2 className="text-2xl font-bold text-white mb-2 uppercase tracking-tight">🚩 Problem</h2>
              <p className="text-gray-400 leading-relaxed">{caseStudy.problem}</p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-white mb-2 uppercase tracking-tight">💡 Solution</h2>
              <p className="text-gray-400 leading-relaxed">{caseStudy.solution}</p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-white mb-2 uppercase tracking-tight">🚀 Features</h2>
              <ul className="list-disc list-inside space-y-1 text-gray-400">
                {caseStudy.features.map((feature, i) => (
                  <li key={i}>{feature}</li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-white mb-2 uppercase tracking-tight">👨‍💻 Role</h2>
              <p className="text-gray-400 leading-relaxed">{caseStudy.role}</p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-white mb-2 uppercase tracking-tight">📘 Lessons Learned</h2>
              <ul className="list-disc list-inside space-y-1 text-gray-400">
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
