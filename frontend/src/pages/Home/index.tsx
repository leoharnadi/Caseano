import { useNavigate } from "react-router";

export default function Home() {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => {
        navigate("/blackjack");
      }}
    >
      BJ
    </button>
  );
}
