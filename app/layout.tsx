import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'SESC T-shirt Tracking System',
  description: '24/25 SESC T-shirt Tracking System',
  generator: 'movin.dev',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
