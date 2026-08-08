"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import {
  FaInstagram,
  FaDribbble,
  FaLinkedinIn,
  FaBehance,
  FaLinkedin,
} from "react-icons/fa";
import { FiInstagram } from "react-icons/fi"; // Often looks cleaner like the design

export function Footer() {
  return (
    <footer className="w-full bg-black text-white pt-24 pb-12 px-6 md:px-16 overflow-hidden border-t-0">
      <div className="max-w-[1400px] mx-auto flex flex-col">
        {/* Top CTA */}
        <div className="flex flex-col items-center justify-center mb-24 md:mb-32 mt-12">
          <p className="text-white/60 mb-6 md:mb-8 font-medium text-sm md:text-base tracking-wide">
            Let's Get Started
          </p>
          {/* Ensure massive scaling on large screens */}
          <h2 className="text-5xl sm:text-6xl md:text-8xl lg:text-[9rem] xl:text-[11rem] font-extrabold uppercase tracking-tighter whitespace-nowrap text-center leading-none">
            LET'S COLLABORATE
          </h2>
        </div>

        {/* 5-Column Navigation Area */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-16 lg:gap-8 mb-20 lg:mb-24">
          {/* Column 1: Brand & Newsletter (spans 4 cols on large) */}
          <div className="lg:col-span-4 flex flex-col xl:pr-10">
            <Link href="/" className="text-3xl font-bold tracking-tight mb-8">
              ellion
            </Link>
            <p className="text-white/60 text-[15px] leading-relaxed mb-8 max-w-sm">
              My approach is rooted in research, where I dig deep into user
              behaviors and feedback to inform
            </p>
            <form className="flex w-full max-w-sm h-14 bg-[#111111] rounded p-1.5 focus-within:ring-1 focus-within:ring-white/20 transition-all">
              <input
                type="email"
                placeholder="Type your email.."
                className="flex-1 bg-transparent text-white px-4 text-sm focus:outline-none placeholder-white/30"
              />
              <button
                type="button"
                className="bg-white text-black px-8 h-full rounded text-[13px] font-bold whitespace-nowrap hover:bg-gray-200 transition-colors"
              >
                Sign up
              </button>
            </form>
          </div>

          {/* Column 2: Pages */}
          <div className="lg:col-span-2 lg:col-start-6 flex flex-col">
            <h4 className="text-white font-bold mb-8">Pages</h4>
            <ul className="space-y-4">
              {["Home", "About", "Projects", "Services", "Blog"].map((item) => (
                <li key={item}>
                  <Link
                    href="#"
                    className="text-white/60 hover:text-white transition-colors text-[15px]"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Inner Pages */}
          <div className="lg:col-span-2 flex flex-col">
            <h4 className="text-white font-bold mb-8">Inner Pages</h4>
            <ul className="space-y-4">
              {[
                "Project Single",
                "Service Single",
                "Blog Single",
                "Contact",
              ].map((item) => (
                <li key={item}>
                  <Link
                    href="#"
                    className="text-white/60 hover:text-white transition-colors text-[15px]"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Utility Pages */}
          <div className="lg:col-span-2 flex flex-col">
            <h4 className="text-white font-bold mb-8">Utility Pages</h4>
            <ul className="space-y-4">
              {[
                "Style Guide",
                "Licenses",
                "Password Protected",
                "Changelog",
                "404",
              ].map((item) => (
                <li key={item}>
                  <Link
                    href="#"
                    className="text-white/60 hover:text-white transition-colors text-[15px]"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 5: Social */}
          <div className="lg:col-span-2 flex flex-col">
            <ul className="space-y-4">
              <li className="mb-8">
                {/* Instagram acting as the header equivalent */}
                <Link
                  href="#"
                  className="text-white font-medium hover:text-gray-300 transition-colors text-[15px] flex items-center gap-3"
                >
                  <FiInstagram className="w-[18px] h-[18px]" />
                  <span>Instagram</span>
                  <ArrowUpRight className="w-3.5 h-3.5 ml-0.5 opacity-80" />
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-white/60 hover:text-white transition-colors text-[15px] flex items-center gap-3"
                >
                  <FaDribbble className="w-[18px] h-[18px]" />
                  Dribbble
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-white/60 hover:text-white transition-colors text-[15px] flex items-center gap-3"
                >
                  <FaLinkedin className="w-[18px] h-[18px] opacity-80" />
                  LinkedIn
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-white/60 hover:text-white transition-colors text-[15px] flex items-center gap-3"
                >
                  <FaBehance className="w-[18px] h-[18px] opacity-80" />
                  Behance
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-8 pb-4 flex text-center flex-col md:flex-row items-center justify-center text-[13px] text-white/40">
          <p>
            © Copyright 2024 | Design by Lantumo Birhanu | Powered By Next.js
          </p>
        </div>
      </div>
    </footer>
  );
}
