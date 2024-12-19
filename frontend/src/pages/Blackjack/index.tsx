import { useState } from "react";
import { Deck } from "../../components/Deck/Deck";
import { CardsDisplay } from "../../components/Card/CardsDisplay";
import { Card } from "../../components/Card/Card";
import styled from "styled-components";
import { Hand } from "../../components/Hand/Hand";

const ButtonContainer = styled.div`
  display: flex;
  gap: 0.625rem;
`;

type Status = "Lost" | "Pending" | "Won";
export default function Blackjack() {
  const [deck, setDeck] = useState(new Deck());
  const [hand, setHand] = useState(new Hand());
  const [score, setScore] = useState(0);
  let status: Status = "Pending";
  if (score > 21) {
    status = "Lost";
  }
  if (score === 21) {
    status = "Won";
  }

  function reset() {
    setDeck(new Deck());
    setHand(new Hand());
    setScore(0);
  }

  function drawToHand(hand: Hand, deck: Deck) {
    const drawnCard = deck.Draw();

    if (drawnCard === null) {
      return;
    }

    setHand(() => {
      hand.Cards.push(drawnCard);
      setScore(hand.GetScore());
      return { ...hand };
    });
  }

  function clickDraw() {
    setDeck(() => {
      drawToHand(hand, deck);
      return {
        ...deck,
      };
    });
  }

  return (
    <div>
      <ButtonContainer>
        <button
          onClick={() => {
            status !== "Pending" ? reset() : clickDraw();
          }}
        >
          {status !== "Pending" ? "RESET" : "DRAW"}
        </button>
        <p>
          {status === "Pending"
            ? "GAME IN PROGRESS"
            : status === "Lost"
            ? "YOU LOST"
            : "YOU WON"}
        </p>
      </ButtonContainer>

      {deck.Cards && <CardsDisplay cards={deck.Cards} />}
      <div>
        <p>{score}</p>
      </div>
      <CardsDisplay cards={hand.Cards} />
    </div>
  );
}
