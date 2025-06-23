"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { useToast } from "@/hooks/use-toast"
import { Mic, Clock, Users, Home, Trophy, MicIcon } from "lucide-react"
import Link from "next/link"
import { useAuction } from "@/lib/auction-context"
import { VoiceRecognition } from "@/lib/voice-recognition"
import { Confetti } from "@/components/confetti"
import Image from "next/image"

export default function AuctionPage() {
  const { state, dispatch } = useAuction()
  const { toast } = useToast()
  const [voiceRecognition] = useState(() => new VoiceRecognition())
  const [isListening, setIsListening] = useState(false)
  const [showConfetti, setShowConfetti] = useState(false)
  const [timers, setTimers] = useState<{ [key: string]: number }>({})

  // Update timers every second
  useEffect(() => {
    const interval = setInterval(() => {
      const newTimers: { [key: string]: number } = {}
      state.auctions.forEach((auction) => {
        const timeLeft = Math.max(0, auction.endTime - Date.now())
        newTimers[auction.id] = timeLeft
      })
      setTimers(newTimers)
    }, 1000)

    return () => clearInterval(interval)
  }, [state.auctions])

  const formatTime = (ms: number) => {
    const minutes = Math.floor(ms / 60000)
    const seconds = Math.floor((ms % 60000) / 1000)
    return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`
  }

  const handleVoiceBid = async (auctionId: string, currentBid: number) => {
    if (isListening) return

    setIsListening(true)
    try {
      const transcript = await voiceRecognition.startListening()
      const bidAmount = voiceRecognition.parseBidAmount(transcript)

      if (!bidAmount) {
        toast({
          title: "Invalid Bid",
          description: "Please say a valid bid amount (e.g., 'bid 500')",
          variant: "destructive",
        })
        return
      }

      if (bidAmount <= currentBid) {
        toast({
          title: "Bid Too Low",
          description: `Your bid must be higher than $${currentBid}`,
          variant: "destructive",
        })
        return
      }

      dispatch({
        type: "PLACE_BID",
        auctionId,
        amount: bidAmount,
        user: state.currentUser,
      })

      setShowConfetti(true)
      toast({
        title: "Bid Placed Successfully! 🎉",
        description: `You bid $${bidAmount} on this item`,
      })
    } catch (error) {
      toast({
        title: "Voice Recognition Error",
        description: "Please try again or check your microphone permissions",
        variant: "destructive",
      })
    } finally {
      setIsListening(false)
    }
  }

  const getProgressValue = (endTime: number) => {
    const totalTime = 600000 // 10 minutes in ms
    const timeLeft = Math.max(0, endTime - Date.now())
    return ((totalTime - timeLeft) / totalTime) * 100
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <Confetti active={showConfetti} onComplete={() => setShowConfetti(false)} />

      {/* Navigation */}
      <nav className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <Mic className="h-8 w-8 text-blue-600" />
            <span className="text-2xl font-bold text-gray-900">VoiceBid Pro</span>
          </Link>
          <div className="flex items-center space-x-4">
            <Badge variant="secondary" className="bg-green-100 text-green-800">
              <Users className="h-4 w-4 mr-1" />
              {state.stats.activeBidders.toLocaleString()} Live
            </Badge>
            <Link href="/admin">
              <Button variant="ghost">Admin</Button>
            </Link>
            <Link href="/">
              <Button variant="ghost">
                <Home className="h-4 w-4 mr-2" />
                Home
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Live Auctions</h1>
          <p className="text-xl text-gray-600 mb-6">
            Use your voice to bid on premium items. Just click the mic and speak!
          </p>
          <div className="flex justify-center items-center space-x-8">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{state.auctions.filter((a) => a.isActive).length}</div>
              <div className="text-sm text-gray-500">Active Auctions</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{state.stats.activeBidders.toLocaleString()}</div>
              <div className="text-sm text-gray-500">Active Bidders</div>
            </div>
          </div>
        </div>

        {/* Auction Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {state.auctions
            .filter((auction) => auction.isActive)
            .map((auction) => (
              <Card
                key={auction.id}
                className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <div className="relative">
                  <Image
                    src={auction.image || "/placeholder.svg"}
                    alt={auction.title}
                    width={300}
                    height={200}
                    className="w-full h-48 object-cover"
                  />
                  <Badge className="absolute top-4 right-4 bg-red-500 text-white">
                    <Clock className="h-3 w-3 mr-1" />
                    {formatTime(timers[auction.id] || 0)}
                  </Badge>
                </div>

                <CardHeader>
                  <CardTitle className="text-xl">{auction.title}</CardTitle>
                  <p className="text-gray-600">{auction.description}</p>
                </CardHeader>

                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-sm text-gray-500">Current Bid</p>
                      <p className="text-3xl font-bold text-green-600">${auction.currentBid.toLocaleString()}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-500">Starting Bid</p>
                      <p className="text-lg text-gray-700">${auction.startingBid.toLocaleString()}</p>
                    </div>
                  </div>

                  <Progress value={getProgressValue(auction.endTime)} className="h-2" />

                  <Button
                    onClick={() => handleVoiceBid(auction.id, auction.currentBid)}
                    disabled={isListening || (timers[auction.id] || 0) <= 0}
                    className={`w-full h-12 text-lg font-semibold ${
                      isListening
                        ? "bg-red-500 hover:bg-red-600 animate-pulse"
                        : "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                    }`}
                  >
                    {isListening ? (
                      <>
                        <MicIcon className="h-5 w-5 mr-2 animate-pulse" />
                        Listening...
                      </>
                    ) : (timers[auction.id] || 0) <= 0 ? (
                      <>
                        <Trophy className="h-5 w-5 mr-2" />
                        Auction Ended
                      </>
                    ) : (
                      <>
                        <Mic className="h-5 w-5 mr-2" />🎤 Bid Now
                      </>
                    )}
                  </Button>

                  {/* Recent Bids */}
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-gray-700">Recent Bids:</p>
                    <div className="max-h-24 overflow-y-auto space-y-1">
                      {auction.bids
                        .slice(-3)
                        .reverse()
                        .map((bid) => (
                          <div
                            key={bid.id}
                            className={`flex justify-between text-sm p-2 rounded ${
                              bid.user === state.currentUser ? "bg-blue-50 border border-blue-200" : "bg-gray-50"
                            }`}
                          >
                            <span className="font-medium">{bid.user}</span>
                            <span className="text-green-600 font-semibold">${bid.amount.toLocaleString()}</span>
                          </div>
                        ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
        </div>

        {/* Instructions */}
        <Card className="max-w-2xl mx-auto bg-blue-50 border-blue-200">
          <CardHeader>
            <CardTitle className="flex items-center text-blue-800">
              <Mic className="h-5 w-5 mr-2" />
              How to Voice Bid
            </CardTitle>
          </CardHeader>
          <CardContent className="text-blue-700">
            <ol className="list-decimal list-inside space-y-2">
              <li>Click the "🎤 Bid Now" button on any active auction</li>
              <li>
                When prompted, clearly say: <strong>"Bid [amount]"</strong> (e.g., "Bid 500")
              </li>
              <li>Your bid will be processed automatically if it's higher than the current bid</li>
              <li>Watch for the confetti celebration when your bid is successful! 🎉</li>
            </ol>
            <p className="mt-4 text-sm">
              <strong>Note:</strong> If voice recognition isn't available, you'll see a text prompt as a fallback.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
