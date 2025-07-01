"use client";
import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export function NavbarPortfolio({ className }: { className?: string }) {
    return (
        <nav
            className={cn(
                "fixed top-0 inset-x-0 z-50  shadow-md dark:bg-white/5 bg-white/90 backdrop-blur-md",
                className
            )}
        >
            <div className="max-w-6xl mx-auto px-4">
                <div className="flex items-center justify-between h-16">
                    <div className="flex-shrink-0">
                        <Link href="/">
                            <span className="text-xl font-bold">L.Birhanu</span>
                        </Link>
                    </div>
                    <div className="hidden md:flex space-x-8 font-medium">
                        <Link href="#about" className="hover:text-blue-500">
                            About
                        </Link>
                        <Link href="#projects" className="hover:text-blue-500">
                            Projects
                        </Link>
                        <Link href="#contact" className="hover:text-blue-500">
                            Contact
                        </Link>
                        <a
                            href="/resume.pdf"
                            download
                            className="hover:text-blue-500"
                        >
                            Download CV
                        </a>
                    </div>
                    <div className="md:hidden">
                        <MobileMenu />
                    </div>
                </div>
            </div>
        </nav>
    );
}

function MobileMenu() {
    const [isOpen, setIsOpen] = React.useState(false);

    return (
        <div className="relative">
            <button onClick={() => setIsOpen(!isOpen)} className="p-2 focus:outline-none">
                <span className="block w-6 h-0.5 bg-black mb-1"></span>
                <span className="block w-6 h-0.5 bg-black mb-1"></span>
                <span className="block w-6 h-0.5 bg-black"></span>
            </button>
            {isOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg dark:bg-gray-800 z-50">
                    <Link
                        href="/about"
                        onClick={() => setIsOpen(false)}
                        className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                        About
                    </Link>
                    <Link
                        href="/projects"
                        onClick={() => setIsOpen(false)}
                        className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                        Projects
                    </Link>
                    <Link
                        href="/contact"
                        onClick={() => setIsOpen(false)}
                        className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                        Contact
                    </Link>
                    <a
                        href="/resume.pdf"
                        download
                        onClick={() => setIsOpen(false)}
                        className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                        Download CV
                    </a>
                </div>
            )}
        </div>
    );
}
