export class Puzzle {
  numCategories: number;
  numItems: number;
  gameState: GameState;
  outerGrid: OuterGridRow[];

  constructor() {
    this.numCategories = 4;
    this.numItems = 3;
    this.gameState = {
      categories: [
        { name: "Suspects", items: ["Maroon", "Cyan", "Avocado"] },
        { name: "Murder Weapons", items: ["Knife", "Log", "Inflatable duck"] },
        { name: "Locations", items: ["The Moon", "Music Festival", "Space"] },
        { name: "Motives", items: ["Revenge", "Love", "The memes"] },
      ],
      links: [],
    };
    this.outerGrid = [];

    this.createOuterGrid();
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
      this.gameState.links = this.gameState.links.filter((l) => {
        return (
          l.item1 !== rmLink.item1 &&
          l.item2 !== rmLink.item2 &&
          l.link !== rmLink.link
        );
      });
    }
  }

  /**
   * Create outer grid layout from categories
   *
   * Sets this.outerGrid to an array of OuterGridRows forming the layour of the outer grid squares
   */
  createOuterGrid = () => {
    const newOuterGrid = [];
    // For the column axis, remove the 2nd element as this will be the first element of the row axis
    const colCategories: Category[] = [...this.gameState.categories];
    colCategories.splice(1, 1);

    // For the row axis, remove the first element as that's the first element of the column axis, then reverse everything but the
    // new first element
    const rowCategories = [...this.gameState.categories];
    rowCategories.splice(0, 1);
    const firstYElem = rowCategories.shift();
    rowCategories.reverse();
    rowCategories.unshift(firstYElem!);

    // Create each row from the top down
    for (let i = 0; i < this.numCategories - 1; i++) {
      const outerGridRow: OuterGridRow = {
        row: rowCategories[i],
        col: [],
      };
      // Add each column still remaining to the row
      for (let j = 0; j < this.numCategories; j++) {
        if (colCategories.includes(this.gameState.categories[j])) {
          outerGridRow.col.push(this.gameState.categories[j]);
        }
      }
      newOuterGrid.push(outerGridRow);
      // Remove the last category from colCategories to avoid repeated grid squares
      colCategories.pop();
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
