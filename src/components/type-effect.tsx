"use client";
import { TypewriterEffect } from "@/components/ui/typewriter-effect";

export function Typewriter() {
  const words = [
    {
      text: "Full",
    },
    {
      text: "Stack",
    },
    {
      text: "Developer",
        className: "text-blue-500 dark:text-blue-500",
    },
    {
      text: "with",
    },
    {
      text: "Passion",
      className: "text-blue-500 dark:text-blue-500",
    },
  ];
  return (
    <div className="flex flex-col items-center justify-center h-[10rem] ">
      <p className="text-neutral-600 dark:text-neutral-200 text-base  mb-10">
        The road to freedom starts from here
      </p>
      <TypewriterEffect words={words} />
        <p className="text-neutral-600 dark:text-neutral-200 text-base mt-10">
            Let's build something amazing together!
        </p>
      <p className="text-neutral-600 dark:text-neutral-200 text-base mt-2">
        <span className="text-blue-500 dark:text-blue-500">Lantumo Birhanu</span>
      </p>
    </div>
  );
}
