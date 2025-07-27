'use client'

import Image from "next/image";
import Link from "next/link";
import { FaLinkedinIn, FaTelegram } from "react-icons/fa";
import { FaUpwork } from "react-icons/fa6";

export function Hero() {
  return (
    <section className="relative flex flex-col md:flex-row items-center justify-between gap-12 min-h-screen px-6 py-12 bg-gray-100 dark:bg-slate-900 overflow-hidden">

      {/* 🔙 Background Layer */}
      <div className="absolute inset-0 z-0 bg-[url(/dot-background.png)] bg-cover bg-center opacity-10 dark:opacity-20 pointer-events-none" />

      {/* ✨ Main Content */}
      <div className="relative z-10 flex flex-col md:flex-row items-center justify-between w-full gap-12">
        
        {/* 📄 Text Section */}
        <div className="max-w-xl text-center md:text-left flex flex-col gap-6 w-full lg:w-1/2">
          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-extrabold leading-tight bg-gradient-to-r from-fuchsia-500 to-cyan-500 bg-clip-text text-transparent">
            Hi, I&apos;m Lantumo Birhanu
          </h1>

          <div className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed space-y-3 ">
            <p className="text-lg md:text-2xl text-slate-800 dark:text-fuchsia-400 ">
              A passionate developer who loves turning ideas into fast, scalable, and user-centric web apps.
            </p>
            <ul className="list-disc list-inside space-y-1 text-sm">
              <li>⚡ Real-time & AI-powered platforms</li>
              <li>🧠 Clean, maintainable, modern web applications</li>
              <li>🌍 Full stack expertise: Next.js, Node.js, MongoDB, PostgreSQL</li>
              <li>🧩 Highly interactive UIs & efficient APIs</li>
              <li>🎯 Open to freelance & remote opportunities</li>
            </ul>
            <p>
              📬 Reach out:{" "}
              <a
                href="mailto:hbirhanu.dev@gmail.com"
                className="underline hover:text-fuchsia-500 transition"
              >
                hbirhanu.dev@gmail.com
              </a>
            </p>
          </div>

          {/* 🌐 Social Icons */}
          <div className="flex justify-center md:justify-start gap-6 mt-4">
            <Link
              href="https://www.upwork.com/freelancers/~014970832ba09c14d3?mp_source=share"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Upwork"
              className="text-3xl text-gray-700 dark:text-gray-300 hover:text-fuchsia-500 transition rounded-full p-2 border border-fuchsia-500"
            >
              <FaUpwork />
            </Link>
            <Link
              href="https://t.me/lyzon1"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Telegram"
              className="text-3xl text-gray-700 dark:text-gray-300 hover:text-cyan-500 transition p-2 border border-fuchsia-500 rounded-full"
            >
              <FaTelegram />
            </Link>
            <Link
              href="https://www.linkedin.com/in/lantumobirhanu/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="text-3xl text-gray-700 dark:text-gray-300 hover:text-blue-500 transition p-2 border border-fuchsia-500 rounded-full"
            >
              <FaLinkedinIn />
            </Link>
          </div>
        </div>

        {/* 🖼️ Hero Image */}
        <div className="relative w-full lg:w-1/2 hidden lg:flex justify-center">
          <div className="rounded-2xl max-w-full  max-h-full   items-center justify-center flex">
           <img src='/hero.png' className="h-full w-full rounded-full  object-cover "  alt="lantumo profile picture h-full"/>
          </div>
        </div>
      </div>
    </section>
  );
}
