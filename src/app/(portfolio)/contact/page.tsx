'use client';

import Image from 'next/image';
import Link from 'next/link';
import { FaTelegramPlane, FaLinkedin  } from 'react-icons/fa';
import React from 'react';
import { FaUpwork } from 'react-icons/fa6';

const ContactPage = () => {
  return (
    <section className="w-full min-h-screen px-8 py-16 bg-gray-100 dark:bg-slate-900 flex flex-col md:flex-row items-center justify-between gap-10">
      {/* Image Section */}
      <div className="w-full md:w-1/2 flex items-center justify-center">
        <div className="relative w-64 h-64 rounded-full overflow-hidden shadow-xl border border-white/10 bg-white/5 p-1">
          <Image
            src="/me.png"
            alt="Henok Lantu"
            fill
            className="object-cover rounded-full filter grayscale"
          />
        </div>
      </div>
     
     
      {/* Text Section */}
      <div className="w-full md:w-1/2 flex flex-col gap-6 text-center md:text-left">
        <h2 className="text-4xl font-extrabold text-white uppercase tracking-tighter">
          Let’s Work Together!
        </h2>
        <p className="text-gray-400 text-lg leading-relaxed">
          Have a project in mind? Need a full-stack developer to bring your idea to life? Let’s connect and build something impactful.
        </p>
        <div className="flex flex-wrap justify-center md:justify-start gap-4 mt-4">
          {/* Upwork Button */}
          <Link
            href="https://www.upwork.com/freelancers/~014970832ba09c14d3?mp_source=share"
            target="_blank"
            className="inline-flex items-center gap-2 px-8 py-4 bg-white text-black font-bold uppercase tracking-widest hover:bg-transparent hover:text-white border border-white transition-all duration-300 shadow-lg"
          >
            <FaUpwork className="text-xl" />
            Hire Me on Upwork
          </Link>

          {/* LinkedIn */}
          <Link
            href="https://www.linkedin.com/in/lantumobirhanu/"
            target="_blank"
            className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-white/5 border border-white/10 text-white hover:bg-white hover:text-black transition-all duration-300"
          >
            <FaLinkedin className="text-xl" />
          </Link>

          {/* Telegram */}
          <Link
            href="https://t.me/lyzon1"
            target="_blank"
            className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-white/5 border border-white/10 text-white hover:bg-white hover:text-black transition-all duration-300"
          >
            <FaTelegramPlane className="text-xl" />
          </Link>
        </div>
      </div>

      
    </section>
  );
};

export default ContactPage;
