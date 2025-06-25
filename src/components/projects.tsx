"use client";

import { Project, ProjectData } from "@/components/project"; 

const projects: ProjectData[] = [
    {
        title: "Cafeteria Automation System",
        description:
            "Role-based system for managing student meals with QR attendance, chat, and admin tools.",
        technologies: ["Next.js", "TypeScript", "Tailwind", "Prisma", "PostgreSQL"],
        image: "/automation.png",
        github: "https://github.com/henokhackz/quick-bite",
        live: "https://quick-bite-beige.vercel.app/",
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
        title: "Dorm Management System",
        description:
            "Automates dorm assignments, tracks equipment, and supports Excel data import for admins.",
        technologies: ["Next.js", "React Query", "ExcelJS", "Tailwind CSS"],
        image: "/cafe-management.png",
        github: "https://github.com/henokhackz/quick-bite",
        live: "https://quick-bite-beige.vercel.app/",
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
        <ul className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3 pt-10 px-4 md:px-8 lg:px-10" id="projects">
            {projects.map((project, index) => (
                <Project key={index} data={project} />
            ))}
        </ul>
    );
}
