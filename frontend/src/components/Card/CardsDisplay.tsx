import styled from "styled-components";
import { CardDisplay } from "./CardDisplay";
import { Card } from "./Card";

const CardsContainer = styled.div`
  display: flex;
  gap: 0.3125rem;
  flex-wrap: wrap;
`;

interface CardProps {
  cards: Card[];
}

export function CardsDisplay(props: CardProps) {
  return (
    <CardsContainer>
      {props.cards.map((card, i) => {
        return <CardDisplay key={i} card={card} />;
      })}
    </CardsContainer>
  );
}
