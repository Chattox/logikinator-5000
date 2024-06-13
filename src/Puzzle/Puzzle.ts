import { GameState, GameStateInput } from "../types/Puzzle";

export class Puzzle {
  numCategories: number;
  numLabels: number;
  gameState: GameState;

  constructor() {
    this.numCategories = 3;
    this.numLabels = 4;
    this.gameState = { links: {} };
  }

  createGameState(input: GameStateInput) {
    for (const category in input) {
      this.gameState[category] = input[category];
    }
    console.log(this.gameState);
  }
}
