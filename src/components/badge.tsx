import { ArrowDown } from "lucide-react";
import React from "react";

const Badge = () => {
  return (
    <div className=" w-24 h-24 xl:w-32 text-foreground xl:h-32 opacity-80 mix-blend-screen pointer-events-none">
      <div className="w-full h-full animate-[spin_12s_linear_infinite] text-foreground">
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <defs>
            <path
              id="circleText"
              d="M 50, 50 m -35, 0 a 35,35 0 1,1 70,0 a 35,35 0 1,1 -70,0"
            />
          </defs>
          <text
            fontSize="8"
            fill="rgba(255,255,255,0.8)"
            letterSpacing="1.2"
            className="uppercase font-mono font-medium text-foreground"
          >
            <textPath href="#circleText" className="text-foreground">
              LANTUMO BIRHANU - FRONTEND -{" "}
            </textPath>
          </text>
        </svg>
      </div>
      <div className="absolute inset-0 flex items-center justify-center">
        <ArrowDown
          size={22}
          className="bg-amber-400 rounded-full p-4 size-15"
        />
      </div>
    </div>
  );
};

export default Badge;
