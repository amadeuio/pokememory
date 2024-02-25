import { v4 as uuidv4 } from "uuid";
import shuffleArray from "./utils/shuffleArray";

type UUID = string;

export class Pokemon {
  id: UUID;
  name: string;
  isTouched: boolean;

  constructor(name: string) {
    this.id = uuidv4();
    this.name = name;
    this.isTouched = false;
  }
}

export interface Game {
  pokeList: Pokemon[];
  score: number;
  bestScore: number;
  hasLost: boolean;
  hasWon: boolean;
}

const pokemonNames: string[] = [
  "pikachu",
  "charmander",
  "bulbasaur",
  "squirtle",
  "jigglypuff",
  "snorlax",
  "eevee",
  "mewtwo",
  "gyarados",
  "magikarp",
  "dragonite",
  "mew",
];

const initialPokeList: Pokemon[] = pokemonNames.map((name) => new Pokemon(name));

export const initialGame: Game = {
  get pokeList() {
    return shuffleArray(initialPokeList); // Shuffle the initialPokeList every time pokeList is accessed
  },
  score: 0,
  bestScore: 0,
  hasLost: false,
  hasWon: false,
};
