import { Card, GenerateCards } from "../Card/Card";

interface Deck {
  Cards: Card[];
  Draw: () => Card;
}

export function NewDeck(): Deck {
  return {
    Cards: GenerateCards(),
    Draw: function (this: Deck) {
      return this.Cards[0];
    },
  };
}
