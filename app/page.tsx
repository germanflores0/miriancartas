import { PantherDeck } from "@/components/panther-deck"

export default function Page() {
  return (
    <main className="relative flex h-dvh flex-col items-center justify-center overflow-x-hidden overflow-y-auto px-5 py-4">
      {/* subtle radial glow behind the deck */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-40 blur-3xl"
        style={{
          background:
            "radial-gradient(circle, oklch(0.78 0.13 78 / 0.25), transparent 70%)",
        }}
      />

      <header className="relative z-10 mb-[clamp(0.5rem,4vh,3rem)] text-center">
        <p className="mb-1 font-display text-xs uppercase tracking-[0.35em] text-gold/80">
          Mirian Agu
        </p>
        <h1 className="text-balance font-display text-2xl font-semibold text-foreground sm:text-3xl">
          Baraja y saca tu carta
        </h1>
        <p className="mx-auto mt-2 max-w-xs text-pretty text-sm text-muted-foreground">
          Toca el botón: el mazo se baraja y te entrega una carta al azar.
        </p>
      </header>

      <div className="relative z-10 flex w-full justify-center">
        <PantherDeck />
      </div>
    </main>
  )
}
