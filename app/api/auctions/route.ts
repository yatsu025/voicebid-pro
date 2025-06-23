import { NextResponse } from "next/server"

// Mock data - in a real app, this would come from a database
const mockAuctions = [
  {
    id: "ps5",
    title: "PlayStation 5 Console",
    description: "Brand new PS5 with controller",
    currentBid: 450,
    startingBid: 300,
    endTime: Date.now() + 300000,
    isActive: true,
    bids: [
      { id: "1", user: "Alex", amount: 350, timestamp: Date.now() - 60000 },
      { id: "2", user: "Sarah", amount: 400, timestamp: Date.now() - 30000 },
      { id: "3", user: "Mike", amount: 450, timestamp: Date.now() - 10000 },
    ],
  },
]

export async function GET() {
  return NextResponse.json({ auctions: mockAuctions })
}
