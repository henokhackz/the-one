"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Mail, Phone, ArrowUpRight, CheckCircle2 } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { FaTelegramPlane, FaLinkedin } from "react-icons/fa";
import { FaUpwork } from "react-icons/fa6";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const ContactPage = () => {
  const reducedMotion = useReducedMotion();
  const [sent, setSent] = useState(false);

  return (
    <section className="relative w-full min-h-[calc(100svh-6rem)] py-24 md:py-32  text-white overflow-hidden">
      {/* ── dot environment (same as hero/about) ── */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0b0b0b] via-[#080808] to-[#050505]" />
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(circle, rgba(255,255,255,0.10) 1px, transparent 1px)",
            backgroundSize: "28px 28px",
            WebkitMaskImage:
              "radial-gradient(ellipse 90% 80% at 50% 45%, black 30%, transparent 100%)",
            maskImage:
              "radial-gradient(ellipse 90% 80% at 50% 45%, black 30%, transparent 100%)",
          }}
        />
        <div className="absolute -top-32 right-[5%] w-[640px] h-[640px] rounded-full bg-[#f59e0b]/[0.04] blur-[140px]" />
      </div>

      <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 md:px-12 xl:px-16">
        {/* ── Section label ── */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE }}
          className="flex items-center gap-3 mb-10 md:mb-14"
        >
          <span className="h-px w-8 bg-[#f59e0b]/80" />
          <span className="font-mono text-xs md:text-sm tracking-[0.3em] text-white/70 uppercase font-medium">
            Get In Touch / Contact
          </span>
        </motion.div>

        {/* ── Header ── */}
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: EASE }}
          className="font-heading text-[clamp(3rem,6vw,6.5rem)] leading-[0.95] tracking-[-0.02em] font-bold uppercase mb-6"
        >
          LET&apos;S WORK
          <br />
          <span className="text-[#f59e0b]">TOGETHER.</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: EASE }}
          className="text-lg md:text-xl leading-relaxed text-white/70 font-light max-w-xl mb-16"
        >
          Have a project in mind? Need a full-stack developer to bring your idea
          to life? Let&apos;s connect and build something impactful.
        </motion.p>

        {/* ── Two column: info + form ── */}
        <div className="grid grid-cols-1 lg:grid-cols-[0.9fr_1.1fr] gap-12 lg:gap-20">
          {/* LEFT — contact details + socials */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: EASE }}
            className="flex flex-col gap-8"
          >
            <div className="space-y-5">
              <a
                href="mailto:hbirhanu.dev@gmail.com"
                className="group flex items-center gap-4 p-5 border border-white/10 rounded-xl hover:border-[#f59e0b]/40 transition-colors duration-300"
              >
                <span className="w-11 h-11 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-[#f59e0b]/10 transition-colors">
                  <Mail className="w-5 h-5 text-[#f59e0b]" />
                </span>
                <span className="flex flex-col">
                  <span className="font-mono text-[10px] tracking-[0.25em] text-white/40 uppercase">
                    Email
                  </span>
                  <span className="text-white/90 text-sm md:text-base">
                    hbirhanu.dev@gmail.com
                  </span>
                </span>
              </a>

              <a
                href="tel:+251989943757"
                className="group flex items-center gap-4 p-5 border border-white/10 rounded-xl hover:border-[#f59e0b]/40 transition-colors duration-300"
              >
                <span className="w-11 h-11 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-[#f59e0b]/10 transition-colors">
                  <Phone className="w-5 h-5 text-[#f59e0b]" />
                </span>
                <span className="flex flex-col">
                  <span className="font-mono text-[10px] tracking-[0.25em] text-white/40 uppercase">
                    Phone
                  </span>
                  <span className="text-white/90 text-sm md:text-base">
                    +251 989 943 757
                  </span>
                </span>
              </a>
            </div>

            <div className="flex flex-wrap gap-3">
              <Link
                href="https://www.upwork.com/freelancers/~014970832ba09c14d3?mp_source=share"
                target="_blank"
                className="inline-flex items-center gap-2 px-5 py-3.5 bg-white text-black font-bold uppercase tracking-widest text-[11px] hover:bg-gray-200 transition-colors"
              >
                <FaUpwork className="text-base" />
                Hire on Upwork
              </Link>
              <Link
                href="https://www.linkedin.com/in/lantumobirhanu/"
                target="_blank"
                aria-label="LinkedIn"
                className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-white/5 border border-white/10 text-white hover:bg-white hover:text-black transition-all duration-300"
              >
                <FaLinkedin className="text-lg" />
              </Link>
              <Link
                href="https://t.me/lyzon1"
                target="_blank"
                aria-label="Telegram"
                className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-white/5 border border-white/10 text-white hover:bg-white hover:text-black transition-all duration-300"
              >
                <FaTelegramPlane className="text-lg" />
              </Link>
            </div>
          </motion.div>

          {/* RIGHT — form */}
          <motion.form
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: EASE }}
            onSubmit={(e) => {
              e.preventDefault();
              setSent(true);
            }}
            className="bg-white/[0.03] border border-white/10 rounded-2xl p-6 md:p-10 flex flex-col gap-5"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <input
                type="text"
                required
                placeholder="Name"
                className="w-full rounded-lg border border-white/10 bg-white/[0.02] p-4 text-sm text-white placeholder-white/30 focus:outline-none focus:border-[#f59e0b]/60 transition-colors"
              />
              <input
                type="email"
                required
                placeholder="Email"
                className="w-full rounded-lg border border-white/10 bg-white/[0.02] p-4 text-sm text-white placeholder-white/30 focus:outline-none focus:border-[#f59e0b]/60 transition-colors"
              />
            </div>
            <input
              type="text"
              placeholder="Subject"
              className="w-full rounded-lg border border-white/10 bg-white/[0.02] p-4 text-sm text-white placeholder-white/30 focus:outline-none focus:border-[#f59e0b]/60 transition-colors"
            />
            <textarea
              rows={6}
              required
              placeholder="Message"
              className="w-full rounded-lg border border-white/10 bg-white/[0.02] p-4 text-sm text-white placeholder-white/30 focus:outline-none focus:border-[#f59e0b]/60 transition-colors resize-none"
            />
            <button
              type="submit"
              className="group inline-flex items-center justify-center gap-3 border border-white/30 hover:border-white px-6 py-4 text-[11px] md:text-xs font-semibold tracking-[0.28em] uppercase text-white transition-colors duration-300 hover:bg-white hover:text-black"
            >
              {sent ? (
                <>
                  <CheckCircle2 className="w-4 h-4" />
                  Message Sent
                </>
              ) : (
                <>
                  Send Message
                  <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </>
              )}
            </button>
          </motion.form>
        </div>
      </div>
    </section>
  );
};

export default ContactPage;
