import AboutMe from "@/components/aboutme";
import { Education } from "@/components/education";
import Experience from "@/components/expriance";
import { Testimonials } from "@/components/testimonials";

export const metadata = {
  title: "About | Lantumo Birhanu",
  description:
    "Frontend developer focused on building fast, responsive and scalable web applications with React, Next.js and TypeScript.",
};

const AboutPage = () => {
  return (
    <div className="w-full">
      <AboutMe />
      <Experience />
      <Education />
      <Testimonials />
    </div>
  );
};

export default AboutPage;
