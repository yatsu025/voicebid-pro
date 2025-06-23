import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { AuctionProvider } from "@/lib/auction-context"
import { Toaster } from "@/components/ui/toaster"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "VoiceBid Pro - Voice-Controlled Auction System",
  description: "Bid with Your Voice – No Clicks Needed!",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuctionProvider>
          {children}
          <Toaster />
        </AuctionProvider>
      </body>
    </html>
  )
}
