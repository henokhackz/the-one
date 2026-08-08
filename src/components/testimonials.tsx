"use client";

import React, { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export function Testimonials() {
  const testimonials = [
    {
      id: 1,
      name: "Fredrick Christopher",
      role: "Founder at elion",
      image:
        "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      quote:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    },
    {
      id: 2,
      name: "Sarah Jenkins",
      role: "CTO at TechFlow",
      image:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      quote:
        "Working with this developer was an absolute game-changer for our startup. The perfect blend of technical expertise and an exceptional eye for design resulted in a product our users absolutely love.",
    },
    {
      id: 3,
      name: "David Chen",
      role: "Product Manager",
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      quote:
        "They delivered high-quality code at an incredible pace while maintaining clear communication throughout the whole process. I highly recommend them for any complex web application needs.",
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
    <section className="relative w-full bg-black min-h-screen flex items-center justify-center py-24 overflow-hidden text-white">
      {/* Title */}
      <div className="absolute top-12 left-6 md:top-24 xl:left-16 lg:left-12 z-10 w-full px-6 md:px-0">
        <p className="text-xl md:text-2xl font-bold text-white/50 tracking-wide">
          (TESTIMONIALS)
        </p>
      </div>

      <div className="w-full max-w-[1400px] mx-auto px-6 md:px-12 xl:px-16 flex items-center justify-between relative mt-16 md:mt-0">
        {/* Left Arrow */}
        <button
          onClick={handlePrev}
          className="w-12 h-12 md:w-16 md:h-16 flex items-center justify-center bg-[#1a1a1a] rounded-lg hover:bg-white/10 transition-colors z-20 flex-shrink-0"
          aria-label="Previous testimonial"
        >
          <ChevronLeft className="w-5 h-5 md:w-6 md:h-6 text-white/70" />
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
              <div className="relative w-20 h-20 md:w-24 md:h-24 rounded-full overflow-hidden mb-12 border-2 border-red-600 shadow-[0_0_30px_rgba(220,38,38,0.3)]">
                <Image
                  src={testimonials[currentIndex].image}
                  alt={testimonials[currentIndex].name}
                  fill
                  className="object-cover"
                />
              </div>

              <p className="text-lg md:text-2xl lg:text-[1.75rem] leading-[1.6] md:leading-relaxed text-white/95 mb-14 font-light px-2 xl:px-10">
                {testimonials[currentIndex].quote}
              </p>

              <div className="flex flex-col items-center">
                <div className="mb-4 text-white opacity-90 scale-x-125">
                  <svg
                    width="40"
                    height="30"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M11 10C11 12.2091 9.20914 14 7 14C4.79086 14 3 12.2091 3 10L3 7L7 7L11 10Z"
                      fill="white"
                    />
                    <path
                      d="M11 10L7 7"
                      stroke="white"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M21 10C21 12.2091 19.2091 14 17 14C14.7908 14 13 12.2091 13 10L13 7L17 7L21 10Z"
                      fill="white"
                    />
                    <path
                      d="M21 10L17 7"
                      stroke="white"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <h4 className="text-xl md:text-[1.4rem] font-medium tracking-wide mb-2 mt-4">
                  {testimonials[currentIndex].name}
                </h4>
                <p className="text-white/40 text-[15px] font-light">
                  {testimonials[currentIndex].role}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Right Arrow */}
        <button
          onClick={handleNext}
          className="w-12 h-12 md:w-16 md:h-16 flex items-center justify-center bg-[#1a1a1a] rounded-lg hover:bg-white/10 transition-colors z-20 flex-shrink-0"
          aria-label="Next testimonial"
        >
          <ChevronRight className="w-5 h-5 md:w-6 md:h-6 text-white/70" />
        </button>
      </div>
    </section>
  );
}
