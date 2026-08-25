"use client";

import { ArrowDownToLine } from "lucide-react";
import React from "react";

const DownloadResumeButton = () => {
  return (
    <a
      href="/Lantumo_Birhanu_resume.pdf"
      download
      className="fixed bottom-20 lg:bottom-10 right-6 z-50 group"
    >
      <div className="relative flex items-center justify-center p-[1px] rounded-full overflow-hidden transition-transform duration-300 hover:scale-105">
        {/* Animated Gradient Border */}
        <div className="absolute inset-0 bg-accent opacity-100" />

        {/* Pulsing Glow */}
        <div className="absolute inset-0 rounded-full bg-accent blur-md opacity-30 animate-pulse -z-10" />

        {/* Inner Glass Button */}
        <div className="relative flex items-center justify-center gap-3 bg-background px-6 py-3 rounded-full group-hover:bg-foreground/5 transition-colors duration-300">
          <ArrowDownToLine className="w-5 h-5 text-foreground group-hover:-translate-y-1 transition-transform duration-300" />
          <span className="font-bold uppercase tracking-widest text-[10px] text-foreground hidden lg:block">
            Download CV
          </span>
        </div>
      </div>
    </a>
  );
};

export default DownloadResumeButton;
