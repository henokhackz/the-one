import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ui/theme-provider";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  icons: {
    icon: '/logo.png',
  },
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
            defaultTheme="dark"
            enableSystem={false}
            disableTransitionOnChange
          >

            <div className='w-full min-h-screen flex flex-col overflow-x-hidden bg-[#050505] text-white grid-lines-dark'>
              {children}
            </div>
               

          </ThemeProvider>
      </body>
    </html>
  );
}
