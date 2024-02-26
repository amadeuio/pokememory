import { useState } from "react";
import styled from "styled-components";

import PokeComponent from "./components/PokeComponent";

import {
  FlexCenteredDiv,
  color,
  globalBorderRadius,
  globalShadow,
} from "./components/GlobalStyles";

import { initialGame, Pokemon } from "./initialData";

import shuffleArray from "./utils/shuffleArray";

const AppContainer = styled(FlexCenteredDiv)`
  flex-direction: column;
`;

const Navbar = styled(FlexCenteredDiv)`
  @media (max-width: 840px) {
    flex-direction: column;
  }
`;

const Title = styled.div`
  margin: 20px;
  font-size: 80px;

  @media (max-width: 470px) {
    font-size: 60px;
  }

  @media (max-width: 370px) {
    font-size: 50px;
  }
`;

const Score = styled.div`
  position: absolute;
  right: 40px;
  display: flex;
  flex-direction: column;

  @media (max-width: 840px) {
    position: static;
  }

  @media (max-width: 470px) {
    font-size: 18px;
  }
`;

const ScoreItem = styled.span`
  &:first-child {
    margin-bottom: 8px;
  }
`;

const EndMessage = styled(FlexCenteredDiv)`
  height: 45px;

  @media (max-width: 470px) {
    font-size: 18px;
  }
`;

const MessageText = styled.span`
  margin-right: 20px;
`;

const RestartButton = styled.button`
  padding: 7px 15px;
  cursor: pointer;
  color: ${color.text};
  border: 2px solid ${color.border};
  box-shadow: ${globalShadow};
  border-radius: ${globalBorderRadius};
  transition: transform 0.15s;

  &:hover {
    transform: scale(1.14);
  }

  &:active {
    border-color: ${color.text};
  }
`;

const Content = styled(FlexCenteredDiv)`
  padding: 40px;

  @media (max-width: 700px) {
    padding-bottom: 100px;
  }
`;

const PokemonGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 40px;

  @media (max-width: 700px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (max-width: 536px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 390px) {
    grid-template-columns: repeat(1, 1fr);
  }
`;

const isMobile = window.innerWidth <= 768;
const mobileDelay = isMobile ? 200 : 0; // Add delay for better UX in mobile

const App = () => {
  const [game, setGame] = useState(initialGame);

  const touchPokemon = (pokemon: Pokemon) => {
    if (!pokemon.isTouched) {
      const updatedPokeList = game.pokeList.map((p) => {
        if (p.id === pokemon.id) {
          return { ...p, isTouched: true };
        }
        return p;
      });

      const updatedShuffledPokeList = shuffleArray(updatedPokeList);

      const newScore = game.score + 1;
      const newBestScore = Math.max(game.bestScore, newScore);
      const allTouched = newScore === 12;

      setTimeout(() => {
        setGame((prevGame) => ({
          ...prevGame,
          score: newScore,
          bestScore: newBestScore,
          pokeList: updatedShuffledPokeList,
          hasWon: allTouched ? true : prevGame.hasWon,
        }));
      }, mobileDelay);
    }

    if (pokemon.isTouched) {
      const updatedPokeList = game.pokeList.map((p) => {
        if (p.id === pokemon.id) {
          return { ...p, isTouchedTwice: true };
        }
        return p;
      });

      setGame((prevGame) => ({
        ...prevGame,
        pokeList: updatedPokeList,
        hasLost: true,
      }));
    }
  };

  const handleRestart = () => {
    resetGame();
  };

  const resetGame = () => {
    setGame((prevGame) => ({
      ...initialGame,
      bestScore: prevGame.bestScore,
    }));
  };

  return (
    <AppContainer>
      <Navbar>
        <Title>pokememory</Title>
        <Score>
          <ScoreItem>Score: {game.score}</ScoreItem>
          <ScoreItem>Best Score: {game.bestScore === 12 ? "Win" : game.bestScore}</ScoreItem>
        </Score>
      </Navbar>

      <EndMessage>
        {game.hasLost && (
          <MessageText>
            You clicked {game.pokeList.find((pokemon) => pokemon.isTouchedTwice)?.name || ""} twice!
          </MessageText>
        )}
        {game.hasWon && <MessageText>You clicked all Pokemon exactly once, you win!</MessageText>}
        {(game.hasLost || game.hasWon) && (
          <RestartButton onClick={handleRestart}>Restart</RestartButton>
        )}
      </EndMessage>

      <Content>
        <PokemonGrid>
          {game.pokeList.map((pokemon) => (
            <PokeComponent
              key={pokemon.id}
              pokemon={pokemon}
              hasEnded={game.hasLost || game.hasWon}
              onClick={() => {
                if (!(game.hasLost || game.hasWon)) {
                  touchPokemon(pokemon);
                }
              }}
            />
          ))}
        </PokemonGrid>
      </Content>
    </AppContainer>
  );
};

export default App;
