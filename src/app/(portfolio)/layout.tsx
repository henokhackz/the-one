import DownloadResumeButton from "@/components/cv";
import { Footer } from "@/components/footer";
import MobileNavbar from "@/components/mobile-navbar";
import Navbar from "@/components/navbar";
import React from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen  relative flex flex-col mx-auto  overflow-x-hidden bg-background">
      <div className="absolute inset-0 z-0">
        {/* Base gradient */}
        <div className="absolute inset-0 section-gradient" />
        {/* Dot grid with radial mask */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(circle, rgba(128,128,128,0.18) 1px, transparent 1px)",
            backgroundSize: "28px 28px",
            WebkitMaskImage:
              "radial-gradient(ellipse 90% 80% at 50% 45%, black 30%, transparent 100%)",
            maskImage:
              "radial-gradient(ellipse 90% 80% at 50% 45%, black 30%, transparent 100%)",
          }}
        />
        {/* Ambient amber glow */}
        <div className="absolute -top-32 right-[5%] h-[640px] w-[640px] rounded-full bg-accent/[0.04] blur-[140px]" />
        {/* Film grain */}
        <svg
          className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.03]"
          aria-hidden="true"
        >
          <filter id="services-grain">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.7"
              numOctaves="3"
              stitchTiles="stitch"
            />
          </filter>
          <rect width="100%" height="100%" filter="url(#services-grain)" />
        </svg>
      </div>

      <Navbar />
      <main className="w-full mt-24">{children}</main>
      <Footer />

      <DownloadResumeButton />
      <MobileNavbar />
    </div>
  );
};

export default Layout;
