import type { Metadata } from "next";
import { Syne, Outfit, JetBrains_Mono, Noto_Sans_Ethiopic } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ui/theme-provider";
import { LocaleProvider } from "@/lib/locale-context";

const fontHeading = Syne({
  variable: "--font-heading",
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

const fontBody = Outfit({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
  preload: false,
});

const fontMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
  preload: false,
});

const fontEthiopic = Noto_Sans_Ethiopic({
  variable: "--font-ethiopic",
  subsets: ["ethiopic"],
  display: "swap",
  preload: false,
});

export const metadata: Metadata = {
  title: "Lantumo Birhanu (ላንቱሞ) — Fullstack & Creative Three.js Engineer",
  description:
    "Fidel (ፊደል): Handcrafted creative portfolio of Lantumo Birhanu. Fullstack developer and Three.js creative engineer specializing in React, Next.js, and high-performance WebGL systems.",
  keywords: [
    "Lantumo Birhanu",
    "Fullstack Developer",
    "Three.js Engineer",
    "Frontend Developer",
    "Next.js",
    "React",
    "Ethiopian Developer",
    "Addis Ababa",
    "Ideeza",
  ],
  authors: [{ name: "Lantumo Birhanu", url: "https://github.com/lyzon1" }],
  openGraph: {
    title: "Lantumo Birhanu — Fullstack & Creative Three.js Engineer",
    description: "Fidel (ፊደል): Distinctive, performance-first creative developer portfolio.",
    type: "website",
    locale: "en_US",
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${fontHeading.variable} ${fontBody.variable} ${fontMono.variable} ${fontEthiopic.variable} antialiased selection:bg-accent selection:text-accent-foreground font-body`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={true}
          disableTransitionOnChange={false}
        >
          <LocaleProvider>
            {children}
          </LocaleProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
