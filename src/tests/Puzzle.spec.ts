import { Puzzle } from "../Puzzle/Puzzle";

describe("Puzzle class", () => {
  describe("createGameState", () => {
    it("creates gameState from given input", () => {
      const puzzle = new Puzzle();
      const input = {
        suspects: ["red", "green", "blue"],
        murderWeapons: ["knife", "boat", "donkey"],
        locations: ["the high seas", "forest", "library"],
      };
      const expected = {
        suspects: ["red", "green", "blue"],
        murderWeapons: ["knife", "boat", "donkey"],
        locations: ["the high seas", "forest", "library"],
        links: [],
      };

      puzzle.createGameState(input);

      expect(puzzle.gameState).toEqual(expected);
    });
  });

  describe("updateLink", () => {
    it("creates a new link from given input", () => {
      const puzzle = new Puzzle();
      const puzzleInput = {
        suspects: ["red", "green", "blue"],
        murderWeapons: ["knife", "boat", "donkey"],
        locations: ["the high seas", "forest", "library"],
      };
      const linkInput = {
        label1: "red",
        label2: "knife",
        link: true,
      };
      const expected = {
        suspects: ["red", "green", "blue"],
        murderWeapons: ["knife", "boat", "donkey"],
        locations: ["the high seas", "forest", "library"],
        links: [
          {
            label1: "red",
            label2: "knife",
            link: true,
          },
        ],
      };

      puzzle.createGameState(puzzleInput);
      puzzle.updateLink(linkInput);

      expect(puzzle.gameState).toEqual(expected);
    });
  });
});