import styled from "styled-components";
import ActionButton from "./ActionButton";
import { Status } from "../useBlackjack";

const ButtonContainer = styled.div`
  display: flex;
  gap: 0.625rem;
`;

interface GameControlsProps {
  reset: () => void;
  draw: () => void;
  end: () => void;
  doubleDown: () => void;
  status: Status;
  turn: number;
}

export function GameControls({
  reset,
  draw,
  end,
  doubleDown,
  status,
  turn,
}: GameControlsProps) {
  return (
    <ButtonContainer>
      <ActionButton
        reset={reset}
        draw={draw}
        end={end}
        status={status}
        doubleDown={doubleDown}
      />
      <p>{status}</p>
      <p>Turn: {turn + 1}</p>
    </ButtonContainer>
  );
}
