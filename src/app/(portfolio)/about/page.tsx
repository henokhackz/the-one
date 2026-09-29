import type { Metadata } from "next";
import { About } from "@/components/about";
import { Testimonials } from "@/components/testimonials";
import { ContactCta } from "@/components/contact-cta";

export const metadata: Metadata = {
  title: "About",
  description:
    "Fullstack developer focused on building fast, responsive and scalable web applications with React, Next.js and TypeScript.",
};

export default function AboutPage() {
  return (
    <>
      <About />
      <Testimonials />
      <ContactCta />
    </>
  );
}
