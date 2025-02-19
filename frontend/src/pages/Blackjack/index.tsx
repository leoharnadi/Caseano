import { useEffect, useState } from "react";
import { Deck } from "../../components/Deck/Deck";
import { CardsDisplay } from "../../components/Card/CardsDisplay";
import styled from "styled-components";
import { Hand } from "../../components/Hand/Hand";
import { DealerStats, PlayerStats } from "./PlayerView";
import { Player } from "../../components/Player/Player";
import ActionButton from "./ActionButton";

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.3125rem;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 0.625rem;
`;

const PLAYER_AMOUNT = 2;
export type Status = "PlayerTurn" | "DealerTurn" | "End";

export default function Blackjack() {
  const [deck, setDeck] = useState(new Deck());
  const [dealerHand, setDealerHand] = useState(new Hand());
  const [turn, setTurn] = useState(0);
  const [isFirstTurn, setIsFirstTurn] = useState(true);
  const [status, setStatus] = useState<Status>("PlayerTurn");
  const [players, setPlayers] = useState<Player[]>(initializePlayers());

  useEffect(() => {
    if (isFirstTurn) {
      dealInitialCards();
      setIsFirstTurn(false);
    }
  }, [isFirstTurn]);

  useEffect(() => {
    if (status !== "PlayerTurn") {
      return;
    }
    const currentPlayer = players[turn];
    if (currentPlayer.hand.GetScore() >= 21) {
      endTurn();
    }
  }, [players, turn]);

  useEffect(() => {
    if (status !== "DealerTurn") {
      return;
    }
    if (dealerHand.Cards.length >= 1 && dealerHand.GetScore() < 17) {
      setTimeout(() => {
        playDealerTurn();
      }, 1000);
    } else if (dealerHand.GetScore() >= 17) {
      determineWinner();
    }
  }, [dealerHand, status]);

  function initializePlayers(): Player[] {
    return Array.from({ length: PLAYER_AMOUNT }, () => new Player(new Hand()));
  }

  function dealInitialCards() {
    setPlayers((prevPlayers) =>
      prevPlayers.map((player) => {
        drawCard(player.hand);
        drawCard(player.hand);
        player.money -= player.bet;
        return { ...player, hand: { ...player.hand }, money: player.money };
      })
    );

    setDealerHand((prevDealer) => {
      drawCard(prevDealer);
      drawHiddenCard(prevDealer);
      return { ...prevDealer };
    });
  }

  function resetGame() {
    setDeck(new Deck());
    setDealerHand(new Hand());
    setPlayers((prevPlayers) =>
      prevPlayers.map((player) => ({
        ...player,
        hand: new Hand(),
        result: "",
      }))
    );
    setTurn(0);
    setStatus("PlayerTurn");
    setIsFirstTurn(true);
  }

  function drawCard(hand: Hand) {
    setDeck((prevDeck) => {
      const drawnCard = prevDeck.Draw();
      if (!drawnCard) return prevDeck;
      drawnCard.isHidden = false;
      hand.Cards.push(drawnCard);

      setPlayers((prevPlayers) =>
        prevPlayers.map((player) =>
          player.hand === hand ? { ...player, hand: { ...hand } } : player
        )
      );

      return { ...prevDeck };
    });
  }

  function drawHiddenCard(hand: Hand) {
    setDeck((prevDeck) => {
      const drawnCard = prevDeck.Draw();
      if (!drawnCard) return prevDeck;
      drawnCard.isHidden = true;
      hand.Cards.push(drawnCard);

      setPlayers((prevPlayers) =>
        prevPlayers.map((player) =>
          player.hand === hand ? { ...player, hand: { ...hand } } : player
        )
      );

      return { ...prevDeck };
    });
  }

  function handlePlayerDraw() {
    const currentPlayer = players[turn];
    drawCard(currentPlayer.hand);
  }

  function endTurn() {
    if (turn + 1 >= PLAYER_AMOUNT) {
      setStatus("DealerTurn");
      setDealerHand((prevDealer) => {
        const newDealer = { ...prevDealer };
        newDealer.Cards[1].isHidden = false;
        return newDealer;
      });
      setTurn((prev) => prev + 1);
    } else {
      setTurn((prev) => prev + 1);
    }
  }

  function playDealerTurn() {
    setDealerHand((prevDealer) => {
      const newDealer = { ...prevDealer };
      drawCard(newDealer);
      return newDealer;
    });
  }

  function determineWinner() {
    const dealerNatural = dealerHand.HasNatural();
    const dealerScore = dealerHand.GetScore();

    setPlayers((prevPlayers) =>
      prevPlayers.map((player) => {
        const playerNatural = player.hand.HasNatural();
        const playerScore = player.hand.GetScore();
        let updatedMoney = player.money;
        let updatedResult = player.result;

        if (playerNatural) {
          if (dealerNatural) {
            updatedMoney += player.bet;
            updatedResult = "Draw";
          } else {
            updatedMoney += player.bet * 2.5;
            updatedResult = "Natural";
          }
        } else if (dealerNatural) {
          updatedResult = "Lose";
        } else if (playerScore > 21) {
          updatedResult = "Bust";
        } else if (dealerScore > 21 || playerScore > dealerScore) {
          updatedMoney += player.bet * 2;
          updatedResult = "Win";
        } else if (playerScore === dealerScore) {
          updatedMoney += player.bet;
          updatedResult = "Draw";
        } else if (playerScore < dealerScore) {
          updatedResult = "Lose";
        }

        return { ...player, money: updatedMoney, result: updatedResult };
      })
    );
    setStatus("End");
  }

  return (
    <ContentContainer>
      <ButtonContainer>
        <ActionButton
          reset={resetGame}
          draw={handlePlayerDraw}
          end={endTurn}
          status={status}
        />
        <p>{status}</p>
        <p>Turn: {turn + 1}</p>
      </ButtonContainer>

      {deck.Cards.length > 0 && <CardsDisplay cards={deck.Cards} />}

      <PlayerStats players={players} turn={turn} />
      <DealerStats hand={dealerHand} turn={status} />
    </ContentContainer>
  );
}
