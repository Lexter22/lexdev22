import type { Metadata, Viewport } from "next";
import { Geist_Mono, Press_Start_2P } from "next/font/google";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ChapterRail from "./components/ChapterRail";

import { GITHUB, LINKEDIN } from "./components/links";
import { LOCATION, SITE_DESCRIPTION, SITE_NAME, SITE_TITLE, SITE_URL } from "./site";
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
  metadataBase: new URL(SITE_URL),
  applicationName: SITE_NAME,
  title: SITE_TITLE,
  description: SITE_DESCRIPTION,
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  alternates: { canonical: "/" },
  openGraph: {
    type: "profile",
    url: "/",
    siteName: SITE_NAME,
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    locale: "en_PH",
  },
  twitter: { card: "summary_large_image", title: SITE_TITLE, description: SITE_DESCRIPTION },
  robots: { index: true, follow: true },
  // Google Search Console ownership check (renders <meta name="google-site-verification"> in <head>)
  verification: { google: "I_5kyN8DoEwmndUHCIj7zF9eheE6nWLs6enOiZxRnCE" },
};

/** Structured data: the site's name. Google uses this for the name shown above the result (instead of "Vercel"). */
const website = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: SITE_NAME,
  alternateName: ["Lexter Reyes", "LexDev22"],
  url: `${SITE_URL}/`,
};

/** Structured data: who this site is about. Only facts already shown on the page. */
const person = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: SITE_NAME,
  url: SITE_URL,
  image: `${SITE_URL}/profile.png`,
  jobTitle: "Software Engineer",
  description: SITE_DESCRIPTION,
  sameAs: [GITHUB, LINKEDIN],
  alumniOf: { "@type": "CollegeOrUniversity", name: "Polytechnic University of the Philippines – Biñan Campus" },
  homeLocation: {
    "@type": "Place",
    name: LOCATION,
    address: { "@type": "PostalAddress", addressLocality: "Biñan", addressRegion: "Laguna", addressCountry: "PH" },
  },
  knowsAbout: ["Backend development", "Cloud computing", "AWS", "Azure", "PostgreSQL", "Docker", "QA automation", "AI engineering", "LLM prompting", "AI agents"],
};

export const viewport: Viewport = {
  themeColor: "#111c27",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  viewportFit: "cover",
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify([website, person]).replace(/</g, "\\u003c") }}
        />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[60] focus:px-4 focus:py-2 focus:bg-[var(--accent)] focus:text-[var(--on-accent)] focus:rounded-sm transition-all"
        >
          Skip to content
        </a>
        <ChapterRail />
        <Header />
          <main id="main" className="relative z-10 flex-1">{children}</main>
          <Footer />
      </body>
    </html>
  );
}
