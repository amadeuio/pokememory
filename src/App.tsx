import { useState, useEffect } from "react";
import styled from "styled-components";

import PokeComponent from "./components/PokeComponent";

import { initialGame } from "./initialData";
import { Pokemon } from "./initialData";

import shuffleArray from "./utils/shuffleArray";

const FlexCenteredDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const AppContainer = styled(FlexCenteredDiv)`
  flex-direction: column;
  height: 100vh;
  background-color: #1e631a;
`;

const Navbar = styled(FlexCenteredDiv)`
  height: 15vh;
  width: 100vw;
`;

const EndMessage = styled(FlexCenteredDiv)`
  height: 5vh;
`;

const Content = styled(FlexCenteredDiv)`
  height: 80vh;
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

const MessageText = styled.span`
  margin-right: 20px;
`;

const RestartButton = styled.button`
  &:hover {
    background-color: #0056b3;
  }
`;

const PokemonGrid = styled.div`
  transform: translateY(-20px);
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 50px;
`;

const Title = styled.div`
  font-size: 36px;
`;

const App = () => {
  const [game, setGame] = useState(initialGame);

  useEffect(() => {
    console.log("Game state changed:", game);
  }, [game]);

  const touchPokemon = (pokemon: Pokemon) => {
    const shuffledList = shuffleArray(game.pokeList);

    const updatedPokeList = shuffledList.map((p) => {
      if (p.id === pokemon.id) {
        if (p.isTouched) {
          return { ...p, isTouchedTwice: true };
        }
        return { ...p, isTouched: true };
      }
      return p;
    });

    if (!pokemon.isTouched) {
      const newScore = game.score + 1;
      const newBestScore = Math.max(game.bestScore, newScore);

      const allTouched = newScore === 12;

      setGame((prevGame) => ({
        ...prevGame,
        score: newScore,
        bestScore: newBestScore,
        pokeList: updatedPokeList,
        hasWon: allTouched ? true : prevGame.hasWon,
      }));
    } else {
      // Touched twice
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
        <Title>Pokemon Memory</Title>
        <Score>
          <ScoreItem>Score: {game.score}</ScoreItem>
          <ScoreItem>Best Score: {game.bestScore}</ScoreItem>
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
              hasLost={game.hasLost}
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
