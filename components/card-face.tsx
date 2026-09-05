import type { Card } from "@/lib/deck"

export function CardFace({ card }: { card: Card }) {
  return (
    <div className="h-full w-full overflow-hidden rounded-[inherit] bg-black ring-1 ring-inset ring-[oklch(0.78_0.13_78/0.4)]">
      <img
        src={card.image || "/placeholder.svg"}
        alt=""
        className="h-full w-full object-cover"
        draggable={false}
      />
    </div>
  )
}
