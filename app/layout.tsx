import type React from "react"
import { Inter, Quicksand } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import { MainNav } from "@/components/main-nav"
import "./globals.css"

// Font definitions
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
})

const quicksand = Quicksand({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
})

export const metadata = {
  title: "InsideOut - LGBTQA+ Community Platform",
  description: "A safe space for the LGBTQA+ community to shop, learn, and find support",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${quicksand.variable} font-body min-h-screen flex flex-col`}>
        <ThemeProvider attribute="class" defaultTheme="light">
          <MainNav />
          <main className="flex-1">{children}</main>
        </ThemeProvider>
      </body>
    </html>
  )
}

