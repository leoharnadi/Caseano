import styled, { css } from "styled-components";
import { Card, Suit } from "./Card";

const CardContainer = styled.div<{ $suit: Suit }>`
  width: 1.875rem;
  height: 3.125rem;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 0.0625rem solid black;
  ${(p) =>
    (p.$suit === "♥" || p.$suit === "♦") &&
    css`
      color: red;
    `}
`;

interface CardProps {
  card: Card;
}

export function CardDisplay(props: CardProps) {
  return (
    <CardContainer $suit={props.card.Suit}>
      <p>{props.card.Suit + props.card.Value}</p>
    </CardContainer>
  );
}
