export class Puzzle {
  numCategories: number;
  numItems: number;
  gameState: GameState;
  outerGrid: OuterGridRow[];

  constructor() {
    this.numCategories = 3;
    this.numItems = 4;
    this.gameState = { categories: [], links: [] };
    this.outerGrid = [];
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

  /**
   * Create outer grid layout from categories
   *
   * Sets this.outerGrid to an array of OuterGridRows forming the layour of the outer grid squares
   */
  createOuterGrid = () => {
    const newOuterGrid = [];
    const yCategories = [...this.gameState.categories];

    for (let i = 1; i < this.numCategories; i++) {
      const outerGridRow: OuterGridRow = {
        x: this.gameState.categories[i],
        y: [],
      };
      for (let j = 0; j < this.numCategories; j++) {
        if (j !== i && yCategories.includes(this.gameState.categories[j])) {
          outerGridRow.y.push(this.gameState.categories[j]);
        }
      }
      newOuterGrid.push(outerGridRow);
      yCategories.splice(i, 1);
    }

    this.outerGrid = newOuterGrid;
  };

  /**
   * Returns status of a given link
   *
   * @param {string} item1 - first item in link
   * @param {string} item2 - second item in link
   * @return {string} `"true"` | `"false"` | `"unset"`
   */
  getLink = (item1: string, item2: string) => {
    const link = this.gameState.links.filter(
      (link) => link.item1 === item1 && link.item2 === item2
    );
    return link.length > 0 ? link[0].link.toString() : "unset";
  };
}
