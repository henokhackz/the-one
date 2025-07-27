import Blogs from '@/components/blogs'
import CTA from '@/components/cta'
import Experience from '@/components/expriance'
import { Hero } from '@/components/hero'
import { Projects } from '@/components/projects'
import Technologies from '@/components/technologies'
import React from 'react'

const Home = () => {
  return (
    <div className='w-full lg:px-8 lg:py-16 p-3 space-y-12'>
      <Hero/>
      <Technologies/>
      <Projects/>
      <Experience/>
      <Blogs/>
      <CTA/>
    </div>
  )
}

export default Home 