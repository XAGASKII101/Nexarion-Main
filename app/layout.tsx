import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "NexarionAI - AI-Powered Business Automation",
  description:
    "Transform your business with intelligent automation. Connect WhatsApp, Instagram, Gmail, and more with AI-powered responses and workflows.",
  keywords: ["AI automation", "business automation", "WhatsApp automation", "Instagram automation", "Gmail automation"],
  authors: [{ name: "NexarionAI Team" }],
  openGraph: {
    title: "NexarionAI - AI-Powered Business Automation",
    description: "Transform your business with intelligent automation",
    type: "website",
    url: "https://nexarion.ai",
  },
  twitter: {
    card: "summary_large_image",
    title: "NexarionAI - AI-Powered Business Automation",
    description: "Transform your business with intelligent automation",
  },
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}
