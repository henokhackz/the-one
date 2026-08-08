import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

const AboutMe = () => {
  return (
    <div className="w-full px-16 flex flex-col h-[60vh] items-center justify-between">
      <div className="w-full flex items-center justify-between">
        <div className="flex flex-col space-y-4  h-full justify-between">
          <p className="text-2xl font-bold text-white/50">(About Me)</p>
          <div className="flex  h-12 md:h-14 gap-2 group cursor-pointer w-full max-w-[320px]">
            <Link
              href="/contact"
              className="bg-white text-black text-xs md:text-sm font-bold tracking-widest uppercase px-4 md:px-6 flex items-center justify-center hover:bg-gray-200 transition-colors h-full rounded-md whitespace-nowrap flex-1"
            >
              LET'S CONTACT
            </Link>
            <Link
              href="/contact"
              className="bg-[#f59e0b] text-black w-14 md:w-16 flex items-center justify-center hover:bg-[#d97706] transition-colors h-full rounded-md flex-shrink-0"
            >
              <ArrowUpRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
        <div className="w-1/2">
          <p className="text-3xl  text-white">
            I am a Frontend Developer focusing on high performance web
            applications. I craft immersive, intuitive interfaces with a
            dedication to seamless user experiences, helping startups ship
            products that users love.
          </p>
        </div>
      </div>
      {/* cards  */}
      <div className="w-full flex justify-between items-center">
        <div className="flex flex-col bg-white/10 rounded-2xl h-80 w-80 relative">
          <p className="text-xl bg-white/10 p-4 font-bold text-white/50 rounded-2xl ">
            Years EXPRIANCES
          </p>
          <p className="text-7xl bottom-0 left-4 font-bold text-white absolute bottom-0 left-0">
            03+
          </p>
        </div>
        <div className="flex flex-col justify-end bg-white/10  rounded-2xl h-80 w-80 relative">
          <p className="text-7xl font-bold text-white absolute p-4 top-0 left-4">
            20+
          </p>
          <p className="text-xl bg-white/10 p-4  font-bold text-white/50 rounded-2xl">
            SUCCESSFUL PROJECTS
          </p>
        </div>
        <div className="flex flex-col bg-white/10 rounded-2xl h-80 w-80  relative">
          <p className="text-xl bg-white/10 p-4  font-bold text-white/50 rounded-2xl ">
            TOTAL CLIENT
          </p>
          <p className="text-7xl font-bold text-white absolute p-4 bottom-0 left-4">
            50+
          </p>
        </div>
        <div className="flex flex-col justify-end bg-white/10  rounded-2xl h-80 w-80 relative">
          <p className="text-7xl font-bold text-white absolute p-4 top-0 left-4">
            +72%
          </p>
          <p className="text-xl bg-white/10 p-4  font-bold text-white/50 rounded-2xl ">
            CLIENT REVENUE
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutMe;
