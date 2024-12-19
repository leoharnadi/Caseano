import { useState } from "react";
import { Deck } from "../../components/Deck/Deck";
import { CardsDisplay } from "../../components/Card/CardsDisplay";
import { Card } from "../../components/Card/Card";
import styled from "styled-components";
import { Hand } from "../../components/Hand/Hand";

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.3125rem;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 0.625rem;
`;

function initHands() {
  const hands: Hand[] = [];

  for (let i = 0; i < playerAmount; i++) {
    hands.push(new Hand());
  }

  return hands;
}

const playerAmount = 3;
type Status = "Lost" | "Pending" | "Won";
export default function Blackjack() {
  const [deck, setDeck] = useState(new Deck());
  const [hands, setHands] = useState(initHands());
  const [score, setScore] = useState(0);
  const [turn, setTurn] = useState(0);

  let status: Status = "Pending";
  if (score > 21) {
    status = "Lost";
  }
  if (score === 21) {
    status = "Won";
  }

  function reset() {
    setDeck(new Deck());
    setHands(initHands());
    setScore(0);
    setTurn(0);
  }

  function incrementTurn() {
    setTurn((prev) => {
      return (prev + 1) % playerAmount;
    });
  }

  function clickDraw() {
    setDeck(() => {
      drawToHand(hands[turn], deck);
      incrementTurn();
      return {
        ...deck,
      };
    });
  }

  function drawToHand(hand: Hand, deck: Deck) {
    const drawnCard = deck.Draw();

    if (drawnCard === null) {
      return;
    }

    setHands(() => {
      hands[turn].Cards.push(drawnCard);
      setScore(hand.GetScore());
      return [...hands];
    });
  }

  function renderHands() {
    return hands.map((hand, i) => {
      return (
        <>
          <p>{`P` + (i + 1) + ` ${hand.GetScore()}`}</p>
          <CardsDisplay cards={hand.Cards} />
        </>
      );
    });
  }

  return (
    <ContentContainer>
      <ButtonContainer>
        <button
          onClick={() => {
            status !== "Pending" ? reset() : clickDraw();
          }}
        >
          {status !== "Pending" ? "RESET" : "DRAW"}
        </button>
        <button
          onClick={() => {
            incrementTurn();
          }}
        >
          HOLD
        </button>
        <p>
          {status === "Pending"
            ? "GAME IN PROGRESS"
            : status === "Lost"
            ? "YOU LOST"
            : "YOU WON"}
        </p>
        <p>{turn}</p>
      </ButtonContainer>

      {deck.Cards && <CardsDisplay cards={deck.Cards} />}
      {renderHands()}
    </ContentContainer>
  );
}
