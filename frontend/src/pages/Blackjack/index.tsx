import { useBlackjack } from "./useBlackjack";
import { GameControls } from "./Display/Controls";
import { GameBoard } from "./Display/Board";

export default function Blackjack() {
  const {
    deck,
    dealerHand,
    players,
    turn,
    status,
    resetGame,
    handlePlayerDraw,
    endTurn,
    doubleDown,
  } = useBlackjack();

  return (
    <>
      <GameControls
        reset={resetGame}
        draw={handlePlayerDraw}
        end={endTurn}
        status={status}
        turn={turn}
        doubleDown={doubleDown}
      />
      <GameBoard
        deck={deck}
        dealerHand={dealerHand}
        players={players}
        turn={turn}
        status={status}
      />
    </>
  );
}
