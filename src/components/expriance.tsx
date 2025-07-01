"use client";
import React from "react";
import { Timeline } from "@/components/ui/timeline";

export function WorkExpriance() {
    const data = [
        {
            title: "2025 – Present",
            content: (
                <div className="p-4 rounded-lg bg-transparent shadow-lg  backdrop-blur-sm">
                    <p className="mb-6 text-sm font-medium text-gray-700 dark:text-blue-500">
                        <strong className="text-lg text-blue-300">Upwork</strong> – Full Stack Web Developer | Freelancer
                        <br />
          </p>
          <p className="mb-4 text-xs font-normal text-neutral-800 md:text-sm dark:text-neutral-200">
          Built a
            wishlist, and Stripe integration. Developed a secure backend with Node.js and
            Express, and frontend with React.js and Tailwind CSS.
          </p>

          <div className="grid grid-cols-2 gap-4">
            <img src="/amazon-new.png" alt="E-commerce UI" className="h-20 w-full rounded-lg object-cover shadow-md md:h-44 lg:h-60" />
            <img src="/amazon-new.png" alt="Admin dashboard" className="h-20 w-full rounded-lg object-cover shadow-md md:h-44 lg:h-60" />
          </div>
        </div>
      ),
    },
    {
      title: "2025",
      content: (
        <div>
          <p className="mb-6 text-sm font-medium text-gray-700 dark:text-blue-500">
            <strong className="text-lg text-blue-300">Nile Technology</strong> – Full Stack Web Developer Intern
 
          </p>
          <p className="mb-4 text-xs font-normal text-neutral-800 md:text-sm dark:text-neutral-200"> Worked on a full-featured e-learning platform with secure role-based access,
            RESTful APIs, and responsive React components. Collaborated with cross-functional
            teams using Git and Agile practices.</p>
          <div className="grid grid-cols-2 gap-4">
            <img src="/e-learning.png" alt="E-learning UI" className="h-20 w-full rounded-lg object-cover shadow-md md:h-44 lg:h-60" />
            <img src="/e-learning.png" alt="Course dashboard" className="h-20 w-full rounded-lg object-cover shadow-md md:h-44 lg:h-60" />
          </div>
        </div>
      ),
    },
    {
      title: "2024 – 2025",
      content: (
        <div>
          <p className="mb-6 text-sm font-medium text-gray-700 dark:text-blue-500">
            <strong className="text-lg text-blue-300">Ethio Telecom</strong> – Feedback Management Portal
            
            
          </p>
          <p className="mb-4 text-xs font-normal text-neutral-800 md:text-sm dark:text-neutral-200">
          Built and deployed a portal to collect and visualize employee feedback,
          increasing response rate by 3x and improving communication with custom dashboards.
          </p>
          <div className="grid grid-cols-2 gap-4">
            <img src="/ethio-voice.png" alt="Feedback Chart" className="h-20 w-full rounded-lg object-cover shadow-md md:h-44 lg:h-60" />
            <img src="/ethio-voice.png" alt="Management Dashboard" className="h-20 w-full rounded-lg object-cover shadow-md md:h-44 lg:h-60" />
          </div>
        </div>
      ),
    },
    
    {
      title: "2024",
      content: (
        <div >
            <p className="mb-6 text-sm font-medium text-gray-700 dark:text-blue-500">
                <strong className="text-lg text-blue-300">Instagram Clone</strong>
                
               
            </p>
            <p className="mb-4 text-xs font-normal text-neutral-800 md:text-sm dark:text-neutral-200">
            Developed a fully functional Instagram clone featuring photo sharing, likes, and comments, with a responsive design optimized for mobile and desktop.
            </p>
            <div className="grid grid-cols-2 gap-4">
                <img src="/instagram.png" alt="Instagram Feed" className="h-20 w-full rounded-lg object-cover shadow-md md:h-44 lg:h-60" />
                <img src="/instagram.png" alt="Instagram Story" className="h-20 w-full rounded-lg object-cover shadow-md md:h-44 lg:h-60" />
            </div>
        </div>
      ),
    },
    {
      title: "2020 – 2025",
      content: (
        <div>
          <p className="mb-6 text-sm font-medium text-gray-700 dark:text-blue-500">
            <strong className="text-lg text-blue-300">Arbaminch University</strong> – Cafeteria Automation System
          
          </p>
          <p className="mb-4 text-xs font-normal text-neutral-800 md:text-sm dark:text-neutral-200">Developed a campus-wide meal tracking and QR-based attendance system with real-time
          chat and role-based access, reducing manual entry by 80%.</p>
          <div className="grid grid-cols-2 gap-4">
            <img src="/cafe-management.png" alt="Cafeteria App UI" className="h-20 w-full rounded-lg object-cover shadow-md md:h-44 lg:h-60" />
            <img src="/automation.png" alt="QR Attendance" className="h-20 w-full rounded-lg object-cover shadow-md md:h-44 lg:h-60" />
          </div>
        </div>
      ),
    },
  ];

  return (
    <div className="relative w-full overflow-clip">
      <Timeline data={data} />
    </div>
  );
}
