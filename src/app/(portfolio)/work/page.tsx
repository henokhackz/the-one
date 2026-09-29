import type { Metadata } from "next";
import { Projects } from "@/components/projects";
import { ContactCta } from "@/components/contact-cta";

export const metadata: Metadata = {
  title: "Portfolio",
  description:
    "Selected projects engineered for performance, usability and scale — from AI platforms to full e-commerce systems.",
};

export default function WorkPage() {
  return (
    <>
      <Projects />
      <ContactCta />
    </>
  );
}
