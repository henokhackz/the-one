import DownloadResumeButton from "@/components/cv";
import { Footer } from "@/components/footer";
import MobileNavbar from "@/components/mobile-navbar";
import Navbar from "@/components/navbar";
import React from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen  relative flex flex-col mx-auto bg-black overflow-x-hidden">
      <Navbar />
      <main className="w-full">{children}</main>
      <Footer />

      <DownloadResumeButton />
      <MobileNavbar />
    </div>
  );
};

export default Layout;
