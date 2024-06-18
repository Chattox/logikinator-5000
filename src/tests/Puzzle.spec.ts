import { Puzzle } from "../Puzzle/Puzzle";

describe("Puzzle class", () => {
  describe("createGameState", () => {
    it("creates gameState from given input", () => {
      const puzzle = new Puzzle();
      const input = [
        { name: "suspects", items: ["maroon", "cyan", "avocado"] },
        { name: "murder weapons", items: ["knife", "log", "nuclear bomb"] },
        { name: "locations", items: ["the moon", "music festival", "space"] },
      ];
      const expected = {
        categories: [
          { name: "suspects", items: ["maroon", "cyan", "avocado"] },
          { name: "murder weapons", items: ["knife", "log", "nuclear bomb"] },
          { name: "locations", items: ["the moon", "music festival", "space"] },
        ],
        links: [],
      };

      puzzle.initCategories(input);

      expect(puzzle.gameState).toEqual(expected);
    });
  });

  describe("updateLink", () => {
    it("creates a new link", () => {
      const puzzle = new Puzzle();
      const puzzleInput = [
        { name: "suspects", items: ["maroon", "cyan", "avocado"] },
        { name: "murder weapons", items: ["knife", "log", "nuclear bomb"] },
        { name: "locations", items: ["the moon", "music festival", "space"] },
      ];
      const linkInput = {
        item1: "maroon",
        item2: "knife",
        link: true,
      };
      const expected = {
        categories: [
          { name: "suspects", items: ["maroon", "cyan", "avocado"] },
          { name: "murder weapons", items: ["knife", "log", "nuclear bomb"] },
          { name: "locations", items: ["the moon", "music festival", "space"] },
        ],
        links: [{ item1: "maroon", item2: "knife", link: true }],
      };

      puzzle.initCategories(puzzleInput);
      puzzle.updateLink(linkInput);

      expect(puzzle.gameState).toEqual(expected);
    });
    it("updates an existing link", () => {
      const puzzle = new Puzzle();
      const puzzleInput = [
        { name: "suspects", items: ["maroon", "cyan", "avocado"] },
        { name: "murder weapons", items: ["knife", "log", "nuclear bomb"] },
        { name: "locations", items: ["the moon", "music festival", "space"] },
      ];
      const linkInput = {
        item1: "maroon",
        item2: "knife",
        link: true,
      };
      const linkUpdate = {
        item1: "maroon",
        item2: "knife",
        link: false,
      };
      const expected = {
        categories: [
          { name: "suspects", items: ["maroon", "cyan", "avocado"] },
          { name: "murder weapons", items: ["knife", "log", "nuclear bomb"] },
          { name: "locations", items: ["the moon", "music festival", "space"] },
        ],
        links: [{ item1: "maroon", item2: "knife", link: false }],
      };

      puzzle.initCategories(puzzleInput);
      puzzle.updateLink(linkInput);
      puzzle.updateLink(linkUpdate);

      expect(puzzle.gameState).toEqual(expected);
    });
  });

  describe("removeLink", () => {
    it("removes an existing link", () => {
      const puzzle = new Puzzle();
      const puzzleInput = [
        { name: "suspects", items: ["maroon", "cyan", "avocado"] },
        { name: "murder weapons", items: ["knife", "log", "nuclear bomb"] },
        { name: "locations", items: ["the moon", "music festival", "space"] },
      ];
      const linkInput = {
        item1: "maroon",
        item2: "knife",
        link: true,
      };
      const expected = {
        categories: [
          { name: "suspects", items: ["maroon", "cyan", "avocado"] },
          { name: "murder weapons", items: ["knife", "log", "nuclear bomb"] },
          { name: "locations", items: ["the moon", "music festival", "space"] },
        ],
        links: [],
      };

      puzzle.initCategories(puzzleInput);
      puzzle.updateLink(linkInput);
      puzzle.removeLink(linkInput);

      expect(puzzle.gameState).toEqual(expected);
    });
  });
});
