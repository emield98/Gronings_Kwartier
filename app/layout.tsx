import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Gronings Kwartier',
  description: 'Gronings Kwartier is a techno festival in the heart of Groningen. Join us for an unforgettable experience.',
  keywords: ['techno', 'festival', 'Groningen', 'Gronings Kwartier', 'electronic music'],
  authors: [{ name: 'Gronings Kwartier', url: 'https://groningskwartier.nl' }],
  creator: 'Gronings Kwartier',
  metadataBase: new URL('https://groningskwartier.nl'),
  openGraph: {
    title: 'Gronings Kwartier',
    description: 'Techno festival in Groningen. Music, lights, and connection.',
    url: 'https://groningskwartier.nl',
    siteName: 'Gronings Kwartier',
    images: [
      {
        url: '/placeholder-user.jpg',
        width: 1200,
        height: 630,
        alt: 'Gronings Kwartier Festival – crowd and lights',
      },
    ],
    locale: 'nl_NL',
    type: 'website',
  },
  other: {
    'instagram:url': 'https://www.instagram.com/groningskwartier',
  },
  themeColor: '#000000',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="nl">
      <body>{children}</body>
    </html>
  )
}
