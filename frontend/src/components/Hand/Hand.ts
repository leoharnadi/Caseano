import { Card } from "../Card/Card";

export class Hand {
  Cards: Card[];
  GetScore: () => number;
  HasNatural: () => boolean;

  constructor() {
    this.Cards = [];
    this.GetScore = function (this: Hand) {
      let score = 0;
      let aces = 0;
      this.Cards.map((card) => {
        if (card.isHidden) {
          return;
        }
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
    this.HasNatural = function (this: Hand) {
      if (this.Cards.length !== 2) {
        return false;
      }

      const card1 = this.Cards[0];
      const card2 = this.Cards[1];

      const isNatural =
        (card1.Value === "A" &&
          (card2.Value === "10" ||
            card2.Value === "J" ||
            card2.Value === "Q" ||
            card2.Value === "K")) ||
        (card2.Value === "A" &&
          (card1.Value === "10" ||
            card1.Value === "J" ||
            card1.Value === "Q" ||
            card1.Value === "K"));

      return isNatural;
    };
  }
}
