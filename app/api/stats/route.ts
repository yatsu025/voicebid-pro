import { NextResponse } from "next/server"

export async function GET() {
  // Mock stats - in a real app, this would come from analytics/database
  const stats = {
    totalBidders: 50000 + Math.floor(Math.random() * 1000),
    activeBidders: 10342 + Math.floor(Math.random() * 100),
    totalAuctions: 1250 + Math.floor(Math.random() * 50),
    totalRevenue: 2500000 + Math.floor(Math.random() * 100000),
  }

  return NextResponse.json(stats)
}
