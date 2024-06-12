import { GameState } from "../types/Puzzle";

export class Puzzle {
  numCategories: number;
  numLabels: number;
  gameState: GameState;

  constructor() {
    this.numCategories = 3;
    this.numLabels = 4;
    this.gameState = { links: {} };
  }
}
