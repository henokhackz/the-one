"use client";

import { Mail, Phone } from "lucide-react";

export function Contact() {
  return (
    <section className="w-full px-4  mt-10   py-16 md:px-12 lg:px-24 " id="contact">
      <div className="max-w-3xl mx-auto space-y-12">
        {/* Header */}
        <div className="text-center space-y-2">
          <h2 className="text-3xl font-bold text-neutral-900 dark:text-white tracking-tight">
            Let’s Talk
          </h2>
          <p className="text-sm text-neutral-600 dark:text-neutral-400">
            Feel free to reach out anytime. I’m open to discussing new projects,
            creative ideas, or opportunities to be part of your vision.
          </p>
        </div>

        {/* Contact Info */}
        <div className="flex flex-col md:flex-row md:justify-center gap-8 text-sm text-neutral-700 dark:text-neutral-300">
          <div className="flex items-center gap-2">
            <Mail className="w-4 h-4 text-neutral-500 dark:text-neutral-400" />
            <span>hbirhanu.dev@gmail.com</span>
          </div>
          <div className="flex items-center gap-2">
            <Phone className="w-4 h-4 text-neutral-500 dark:text-neutral-400" />
            <span>+251989943757</span>
          </div>
        </div>

        {/* Contact Form */}
        <form
          onSubmit={(e) => e.preventDefault()}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          <input
            type="text"
            placeholder="Name"
            className="w-full rounded-md border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 p-3 text-sm text-neutral-800 dark:text-white placeholder-neutral-500 dark:placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-neutral-700"
          />
          <input
            type="email"
            placeholder="E-Mail"
            className="w-full rounded-md border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 p-3 text-sm text-neutral-800 dark:text-white placeholder-neutral-500 dark:placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-neutral-700"
          />
          <input
            type="text"
            placeholder="Subject"
            className="md:col-span-2 w-full rounded-md border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 p-3 text-sm text-neutral-800 dark:text-white placeholder-neutral-500 dark:placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-neutral-700"
          />
          <textarea
            placeholder="Message"
            rows={6}
            className="md:col-span-2 w-full rounded-md border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 p-3 text-sm text-neutral-800 dark:text-white placeholder-neutral-500 dark:placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-neutral-700 resize-none"
          ></textarea>
          <button
            type="submit"
            className="md:col-span-2 mt-2 w-full rounded-md bg-neutral-900 text-white hover:bg-neutral-800 dark:bg-white dark:text-black dark:hover:bg-neutral-200 py-3 text-sm font-medium transition"
          >
            Send Message
          </button>
        </form>
      </div>
    </section>
  );
}
