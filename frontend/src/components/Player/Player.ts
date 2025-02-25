import { Hand } from "../Hand/Hand";

export type Result = "Win" | "Lose" | "Draw" | "Natural" | "Bust" | "";

export class Player {
  money: number;
  bet: number;
  hand: Hand;
  result: Result;
  SetBet: (amount: number) => void;
  constructor(hand: Hand) {
    this.money = 500;
    this.bet = 0;
    this.hand = hand;
    this.result = "";
    this.SetBet = (amount: number) => {
      this.money -= amount;
      this.bet = amount;
    };
  }
}
