import type { Metadata } from "next";
import { Geist_Mono, Press_Start_2P } from "next/font/google";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ScrollProgressBar from "./components/ScrollProgressBar";

import "./globals.css";

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

const pixelFont = Press_Start_2P({
  weight: "400",
  variable: "--font-pixel",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "John Lexter B. Reyes | AWS Student Builder Group Lead",
  description:
    "John Lexter B. Reyes, AWS Student Builder Group Lead and cloud engineer focused on practical systems, clean delivery, and infrastructure that feels simple to run.",
  themeColor: "#0a0a0a",
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 5,
    userScalable: true,
    viewportFit: "cover",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistMono.variable} ${pixelFont.variable} antialiased`}
    >
      <body className="min-h-screen flex flex-col">
        <ScrollProgressBar />
        <Header />
          <main className="flex-1">{children}</main>
          <Footer />
      </body>
    </html>
  );
}
