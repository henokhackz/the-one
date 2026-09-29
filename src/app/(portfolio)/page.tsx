import { Hero } from "@/components/hero";
import { Intro } from "@/components/intro";
import { Process } from "@/components/process";
import { Projects } from "@/components/projects";
import { About } from "@/components/about";
import { Testimonials } from "@/components/testimonials";
import { ContactCta } from "@/components/contact-cta";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Intro />
      <Process />
      <Projects limit={4} />
      <About />
      <Testimonials />
      <ContactCta />
    </>
  );
}
