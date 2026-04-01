import DownloadResumeButton from '@/components/cv'
import { Footer } from '@/components/footer'
import MobileNavbar from '@/components/mobile-navbar'
import Navbar from '@/components/navbar'
import React from 'react'

const Layout = ({children}:{children:React.ReactNode}) => {
  return (
    <div className='min-h-screen flex flex-col bg-black overflow-x-hidden'>
         <Navbar/>
         <main className="w-full flex-1 pt-20 md:pt-24 px-4 sm:px-8 max-w-[1400px] mx-auto">
             {children}
         </main>
         <div className="max-w-[1400px] mx-auto w-full px-4 sm:px-8">
           <Footer/>
         </div>
         <DownloadResumeButton/>
         <MobileNavbar/>
    </div>
  )
}

export default Layout