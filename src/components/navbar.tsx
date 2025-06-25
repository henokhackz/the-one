//@ts-nocheck
import {
  IconHome,
  IconUser,
  IconBriefcase,
  IconDownload,
  IconMessage,
} from "@tabler/icons-react";
import { FloatingNav } from "./ui/floating-navbar";

export function Navbar() {
  const navItems = [
    {
      name: "Home",
      link: "#home",
      icon: <IconHome className="h-4 w-4 text-neutral-500 dark:text-white" />,
    },
    {
      name: "About",
      link: "#about",
      icon: <IconUser className="h-4 w-4 text-neutral-500 dark:text-white" />,
    },
    {
      name: "Projects",
      link: "#projects",
      icon: <IconBriefcase className="h-4 w-4 text-neutral-500 dark:text-white" />,
    },
    {
      name: "Contact",
      link: "#contact",
      icon: <IconMessage className="h-4 w-4 text-neutral-500 dark:text-white" />,
    },
    {
      name: "Resume",
      link: "/lantumo-resume.pdf",
      download: true,
      icon: <IconDownload className="h-4 w-4 text-neutral-500 dark:text-white" />,
    },
   
  ];

  return (
    <div className="relative w-full z-50">
      <FloatingNav navItems={navItems} />
    </div>
  );
}
