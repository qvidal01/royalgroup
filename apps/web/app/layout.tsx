import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Royal Group | Engel & Volkers - Luxury Real Estate',
  description: 'Experience luxury real estate in the Evansville area with Royal Group. Exceptional properties, unparalleled service, and local expertise.',
  keywords: 'luxury real estate, Evansville homes, premium properties, Engel Volkers, Jennifer Royal',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
