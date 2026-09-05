export type Card = {
  id: string
  image: string
}

const CARD_COUNT = 104
// lightweight web-optimized copies of "ORIGINAL CARTAS PARA EXPO" (~13MB total vs ~121MB) so the
// deck can be preloaded up front instead of fetching a ~1MB PNG the moment each card is drawn
const CARD_FOLDER = "/cards"

export function createDeck(): Card[] {
  const deck: Card[] = []
  for (let i = 1; i <= CARD_COUNT; i++) {
    deck.push({ id: `card-${i}`, image: `${CARD_FOLDER}/${i}.webp` })
  }
  return deck
}

// Fisher-Yates shuffle returning a new array
export function shuffle<T>(input: T[]): T[] {
  const arr = [...input]
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[arr[i], arr[j]] = [arr[j], arr[i]]
  }
  return arr
}
