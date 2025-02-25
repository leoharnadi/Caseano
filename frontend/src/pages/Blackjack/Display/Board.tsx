import styled from "styled-components";
import { CardsDisplay } from "../../../components/Card/CardsDisplay";
import { DealerStats, PlayerStats } from "./PlayerView";
import { Deck } from "../../../components/Deck/Deck";
import { Hand } from "../../../components/Hand/Hand";
import { Player } from "../../../components/Player/Player";
import { Status } from "../useBlackjack";

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.3125rem;
`;

interface GameBoardProps {
  deck: Deck;
  dealerHand: Hand;
  players: Player[];
  turn: number;
  status: Status;
}

export function GameBoard({
  deck,
  dealerHand,
  players,
  turn,
  status,
}: GameBoardProps) {
  return (
    <ContentContainer>
      {deck.Cards.length > 0 && <CardsDisplay cards={deck.Cards} />}
      <PlayerStats players={players} turn={turn} />
      <DealerStats hand={dealerHand} turn={status} />
    </ContentContainer>
  );
}
