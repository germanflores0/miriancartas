"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import { type Card, createDeck, shuffle } from "@/lib/deck"
import { CardBack } from "@/components/card-back"
import { CardFace } from "@/components/card-face"

// bounded by both viewport width and height so the whole screen always fits without scrolling;
// the wide vw share is what lets the card fill narrow mobile screens instead of floating tiny in the middle
const CARD_SIZE = "w-[clamp(8rem,min(76vw,42vh),20rem)]"

export function PantherDeck() {
  const [drawn, setDrawn] = useState<Card | null>(null)
  const [flipped, setFlipped] = useState(false)
  const [isShuffling, setIsShuffling] = useState(false)
  const timers = useRef<ReturnType<typeof setTimeout>[]>([])
  const preloaded = useRef<HTMLImageElement[]>([])

  useEffect(() => {
    return () => {
      timers.current.forEach(clearTimeout)
    }
  }, [])

  useEffect(() => {
    // warm the browser cache for the whole deck up front, at low priority, so drawing a card
    // never has to wait on its ~100-150KB image over the network
    preloaded.current = createDeck().map(({ image }) => {
      const img = new Image()
      ;(img as HTMLImageElement & { fetchPriority?: string }).fetchPriority = "low"
      img.src = image
      return img
    })
  }, [])

  const handleDraw = useCallback(() => {
    if (isShuffling) return
    // clear any pending timers from a previous draw
    timers.current.forEach(clearTimeout)
    timers.current = []

    setFlipped(false)
    setDrawn(null)
    setIsShuffling(true)

    // let the shuffle animation run, then pick a random card and reveal it
    timers.current.push(
      setTimeout(() => {
        const freshDeck = shuffle(createDeck())
        const card = freshDeck[Math.floor(Math.random() * freshDeck.length)]
        setIsShuffling(false)
        setDrawn(card)
        timers.current.push(setTimeout(() => setFlipped(true), 140))
      }, 900),
    )
  }, [isShuffling])

  return (
    <div className="flex w-full max-w-md flex-col items-center gap-[clamp(1.25rem,6vh,5rem)]">
      {/* Reveal area — sized once here; deck and card both fill it, so neither ever changes scale */}
      <div className={`relative mx-auto aspect-[5/7] ${CARD_SIZE}`}>
        {drawn && !isShuffling ? (
          <div className="absolute inset-0 [perspective:1400px]">
            <div
              className={`relative h-full w-full rounded-2xl shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9)] transition-transform duration-500 [transform-style:preserve-3d] ${
                flipped ? "[transform:rotateY(180deg)]" : ""
              }`}
            >
              <div className="absolute inset-0 rounded-2xl [backface-visibility:hidden]">
                <CardBack />
              </div>
              <div className="absolute inset-0 rounded-2xl [backface-visibility:hidden] [transform:rotateY(180deg)]">
                <CardFace card={drawn} />
              </div>
            </div>
          </div>
        ) : (
          <DeckStack shuffling={isShuffling} onClick={handleDraw} />
        )}
      </div>

      {/* Control */}
      <button
        onClick={handleDraw}
        disabled={isShuffling}
        className="w-full rounded-full bg-primary px-8 py-3 font-display text-base font-semibold tracking-wide text-primary-foreground transition-all hover:brightness-110 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isShuffling ? "Barajando…" : "Sacar una carta"}
      </button>
    </div>
  )
}

function DeckStack({
  shuffling,
  onClick,
}: {
  shuffling: boolean
  onClick: () => void
}) {
  return (
    <button onClick={onClick} aria-label="Sacar una carta" className="group absolute inset-0 cursor-pointer">
      {[3, 2, 1, 0].map((i) => (
        <div
          key={i}
          className={`absolute inset-0 rounded-2xl shadow-[0_20px_45px_-20px_rgba(0,0,0,0.9)] transition-transform duration-500 ${
            shuffling ? "animate-[shuffle_0.6s_ease-in-out_infinite]" : ""
          }`}
          style={{
            transform: `translate(${i * -3}px, ${i * -3}px)`,
            zIndex: 10 - i,
            animationDelay: shuffling ? `${i * 80}ms` : undefined,
          }}
        >
          <CardBack />
        </div>
      ))}
    </button>
  )
}
