import styled from "styled-components";
import { Card } from "../Card/Card";
import { CardDisplay } from "../Card/CardDisplay";

const DeckContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  min-height: 3.125rem;
  flex-direction: column;
`;

interface DeckProps {
  cards: Card[];
}

export default function DeckDisplay(props: DeckProps) {
  return (
    <DeckContainer>
      {props.cards.map((card, i) => {
        return <CardDisplay key={i} card={card} index={i} />;
      })}
    </DeckContainer>
  );
}
