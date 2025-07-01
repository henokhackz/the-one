"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { FaReact, FaNodeJs, FaDatabase, FaFigma } from "react-icons/fa";
import { SiNextdotjs, SiTailwindcss, SiPostgresql, SiPrisma } from "react-icons/si";

interface StackCardProps {
  title: string;
  description: string;
  icons: React.ReactNode[];
}

export function StackCard({ title, description, icons }: StackCardProps) {
  return (
    <div className="w-full px-4 sm:px-6 md:px-8 flex justify-center">
      <Card>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>

        <div className="flex justify-start flex-wrap gap-4 mt-4">
          {icons.map((Icon, index) => (
            <div
              key={index}
              className="text-2xl text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white transition"
            >
              {Icon}
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}


export const Card = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "max-w-md w-full mx-auto p-6 rounded-xl border border-[rgba(255,255,255,0.10)] dark:bg-transparent bg-gray-100 shadow group",
        className
      )}
    >
      {children}
    </div>
  );
};

export const CardTitle = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <h3
      className={cn(
        "text-lg font-semibold text-gray-800 dark:text-white mb-2",
        className
      )}
    >
      {children}
    </h3>
  );
};

export const CardDescription = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <p
      className={cn(
        "text-sm font-normal text-neutral-600 dark:text-neutral-400",
        className
      )}
    >
      {children}
    </p>
  );
};
