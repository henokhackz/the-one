'use client';

import Image from 'next/image';
import Link from 'next/link';
import { FaTelegramPlane, FaLinkedin  } from 'react-icons/fa';
import React from 'react';
import { FaUpwork } from 'react-icons/fa6';

const CTA = () => {
  return (
    <section className="w-full  bg-gray-100 dark:bg-slate-900 flex flex-col md:flex-row items-center justify-between gap-10">
      {/* Image Section */}
      <div className="w-full md:w-1/2 flex items-center justify-center">
        <div className="relative w-64 h-64 rounded-full overflow-hidden shadow-xl border-4 border-transparent bg-gradient-to-r from-fuchsia-500 to-cyan-500 p-1">
          <Image
            src="/me.png"
            alt="Henok Lantu"
            fill
            className="object-cover rounded-full"
          />
        </div>
      </div>
     
     
      {/* Text Section */}
      <div className="w-full md:w-1/2 flex flex-col gap-6 text-center md:text-left">
        <h2 className="text-4xl font-extrabold bg-gradient-to-r from-fuchsia-500 to-cyan-500 bg-clip-text text-transparent">
          Let’s Work Together!
        </h2>
        <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed">
          Have a project in mind? Need a full-stack developer to bring your idea to life? Let’s connect and build something impactful.
        </p>
        <div className="flex flex-wrap justify-center md:justify-start gap-4 mt-4">
          {/* Upwork Button */}
          <Link
            href="https://www.upwork.com/freelancers/~014970832ba09c14d3?mp_source=share"
            target="_blank"
            className="inline-flex items-center gap-2 px-6 py-3 text-white font-semibold rounded-xl bg-gradient-to-r from-fuchsia-500 to-cyan-500 hover:opacity-90 shadow-lg"
          >
            <FaUpwork className="text-xl" />
            Hire Me on Upwork
          </Link>

          {/* LinkedIn */}
          <div className='flex gap-2'>
          <Link
            href="https://www.linkedin.com/in/lantumobirhanu/"
            target="_blank"
            className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 transition"
          >
            <FaLinkedin className="text-blue-600 dark:text-white text-xl" />
          </Link>

          {/* Telegram */}
          <Link
            href="https://t.me/lyzon1"
            target="_blank"
            className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 transition"
          >
            <FaTelegramPlane className="text-cyan-600 dark:text-white text-xl" />
          </Link>

          </div>
        </div>
      </div>

      
    </section>
  );
};

export default CTA;
