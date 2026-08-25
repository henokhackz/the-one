import type { Metadata } from "next";
import { Syne, Outfit } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ui/theme-provider";

const fontHeading = Syne({
  variable: "--font-heading",
  subsets: ["latin"],
});

const fontBody = Outfit({
  variable: "--font-body",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  icons: {
    icon: "/logo.png",
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
        className={`${fontHeading.variable} ${fontBody.variable} antialiased font-body`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          <div className="w-full min-h-screen">{children}</div>
        </ThemeProvider>
      </body>
    </html>
  );
}
