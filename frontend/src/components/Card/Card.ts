// const Suits = ["D", "C", "H", "S"] as const;
const Suits = ["♦", "♣", "♥", "♠"] as const;
// const Values = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13] as const;
const Values = [
  "A",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "J",
  "Q",
  "K",
] as const;
export type Suit = (typeof Suits)[number];
type Value = (typeof Values)[number];

export interface Card {
  Value: Value;
  Suit: Suit;
  isHidden: boolean;
}

function NewCard(suit: Suit, value: Value) {
  const card: Card = {
    Value: value,
    Suit: suit,
    isHidden: true,
  };

  return card;
}

export function GenerateCards() {
  return Suits.flatMap((suit) => Values.map((value) => NewCard(suit, value)));
}
