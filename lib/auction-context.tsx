"use client"

import type React from "react"
import { createContext, useContext, useReducer, useEffect } from "react"

export interface Bid {
  id: string
  user: string
  amount: number
  timestamp: number
}

export interface Auction {
  id: string
  title: string
  description: string
  image: string
  currentBid: number
  startingBid: number
  endTime: number
  isActive: boolean
  bids: Bid[]
  winner?: string
}

interface AuctionState {
  auctions: Auction[]
  stats: {
    totalBidders: number
    activeBidders: number
    totalAuctions: number
  }
  currentUser: string
}

type AuctionAction =
  | { type: "PLACE_BID"; auctionId: string; amount: number; user: string }
  | { type: "ADD_AUCTION"; auction: Omit<Auction, "id"> }
  | { type: "TOGGLE_AUCTION"; auctionId: string }
  | { type: "UPDATE_STATS" }
  | { type: "SET_USER"; user: string }
  | { type: "LOAD_DATA"; data: AuctionState }

const initialState: AuctionState = {
  auctions: [
    {
      id: "ps5",
      title: "PlayStation 5 Console",
      description: "Brand new PS5 with controller",
      image: "/placeholder.svg?height=200&width=300",
      currentBid: 450,
      startingBid: 300,
      endTime: Date.now() + 300000, // 5 minutes from now
      isActive: true,
      bids: [
        { id: "1", user: "Alex", amount: 350, timestamp: Date.now() - 60000 },
        { id: "2", user: "Sarah", amount: 400, timestamp: Date.now() - 30000 },
        { id: "3", user: "Mike", amount: 450, timestamp: Date.now() - 10000 },
      ],
    },
    {
      id: "iphone",
      title: "iPhone 15 Pro Max",
      description: "Latest iPhone with 256GB storage",
      image: "/placeholder.svg?height=200&width=300",
      currentBid: 800,
      startingBid: 600,
      endTime: Date.now() + 420000, // 7 minutes from now
      isActive: true,
      bids: [
        { id: "4", user: "Emma", amount: 650, timestamp: Date.now() - 90000 },
        { id: "5", user: "John", amount: 750, timestamp: Date.now() - 45000 },
        { id: "6", user: "Lisa", amount: 800, timestamp: Date.now() - 15000 },
      ],
    },
    {
      id: "macbook",
      title: "MacBook Pro M3",
      description: "16-inch MacBook Pro with M3 chip",
      image: "/placeholder.svg?height=200&width=300",
      currentBid: 1200,
      startingBid: 1000,
      endTime: Date.now() + 600000, // 10 minutes from now
      isActive: true,
      bids: [
        { id: "7", user: "David", amount: 1050, timestamp: Date.now() - 120000 },
        { id: "8", user: "Anna", amount: 1150, timestamp: Date.now() - 60000 },
        { id: "9", user: "Tom", amount: 1200, timestamp: Date.now() - 20000 },
      ],
    },
  ],
  stats: {
    totalBidders: 50000,
    activeBidders: 10342,
    totalAuctions: 1250,
  },
  currentUser: "You",
}

function auctionReducer(state: AuctionState, action: AuctionAction): AuctionState {
  switch (action.type) {
    case "PLACE_BID":
      return {
        ...state,
        auctions: state.auctions.map((auction) =>
          auction.id === action.auctionId
            ? {
                ...auction,
                currentBid: action.amount,
                bids: [
                  ...auction.bids,
                  {
                    id: Date.now().toString(),
                    user: action.user,
                    amount: action.amount,
                    timestamp: Date.now(),
                  },
                ],
              }
            : auction,
        ),
      }
    case "ADD_AUCTION":
      return {
        ...state,
        auctions: [
          ...state.auctions,
          {
            ...action.auction,
            id: Date.now().toString(),
          },
        ],
      }
    case "TOGGLE_AUCTION":
      return {
        ...state,
        auctions: state.auctions.map((auction) =>
          auction.id === action.auctionId ? { ...auction, isActive: !auction.isActive } : auction,
        ),
      }
    case "UPDATE_STATS":
      return {
        ...state,
        stats: {
          ...state.stats,
          activeBidders: state.stats.activeBidders + Math.floor(Math.random() * 10) - 5,
        },
      }
    case "SET_USER":
      return {
        ...state,
        currentUser: action.user,
      }
    case "LOAD_DATA":
      return action.data
    default:
      return state
  }
}

const AuctionContext = createContext<{
  state: AuctionState
  dispatch: React.Dispatch<AuctionAction>
} | null>(null)

export function AuctionProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(auctionReducer, initialState)

  // Load data from localStorage on mount
  useEffect(() => {
    const savedData = localStorage.getItem("voicebid-data")
    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData)
        dispatch({ type: "LOAD_DATA", data: { ...initialState, ...parsedData } })
      } catch (error) {
        console.error("Failed to load saved data:", error)
      }
    }
  }, [])

  // Save data to localStorage whenever state changes
  useEffect(() => {
    localStorage.setItem("voicebid-data", JSON.stringify(state))
  }, [state])

  // Update stats periodically
  useEffect(() => {
    const interval = setInterval(() => {
      dispatch({ type: "UPDATE_STATS" })
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  return <AuctionContext.Provider value={{ state, dispatch }}>{children}</AuctionContext.Provider>
}

export function useAuction() {
  const context = useContext(AuctionContext)
  if (!context) {
    throw new Error("useAuction must be used within an AuctionProvider")
  }
  return context
}
