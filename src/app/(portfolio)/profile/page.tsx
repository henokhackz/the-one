'use client'

import React from 'react'
import { Shield, Globe, Cpu as Chip, Zap, User, Code, Terminal, Briefcase, GraduationCap, Mail } from 'lucide-react'
import Experience from '@/components/expriance'
import { Education } from '@/components/education'
import Technologies from '@/components/technologies'

const ProfilePage = () => {
  return (
    <div className="min-h-screen pt-40 pb-20 px-6 max-w-7xl mx-auto space-y-32">
      {/* 1. IDENTITY BLOCK */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div className="space-y-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-green-500/10 border border-green-500/20 text-green-500 text-[10px] font-mono tracking-widest uppercase">
            <Shield className="w-3 h-3" /> Identity_Verified // Core_Authorized
          </div>
          <div className="space-y-4">
            <h1 className="text-6xl md:text-8xl font-black text-white/90 tracking-tighter uppercase leading-none">
              DIGITAL<br/><span className="text-green-500/80">ARCHITECT</span>
            </h1>
            <div className="h-px w-32 bg-gradient-to-r from-green-500/50 to-transparent" />
          </div>
          <p className="text-gray-400 text-lg leading-relaxed max-w-xl font-light italic">
            "Engineering the intersection of high-frequency performance and futuristic aesthetics. 
            Currently optimizing for elite remote missions and complex freelance architectures."
          </p>
          <div className="grid grid-cols-2 gap-6 pt-4">
            <div className="p-6 border border-white/5 bg-white/[0.01] hover:bg-white/[0.03] transition-colors relative group overflow-hidden">
              <div className="absolute top-0 left-0 w-1 h-full bg-green-500/20" />
              <div className="text-[10px] font-mono text-white/20 mb-2 uppercase tracking-widest">System_Access</div>
              <div className="text-white font-bold tracking-tight">LEVEL_01_ADMIN</div>
            </div>
            <div className="p-6 border border-white/5 bg-white/[0.01] hover:bg-white/[0.03] transition-colors relative group overflow-hidden">
              <div className="absolute top-0 left-0 w-1 h-full bg-green-500/20" />
              <div className="text-[10px] font-mono text-white/20 mb-2 uppercase tracking-widest">Deployment</div>
              <div className="text-white font-bold tracking-tight">REMOTE_ENABLED</div>
            </div>
          </div>
        </div>

        <div className="relative group">
          {/* High-tech visual framing */}
          <div className="absolute -inset-4 border border-white/5 rounded-full animate-[spin_20s_linear_infinite] opacity-20" />
          <div className="absolute -inset-8 border border-white/5 rounded-full animate-[spin_30s_linear_infinite_reverse] opacity-10" />
          
          <div className="relative border border-white/10 p-2 bg-black/40 backdrop-blur-3xl aspect-[4/5] flex items-center justify-center overflow-hidden rounded-2xl">
             <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-green-500/40 to-transparent animate-[scan_3s_linear_infinite]" />
             
             {/* Character Display Placeholder */}
             <div className="w-full h-full bg-white/[0.02] flex flex-col items-center justify-center relative">
                <div className="text-[120px] font-black text-white/5 select-none tracking-tighter">LB</div>
                <div className="absolute inset-0 flex flex-col items-center justify-center p-12 text-center space-y-6 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                   <Terminal className="w-12 h-12 text-green-500/40" />
                   <p className="text-[11px] font-mono text-green-500/60 leading-relaxed uppercase tracking-widest">
                      // DATA_LOG: Lantumo Birhanu<br/>
                      // ORIGIN: Addis Ababa<br/>
                      // STACK: JS/TS/React/Node/AI<br/>
                      // MISSION: Excellence
                   </p>
                </div>
                <div className="absolute bottom-6 left-6 right-6 border-t border-white/10 pt-4 flex justify-between items-center">
                   <div className="flex gap-2">
                      {[...Array(3)].map((_, i) => (
                        <div key={i} className="w-1 h-1 bg-green-500/40 rounded-full animate-pulse" style={{ animationDelay: `${i * 200}ms` }} />
                      ))}
                   </div>
                   <Chip className="w-5 h-5 text-white/20" />
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* 2. CORE COMPONENTS */}
      <div className="space-y-40">
        <Technologies />
        
        <div className="relative">
          <div className="absolute -left-12 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-white/10 to-transparent" />
          <div className="flex items-center gap-4 mb-12">
            <div className="p-2 border border-white/10 bg-white/[0.02]">
              <Briefcase className="w-4 h-4 text-green-500/60" />
            </div>
            <h2 className="text-3xl font-black text-white uppercase tracking-tighter">Professional_XP</h2>
          </div>
          <Experience />
        </div>

        <div className="relative">
          <div className="absolute -right-12 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-white/10 to-transparent" />
          <div className="flex items-center gap-4 mb-12">
            <div className="p-2 border border-white/10 bg-white/[0.02]">
              <GraduationCap className="w-4 h-4 text-green-500/60" />
            </div>
            <h2 className="text-3xl font-black text-white uppercase tracking-tighter">Education_DB</h2>
          </div>
          <Education />
        </div>
      </div>

      {/* 3. OPERATIONAL METRICS (Targeting Remote/Freelance) */}
      <section className="pt-20 border-t border-white/5">
        <div className="mb-12 text-center space-y-2">
           <h3 className="text-[10px] font-mono text-green-500/60 uppercase tracking-[0.5em]">Global_Readiness_Report</h3>
           <p className="text-white/20 text-[9px] uppercase tracking-widest italic">Updated_In_Real_Time</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[
            { label: 'REMOTE_SYNC', val: 'ENABLED', icon: Globe },
            { label: 'DELIVERY_SPEED', val: 'HIGH_FREQ', icon: Zap },
            { label: 'CODE_MORPHEUS', val: 'OPTIMIZED', icon: Code },
            { label: 'COMM_SECURE', val: 'DIRECT', icon: Mail },
          ].map((stat, i) => (
            <div key={i} className="p-8 border border-white/5 bg-white/[0.01] hover:bg-green-500/[0.02] hover:border-green-500/20 transition-all flex flex-col items-center text-center gap-4 group">
               <stat.icon className="w-6 h-6 text-white/20 group-hover:text-green-500/60 transition-colors" />
               <div className="space-y-1">
                  <div className="text-xl font-black text-white group-hover:text-green-500 transition-colors">{stat.val}</div>
                  <div className="text-[8px] font-mono text-white/20 uppercase tracking-[0.3em]">{stat.label}</div>
               </div>
            </div>
          ))}
        </div>
      </section>

      <style jsx global>{`
        @keyframes scan {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(500%); }
        }
      `}</style>
    </div>
  )
}

export default ProfilePage
