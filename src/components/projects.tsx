"use client";

import { Project, ProjectData } from "@/components/project"; 

const projects: ProjectData[] = [
    {
      title: "Zembil E-commerce App",
      description:
        "A full-featured ecommerce platform with admin dashboard, payment integration (Stripe, PayPal), and responsive UI.",
      technologies: [
        "Next.js",
        "TypeScript",
        "Tailwind CSS",
        "Shadcn",
        "PostgreSQL",
        "Prisma",
        "Stripe",
        "PayPal",
      ],
      image: "/zembil.png", 
      github: "https://github.com/henokhackz/zembil",
      live: "https://zembil-self.vercel.app/", 
    },
    
    {
      title: "Smart Dorm and Cafe Management System",
      description:
        "Automates dorm assignments, tracks equipment, and supports Excel data import for admins.",
      technologies: ["Next.js", "React Query", "ExcelJS", "Tailwind CSS"],
      image: "/dorm.jpg",
      github: "https://github.com/henokhackz/quick-bite",
      live: "https://quick-bite-indol-omega.vercel.app/",
    },
    {
        title: "WiseHub",
        description:
          "A book lovers community that lets users enjoy reading while listening to music in real-time.",
        technologies: ["React", "Firebase", "Firestore", "JavaScript"],
        image: "/wisehub.png", 
        github: "https://github.com/lantumo0001/wise-hub", 
        live: "https://wise-hub.vercel.app/", 
      },
      {
        title: "Feedback Management Portal",
        description:
          "Internal tool for Ethio Telecom to analyze employee feedback via dashboards and charts.",
        technologies: ["React", "Chart.js", "Node.js", "Express", "MongoDB"],
        image: "/ethio-voice.png",
        github: "https://github.com/henokhackz/ethio-voice",
        live: "https://ethio-voice.vercel.app/",
      },
    {
      title: "Fedel AI",
      description:
        "Helps users learn English by leveraging subtitles from movies and series.",
      technologies: ["Next.js", "TypeScript", "Tailwind CSS"],
      image: "/fedel-ai.png",
      github: "https://github.com/henokhackz/fidel-ai",
      live: "https://fedel-ai.vercel.app",
    },
    {
      title: "Instagram Clone",
      description:
        "A clone of Instagram built using React and Firebase for real-time data and authentication.",
      technologies: ["React", "Firebase", "JavaScript", "CSS"],
      image: "/instagram.png",
      github: "https://github.com/lantumo0001/instagram-clone-app",
      live: "https://snap-share-app.vercel.app/",
    },
    {
      title: "Amazon Clone",
      description:
        "E-commerce website replicating core features of Amazon, built for high scalability and performance.",
      technologies: ["React", "Next.js", "Tailwind CSS"],
      image: "/amazon-new.png",
      github: "https://github.com/henokhackz/next-ecommerce",
      live: "https://amazon-clone.vercel.app",
    },
    {
      title: "Wolkite University E-Learning Platform",
      description:
        "A comprehensive e-learning platform for Wolkite University built with Laravel and Tailwind CSS.",
      technologies: ["Laravel", "Tailwind CSS", "PHP", "MySQL"],
      image: "/e-learning.png",
      github: "https://github.com/henokhackz/wolkite-elearning",
      live: "https://elearning.wolkiteuniversity.edu",
    },
  ];
  
export function Projects() {
    return (
        <div className="flex-col space-y-6 px-8">
 <h2 className="text-lg md:text-3xl lg:text-4xl text-blue-500">Recent Projects </h2>
        <ul className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3 pt-10 px-4 md:px-8 lg:px-10" id="projects">
           
            {projects.map((project, index) => (
                <Project key={index} data={project} />
            ))}
        </ul>
            </div>
    );
}
