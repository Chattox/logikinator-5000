import { Box, Flex, Grid } from "@mantine/core";
import { Puzzle } from "../../Puzzle/Puzzle";
import { LogicGridCell } from "./LogicGridCell";
import { LogicGridLabel } from "./LogicGridLabel";
import { useEffect } from "react";

export const LogicGrid = (props: {
  puzzle: Puzzle;
  outerGrid: OuterGridRow[];
}) => {
  const puzzle = props.puzzle;

  useEffect(() => {}, [props.outerGrid]);

  const generateGrid = (labels: {
    col: JSX.Element[][];
    row: JSX.Element[][];
  }) => {
    const grid: JSX.Element[] = [];
    puzzle.outerGrid.forEach((row, i) => {
      // Create each row as a Flex containing multiple individual Grid squares
      const gridRow: JSX.Element[] = [];
      row.col.forEach((category, j) => {
        const gridSquare: JSX.Element[] =
          // Very first cell is blank to allow for axis labels
          i === 0 && j === 0 ? [<Box h="4rem" w="4rem" />] : [];
        // For first row include column labels
        if (i === 0) {
          labels.col[j].forEach((label) => gridSquare.push(label));
        }
        row.row.items.forEach((rowItem, k) => {
          // For first column include row labels
          if (j === 0) {
            gridSquare.push(labels.row[i][k]);
          }
          category.items.forEach((colItem) => {
            gridSquare.push(
              <LogicGridCell item1={colItem} item2={rowItem} puzzle={puzzle} />
            );
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
    const colLabels = puzzle.outerGrid[0].col.map((category) =>
      category.items.map((item) => <LogicGridLabel label={item} axis="col" />)
    );
    const rowLabels = puzzle.outerGrid.map((row) =>
      row.row.items.map((item) => <LogicGridLabel label={item} axis="row" />)
    );

    return { rowLabels, colLabels };
  };

  const { rowLabels, colLabels } = generateLabels();

  return <Box>{generateGrid({ col: colLabels, row: rowLabels })}</Box>;
};
