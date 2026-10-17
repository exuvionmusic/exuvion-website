import type { Metadata, Viewport } from "next";
import { Archivo, Bodoni_Moda, IBM_Plex_Mono } from "next/font/google";
import { band, links } from "@/lib/content";
import "./globals.css";
import "./sections.css";

const display = Bodoni_Moda({
  subsets: ["latin"],
  display: "swap",
  variable: "--f-display",
});

const sans = Archivo({
  subsets: ["latin"],
  display: "swap",
  variable: "--f-sans",
});

const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
  variable: "--f-mono",
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://exuvion.vercel.app";

const description = `${band.name} — ${band.genre.toLowerCase()} from ${band.city}, ${band.country}. Formerly ${band.formerName}. Four singles out; debut full-length arriving mid-2026.`;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${band.name} — ${band.genre} / ${band.city}`,
    template: `%s — ${band.name}`,
  },
  description,
  keywords: [
    "Exuvion",
    "Ksetravid",
    "technical death metal",
    "progressive death metal",
    "Bangalore metal",
    "Indian metal band",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: band.name,
    title: `${band.name} — ${band.genre}`,
    description,
    images: [
      {
        url: "/img/og.jpg",
        width: 1200,
        height: 630,
        alt: `${band.name} logo`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${band.name} — ${band.genre}`,
    description,
    images: ["/img/og.jpg"],
  },
  icons: {
    icon: [{ url: "/img/icon-192.png", sizes: "192x192", type: "image/png" }],
    apple: "/img/apple-icon.png",
  },
};

export const viewport: Viewport = {
  themeColor: "#070706",
  colorScheme: "dark",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "MusicGroup",
  name: band.name,
  alternateName: band.formerName,
  genre: band.genre,
  foundingDate: band.formed,
  url: SITE_URL,
  email: links.email,
  image: `${SITE_URL}/img/og.jpg`,
  description,
  foundingLocation: {
    "@type": "Place",
    name: `${band.city}, ${band.country}`,
  },
  sameAs: [links.instagram],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${display.variable} ${sans.variable} ${mono.variable}`}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
        <div className="grain" aria-hidden="true" />
        <div className="rules" aria-hidden="true">
          <span />
          <span />
          <span />
          <span />
        </div>
      </body>
    </html>
  );
}
