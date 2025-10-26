import type { Metadata, Viewport } from 'next'
import './globals.css'
import { Analytics } from "@vercel/analytics/next"
import { Toaster } from "@/components/ui/toaster"

export const metadata: Metadata = {
  title: 'Gronings Kwartier',
  description: 'Gronings Kwartier is a techno festival in the heart of Groningen. Join us for an unforgettable experience.',
  keywords: ['techno', 'house', 'festival', 'Groningen', 'Gronings Kwartier', 'electronic music'],
  authors: [{ name: 'Gronings Kwartier', url: 'https://groningskwartier.nl' }],
  creator: 'Gronings Kwartier',
  metadataBase: new URL('https://groningskwartier.nl'),
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/favicon.ico',
  },
  openGraph: {
    title: 'Gronings Kwartier',
    description: 'Festival in Groningen.',
    url: 'https://groningskwartier.nl',
    siteName: 'Gronings Kwartier',
    locale: 'nl_NL',
    type: 'website',
    // Explicit image(s) for social previews (og:image)
    // Provide an SVG for high-quality clients and a PNG fallback for platforms
    // that don't render SVG (WhatsApp often doesn't) — PNG listed second.
    images: ['/og-image.svg', '/logo.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Gronings Kwartier',
    description: 'Gronings Kwartier is a techno festival in the heart of Groningen. Join us for an unforgettable experience.',
    images: ['/og-image.svg', '/logo.png'],
  },
  other: {
    'instagram:url': 'https://www.instagram.com/groningskwartier',
  },
}

export const viewport: Viewport = {
  themeColor: '#000000',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="nl">
      <body>
        {children}
        <Toaster />
        <Analytics />
      </body>
    </html>
  )
}
