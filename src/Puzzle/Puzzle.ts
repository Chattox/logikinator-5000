export class Puzzle {
  numCategories: number;
  numItems: number;
  gameState: GameState;

  constructor() {
    this.numCategories = 3;
    this.numItems = 4;
    this.gameState = { categories: [], links: [] };
  }

  /**
   * Initialise game state with categories and items from input
   *
   * @param {Category[]} input - Array containing initial grid layout
   *
   * @example
   *  // input example
   *  [
   *    {name: "suspects", items: ["maroon", "cyan", "avocado"]},
   *    {name: "murderWeapons", items: ["knife", "log", "nuclear bomb"]},
   *    {name: "locations", items: ["the moon", "music festival", "space"]}
   *  ]
   */
  initCategories(input: Category[]) {
    this.numCategories = input.length;
    this.numItems = input[0].items.length;
    this.gameState.categories = input;
  }

  /**
   * Create or update a link between 2 items of different categories
   *
   * @param {Link} update - Object containing items and the link between them
   */
  updateLink(update: Link) {
    let updated = false;
    if (this.gameState.links.length) {
      this.gameState.links.forEach((link, i) => {
        if (link.item1 === update.item1 && link.item2 === update.item2) {
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
