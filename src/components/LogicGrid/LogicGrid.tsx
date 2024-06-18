import { Puzzle } from "../../Puzzle/Puzzle";

export const LogicGrid = (props: { puzzle: Puzzle }) => {
  const puzzle = props.puzzle;

  const testSetup = [
    { name: "suspects", items: ["maroon", "cyan", "avocado"] },
    { name: "murder weapons", items: ["knife", "log", "nuclear bomb"] },
    { name: "locations", items: ["the moon", "music festival", "space"] },
  ];

  puzzle.initCategories(testSetup);

  puzzle.createOuterGrid();
  console.log(puzzle.outerGrid);
  return <p>Hello, world!</p>;
};
