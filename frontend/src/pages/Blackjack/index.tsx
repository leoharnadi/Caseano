import { useEffect, useState } from "react";
import { Deck } from "../../components/Deck/Deck";
import { CardsDisplay } from "../../components/Card/CardsDisplay";
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

const PLAYER_AMOUNT = 2;
type Status = "Lost" | "Pending" | "Won";

export default function Blackjack() {
  const [deck, setDeck] = useState(new Deck());
  const [hands, setHands] = useState<Hand[]>(createHands());
  const [score, setScore] = useState(0);
  const [turn, setTurn] = useState(0);
  const [isFirstTurn, setIsFirstTurn] = useState(true);

  const status: Status = score > 21 ? "Lost" : score === 21 ? "Won" : "Pending";

  useEffect(() => {
    if (isFirstTurn) {
      dealInitialCards();
      setIsFirstTurn(false);
    }
  }, [isFirstTurn]);

  function createHands(): Hand[] {
    return Array.from({ length: PLAYER_AMOUNT }, () => new Hand());
  }

  function dealInitialCards() {
    setHands((prevHands) => {
      const newHands = prevHands.map((hand) => {
        drawCard(hand);
        drawCard(hand);
        return hand;
      });
      return [...newHands];
    });
  }

  function resetGame() {
    setDeck(new Deck());
    setHands(createHands());
    setScore(0);
    setTurn(0);
    setIsFirstTurn(true);
  }

  function drawCard(hand: Hand) {
    setDeck((prevDeck) => {
      const drawnCard = prevDeck.Draw();
      if (!drawnCard) return prevDeck;

      setHands((prevHands) => {
        hand.Cards.push(drawnCard);
        setScore(hand.GetScore());
        return [...prevHands];
      });

      return { ...prevDeck };
    });
  }

  function handleDraw() {
    drawCard(hands[turn]);
    setTurn((prev) => (prev + 1) % PLAYER_AMOUNT);
  }

  function renderHands() {
    return hands.map((hand, i) => (
      <div key={i}>
        <p>{`P${i + 1}: ${hand.GetScore()}`}</p>
        <CardsDisplay cards={hand.Cards} />
      </div>
    ));
  }

  return (
    <ContentContainer>
      <ButtonContainer>
        <button onClick={status !== "Pending" ? resetGame : handleDraw}>
          {status !== "Pending" ? "RESET" : "DRAW"}
        </button>
        <button onClick={() => setTurn((prev) => (prev + 1) % PLAYER_AMOUNT)}>
          HOLD
        </button>
        <p>
          {status === "Pending"
            ? "GAME IN PROGRESS"
            : status === "Lost"
            ? "YOU LOST"
            : "YOU WON"}
        </p>
        <p>Turn: {turn + 1}</p>
      </ButtonContainer>

      {deck.Cards.length > 0 && <CardsDisplay cards={deck.Cards} />}
      {renderHands()}
    </ContentContainer>
  );
}
