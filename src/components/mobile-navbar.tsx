'use client'

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Home, Headset, Book, Phone } from 'lucide-react'

const navItems = [
  { href: '/', icon: <Home className="w-6 h-6" />, label: 'Home' },
  { href: '/projects', icon: <Headset className="w-6 h-6" />, label: 'Projects' },
  { href: '/blogs', icon: <Book className="w-6 h-6" />, label: 'Blogs' },
  { href: '/contact', icon: <Phone className="w-6 h-6" />, label: 'Contact' },
]

const MobileNavbar = () => {
  const pathname = usePathname()

  return (
    <nav className="fixed bottom-0 inset-x-0 z-50 bg-white dark:bg-slate-900 border-t border-gray-200 dark:border-gray-800 shadow-md md:hidden flex justify-around items-center py-2 px-8 overflow-x-hidden">
      {navItems.map((item) => {
        const isActive = pathname === item.href
        return (
          <Link
            key={item.href}
            href={item.href}
            className={`flex flex-col items-center justify-center gap-1 text-sm ${
              isActive ? 'text-fuchsia-500' : 'text-gray-500 dark:text-gray-400'
            } hover:text-fuchsia-500 transition`}
          >
            {item.icon}
          </Link>
        )
      })}
    </nav>
  )
}

export default MobileNavbar
