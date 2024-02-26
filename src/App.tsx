import { useState } from "react";
import styled from "styled-components";

import PokeComponent from "./components/PokeComponent";

import { initialGame } from "./initialData";
import { Pokemon } from "./initialData";

import shuffleArray from "./utils/shuffleArray";

import {
  FlexCenteredDiv,
  color,
  globalBorderRadius,
  globalShadow,
} from "./components/GlobalStyles";

const AppContainer = styled(FlexCenteredDiv)`
  flex-direction: column;
  height: 100vh;
  background-color: ${color.background};
`;

const Navbar = styled(FlexCenteredDiv)`
  height: 15vh;
  width: 100vw;
`;

const Title = styled.div`
  font-size: 80px;
`;

const Score = styled.div`
  position: absolute;
  right: 40px;
  display: flex;
  flex-direction: column;
`;

const ScoreItem = styled.span`
  &:first-child {
    margin-bottom: 8px;
  }
`;

const EndMessage = styled(FlexCenteredDiv)`
  height: 5vh;
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
  height: 80vh;
`;

const PokemonGrid = styled.div`
  transform: translateY(-20px);
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 40px;
`;

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

      setGame((prevGame) => ({
        ...prevGame,
        score: newScore,
        bestScore: newBestScore,
        pokeList: updatedShuffledPokeList,
        hasWon: allTouched ? true : prevGame.hasWon,
      }));
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
