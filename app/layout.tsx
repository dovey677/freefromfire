import type { Metadata } from 'next'
import './globals.css'
import Nav from './components/Nav'

export const metadata: Metadata = {
  title: 'Free From Fire',
  description: 'Gluten free BBQ & Baking recipes',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="bg-gray-950">
        <Nav />
        {children}
      </body>
    </html>
  )
}