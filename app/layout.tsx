import type { Metadata } from "next";
import { Geist_Mono, Press_Start_2P } from "next/font/google";
import { Suspense } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import BootSplash from "./components/BootSplash";

import { DarkPassengerProvider } from "./components/DarkPassengerProvider";
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
  title: "John Lexter Reyes | AWS Student Builder Group Lead",
  description:
    "AWS Student Builder Group Lead and cloud engineer focused on practical systems, clean delivery, and infrastructure that feels simple to run.",
  icons: {
    icon: "/profile.png",
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
        <Suspense fallback={null}>
          <BootSplash />
        </Suspense>
        <DarkPassengerProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </DarkPassengerProvider>
      </body>
    </html>
  );
}
