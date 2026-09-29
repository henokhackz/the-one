import type { Metadata } from "next";
import { Blogs } from "@/components/blogs";
import { ContactCta } from "@/components/contact-cta";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Notes on modern web architecture, 3D on the web, and shipping AI features to production.",
};

export default function BlogsPage() {
  return (
    <>
      <Blogs />
      <ContactCta />
    </>
  );
}
