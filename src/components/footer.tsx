'use client';

import Link from 'next/link';
import { Github, Linkedin, Mail } from 'lucide-react';
import { FaTelegramPlane } from 'react-icons/fa';

export function Footer() {
  return (
    <footer className="w-full bg-from-white dark:bg-slate-900 border rounded-2xl border-fuchsia-800/20 dark:border-fuchisa-800 px-6 py-10">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-neutral-600 dark:text-neutral-400">
        
        {/* Left Text */}
        <p className="text-center md:text-left">
          © {new Date().getFullYear()} <span className="font-medium">Lantumo Birhanu</span>. All rights reserved.
        </p>

        {/* Right Icons */}
        <div className="flex items-center gap-5">
          <Link
            href="mailto:hbirhanu.dev@gmail.com"
            className="hover:text-black dark:hover:text-white transition-colors duration-200"
            aria-label="Email"
          >
            <Mail className="w-5 h-5" />
          </Link>
          <Link
            href="https://github.com/henokhackz"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-black dark:hover:text-white transition-colors duration-200"
            aria-label="GitHub"
          >
            <Github className="w-5 h-5" />
          </Link>
          <Link
            href="https://www.linkedin.com/in/lantumobirhanu/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-black dark:hover:text-white transition-colors duration-200"
            aria-label="LinkedIn"
          >
            <Linkedin className="w-5 h-5" />
          </Link>
          <Link
            href="https://t.me/lyzon1"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-black dark:hover:text-white transition-colors duration-200"
            aria-label="Telegram"
          >
            <FaTelegramPlane className="w-[18px] h-[18px]" />
          </Link>
        </div>
      </div>
    </footer>
  );
}
