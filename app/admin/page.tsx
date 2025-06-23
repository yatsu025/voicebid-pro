"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { useToast } from "@/hooks/use-toast"
import { Plus, Settings, TrendingUp, Users, DollarSign, Clock, Home, Mic, Play, Pause } from "lucide-react"
import Link from "next/link"
import { useAuction } from "@/lib/auction-context"

export default function AdminPage() {
  const { state, dispatch } = useAuction()
  const { toast } = useToast()
  const [newAuction, setNewAuction] = useState({
    title: "",
    description: "",
    startingBid: "",
    duration: "10", // minutes
  })

  const handleAddAuction = () => {
    if (!newAuction.title || !newAuction.description || !newAuction.startingBid) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields",
        variant: "destructive",
      })
      return
    }

    const startingBid = Number.parseInt(newAuction.startingBid)
    const duration = Number.parseInt(newAuction.duration) * 60 * 1000 // convert to ms

    dispatch({
      type: "ADD_AUCTION",
      auction: {
        title: newAuction.title,
        description: newAuction.description,
        image: "/placeholder.svg?height=200&width=300",
        currentBid: startingBid,
        startingBid,
        endTime: Date.now() + duration,
        isActive: true,
        bids: [],
      },
    })

    setNewAuction({
      title: "",
      description: "",
      startingBid: "",
      duration: "10",
    })

    toast({
      title: "Auction Created",
      description: "New auction has been added successfully",
    })
  }

  const toggleAuction = (auctionId: string) => {
    dispatch({ type: "TOGGLE_AUCTION", auctionId })
    toast({
      title: "Auction Updated",
      description: "Auction status has been changed",
    })
  }

  const totalBids = state.auctions.reduce((sum, auction) => sum + auction.bids.length, 0)
  const totalRevenue = state.auctions.reduce((sum, auction) => sum + auction.currentBid, 0)

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50">
      {/* Navigation */}
      <nav className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <Mic className="h-8 w-8 text-blue-600" />
            <span className="text-2xl font-bold text-gray-900">VoiceBid Pro</span>
            <Badge variant="secondary" className="ml-2">
              Admin
            </Badge>
          </Link>
          <div className="flex items-center space-x-4">
            <Link href="/auction">
              <Button variant="ghost">Auctions</Button>
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
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
          <p className="text-xl text-gray-600">Manage auctions and monitor system performance</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Active Bidders</p>
                  <p className="text-3xl font-bold text-blue-600">{state.stats.activeBidders.toLocaleString()}</p>
                </div>
                <Users className="h-12 w-12 text-blue-600 opacity-20" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Auctions</p>
                  <p className="text-3xl font-bold text-green-600">{state.auctions.length}</p>
                </div>
                <TrendingUp className="h-12 w-12 text-green-600 opacity-20" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Bids</p>
                  <p className="text-3xl font-bold text-purple-600">{totalBids}</p>
                </div>
                <Clock className="h-12 w-12 text-purple-600 opacity-20" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Value</p>
                  <p className="text-3xl font-bold text-orange-600">${totalRevenue.toLocaleString()}</p>
                </div>
                <DollarSign className="h-12 w-12 text-orange-600 opacity-20" />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Add New Auction */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Plus className="h-5 w-5 mr-2" />
                Add New Auction
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="title">Item Title</Label>
                <Input
                  id="title"
                  value={newAuction.title}
                  onChange={(e) => setNewAuction({ ...newAuction, title: e.target.value })}
                  placeholder="e.g., iPhone 15 Pro Max"
                />
              </div>

              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={newAuction.description}
                  onChange={(e) => setNewAuction({ ...newAuction, description: e.target.value })}
                  placeholder="Brief description of the item"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="startingBid">Starting Bid ($)</Label>
                  <Input
                    id="startingBid"
                    type="number"
                    value={newAuction.startingBid}
                    onChange={(e) => setNewAuction({ ...newAuction, startingBid: e.target.value })}
                    placeholder="100"
                  />
                </div>

                <div>
                  <Label htmlFor="duration">Duration (minutes)</Label>
                  <Input
                    id="duration"
                    type="number"
                    value={newAuction.duration}
                    onChange={(e) => setNewAuction({ ...newAuction, duration: e.target.value })}
                    placeholder="10"
                  />
                </div>
              </div>

              <Button onClick={handleAddAuction} className="w-full">
                <Plus className="h-4 w-4 mr-2" />
                Create Auction
              </Button>
            </CardContent>
          </Card>

          {/* Manage Existing Auctions */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Settings className="h-5 w-5 mr-2" />
                Manage Auctions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 max-h-96 overflow-y-auto">
                {state.auctions.map((auction) => (
                  <div key={auction.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex-1">
                      <h4 className="font-semibold">{auction.title}</h4>
                      <p className="text-sm text-gray-600">
                        Current: ${auction.currentBid} • Bids: {auction.bids.length}
                      </p>
                      <div className="flex items-center space-x-2 mt-2">
                        <Badge variant={auction.isActive ? "default" : "secondary"}>
                          {auction.isActive ? "Active" : "Inactive"}
                        </Badge>
                        <Badge variant="outline">
                          {Math.max(0, Math.floor((auction.endTime - Date.now()) / 60000))}m left
                        </Badge>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Switch checked={auction.isActive} onCheckedChange={() => toggleAuction(auction.id)} />
                      <Button variant="ghost" size="sm" onClick={() => toggleAuction(auction.id)}>
                        {auction.isActive ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Real-time Activity Feed */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Real-Time Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 max-h-64 overflow-y-auto">
              {state.auctions
                .flatMap((auction) =>
                  auction.bids.map((bid) => ({
                    ...bid,
                    auctionTitle: auction.title,
                  })),
                )
                .sort((a, b) => b.timestamp - a.timestamp)
                .slice(0, 10)
                .map((bid) => (
                  <div
                    key={`${bid.id}-${bid.timestamp}`}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                  >
                    <div>
                      <p className="font-medium">
                        {bid.user} bid on {bid.auctionTitle}
                      </p>
                      <p className="text-sm text-gray-600">{new Date(bid.timestamp).toLocaleTimeString()}</p>
                    </div>
                    <Badge className="bg-green-100 text-green-800">${bid.amount.toLocaleString()}</Badge>
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
