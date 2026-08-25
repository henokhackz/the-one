"use client";

import React, { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export function Testimonials() {
  const testimonials = [
    {
      id: 1,
      name: "Abel Mekonnen",
      role: "Startup Founder",
      quote:
        "Bringing our product to life felt effortless. The communication was clear from day one, and every feature shipped looked polished and performed exactly as we imagined. I would gladly work together again.",
    },
    {
      id: 2,
      name: "Hiwot Bekele",
      role: "Engineering Lead",
      quote:
        "Working with this developer was an absolute game-changer for our team. The perfect blend of technical depth and an exceptional eye for design resulted in a product our users genuinely love.",
    },
    {
      id: 3,
      name: "Yonas Tadesse",
      role: "Product Manager",
      quote:
        "They delivered high-quality code at an impressive pace while keeping everyone aligned throughout the process. I highly recommend them for any complex web application work.",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const handlePrev = () => {
    setCurrentIndex(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length,
    );
  };

  return (
    <section className="relative w-full min-h-screen flex items-center justify-center py-24 overflow-hidden text-foreground">
      {/* Title */}
      <div className="absolute top-12 left-6 md:top-24 xl:left-16 lg:left-12 z-10 w-full px-6 md:px-0">
        <p className="text-xl md:text-2xl font-bold text-muted tracking-wide">
          (TESTIMONIALS)
        </p>
      </div>

      <div className="w-full max-w-[1400px] mx-auto px-6 md:px-12 xl:px-16 flex items-center justify-between relative mt-16 md:mt-0">
        {/* Left Arrow */}
        <button
          onClick={handlePrev}
          className="w-12 h-12 md:w-16 md:h-16 flex items-center justify-center bg-surface rounded-lg hover:bg-foreground/10 transition-colors z-20 flex-shrink-0"
          aria-label="Previous testimonial"
        >
          <ChevronLeft className="w-5 h-5 md:w-6 md:h-6 text-muted" />
        </button>

        {/* Content Container */}
        <div className="flex-1 flex justify-center px-4 md:px-16 overflow-hidden min-h-[500px] items-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="flex flex-col items-center text-center max-w-4xl"
            >
              <div className="relative w-20 h-20 md:w-24 md:h-24 rounded-full mb-12 flex items-center justify-center border border-accent/40 bg-surface text-foreground text-2xl md:text-3xl font-bold">
                {testimonials[currentIndex].name.charAt(0)}
              </div>

              <p className="text-lg md:text-2xl lg:text-[1.75rem] leading-[1.6] md:leading-relaxed text-muted mb-14 font-light px-2 xl:px-10">
                {testimonials[currentIndex].quote}
              </p>

              <div className="flex flex-col items-center">
                <div className="mb-4 text-accent opacity-90 scale-x-125">
                  <svg
                    width="40"
                    height="30"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M11 10C11 12.2091 9.20914 14 7 14C4.79086 14 3 12.2091 3 10L3 7L7 7L11 10Z"
                      fill="currentColor"
                    />
                    <path
                      d="M11 10L7 7"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M21 10C21 12.2091 19.2091 14 17 14C14.7908 14 13 12.2091 13 10L13 7L17 7L21 10Z"
                      fill="currentColor"
                    />
                    <path
                      d="M21 10L17 7"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <h4 className="text-xl md:text-[1.4rem] font-medium tracking-wide mb-2 mt-4">
                  {testimonials[currentIndex].name}
                </h4>
                <p className="text-muted text-[15px] font-light">
                  {testimonials[currentIndex].role}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Right Arrow */}
        <button
          onClick={handleNext}
          className="w-12 h-12 md:w-16 md:h-16 flex items-center justify-center bg-surface rounded-lg hover:bg-foreground/10 transition-colors z-20 flex-shrink-0"
          aria-label="Next testimonial"
        >
          <ChevronRight className="w-5 h-5 md:w-6 md:h-6 text-muted" />
        </button>
      </div>
    </section>
  );
}
