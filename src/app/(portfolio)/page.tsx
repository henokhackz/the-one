import AboutMe from "@/components/aboutme";
import Blogs from "@/components/blogs";
import CTA from "@/components/cta";
import { Education } from "@/components/education";
import Experience from "@/components/expriance";
import { Hero } from "@/components/hero";
import { Projects } from "@/components/projects";
import Technologies from "@/components/technologies";
import { Services } from "@/components/services";
import { Testimonials } from "@/components/testimonials";
import React from "react";

const Home = () => {
  return (
    <div className="w-full space-y-24">
      <Hero />
      <AboutMe />
      <Projects />
      <Services />
      <Testimonials />
      <Technologies />
      <Experience />
      <CTA />
    </div>
  );
};

export default Home;
