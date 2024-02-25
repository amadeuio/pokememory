import { useState, useEffect } from "react";
import styled from "styled-components";

import PokeComponent from "./components/PokeComponent";

import { initialGame } from "./initialData";
import { Pokemon } from "./initialData";

import shuffleArray from "./utils/shuffleArray";

const FlexDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const AppContainer = styled(FlexDiv)`
  flex-direction: column;
  height: 100vh;
  background-color: #1e631a;
`;

const Navbar = styled(FlexDiv)`
  height: 15vh;
  width: 100vw;
`;

const Content = styled(FlexDiv)`
  height: 85vh;
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

const PokemonGrid = styled.div`
  transform: translateY(-40px);
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
    console.log("Game state changed:", game.hasLost);
  }, [game]);

  const touchPokemon = (pokemon: Pokemon) => {
    const shuffledList = shuffleArray(game.pokeList);

    const updatedPokeList = shuffledList.map((p) => {
      if (p.id === pokemon.id) {
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
      setGame((prevGame) => ({
        ...prevGame,
        score: 0,
        hasLost: true,
        bestScore: prevGame.bestScore,
        pokeList: shuffleArray(initialGame.pokeList),
      }));
    }
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
      <Content>
        <PokemonGrid>
          {game.pokeList.map((pokemon) => (
            <PokeComponent
              key={pokemon.id}
              pokemon={pokemon}
              hasLost={game.hasLost}
              onClick={() => touchPokemon(pokemon)}
            />
          ))}
        </PokemonGrid>
      </Content>
    </AppContainer>
  );
};

export default App;
