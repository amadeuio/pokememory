![Stack](https://img.shields.io/badge/Stack-React_|_TypeScript-149eca)
![License](https://img.shields.io/badge/License-MIT-green)

# Pokememory

Pokemon memory game with React. The goal is to click every Pokemon exactly once.

## Demo

<p align="center">
  <img src="public/screenshots/screenshot.png" width="650px" alt="screenshot">
</p>
<h2 align="center">
  <a href="https://amadeuio.github.io/pokememory">👉 Demo</a>
</h2>

## Features

- Uses [PokeAPI](https://pokeapi.co) to render the Pokemon sprites
- Simple and user friendly UI
- Realtime score and best score count
- Clicked Pokemon are revealed at the end of the game, with right (🔵 blue border) / wrong (🔴 red border) feedback
- Responsive

## Tech Stack

- **UI Library:** React
- **Languages:** TypeScript, CSS, HTML
- **Build Tool:** Vite
- **Dependencies:** styled-components, uuid

## Main Directories

Located in `src`:

- `components`: React and styled components
- `App.tsx`: Main component responsible for managing state and rendering components of the app
- `main.tsx`: Entry point for the React app
- `initialData.ts`: Storage of initial data and its type definitions

Located in the root:

- `docs`: Distribution files generated during the build, GitHub pages is reading the root of this directory
- `public`: Images, font and app screenshots
- `index.html`: Entry point for the app

## Data

The following state data is used to manage the game (initialized in [`initialData.ts`](/src/initialData.ts)).

#### 1. Pokemon Object

Represents each Pokemon you see on screen.

**Properties**

- `id`
- `name`
- `isTouched`
- `isTouchedTwice`

The [`PokeComponent`](/src/components/PokeComponent.tsx) retreives the sprite form PokeAPI using the name.

#### 2. Game Object

Represents the state of the game.

**Properties**

- `pokeList` (array of 12 `Pokemon` objects)
- `score`
- `bestScore`
- `hasLost`
- `hasWon`

The `pokeList` is created from an array of string names and a `Pokemon` class, because of the use of PokeAPI, the names in the array can be changed to any pokemon and the app will update just fine.

In the initial game data, the `pokeList` is initialized with a getter function that calls a `shuffleArray` function. This ensures every time the initial data is accessed, the order of the Pokemon is random. This is useful for the particular functionlity of the app, as having the Pokemon randomly placed at every initialization (page refresh or game restart) is desired.

## Run Locally

Clone the project

```bash
git clone https://github.com/amadeuio/pokememory
```

Go to the project directory

```bash
cd pokememory
```

Install dependencies

```bash
npm install
```

Start the server

```bash
npm run dev
```

## Acknowledgements

- [PokeAPI](https://pokeapi.co)
- [GPT](https://chat.openai.com)
- [shields.io](https://shields.io)
- [readme.so](https://readme.so)

## License

[MIT](https://choosealicense.com/licenses/mit/)
