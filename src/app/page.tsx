import { AnimatedText } from '@/components/animated-text'
import { Contact } from '@/components/contact'
import { WorkExpriance } from '@/components/expriance'
import { Footer } from '@/components/footer'
import { Navbar } from '@/components/navbar'
import { Projects } from '@/components/projects'
import { Service } from '@/components/service'
import { Typewriter } from '@/components/type-effect'
import { FloatingNav } from '@/components/ui/floating-navbar'
import { className, navItems } from '@/lib/constants'
import React from 'react'

const Home = () => {
  return (
    <div className='flex flex-col  min-h-screen'>
    <Navbar />
    <AnimatedText/>
    <Typewriter/>
    <Service />
    <WorkExpriance/>
    <Projects/>
    <Contact/>
    <Footer/>

    </div>
  )
}

export default Home