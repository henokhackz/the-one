import { Projects } from "@/components/projects";

export const metadata = {
  title: "Work | Lantumo Birhanu",
  description:
    "Selected projects engineered for performance, usability and scale — from AI platforms to full e-commerce systems.",
};

const WorkPage = () => {
  return (
    <div className="w-full">
      <Projects />
    </div>
  );
};

export default WorkPage;
