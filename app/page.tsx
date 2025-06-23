"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Mic, TrendingUp, Users, Zap, Star, ArrowRight } from "lucide-react"
import Link from "next/link"
import { useAuction } from "@/lib/auction-context"
import { useState, useEffect } from "react"

export default function HomePage() {
  const { state } = useAuction()
  const [isAnimating, setIsAnimating] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true)
      setTimeout(() => setIsAnimating(false), 2000)
    }, 4000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Navigation */}
      <nav className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Mic className="h-8 w-8 text-blue-600" />
            <span className="text-2xl font-bold text-gray-900">VoiceBid Pro</span>
          </div>
          <div className="flex items-center space-x-4">
            <Link href="/auction">
              <Button variant="ghost">Auctions</Button>
            </Link>
            <Link href="/admin">
              <Button variant="ghost">Admin</Button>
            </Link>
            <Link href="/auth">
              <Button>Sign In</Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <Badge className="mb-6 bg-blue-100 text-blue-800 hover:bg-blue-200">
          🎉 Now Live - Voice Bidding Technology
        </Badge>

        <h1 className="text-6xl font-bold text-gray-900 mb-6 leading-tight">
          Bid with Your Voice –<br />
          <span className="text-blue-600">No Clicks Needed!</span>
        </h1>

        <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
          Experience the future of online auctions with our revolutionary voice-controlled bidding system. Just speak
          your bid and watch the magic happen.
        </p>

        {/* Animated Mic Button */}
        <div className="mb-16">
          <Link href="/auction">
            <Button
              size="lg"
              className={`h-24 w-24 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-2xl transition-all duration-300 ${
                isAnimating ? "animate-pulse-mic" : ""
              }`}
            >
              <Mic className="h-12 w-12" />
            </Button>
          </Link>
          <p className="mt-4 text-sm text-gray-500">Click to start bidding</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto mb-20">
          <Card className="border-0 shadow-lg bg-white/60 backdrop-blur-sm">
            <CardContent className="p-6 text-center">
              <Users className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <div className="text-3xl font-bold text-gray-900 mb-2">{state.stats.totalBidders.toLocaleString()}+</div>
              <p className="text-gray-600">Active Bidders</p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-white/60 backdrop-blur-sm">
            <CardContent className="p-6 text-center">
              <TrendingUp className="h-12 w-12 text-green-600 mx-auto mb-4" />
              <div className="text-3xl font-bold text-gray-900 mb-2">{state.stats.totalAuctions.toLocaleString()}+</div>
              <p className="text-gray-600">Successful Auctions</p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-white/60 backdrop-blur-sm">
            <CardContent className="p-6 text-center">
              <Zap className="h-12 w-12 text-yellow-600 mx-auto mb-4" />
              <div className="text-3xl font-bold text-gray-900 mb-2">{state.stats.activeBidders.toLocaleString()}</div>
              <p className="text-gray-600">Live Now</p>
            </CardContent>
          </Card>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto mb-20">
          <div className="text-center">
            <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <Mic className="h-8 w-8 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Voice Commands</h3>
            <p className="text-gray-600">Simply say "Bid $500" and we'll handle the rest</p>
          </div>

          <div className="text-center">
            <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <Zap className="h-8 w-8 text-green-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Real-Time Updates</h3>
            <p className="text-gray-600">See bids update instantly across all devices</p>
          </div>

          <div className="text-center">
            <div className="bg-purple-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <Star className="h-8 w-8 text-purple-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Premium Items</h3>
            <p className="text-gray-600">Curated selection of high-quality products</p>
          </div>
        </div>

        {/* CTA */}
        <Link href="/auction">
          <Button
            size="lg"
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 text-lg"
          >
            Start Bidding Now
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </Link>
      </section>

      {/* Footer */}
      <footer className="border-t bg-gray-50 py-12">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Mic className="h-6 w-6 text-blue-600" />
            <span className="text-xl font-bold text-gray-900">VoiceBid Pro</span>
          </div>
          <p className="text-gray-600 mb-4">The future of online auctions is here.</p>
          <div className="flex justify-center space-x-6 text-sm text-gray-500">
            <Link href="#" className="hover:text-gray-700">
              Privacy Policy
            </Link>
            <Link href="#" className="hover:text-gray-700">
              Terms of Service
            </Link>
            <Link href="#" className="hover:text-gray-700">
              Support
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
