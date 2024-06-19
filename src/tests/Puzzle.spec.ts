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

  describe("createOuterGrid", () => {
    it("creates correct outer grid", () => {
      const puzzle = new Puzzle();
      const puzzleInput = [
        { name: "suspects", items: ["maroon", "cyan", "avocado"] },
        { name: "murder weapons", items: ["knife", "log", "nuclear bomb"] },
        { name: "locations", items: ["the moon", "music festival", "space"] },
        { name: "motives", items: ["revenge", "love", "the memes"] },
      ];
      const expected = [
        {
          row: {
            name: "murder weapons",
            items: ["knife", "log", "nuclear bomb"],
          },
          col: [
            { name: "suspects", items: ["maroon", "cyan", "avocado"] },
            {
              name: "locations",
              items: ["the moon", "music festival", "space"],
            },
            { name: "motives", items: ["revenge", "love", "the memes"] },
          ],
        },
        {
          row: {
            name: "motives",
            items: ["revenge", "love", "the memes"],
          },
          col: [
            { name: "suspects", items: ["maroon", "cyan", "avocado"] },
            {
              name: "locations",
              items: ["the moon", "music festival", "space"],
            },
          ],
        },
        {
          row: {
            name: "locations",
            items: ["the moon", "music festival", "space"],
          },
          col: [{ name: "suspects", items: ["maroon", "cyan", "avocado"] }],
        },
      ];

      puzzle.initCategories(puzzleInput);
      puzzle.createOuterGrid();

      expect(puzzle.outerGrid).toEqual(expected);
    });
  });

  describe("getLink", () => {
    it("returns correct value when link exists", () => {
      const puzzle = new Puzzle();
      const puzzleInput = [
        { name: "suspects", items: ["maroon", "cyan", "avocado"] },
        { name: "murder weapons", items: ["knife", "log", "nuclear bomb"] },
        { name: "locations", items: ["the moon", "music festival", "space"] },
      ];
      const linkInputTrue = {
        item1: "maroon",
        item2: "knife",
        link: true,
      };
      const linkInputFalse = {
        item1: "cyan",
        item2: "log",
        link: false,
      };

      puzzle.initCategories(puzzleInput);
      puzzle.updateLink(linkInputTrue);
      puzzle.updateLink(linkInputFalse);

      expect(puzzle.getLink("maroon", "knife")).toBe("true");
      expect(puzzle.getLink("cyan", "log")).toBe("false");
    });
    it("returns unset when link does not exist", () => {
      const puzzle = new Puzzle();
      const puzzleInput = [
        { name: "suspects", items: ["maroon", "cyan", "avocado"] },
        { name: "murder weapons", items: ["knife", "log", "nuclear bomb"] },
        { name: "locations", items: ["the moon", "music festival", "space"] },
      ];

      puzzle.initCategories(puzzleInput);

      expect(puzzle.getLink("avocado", "nuclear bomb")).toBe("unset");
    });
  });
});
