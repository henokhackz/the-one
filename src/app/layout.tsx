import type { Metadata } from "next";
import { Cormorant_Garamond, Outfit, JetBrains_Mono, Noto_Serif_Ethiopic } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ui/theme-provider";
import { LocaleProvider } from "@/lib/locale-context";

const fontHeading = Cormorant_Garamond({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
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

const fontEthiopic = Noto_Serif_Ethiopic({
  variable: "--font-ethiopic",
  subsets: ["ethiopic"],
  weight: ["400", "700"],
  display: "swap",
  preload: false,
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://lantu.pro.et";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Lantumo Birhanu (ላንቱሞ) — Fullstack & Creative Three.js Engineer",
    template: "%s | Lantumo Birhanu",
  },
  description:
    "Handcrafted creative portfolio of Lantumo Birhanu. Fullstack engineer specializing in Next.js, React 19, Three.js, PostgreSQL, and high-performance WebGL systems.",
  keywords: [
    "Lantumo Birhanu",
    "Fullstack Developer",
    "Three.js Engineer",
    "Frontend Developer",
    "Next.js",
    "React 19",
    "WebGL Shaders",
    "Ethiopian Developer",
    "Addis Ababa",
    "Ideeza",
  ],
  authors: [{ name: "Lantumo Birhanu", url: "https://github.com/henokhackz" }],
  creator: "Lantumo Birhanu",
  alternates: {
    canonical: "/",
    types: {
      "application/rss+xml": "/rss.xml",
    },
  },
  openGraph: {
    title: "Lantumo Birhanu — Fullstack & Creative Three.js Engineer",
    description: "Distinctive, performance-first creative developer portfolio with WebGL and Next.js.",
    url: siteUrl,
    siteName: "Lantumo Birhanu Portfolio",
    images: [
      {
        url: "/hero.jpg",
        width: 1200,
        height: 630,
        alt: "Lantumo Birhanu Portfolio Preview",
      },
    ],
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Lantumo Birhanu — Fullstack & Creative Three.js Engineer",
    description: "Distinctive, performance-first creative developer portfolio with WebGL and Next.js.",
    images: ["/hero.jpg"],
  },
  icons: {
    icon: "/favicon.ico",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": `${siteUrl}/#person`,
      name: "Lantumo Birhanu",
      jobTitle: "Fullstack & Creative Three.js Engineer",
      url: siteUrl,
      image: `${siteUrl}/hero.jpg`,
      sameAs: [
        "https://github.com/henokhackz",
        "https://www.linkedin.com/in/lantumobirhanu/",
        "https://t.me/lyzon1",
      ],
      knowsAbout: [
        "Next.js",
        "React 19",
        "Three.js",
        "WebGL",
        "TypeScript",
        "PostgreSQL",
        "Prisma ORM",
        "Node.js",
        "Tailwind CSS",
      ],
      address: {
        "@type": "PostalAddress",
        addressLocality: "Addis Ababa",
        addressCountry: "ET",
      },
    },
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      url: siteUrl,
      name: "Lantumo Birhanu Portfolio",
      publisher: {
        "@id": `${siteUrl}/#person`,
      },
    },
  ],
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
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
