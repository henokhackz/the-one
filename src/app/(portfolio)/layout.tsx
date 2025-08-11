import DownloadResumeButton from '@/components/cv'
import { Footer } from '@/components/footer'
import MobileNavbar from '@/components/mobile-navbar'
import Navbar from '@/components/navbar'
import React from 'react'

const Layout = ({children}:{children:React.ReactNode}) => {
  return (
    <div className='min-h-screen'>
         <Navbar/>
                <div className="w-full flex-1 py-4">
                {children}
                </div>
                <Footer/>
                <DownloadResumeButton/>
                <MobileNavbar/>
         </div>
  )
}

export default Layout