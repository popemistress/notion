import './globals.css'
import type { Metadata } from 'next'
import { Providers } from './providers'

export const metadata: Metadata = {
  title: 'Notion Dashboard',
  description: 'Connect to your Notion workspace and view all your tasks, projects, journals, reading lists, and quick notes in one place.',
  keywords: ['notion', 'dashboard', 'productivity', 'tasks', 'projects'],
  authors: [{ name: 'Notion Dashboard' }],
  viewport: 'width=device-width, initial-scale=1',
  icons: {
    icon: '/favicon.ico',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="bg-gray-50 antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
