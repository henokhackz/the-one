"use client";

import Image from "next/image";
import { GlowingEffect } from "@/components/ui/glowing-effect";
import { ExternalLink, Github } from "lucide-react";

export interface ProjectData {
  title: string;
  description: string;
  technologies: string[];
  image: string;
  github: string;
  live: string;
}

export function Project({ data }: { data: ProjectData }) {
  return (
    <li className="min-h-[18rem] list-none">
      <div className="relative h-full rounded-2xl border p-2 md:rounded-3xl md:p-3">
        <GlowingEffect spread={40} glow={true} disabled={false} proximity={64} inactiveZone={0.01} />

        <div className="relative flex h-full flex-col justify-between gap-4 rounded-xl p-4 md:p-6 dark:shadow-[0px_0px_27px_0px_#2D2D2D]">
          {/* Image */}
          <Image
            src={data.image}
            alt={data.title}
            width={800}
            height={400}
            className="w-full h-40 object-cover rounded-lg border border-neutral-800"
          />

          {/* Content */}
          <div className="flex flex-col gap-3">
            <h3 className="text-xl font-semibold text-black dark:text-white">{data.title}</h3>
            <p className="text-sm text-neutral-700 dark:text-neutral-300">{data.description}</p>
            <div className="flex flex-wrap gap-2 text-xs text-white">
              {data.technologies.map((tech, i) => (
                <span
                  key={i}
                  className="bg-neutral-800 dark:bg-neutral-700 px-2 py-0.5 rounded-md text-[0.7rem]"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Links */}
          <div className="mt-4 flex items-center justify-between text-xs text-blue-600 dark:text-blue-400">
            <a href={data.live} target="_blank" className="flex items-center gap-1 hover:underline" rel="noopener noreferrer">
              <ExternalLink className="w-4 h-4" />
              Live
            </a>
            <a href={data.github} target="_blank" className="flex items-center gap-1 hover:underline" rel="noopener noreferrer">
              <Github className="w-4 h-4" />
              GitHub
            </a>
          </div>
        </div>
      </div>
    </li>
  );
}
