import React from "react";
import { TextHoverEffect } from "@/components/ui/text-hover-effect";

export function AnimatedText() {
  return (
    <div className="h-[10rem] flex items-center justify-center mt-40 dark:bg-transparent">
      <TextHoverEffect text="Lantumo Birhanu" />
    </div>
  );
}
