'use client'

import { Book, CircleArrowOutUpRight, Headset, Home, Phone, User } from 'lucide-react'
import { Button } from './ui/button'
import Link from 'next/link'
import { ModeToggle } from './toggle-button'
import React from 'react'





const navbar = [
  { name: 'Home', href: '/', icon: <Home className='w-5 h-5' /> },
  { name: 'Projects', href: '/projects', icon: <Headset className='w-5 h-5' /> },
  { name: 'Blogs', href: '/blogs', icon: <Book className='w-5 h-5' /> },
  { name: 'Contact', href: '/contact', icon: <Phone className='w-5 h-5' /> },
]





const Navbar = () => {

 const handleHireMe = () => {
  window.open('https://www.upwork.com/freelancers/~014970832ba09c14d3?mp_source=share', '_blank');
};

  


  return (
    <header className="w-full px-4 py-3 bg-white dark:bg-slate-900  rounded-full border relative overflow-hidden">
      {/* Gradient border effect */}
      <div className="absolute inset-0 rounded-xl z-0 bg-gradient-to-r from-fuchsia-500 to-cyan-500 p-px">
        <div className="w-full h-full bg-white dark:bg-slate-900 rounded-[11px] z-10"></div>
      </div>

      <div className="relative z-10 flex flex-wrap justify-between items-center gap-4">
        {/* Logo */}
        <Link href="/" className="text-2xl font-extrabold bg-gradient-to-r from-fuchsia-500 to-cyan-500 bg-clip-text text-transparent">
          <span>L</span>
          <span>P</span>
        </Link>

        {/* Nav links */}
        <nav className=" gap-4 flex-wrap hidden md:flex">
          {navbar.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-white dark:bg-slate-800 text-slate-900 dark:text-white hover:bg-slate-100 dark:hover:bg-slate-700 border border-transparent hover:border-fuchsia-400 transition-all"
            >
              {item.icon}
              <span>{item.name}</span>
            </Link>
          ))}
        </nav>

        {/* Right actions */}
        <div className="flex items-center gap-4">
          <ModeToggle />
          <Button onClick={handleHireMe} className="flex items-center gap-2 rounded-full border border-transparent bg-gradient-to-r from-fuchsia-500 to-cyan-500 text-white shadow-md hover:brightness-110 transition">
            Hire Me <CircleArrowOutUpRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </header>
  )
}

export default Navbar
