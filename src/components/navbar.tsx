'use client'

import React, { useState, useEffect, useRef } from 'react'
import { Github, Linkedin, Mail, Menu, X, Globe, Cpu, Terminal, Activity, ChevronRight, CornerDownRight, ExternalLink, Briefcase } from 'lucide-react'
import { FaTelegramPlane } from 'react-icons/fa'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const Navbar = () => {
  const [time, setTime] = useState<string>('')
  const [date, setDate] = useState<string>('')
  const [day, setDay] = useState<string>('')
  const [epoch, setEpoch] = useState<number>(0)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()
  
  // High-Performance Scroll Refs
  const containerRef = useRef<HTMLDivElement>(null)
  const listRef = useRef<HTMLDivElement>(null)
  const [scrollTranslate, setScrollTranslate] = useState(0)
  const [scrollProgress, setScrollProgress] = useState(0)
  
  // Internal values for smoothly interpolated scroll
  const scrollY = useRef(0)
  const targetScrollY = useRef(0)
  const autoScrollRef = useRef(0) // Velocity

  useEffect(() => {
    const updateTime = () => {
      const now = new Date()
      setTime(now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true }))
      setDate(now.toLocaleDateString('en-GB').replace(/\//g, '.'))
      setDay(now.toLocaleDateString('en-US', { weekday: 'long' }).toUpperCase())
      setEpoch(Math.floor(Date.now() / 1000))
    }
    
    updateTime()
    const interval = setInterval(updateTime, 1000)
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => {
      clearInterval(interval)
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  // Smooth Motion Loop - Matrix Notch System
  useEffect(() => {
    let frameId: number
    
    const loop = () => {
      if (!isMenuOpen || window.innerWidth < 768) {
        frameId = requestAnimationFrame(loop)
        return
      }

      const container = containerRef.current
      const list = listRef.current
      if (!container || !list) return

      const maxScroll = Math.max(0, list.scrollHeight - container.clientHeight)
      
      // 1. Apply Auto-Scroll Velocity (High Speed)
      if (autoScrollRef.current !== 0) {
        targetScrollY.current += autoScrollRef.current * 2 // Double speed
      }

      // 2. Clamp Target
      targetScrollY.current = Math.max(0, Math.min(maxScroll, targetScrollY.current))

      // 3. Magnetic Detent Interaction (The "Landing Gap")
      // Finds the closest nav link and creates a "notched" landing feel
      const linkElements = list.querySelectorAll('a')
      let attraction = 0
      linkElements.forEach((el) => {
        const elTop = (el as HTMLElement).offsetTop
        const dist = Math.abs(targetScrollY.current - elTop)
        // If near a "notch" and not high velocity, attract to social center
        if (dist < 100 && Math.abs(autoScrollRef.current) < 5) {
           attraction = (elTop - targetScrollY.current) * 0.18 
        }
      })
      targetScrollY.current += attraction

      // 4. Interpolate current position (Crisp Lerp)
      scrollY.current += (targetScrollY.current - scrollY.current) * 0.15
      
      // 5. Update UI
      setScrollTranslate(-scrollY.current)
      setScrollProgress(maxScroll > 0 ? scrollY.current / maxScroll : 0)

      frameId = requestAnimationFrame(loop)
    }

    frameId = requestAnimationFrame(loop)
    return () => cancelAnimationFrame(frameId)
  }, [isMenuOpen])

  const navLinks = [
    { name: 'HOME', href: '/', detail: 'SYSTEM_ORIGIN', desc: 'Return to the primary interface' },
    { name: 'PROJECTS', href: '/projects', detail: 'WORKS_DATABASE', desc: 'Access curated digital architecture' },
    { name: 'PROFILE', href: '/profile', detail: 'IDENTITY_CORE', desc: 'Analyze operative background and skills' },
    { name: 'CONTACTS', href: '/contact', detail: 'COMM_RECEPTOR', desc: 'Establish direct secure transmission' },
  ]

  const handleWheel = (e: React.WheelEvent) => {
    // Increased Speed
    targetScrollY.current += e.deltaY * 0.9
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current || window.innerWidth < 768) return
    
    const rect = containerRef.current.getBoundingClientRect()
    const mouseY = e.clientY - rect.top
    const edgeSize = 100 // Smaller trigger zone, higher speed
    
    if (mouseY < edgeSize) {
      const intensity = (edgeSize - mouseY) / edgeSize
      autoScrollRef.current = -intensity * 30 // Ultra-Fast
    } else if (mouseY > rect.height - edgeSize) {
      const intensity = (mouseY - (rect.height - edgeSize)) / edgeSize
      autoScrollRef.current = intensity * 30 // Ultra-Fast
    } else {
      autoScrollRef.current = 0
    }
  }

  const handleMouseLeave = () => {
    autoScrollRef.current = 0
  }

  const Crosshair = ({ className }: { className?: string }) => (
    <div className={`absolute w-3 h-3 pointer-events-none z-20 ${className}`}>
      <div className="absolute top-1/2 left-0 w-full h-[0.5px] bg-white/40 -translate-y-1/2" />
      <div className="absolute top-0 left-1/2 w-[0.5px] h-full bg-white/40 -translate-x-1/2" />
    </div>
  )

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 select-none ${
      scrolled || isMenuOpen ? 'glass-card-premium border-b border-white/10' : 'bg-transparent'
    }`}>
      {/* 0. CYBORG CONTACT OVERLAY (TOP BAR) */}
      <div className="hidden md:flex h-9 bg-black/60 border-b border-white/10 items-center justify-between px-6 text-[9px] font-mono tracking-[0.2em] text-white/60 overflow-hidden relative group">
        <div className="absolute inset-0 bg-gradient-to-r from-green-500/5 via-transparent to-green-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
        
        <div className="flex items-center gap-6 z-10">
          <div className="flex items-center gap-2 text-green-500/80">
            <div className="relative">
              <span className="flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
            </div>
            <span className="font-bold">REMOTE_OP_STATUS: AVAILABLE</span>
          </div>
          <div className="w-px h-3 bg-white/20" />
          <a href="mailto:hbirhanu.dev@gmail.com" className="hover:text-green-400 transition-colors flex items-center gap-2">
            <Mail className="w-3 h-3" /> HBIRHANU.DEV@GMAIL.COM
          </a>
        </div>

        <div className="flex items-center gap-5 z-10">
          <a href="https://github.com/henokhackz" target="_blank" className="hover:text-white transition-colors flex items-center gap-1.5 group/link">
            <Github className="w-3 h-3" /> GITHUB <ExternalLink className="w-2 h-2 opacity-0 group-hover/link:opacity-100 transition-opacity" />
          </a>
          <a href="https://www.linkedin.com/in/lantumobirhanu/" target="_blank" className="hover:text-white transition-colors flex items-center gap-1.5 group/link">
            <Linkedin className="w-3 h-3" /> LINKEDIN <ExternalLink className="w-2 h-2 opacity-0 group-hover/link:opacity-100 transition-opacity" />
          </a>
          <a href="https://t.me/lyzon1" target="_blank" className="hover:text-white transition-colors flex items-center gap-1.5 group/link">
            <FaTelegramPlane className="w-3 h-3" /> TELEGRAM <ExternalLink className="w-2 h-2 opacity-0 group-hover/link:opacity-100 transition-opacity" />
          </a>
        </div>
      </div>

      {/* Visual top hairline glow */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-blue-500/40 to-transparent opacity-80 z-30" />

      {/* Main Navbar Section */}
      <div className="max-w-full mx-auto h-16 md:h-20 grid grid-cols-2 lg:grid-cols-12 items-stretch border-b border-white/10 relative">
        {/* Scanning line animation container */}
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden z-0">
          <div className="absolute top-0 left-0 w-[20%] h-full bg-gradient-to-r from-transparent via-white/[0.03] to-transparent -translate-x-full animate-[scan_8s_linear_infinite]" />
        </div>
        
        {/* 1. STATUS FIELD (LEFT) */}
        <div className="col-span-1 lg:col-span-3 flex flex-col justify-center px-4 md:px-8 border-r border-white/20 bg-white/[0.02] relative group overflow-hidden">
          <Crosshair className="-top-1.5 -right-1.5" />
          <div className="flex items-center gap-2 mb-0.5">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)] animate-pulse" />
            <span className="text-[8px] font-mono text-white/70 uppercase tracking-[0.2em]">{day}</span>
          </div>
          <div className="flex items-baseline gap-x-2 tabular-nums">
            <span className="text-xs md:text-[13px] font-mono text-white tracking-widest font-bold">
              {time}
            </span>
          </div>
        </div>

        {/* 2. CORE TERMINAL (CENTER - HIDDEN ON MOBILE) */}
        <div className="hidden md:flex md:col-span-5 lg:col-span-4 items-center justify-center relative group border-r border-white/20">
          <Crosshair className="-top-1.5 -right-1.5" />
          <Link href="/" className="relative z-10 flex items-center justify-center px-4">
            <Cpu className="hidden sm:block w-4 h-4 text-white/60 mr-3 group-hover:rotate-90 transition-transform duration-700" />
            <span className="text-[9px] md:text-[10px] uppercase tracking-[0.4em] font-black text-white hover:text-green-500/80 transition-colors duration-500 whitespace-nowrap text-glow">FULLSTACK DEVELOPER</span>
          </Link>
        </div>

        {/* 3. DIAGNOSTICS (RIGHT-CENTER) */}
        <div className="hidden lg:flex col-span-3 items-center justify-center px-4 border-l border-white/20 text-[9px] font-mono text-white/50 uppercase tracking-[0.2em] relative overflow-hidden">
          <Crosshair className="-top-1.5 -right-1.5" />
          <div className="flex flex-col items-end gap-1">
            <div className="flex items-center gap-2">
              <Briefcase className="w-3 h-3 text-white/60 shrink-0" />
              <div className="flex flex-col items-start text-left leading-tight">
                <span className="flex items-center gap-1.5">
                   <div className="w-1 h-1 rounded-full bg-green-500/60" /> REMOTE
                </span>
                <span className="flex items-center gap-1.5">
                   <div className="w-1 h-1 rounded-full bg-green-500/60" /> FREELANCE
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* 4. OPS TRIGGER (RIGHT) */}
        <div 
          className="col-span-1 lg:col-span-2 flex items-center justify-center border-l border-white/20 cursor-pointer group hover:bg-white/[0.05] transition-all relative z-50"
          onClick={() => {
            setIsMenuOpen(!isMenuOpen)
            scrollY.current = 0
            targetScrollY.current = 0
            setScrollTranslate(0)
            setScrollProgress(0)
          }}
        >
          {isMenuOpen ? (
             <div className="flex flex-col items-center gap-1">
                <X className="w-6 h-6 text-white animate-in zoom-in duration-300" />
                <span className="text-[6px] font-mono text-white/20 uppercase tracking-[0.3em]">Abort</span>
             </div>
          ) : (
            <div className="flex flex-col items-center gap-1 group-hover:scale-105 transition-transform duration-300">
              <Menu className="w-6 h-6 text-white" />
              <span className="text-[6px] font-mono text-white/20 uppercase tracking-[0.3em] group-hover:text-white/60 transition-colors">Matrix</span>
            </div>
          )}
          <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-white/30" />
          <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-white/30" />
        </div>
      </div>

      {/* OVERLAY NAVIGATION - NEURAL GLIDE PANNING */}
      <div 
        ref={containerRef}
        onWheel={handleWheel}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className={`absolute top-full left-0 right-0 bg-black/90 backdrop-blur-3xl border-b border-white/20 transition-all duration-700 ease-in-out shadow-[0_50px_100px_rgba(0,0,0,0.8)] z-40 overflow-hidden ${
          isMenuOpen ? 'h-[calc(100vh-120px)] md:h-[calc(100vh-160px)] opacity-100 pointer-events-auto' : 'h-0 opacity-0 pointer-events-none'
        }`}
      >
        {/* Scroll Progress Indicator */}
        <div className="hidden md:block absolute right-4 top-1/2 -translate-y-1/2 h-32 w-[1px] bg-white/10 z-50">
           <div 
            className="absolute top-0 left-0 w-full bg-green-500/60 transition-all duration-300 shadow-[0_0_8px_rgba(34,197,94,0.4)]" 
            style={{ height: '20px', transform: `translateY(${scrollProgress * (128 - 20)}px)` }} 
           />
           <div className="absolute -left-12 top-0 text-[7px] font-mono text-white/20 uppercase tracking-widest whitespace-nowrap -rotate-90 translate-y-8">
              Nav_Buffer_Status
           </div>
        </div>

        <div 
          ref={listRef}
          style={{ 
            transform: `translateY(${scrollTranslate}px)`,
            willChange: 'transform'
          }}
          className="max-w-4xl mx-auto flex flex-col items-stretch divide-y divide-white/10 uppercase"
        >
          {navLinks.map((link, idx) => (
            <Link 
              key={link.name} 
              href={link.href}
              className="group p-8 md:p-14 lg:p-20 flex flex-col md:flex-row items-start md:items-center justify-between hover:bg-white/[0.03] transition-all duration-500 relative"
              onClick={() => setIsMenuOpen(false)}
            >
              <div className="flex items-center gap-6 md:gap-12">
                <div className="hidden sm:flex flex-col items-center gap-1">
                   <span className="text-[10px] font-mono text-white/20 group-hover:text-green-500/60 transition-colors">0{idx + 1}</span>
                   <div className="w-px h-8 bg-white/5 group-hover:bg-green-500/20 transition-colors" />
                </div>
                
                <div className="flex flex-col">
                  <div className="flex items-center gap-3">
                    <span className="text-[8px] font-mono text-green-500/0 group-hover:text-green-500/60 transition-all -ml-6 group-hover:ml-0 opacity-0 group-hover:opacity-100 uppercase">Input_Select //</span>
                    <h3 className="text-3xl md:text-5xl lg:text-7xl font-black text-white/60 group-hover:text-white transition-all duration-500 tracking-tighter group-hover:translate-x-4">
                       {link.name}
                    </h3>
                  </div>
                  <div className="flex items-center gap-2 mt-4 opacity-0 group-hover:opacity-100 transition-all group-hover:translate-x-6">
                     <CornerDownRight className="w-4 h-4 text-white/20" />
                     <p className="text-[10px] font-mono text-white/40 tracking-[0.3em]">
                       {link.desc}
                     </p>
                  </div>
                </div>
              </div>

              <div className="hidden md:flex flex-col items-end gap-1 opacity-20 group-hover:opacity-100 transition-opacity">
                 <span className="text-[10px] font-mono text-white/40 tracking-widest">{link.detail}</span>
                 <div className="flex gap-1">
                    {[...Array(8)].map((_, i) => (
                      <div key={i} className={`w-4 h-0.5 bg-white/10 group-hover:bg-green-500/40 transition-all duration-700 delay-[${i * 100}ms]`} />
                    ))}
                 </div>
              </div>

              {/* Interaction marker for mobile */}
              <ChevronRight className="md:hidden absolute right-8 top-1/2 -translate-y-1/2 w-5 h-5 text-white/10 group-hover:text-white/40 transition-all group-hover:translate-x-1" />
            </Link>
          ))}

          {/* Bottom spacer to allow full pan of last element */}
          <div className="h-40 md:hidden" />
        </div>
        
        {/* Fixed Foot of the interface */}
        <div className="absolute bottom-0 left-0 right-0 p-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6 text-[9px] font-mono text-white/20 uppercase tracking-[0.4em] bg-black/95 z-50">
          <div className="flex items-center gap-4">
             <div className="p-1 border border-white/10">
                <Terminal className="w-3 h-3 text-green-500/60" />
             </div>
             <span className="animate-pulse">System_Core: Virtualized // Session_Active</span>
          </div>
          <div className="flex items-center gap-10">
            <span className="tabular-nums">REF_HEX: [0X{epoch.toString(16).toUpperCase()}]</span>
            <div className="flex items-center gap-3">
              <Globe className="w-3 h-3 opacity-20" />
              <span className="text-white/10 italic">Secure_Overlay_Active</span>
            </div>
          </div>
        </div>
      </div>

      <style jsx global>{`
        @keyframes scan {
          from { transform: translateX(-100%); }
          to { transform: translateX(500%); }
        }
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </header>
  )
}

export default Navbar

