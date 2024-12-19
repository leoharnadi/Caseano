import { RandomNumber } from "../../utils/Random";
import { Card, GenerateCards } from "../Card/Card";

export class Deck {
  Cards: Card[];
  Draw: () => Card | null;

  constructor() {
    this.Cards = GenerateCards();
    this.Draw = function (this: Deck) {
      if (this.Cards.length === 0) {
        console.log("deck is empty");
        return null;
      }

      if (this.Cards.length === 1) {
        console.log("popping");
        const poppedCard = this.Cards.pop();
        if (poppedCard === undefined) {
          return null;
        }
        return poppedCard;
      }

      const randomIndex = RandomNumber(0, this.Cards.length - 1);
      const card = this.Cards[randomIndex];
      this.Cards.splice(randomIndex, 1);
      return card;
    };
  }
}
