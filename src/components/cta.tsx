"use client";

import Image from "next/image";
import Link from "next/link";
import { FaTelegramPlane, FaLinkedin } from "react-icons/fa";
import React from "react";
import { FaUpwork } from "react-icons/fa6";
import { Mail } from "lucide-react";

const CTA = () => {
  return (
    <section
      className="w-full py-24 mb-12 relative overflow-hidden glass-panel-heavy rounded-3xl mt-12 mx-auto max-w-6xl px-8 md:px-16"
      id="contact"
    >
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 flex flex-col items-center text-center space-y-8">
        <div className="p-[1px] rounded-full border border-border mb-4 inline-block">
          <div className="bg-background rounded-full p-2">
            <Mail className="w-6 h-6 text-foreground" />
          </div>
        </div>

        <h2 className="text-5xl md:text-7xl font-bold tracking-tighter text-foreground uppercase">
          Let’s Work Together
        </h2>

        <p className="text-muted text-lg max-w-2xl leading-relaxed">
          Have a futuristic project in mind? Need a full-stack engineer to build
          scalable next-gen platforms? Let’s connect and architect something
          impactful.
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-6 mt-8">
          {/* Main Action */}
          <Link
            href="https://www.upwork.com/freelancers/~014970832ba09c14d3?mp_source=share"
            target="_blank"
            className="group relative px-8 py-4 bg-accent text-background text-xs font-bold uppercase tracking-widest hover:bg-transparent hover:text-accent border border-accent transition-colors duration-300 flex items-center gap-3 overflow-hidden"
          >
            <FaUpwork className="text-lg" />
            <span>Hire Me on Upwork</span>
            <div className="absolute inset-0 bg-accent opacity-0 group-hover:opacity-10 transition-opacity duration-300 pointer-events-none" />
          </Link>

          <div className="w-px h-8 bg-border hidden sm:block"></div>

          {/* Social Icons */}
          <div className="flex gap-4">
            <Link
              href="https://www.linkedin.com/in/lantumobirhanu/"
              target="_blank"
              className="p-4 border border-border rounded-full text-muted hover:text-foreground hover:border-border hover:-translate-y-1 transition-all duration-300"
            >
              <FaLinkedin className="text-lg" />
            </Link>

            <Link
              href="https://t.me/lyzon1"
              target="_blank"
              className="p-4 border border-border rounded-full text-muted hover:text-foreground hover:border-border hover:-translate-y-1 transition-all duration-300"
            >
              <FaTelegramPlane className="text-lg" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;
