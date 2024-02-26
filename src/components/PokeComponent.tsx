import { useState, useEffect } from "react";
import styled from "styled-components";
import { Pokemon } from "../initialData";
import { FlexCenteredDiv, color, globalBorderRadius, globalShadow } from "./GlobalStyles";

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

interface PokemonData {
  sprites: {
    front_default: string;
  };
  name: string;
}

const PokeContainer = styled(FlexCenteredDiv)<PokeContainerProps>`
  height: 120px;
  aspect-ratio: 1/1;
  background-image: url("grass.png");
  border: 2px solid ${color.border};
  border-radius: ${globalBorderRadius};
  box-shadow: ${globalShadow};

  border-color: ${(props) => {
    if (props.$hasEnded) {
      if (props.$isTouchedTwice) {
        return color.wrongBorder;
      }

      if (props.$isTouched) {
        return color.rightBorder;
      }
    }

    return color.border;
  }};

  cursor: ${(props) => (props.$hasEnded ? "default" : "pointer")};
  transition: transform 0.15s;

  ${(props) =>
    !props.$hasEnded &&
    `
    &:hover {
      transform: scale(1.14);
    }
  `}
`;

const PokeComponent: React.FC<PokeComponentProps> = ({ pokemon, hasEnded, onClick }) => {
  const [pokemonData, setPokemonData] = useState<PokemonData | null>(null);

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
