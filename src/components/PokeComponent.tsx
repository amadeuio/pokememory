import { useState, useEffect } from "react";
import styled from "styled-components";
import { Pokemon } from "../initialData";

interface PokeComponentProps {
  pokemon: Pokemon;
  hasEnded: boolean;
  onClick: () => void;
}

interface PokeContainerProps {
  $isTouched: boolean;
  $isTouchedTwice: boolean;
  $hasEnded: boolean;
}

const PokeContainer = styled.div<PokeContainerProps>`
  border: 4px solid
    ${(props) => {
      if (props.$hasEnded) {
        if (props.$isTouchedTwice) {
          return "red";
        }

        if (props.$isTouched) {
          return "green";
        }
      }
    }};
  border-radius: 5px;
`;

const PokeComponent: React.FC<PokeComponentProps> = ({ pokemon, hasEnded, onClick }) => {
  const [pokemonData, setPokemonData] = useState(null);

  useEffect(() => {
    console.log("Has ended:", hasEnded);
  }, [hasEnded]);

  const { name, isTouched, isTouchedTwice } = pokemon;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
        const pokemonData = await response.json();
        setPokemonData(pokemonData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [name]);

  return (
    <PokeContainer
      $isTouched={isTouched}
      $isTouchedTwice={isTouchedTwice}
      $hasEnded={hasEnded}
      onClick={onClick}>
      {pokemonData ? (
        <img src={pokemonData.sprites.front_default} alt={pokemonData.name} />
      ) : (
        <p>Loading...</p>
      )}
    </PokeContainer>
  );
};
export default PokeComponent;
