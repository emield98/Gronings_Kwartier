import type { Metadata, Viewport } from 'next'
import { Archivo, Big_Shoulders_Display, Space_Mono } from 'next/font/google'
import './globals.css'
import { Analytics } from "@vercel/analytics/next"
import { Toaster } from "@/components/ui/toaster"
import { LanguageProvider } from "@/components/language-provider"
import { defaultLanguage, languageMeta } from "@/lib/i18n/config"

// Display: industrial signage condensed. Body: sturdy grotesk.
// Mono: data plates, times, coordinates.
const display = Big_Shoulders_Display({
  subsets: ['latin'],
  weight: ['500', '700', '800', '900'],
  variable: '--font-display',
  display: 'swap',
})

const body = Archivo({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-body',
  display: 'swap',
})

const mono = Space_Mono({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-mono',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Gronings Kwartier — 31 oktober 2026',
  description:
    'Gronings Kwartier is een technofestival op het Suikerfabriekterrein in Groningen. 31 oktober 2026, De Huiskamer, Suikerlaan 18.',
  keywords: ['techno', 'house', 'festival', 'Groningen', 'Grunnen', 'Gronings Kwartier', 'Suikerfabriek', 'elektronische muziek'],
  authors: [{ name: 'Gronings Kwartier', url: 'https://gronings-kwartier.nl' }],
  creator: 'Gronings Kwartier',
  metadataBase: new URL('https://gronings-kwartier.nl'),
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/favicon.ico',
  },
  openGraph: {
    title: 'Gronings Kwartier — 31 oktober 2026',
    description: '31 oktober 2026 · De Huiskamer · Suikerlaan 18, Groningen',
    url: 'https://www.gronings-kwartier.nl',
    siteName: 'Gronings Kwartier',
    locale: 'nl_NL',
    type: 'website',
    images: [
      'https://www.gronings-kwartier.nl/logo.png',
      'https://www.gronings-kwartier.nl/og-image.svg',
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Gronings Kwartier — 31 oktober 2026',
    description: '31 oktober 2026 · De Huiskamer · Suikerlaan 18, Groningen',
    images: [
      'https://gronings-kwartier.nl/logo.png',
      'https://gronings-kwartier.nl/og-image.svg',
    ],
  },
  other: {
    'instagram:url': 'https://www.instagram.com/groningskwartier',
  },
}

export const viewport: Viewport = {
  themeColor: '#08090A',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang={languageMeta[defaultLanguage].htmlLang}
      className={`${display.variable} ${body.variable} ${mono.variable}`}
    >
      <body>
        <LanguageProvider>
          {children}
          <Toaster />
        </LanguageProvider>
        <Analytics />
      </body>
    </html>
  )
}
