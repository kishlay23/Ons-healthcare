import type { Metadata } from 'next'
import { Poppins, Inter } from 'next/font/google'
import '@/styles/globals.css'
import { AuthProvider } from '@/contexts/AuthContext'

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-poppins',
})

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-inter',
})

export const metadata: Metadata = {
  title: 'ONS Healthcare - Physiotherapy Clinic | Book Appointments Online',
  description:
    'Professional physiotherapy services for Ortho, Neuro, and Sports injuries. Book appointments online, view treatments, and read patient success stories.',
  keywords: 'physiotherapy, ortho, neuro, sports injury, appointment booking',
  authors: [{ name: 'ONS Healthcare' }],
  openGraph: {
    title: 'ONS Healthcare - Physiotherapy Clinic',
    description: 'Professional physiotherapy services with online booking',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${poppins.variable} ${inter.variable}`}>
      <body className="min-h-screen flex flex-col antialiased">
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  )
}
