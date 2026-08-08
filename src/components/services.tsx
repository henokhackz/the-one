"use client";

import React from "react";
import Link from "next/link";
import { ArrowUpRight, ArrowRight } from "lucide-react";

export function Services() {
  const services = [
    {
      title: "FRONTEND",
      description:
        "Creating intuitive user interfaces combining deep industry knowledge with innovative performance techniques.",
      highlighted: true,
      link: "/contact",
    },
    {
      title: "BACKEND",
      description:
        "Building robust, scalable architectures and secure databases to power your modern web applications.",
      highlighted: false,
      link: "/contact",
    },
    {
      title: "FULLSTACK",
      description:
        "Delivering end-to-end solutions from seamless user experiences to powerful server-side infrastructure.",
      highlighted: false,
      link: "/contact",
    },
  ];

  return (
    <section className="w-full px-16 bg-black text-white  flex justify-center">
      <div className=" w-full grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-8">
        {/* Left Column */}
        <div className="lg:col-span-5 flex flex-col lg:sticky lg:top-32 h-fit mb-8 lg:mb-0">
          <div>
            <p className="text-xl md:text-2xl font-bold text-white/50 mb-8 md:mb-12 tracking-wide">
              (SERVICES)
            </p>
            <h2 className="text-4xl md:text-6xl font-extrabold uppercase tracking-tight mb-8 leading-[1.1]">
              SERVICE EXPERTISE
            </h2>
            <p className="text-[#a1a1aa] text-base md:text-lg leading-relaxed max-w-sm mb-12 font-light">
              Combining deep industry knowledge with innovative techniques to
              deliver standout solutions. Our expertise spans frontend
              architecture, scalable backends, and fullstack development.
            </p>
          </div>

          <div className="flex items-stretch h-12 md:h-14 gap-2 group cursor-pointer w-full max-w-[280px]">
            <Link
              href="/projects"
              className="bg-white text-black text-xs md:text-sm font-bold tracking-widest uppercase px-6 flex items-center justify-center hover:bg-gray-200 transition-colors h-full rounded-md whitespace-nowrap flex-1"
            >
              SEE ALL WORKS
            </Link>
            <Link
              href="/projects"
              className="bg-[#f59e0b] text-black w-14 flex items-center justify-center hover:bg-[#d97706] transition-colors h-full rounded-md flex-shrink-0"
            >
              <ArrowUpRight className="w-5 h-5" />
            </Link>
          </div>
        </div>

        {/* Right Column */}
        <div className="lg:col-span-7 flex flex-col justify-center lg:-mt-8">
          <div className="flex flex-col border-t border-white/10 group/list pt-4 lg:pt-0 lg:border-t-0">
            {services.map((service, index) => (
              <div
                key={index}
                className={`flex flex-col md:flex-row md:items-center justify-between p-8 xl:p-12 transition-all duration-500
                  ${
                    service.highlighted
                      ? "bg-[#f59e0b] rounded-2xl my-4 border-transparent shadow-[0_20px_40px_rgba(245,158,11,0.15)] relative z-10 scale-[1.01] hover:scale-[1.02]"
                      : "border-b border-white/10 hover:bg-white/5 hover:px-10 rounded-xl my-1"
                  }
                `}
              >
                <div className="flex flex-col max-w-sm xl:max-w-md mb-8 md:mb-0">
                  <h3
                    className={`text-2xl md:text-3xl font-extrabold tracking-tight mb-4 uppercase ${service.highlighted ? "text-white" : "text-white"}`}
                  >
                    {service.title}
                  </h3>
                  <p
                    className={`text-sm md:text-base leading-relaxed ${service.highlighted ? "text-white/90 font-medium" : "text-[#a1a1aa] font-light"}`}
                  >
                    {service.description}
                  </p>
                </div>

                <Link
                  href={service.link}
                  className={`inline-flex items-center justify-center px-6 py-3.5 rounded-lg text-[11px] font-bold tracking-[0.2em] transition-all self-start md:self-center uppercase whitespace-nowrap
                    ${
                      service.highlighted
                        ? "bg-white text-black hover:bg-gray-100 shadow-xl"
                        : "bg-white/5 text-white/50 border border-white/10 hover:bg-white/10 hover:text-white hover:border-white/30"
                    }
                  `}
                >
                  DISCOVER{" "}
                  {service.highlighted ? (
                    <ArrowUpRight className="ml-2 w-4 h-4" />
                  ) : (
                    <ArrowRight className="ml-2 w-4 h-4" />
                  )}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
