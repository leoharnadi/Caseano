import styled from "styled-components";
import { CardsDisplay } from "../../../components/Card/CardsDisplay";
import { Hand } from "../../../components/Hand/Hand";
import { Player, Result } from "../../../components/Player/Player";
import { Status } from "../useBlackjack";

const Text = styled.p<{ $isTurn: boolean }>`
  color: ${(p) => p.$isTurn && "green"};
`;

interface StatsProps {
  text: string;
  hand: Hand;
  result?: Result;
  isTurn: boolean;
}

export function Stats(props: StatsProps) {
  function renderText() {
    let text = props.text;

    if (props.result) {
      text += `  |  ${props.result}`;
    }

    return text;
  }
  return (
    <div>
      <Text $isTurn={props.isTurn}>{renderText()}</Text>
      <CardsDisplay cards={props.hand.Cards} />
    </div>
  );
}

const PlayerStatsDisplay = styled.div<{ $bottom: number, $left: number }>`
  position: fixed;
  left:  ${(p) => p.$left}%;
  bottom: ${(p) => p.$bottom}%;
  transform: translate(-50%, 0%);
`

interface PlayerStatsProps {
  players: Player[];
  turn: number;
}

export function PlayerStats(props: PlayerStatsProps) {
  const layout = [[2, 50], [35, 25], [35, 75]]

  return props.players.map((player, i) => (
    <PlayerStatsDisplay $bottom={layout[i][0]} $left={layout[i][1]}>
      <Stats
        key={i}
        text={`P${i + 1}: ${player.hand.GetScore()}  |  $${player.money}`}
        hand={player.hand}
        result={player.result}
        isTurn={i === props.turn}
      />
    </PlayerStatsDisplay>
  ));
}

const DealerStatsDisplay = styled.div`
  position: fixed;
  left: 50%;
  transform: translate(-50%, 0%);
`

interface DealerStatsProps {
  hand: Hand;
  turn: Status;
}

export function DealerStats(props: DealerStatsProps) {
  function renderText() {
    return `Dealer: ${props.hand.GetScore()}`;
  }
  return (
    <DealerStatsDisplay>
      <Stats
        text={renderText()}
        hand={props.hand}
        isTurn={props.turn === "DealerTurn"}
      />
    </DealerStatsDisplay>
  );
}
