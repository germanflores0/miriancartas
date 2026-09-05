export type Card = {
  id: string
  image: string
}

const CARD_COUNT = 104
const CARD_FOLDER = "/ORIGINAL CARTAS PARA EXPO"

export function createDeck(): Card[] {
  const deck: Card[] = []
  for (let i = 1; i <= CARD_COUNT; i++) {
    deck.push({ id: `card-${i}`, image: encodeURI(`${CARD_FOLDER}/${i}.png`) })
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
