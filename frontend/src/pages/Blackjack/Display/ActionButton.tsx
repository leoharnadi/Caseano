import { Status } from "../useBlackjack";

interface ButtonProps {
  reset: () => void;
  draw: () => void;
  end: () => void;
  doubleDown: () => void;
  status: Status;
}

export default function ActionButton(props: ButtonProps) {
  function renderButtons() {
    switch (props.status) {
      case "PlayerTurn":
        return (
          <>
            <button onClick={props.draw}>DRAW</button>
            <button onClick={props.end}>STAND</button>
            <button onClick={props.doubleDown}>DOUBLE DOWN</button>
          </>
        );
      case "End":
        return <button onClick={props.reset}>PLAY AGAIN</button>;
    }
  }
  return renderButtons();
}
