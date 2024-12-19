type Suits = "D" | "C" | "H" | "S";
type Values = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13;

export interface Card {
  Value: Values;
  Suit: Suits;
}

export function NewCard(suit: Suits, value: Values) {
  const card: Card = {
    Value: value,
    Suit: suit,
  };

  return card;
}
