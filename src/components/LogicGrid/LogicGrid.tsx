import { Puzzle } from "../../Puzzle/Puzzle";

export const LogicGrid = (props: { puzzle: Puzzle }) => {
  const puzzle = props.puzzle;

  const testSetup = {
    suspects: ["maroon", "cyan", "avocado", "midnight"],
    murderWeapons: ["knife", "log", "nuclear bomb", "toilet"],
    locations: ["the moon", "music festival", "space", "library"],
  };

  puzzle.initGameState(testSetup);

  // const createGrid = () => {
  //   const outerGrid = [];
  //   for (const cat in puzzle.gameState) {
  //     const innerGrid = [];
  //     // for (const category in puzzle.gameState)
  //   }
  // };
  return <p>Hello, world!</p>;
};
