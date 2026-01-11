import styled, { css } from "styled-components";
import { CardDisplay } from "./CardDisplay";
import { Card } from "./Card";
import { FAN_ANGLE } from "../../utils/constants";

const generateCardStyles = (numCards: number, angle: number) => {
  let styles = "";
  for (let i = 1; i <= numCards; i++) {
    styles += `
      .card-${i} {
        transform: rotate(${-angle / 2 + (angle / (numCards + 1)) * i}deg);
      }
    `;
  }
  return css`
    ${styles}
  `;
};

const CardsContainer = styled.div<{ $numCards: number }>`
  /* position: absolute; */
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  ${(props) => generateCardStyles(props.$numCards, FAN_ANGLE)}

  &:hover {
    ${(props) => generateCardStyles(props.$numCards, FAN_ANGLE + 20)}
  }
`;

interface CardProps {
  cards: Card[];
}

export function CardsDisplay(props: CardProps) {
  return (
    <CardsContainer $numCards={props.cards.length}>
      {props.cards.map((card, i) => {
        return (
          <CardDisplay
            key={i}
            card={card}
            index={i}
            className={`card-${i + 1}`}
            isFan
          />
        );
      })}
    </CardsContainer>
  );
}
