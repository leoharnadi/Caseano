import styled from "styled-components";
import { DealerStats, PlayerStats } from "./PlayerView";
import { Deck } from "../../../components/Deck/Deck";
import { Hand } from "../../../components/Hand/Hand";
import { Player } from "../../../components/Player/Player";
import { Status } from "../useBlackjack";
import DeckDisplay from "../../../components/Deck/DeckDisplay";

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.3125rem;
`;

const DeckDisplayCentered = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
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
      {deck.Cards.length > 0 && (
        <DeckDisplayCentered>
          <DeckDisplay cards={deck.Cards} />
        </DeckDisplayCentered>
      )}
      <PlayerStats players={players} turn={turn} />
      <DealerStats hand={dealerHand} turn={status} />
    </ContentContainer>
  );
}
