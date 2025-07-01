import { AnimatedText } from '@/components/animated-text'
import { Contact } from '@/components/contact'
import { WorkExpriance } from '@/components/expriance'
import { Footer } from '@/components/footer'
import { Hero } from '@/components/hero'
import { Navbar } from '@/components/navbar'
import { NavbarPortfolio } from '@/components/navbar-menu'
import { Projects } from '@/components/projects'
import { Service } from '@/components/service'
import { Typewriter } from '@/components/type-effect'
import { FloatingNav } from '@/components/ui/floating-navbar'
import { className, navItems } from '@/lib/constants'
import React from 'react'

const Home = () => {
  return (
    <div className='flex flex-col  min-h-screen p-5 rounded-lg'>
    <NavbarPortfolio/>
    <Hero/>
    <Service />
    <WorkExpriance/>
    <Projects/>
    <Contact/>
    <Footer/>

    </div>
  )
}

export default Home