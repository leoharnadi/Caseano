import styled, { css } from "styled-components";
import { Card, Suit } from "./Card";
import { CARD_HEIGHT } from "../../utils/constants";

const CardContainer = styled.div<{
  $suit: Suit;
  $isHidden?: boolean;
  $CARD_HEIGHT: number;
  $index: number;
  $isFan: boolean;
}>`
  width: ${(p) => p.$CARD_HEIGHT * 0.6}rem;
  height: ${(p) => p.$CARD_HEIGHT}rem;
  display: flex;
  justify-content: start;
  align-items: start;
  border: 1px solid rgba(0, 0, 0, 0.4);
  background: linear-gradient(145deg, #ffffff, #f0f0f0);
  ${(p) =>
    p.$index !== 0 &&
    css`
      position: absolute;
    `};

  transition-duration: 200ms;
  ${(p) =>
    (p.$suit === "♥" || p.$suit === "♦") &&
    css`
      color: red;
    `}
  ${(p) =>
    p.$isHidden
      ? css`
          background-image: url(./assets/cardBack.jpg);
          background-size: cover;
          background-position: center;
        `
      : css`
          padding-top: ${p.$CARD_HEIGHT * 0.03}rem;
          padding-left: ${p.$CARD_HEIGHT * 0.03}rem;
        `}

    ${(p) =>
    p.$index &&
    !p.$isFan &&
    css`
      transform: translate(0, -${p.$index * p.$CARD_HEIGHT * 0.007}rem);
      z-index: ${p.$index};
    `};

  ${(p) =>
    p.$isFan &&
    css`
      /* left: 50%;
      top: 50%; */
      transform-origin: center 120%;
    `}
`;

interface CardProps {
  card: Card;
  index?: number;
  isFan?: boolean;
  className?: string;
}

export function CardDisplay(props: CardProps) {
  function renderCard() {
    return (
      <CardContainer
        $suit={props.card.Suit}
        $isHidden={props.card.isHidden}
        $CARD_HEIGHT={CARD_HEIGHT}
        $index={props.index || 0}
        $isFan={props.isFan || false}
        className={props.className}
      >
        {" "}
        {!props.card.isHidden && <p>{props.card.Suit + props.card.Value}</p>}
      </CardContainer>
    );
  }
  return renderCard();
}
