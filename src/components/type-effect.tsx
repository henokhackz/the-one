"use client";
import { TypewriterEffect } from "@/components/ui/typewriter-effect";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export function Typewriter() {
  const words = [
    { text: "Full" },
    { text: "Stack" },
    { text: "Developer", className: "text-blue-500 dark:text-blue-500" },
    { text: "with" },
    { text: "Passion", className: "text-blue-500 dark:text-blue-500" },
  ];

  return (
    <div className="flex flex-col items-center justify-center  mt-20 w-full gap-4">
      <h1 className="text-4xl font-extrabold  text-center">
        <TypewriterEffect words={words} />
      </h1>
      <p className="max-w-xl text-lg  text-center text-gray-500">
        Freelance Developer who transforms ideas into exceptional digital experiences.
      </p>
      <Link href="https://www.upwork.com/freelancers/~014970832ba09c14d3?mp_source=share" legacyBehavior>
        <a
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center px-6 py-3  font-semibold rounded-full transition bg-blue-500 text-white hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Hire Me on Upwork
          <ArrowRight className="w-5 h-5 ml-2" />
        </a>
      </Link>
      <p className="text-base  text-center text-gray-500">
        Let's build something amazing together!
      </p>
      <p className="text-base  text-center">
        <span className="font-bold text-blue-600 dark:text-blue-400">Lantumo Birhanu</span>
      </p>
    </div>
  );
}
