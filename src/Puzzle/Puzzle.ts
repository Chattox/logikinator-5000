import { GameState, GameStateInput, Link } from "../types/Puzzle";
export class Puzzle {
  numCategories: number;
  numLabels: number;
  gameState: GameState;

  constructor() {
    this.numCategories = 3;
    this.numLabels = 4;
    this.gameState = { links: [] };
  }

  /**
   * Initialise game state with categories and labels from input
   *
   * @param {GameStateInput} input - Object containing game state
   */
  initGameState(input: GameStateInput) {
    for (const category in input) {
      this.gameState[category] = input[category];
    }
  }

  /**
   * Create or update a link between 2 labels of different categories
   *
   * @param {Link} update - Object containing labels and the link between them
   */
  updateLink(update: Link) {
    let updated = false;
    if (this.gameState.links.length) {
      this.gameState.links.forEach((link, i) => {
        if (link.label1 === update.label1 && link.label2 === update.label2) {
          this.gameState.links[i] = update;
          updated = true;
        }
      });
    }
    if (!updated) {
      this.gameState.links.push(update);
    }
  }

  /**
   * Remove an existing link
   *
   * @param {Link} rmLink - Object containing link to be removed
   */
  removeLink(rmLink: Link) {
    if (this.gameState.links.length) {
      this.gameState.links = this.gameState.links.filter((l) => l !== rmLink);
    }
  }
}
