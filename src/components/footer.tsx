"use client";

import Link from "next/link";
import { Github, Linkedin, Mail} from "lucide-react";
import { FaTelegram } from "react-icons/fa";

export function Footer() {
  return (
    <footer className="w-full border-t border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#0D0D0D] px-4 py-10 md:px-12 lg:px-24">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6 text-sm text-neutral-600 dark:text-neutral-400">
        {/* Left */}
        <div className="text-center md:text-left">
          <p>
            © {new Date().getFullYear()} Lantumo Birhanu. All rights reserved.
          </p>
        </div>

        {/* Right */}
        <div className="flex items-center gap-4">
          <Link
            href="mailto:hbirhanu.dev@gmail.com"
            className="hover:text-black dark:hover:text-white transition"
          >
            <Mail className="w-4 h-4" />
          </Link>
          <Link
            href="https://github.com/henokhackz"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-black dark:hover:text-white transition"
          >
            <Github className="w-4 h-4" />
          </Link>
          <Link
            href="https://www.linkedin.com/in/lantumobirhanu/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-black dark:hover:text-white transition"
          >
            <Linkedin className="w-4 h-4" />
          </Link>
          <Link
            href="https://t.me/lyzon1"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-black dark:hover:text-white transition"
          >
            <FaTelegram className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </footer>
  );
}
