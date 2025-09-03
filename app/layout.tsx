import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import "./globals.css"
import { AppProviders } from "../components/providers/app-providers"

export const metadata: Metadata = {
  title: "Task Manager Pro",
  description: "Professional task management application built with Next.js, Redux Toolkit, and React Query",
  generator: "Next.js",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <body className={GeistSans.className}>
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  )
}
