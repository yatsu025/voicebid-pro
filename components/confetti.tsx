"use client"

import { useEffect, useState } from "react"

interface ConfettiProps {
  active: boolean
  onComplete?: () => void
}

export function Confetti({ active, onComplete }: ConfettiProps) {
  const [particles, setParticles] = useState<
    Array<{
      id: number
      x: number
      y: number
      vx: number
      vy: number
      color: string
      size: number
    }>
  >([])

  useEffect(() => {
    if (!active) {
      setParticles([])
      return
    }

    const colors = ["#ff6b6b", "#4ecdc4", "#45b7d1", "#96ceb4", "#ffeaa7", "#dda0dd"]
    const newParticles = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      x: Math.random() * window.innerWidth,
      y: -10,
      vx: (Math.random() - 0.5) * 10,
      vy: Math.random() * 5 + 2,
      color: colors[Math.floor(Math.random() * colors.length)],
      size: Math.random() * 8 + 4,
    }))

    setParticles(newParticles)

    const interval = setInterval(() => {
      setParticles((prev) =>
        prev
          .map((particle) => ({
            ...particle,
            x: particle.x + particle.vx,
            y: particle.y + particle.vy,
            vy: particle.vy + 0.3, // gravity
          }))
          .filter((particle) => particle.y < window.innerHeight + 50),
      )
    }, 16)

    const timeout = setTimeout(() => {
      clearInterval(interval)
      setParticles([])
      onComplete?.()
    }, 3000)

    return () => {
      clearInterval(interval)
      clearTimeout(timeout)
    }
  }, [active, onComplete])

  if (!active || particles.length === 0) return null

  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute rounded-full"
          style={{
            left: particle.x,
            top: particle.y,
            width: particle.size,
            height: particle.size,
            backgroundColor: particle.color,
            transform: `rotate(${particle.x + particle.y}deg)`,
          }}
        />
      ))}
    </div>
  )
}
