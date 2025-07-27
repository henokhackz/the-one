import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ui/theme-provider";
import Navbar from "@/components/navbar";
import { Footer } from "@/components/footer";
import DownloadResumeButton from "@/components/cv";
import MobileNavbar from "@/components/mobile-navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "lantumo birhanu || fullstack developer",
  description: "lantumo birhanu |  the developer | next.js | node.js ",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
       
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
       <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >

            <div className='w-full px-8 py-6 bg-gray-100  dark:bg-slate-900 min-h-screen flex flex-col overflow-x-hidden'>
                <Navbar/>
                <div className="w-full flex-1 py-4">
                {children}
                </div>
                <Footer/>
                <DownloadResumeButton/>
                <MobileNavbar/>
               </div>

          </ThemeProvider>
      </body>
    </html>
  );
}
