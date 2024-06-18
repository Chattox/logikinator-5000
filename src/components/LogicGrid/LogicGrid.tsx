import { Box, Flex, Grid } from "@mantine/core";
import { Puzzle } from "../../Puzzle/Puzzle";
import { LogicGridCell } from "./LogicGridCell";

export const LogicGrid = (props: { puzzle: Puzzle }) => {
  const puzzle = props.puzzle;

  const testSetup = [
    { name: "suspects", items: ["maroon", "cyan", "avocado"] },
    { name: "murder weapons", items: ["knife", "log", "nuclear bomb"] },
    { name: "locations", items: ["the moon", "music festival", "space"] },
  ];

  puzzle.initCategories(testSetup);

  puzzle.createOuterGrid();

  const grid: JSX.Element[] = [];
  puzzle.outerGrid.forEach((row) => {
    const gridRow: JSX.Element[] = [];
    row.y.forEach((category) => {
      const gridSquare: JSX.Element[] = [];
      row.x.items.forEach((xItem) => {
        category.items.forEach((yItem) => {
          gridSquare.push(<LogicGridCell item1={xItem} item2={yItem} />);
        });
      });
      gridRow.push(
        <Grid
          columns={puzzle.numItems}
          gutter={0}
          w={`${4 * puzzle.numItems}rem`}
          h={`${4 * puzzle.numItems}rem`}
        >
          {gridSquare}
        </Grid>
      );
    });
    grid.push(<Flex gap={0}>{gridRow}</Flex>);
  });

  return <Box>{grid}</Box>;
};
