import { Box, Flex, Grid } from "@mantine/core";
import { Puzzle } from "../../Puzzle/Puzzle";
import { LogicGridCell } from "./LogicGridCell";
import { LogicGridLabel } from "./LogicGridLabel";

export const LogicGrid = (props: { puzzle: Puzzle }) => {
  const puzzle = props.puzzle;

  const testSetup = [
    { name: "suspects", items: ["maroon", "cyan", "avocado"] },
    { name: "murder weapons", items: ["knife", "log", "nuclear bomb"] },
    { name: "locations", items: ["the moon", "music festival", "space"] },
  ];

  puzzle.initCategories(testSetup);

  puzzle.createOuterGrid();

  const generateGrid = (labels: { x: JSX.Element[][]; y: JSX.Element[][] }) => {
    const grid: JSX.Element[] = [];
    puzzle.outerGrid.forEach((row, i) => {
      const gridRow: JSX.Element[] = [];
      row.y.forEach((category, j) => {
        const gridSquare: JSX.Element[] =
          i === 0 && j === 0 ? [<LogicGridCell item1="" item2="" />] : [];
        if (i === 0) {
          labels.x[j].forEach((label) => gridSquare.push(label));
        }
        row.x.items.forEach((xItem, k) => {
          if (j === 0) {
            gridSquare.push(labels.y[i][k]);
          }
          category.items.forEach((yItem) => {
            gridSquare.push(<LogicGridCell item1={xItem} item2={yItem} />);
          });
        });
        gridRow.push(
          <Grid
            columns={puzzle.numItems + (j === 0 ? 1 : 0)}
            gutter={0}
            w={`${4 * (puzzle.numItems + (j === 0 ? 1 : 0))}rem`}
            h={`${4 * (puzzle.numItems + (i === 0 ? 1 : 0))}rem`}
          >
            {gridSquare}
          </Grid>
        );
      });
      grid.push(<Flex gap={0}>{gridRow}</Flex>);
    });

    return grid;
  };

  const generateLabels = () => {
    const xLabels = puzzle.outerGrid[0].y.map((category) =>
      category.items.map((item) => <LogicGridLabel label={item} axis="x" />)
    );
    const yLabels = puzzle.outerGrid.map((row) =>
      row.x.items.map((item) => <LogicGridLabel label={item} axis="y" />)
    );

    return { xLabels, yLabels };
  };

  const { xLabels, yLabels } = generateLabels();

  return <Box>{generateGrid({ x: xLabels, y: yLabels })}</Box>;
};
