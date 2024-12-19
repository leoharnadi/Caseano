import { Card } from "../Card/Card";

export class Hand {
  Cards: Card[];
  GetScore: () => number;

  constructor() {
    this.Cards = [];
    this.GetScore = function (this: Hand) {
      let score = 0;
      let aces = 0;
      this.Cards.map((card) => {
        if (card.Value === "A") {
          aces++;
          score += 11;
          return;
        }

        if (card.Value === "J" || card.Value === "Q" || card.Value === "K") {
          score += 10;
          return;
        }

        score += Number(card.Value);
      });

      while (aces > 0 && score > 21) {
        score -= 10;
        aces -= 1;
      }

      return score;
    };
  }
}
