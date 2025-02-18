import { Status } from ".";

interface ButtonProps {
  reset: () => void;
  draw: () => void;
  end: () => void;
  status: Status;
}

export default function ActionButton(props: ButtonProps) {
  return (
    <>
      <button
        onClick={props.status === "End" ? props.reset : props.draw}
        disabled={props.status === "DealerTurn"}
      >
        {props.status === "End" ? "RESET" : "DRAW"}
      </button>
      <button
        onClick={() => props.end()}
        disabled={props.status !== "PlayerTurn"}
      >
        STAND
      </button>
    </>
  );
}
