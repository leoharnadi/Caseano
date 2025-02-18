import styled from "styled-components";
import { CardsDisplay } from "../../components/Card/CardsDisplay";
import { Hand } from "../../components/Hand/Hand";
import { Player, Result } from "../../components/Player/Player";

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
  console.log(props.isTurn);
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

interface PlayerStatsProps {
  players: Player[];
  turn: number;
}

export function PlayerStats(props: PlayerStatsProps) {
  return props.players.map((player, i) => (
    <Stats
      key={i}
      text={`P${i + 1}: ${player.hand.GetScore()}  |  $${player.money}`}
      hand={player.hand}
      result={player.result}
      isTurn={i === props.turn}
    />
  ));
}

interface DealerStatsProps {
  hand: Hand;
  isDealerTurn: boolean;
}

export function DealerStats(props: DealerStatsProps) {
  return (
    <Stats
      text={`Dealer: ${props.hand.GetScore()}`}
      hand={props.hand}
      isTurn={props.isDealerTurn}
    />
  );
}
