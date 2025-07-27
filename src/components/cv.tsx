'use client'

import { ArrowDownToLine } from 'lucide-react'
import React from 'react'

const DownloadResumeButton = () => {
  return (
    <a
      href="/lantumo-resume.pdf"
      download
      className="fixed bottom-20 lg:bottom-10 right-6 z-50 group"
    >
      <div className="relative">
        {/* Glow aura */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-fuchsia-500 to-cyan-500 blur-xl opacity-40 animate-pulse -z-10" />

        {/* Main Button */}
        <div className="bg-gradient-to-r from-fuchsia-500 to-cyan-500 text-white px-6 py-3 rounded-full shadow-xl flex items-center gap-2 hover:scale-105 transition-transform duration-300 animate-in">
          <ArrowDownToLine className="w-5 h-5 " />
          <span className='font-semibold hidden lg:flex'>Download CV</span>
        </div>
      </div>
    </a>
  )
}

export default DownloadResumeButton
