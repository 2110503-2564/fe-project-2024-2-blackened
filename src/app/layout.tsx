import type { Metadata } from 'next'
import SiteHeader from '@/components/site-header'

import './globals.css'
import { cn } from '@/lib/utils'
import { fontMono, fontSans } from '@/lib/font'
import { AuthProvider } from '@/context/auth-context'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth-options'
import { Toaster } from 'sonner'

export const metadata: Metadata = {
  title: {
    default: 'Spaceflow',
    template: '%s - Spaceflow',
  },
  description: 'Booking your next study session.',
  icons: [
    {
      rel: 'icon',
      type: 'image/png',
      sizes: '32x32',
      url: '/favicon/favicon-32x32.png',
    },
    {
      rel: 'icon',
      type: 'image/png',
      sizes: '16x16',
      url: '/favicon/favicon-16x16.png',
    },
    {
      rel: 'apple-touch-icon',
      sizes: '180x180',
      url: '/favicon/apple-touch-icon.png',
    },
    {
      rel: 'manifest',
      url: '/favicon/site.webmanifest',
    },
  ],
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const authSession = await getServerSession(authOptions)
  return (
    <html lang='en' suppressHydrationWarning>
      <body
        className={cn(
          'min-h-svh bg-background font-sans antialiased',
          fontSans.variable,
          fontMono.variable,
        )}
      >
        <AuthProvider session={authSession}>{children}</AuthProvider>
        <Toaster richColors expand={false} closeButton />
      </body>
    </html>
  )
}
