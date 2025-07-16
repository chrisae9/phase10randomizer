import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Phase 10 Randomizer - Generate Custom Phases & Shareable URLs",
  description: "Create unique Phase 10 card game experiences with our free randomizer. Generate custom phase combinations, access official phases, and share unique URLs. Mobile-optimized with interactive rules guide.",
  keywords: "Phase 10, card game, randomizer, phase generator, custom phases, board game, Phase10, game variants",
  authors: [{ name: "Chris" }],
  creator: "Chris",
  publisher: "chis.dev",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://phase.chis.dev'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "Phase 10 Randomizer - Generate Custom Phases",
    description: "Create unique Phase 10 card game experiences with custom phase combinations and shareable URLs",
    url: 'https://phase.chis.dev',
    siteName: 'Phase 10 Randomizer',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Phase 10 Randomizer - Generate Custom Phases",
    description: "Create unique Phase 10 card game experiences with custom phase combinations and shareable URLs",
    creator: '@your_twitter_handle',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0, viewport-fit=cover" />
        <meta name="theme-color" content="#3b82f6" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              "name": "Phase 10 Randomizer",
              "description": "Generate custom Phase 10 card game combinations with shareable URLs. Free online randomizer for Phase 10 with official phases and interactive rules.",
              "url": "https://phase.chis.dev",
              "applicationCategory": "GameApplication",
              "operatingSystem": "Web Browser",
              "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "USD"
              },
              "author": {
                "@type": "Person",
                "name": "Chris"
              },
              "publisher": {
                "@type": "Organization",
                "name": "chis.dev"
              },
              "datePublished": "2024",
              "inLanguage": "en-US",
              "keywords": "Phase 10, card game, randomizer, phase generator, board game"
            })
          }}
        />
      </head>
      <body className={`${inter.className} h-full min-h-screen overscroll-none`}>{children}</body>
    </html>
  );
}
