import type { Metadata, Viewport } from "next";
import { Instrument_Serif, Outfit } from "next/font/google";
import "./globals.css";

const fontBody = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  display: "swap",
});

const fontSerif = Instrument_Serif({
  variable: "--font-instrument",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://lantumobirhanu.vercel.app"),
  title: {
    default: "Lantumo Birhanu — Fullstack Developer",
    template: "%s | Lantumo Birhanu",
  },
  description:
    "Fullstack developer crafting seamless digital experiences that merge elegant design with robust engineering.",
  keywords: [
    "Fullstack Developer",
    "Next.js",
    "React",
    "TypeScript",
    "Portfolio",
  ],
  authors: [{ name: "Lantumo Birhanu" }],
  openGraph: {
    title: "Lantumo Birhanu — Fullstack Developer",
    description:
      "Fullstack developer crafting seamless digital experiences that merge elegant design with robust engineering.",
    type: "website",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${fontBody.variable} ${fontSerif.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
