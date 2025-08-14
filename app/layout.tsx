import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Toaster } from "@/components/ui/toaster"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "NexarionAI - AI-Powered Business Automation",
  description:
    "Transform your customer interactions with intelligent AI automation. Connect WhatsApp, Instagram, Gmail, and more with AI-powered responses that feel human.",
  keywords:
    "AI automation, customer service, WhatsApp automation, Instagram automation, Gmail automation, business automation",
  authors: [{ name: "NexarionAI Team" }],
  openGraph: {
    title: "NexarionAI - AI-Powered Business Automation",
    description: "Transform your customer interactions with intelligent AI automation",
    url: "https://nexarionai.com",
    siteName: "NexarionAI",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "NexarionAI - AI-Powered Business Automation",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "NexarionAI - AI-Powered Business Automation",
    description: "Transform your customer interactions with intelligent AI automation",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
        <Toaster />
      </body>
    </html>
  )
}
