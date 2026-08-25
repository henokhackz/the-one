"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Briefcase, User, Mail, Zap } from "lucide-react";

const navItems = [
  { href: "/", icon: <Home className="w-5 h-5" />, label: "HOME" },
  {
    href: "/projects",
    icon: <Briefcase className="w-5 h-5" />,
    label: "PROJECTS",
  },
  { href: "/profile", icon: <User className="w-5 h-5" />, label: "PROFILE" },
  { href: "/contact", icon: <Mail className="w-5 h-5" />, label: "CONTACTS" },
];

const MobileNavbar = () => {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 inset-x-0 z-50  backdrop-blur-xl border-t border-border shadow-[0_-10px_20px_rgba(0,0,0,0.5)] md:hidden flex justify-around items-center py-3 px-6 overflow-x-hidden">
      {navItems.map((item) => {
        const isActive = pathname === item.href;
        return (
          <Link
            key={item.href}
            href={item.href}
            className={`flex flex-col items-center justify-center gap-1.5 transition-all duration-300 ${
              isActive ? "text-accent scale-110" : "text-muted"
            } hover:text-foreground`}
          >
            <div
              className={`relative p-1 rounded-lg ${isActive ? "bg-accent/10" : ""}`}
            >
              {item.icon}
              {isActive && (
                  <span className="absolute -top-1 -right-1 flex h-2 w-2">
                   <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
                   <span className="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
                 </span>
              )}
            </div>
            <span
              className={`text-[8px] font-mono tracking-widest ${isActive ? "opacity-100" : "opacity-40"}`}
            >
              {item.label}
            </span>
          </Link>
        );
      })}
    </nav>
  );
};

export default MobileNavbar;
