import { Box, Flex, Grid, useMantineTheme } from "@mantine/core";
import { Puzzle } from "../../Puzzle/Puzzle";
import { LogicGridCell } from "./LogicGridCell";
import { LogicGridLabel } from "./LogicGridLabel";
import { useEffect } from "react";
import classes from "./LogicGrid.module.css";

export const LogicGrid = (props: {
  puzzle: Puzzle;
  outerGrid: OuterGridRow[];
}) => {
  const puzzle = props.puzzle;
  const theme = useMantineTheme();

  useEffect(() => {}, [props.outerGrid]);

  const getCellPos = (row: number, col: number) => {
    if (row === 0 && col === 0) {
      return "topLeft";
    } else if (row === 0 && col < puzzle.numItems - 1) {
      return "top";
    } else if (row === 0 && col === puzzle.numItems - 1) {
      return "topRight";
    } else if (row < puzzle.numItems - 1 && col === 0) {
      return "centerLeft";
    } else if (row < puzzle.numItems - 1 && col === puzzle.numItems - 1) {
      return "centerRight";
    } else if (row === puzzle.numItems - 1 && col === 0) {
      return "bottomLeft";
    } else if (row === puzzle.numItems - 1 && col < puzzle.numItems - 1) {
      return "bottom";
    } else if (row === puzzle.numItems - 1 && col === puzzle.numItems - 1) {
      return "bottomRight";
    } else {
      return "inner";
    }
  };

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
          i === 0 && j === 0 ? [<Box className={classes.blankSquare} />] : [];
        // For first row include column labels
        if (i === 0) {
          labels.col[j].forEach((label) => gridSquare.push(label));
        }
        row.row.items.forEach((rowItem, k) => {
          // For first column include row labels
          if (j === 0) {
            gridSquare.push(labels.row[i][k]);
          }
          category.items.forEach((colItem, l) => {
            gridSquare.push(
              <LogicGridCell
                item1={colItem}
                item2={rowItem}
                puzzle={puzzle}
                pos={getCellPos(k, l)}
              />
            );
          });
        });

        gridRow.push(
          // The sizing bit here is *extremely* hacky and I would prefer literally any other way to go about it
          <Grid
            columns={puzzle.numItems + (j === 0 ? 1 : 0)}
            gutter={0}
            w={`${
              Number(theme.other.gridSizing.gridCell[0]) *
              (puzzle.numItems + (j === 0 ? 1 : 0))
            }rem`}
            maw={`${
              Number(theme.other.gridSizing.gridCell[0]) *
              (puzzle.numItems + (j === 0 ? 1 : 0))
            }rem`}
            h={`${
              Number(theme.other.gridSizing.gridCell[0]) *
              (puzzle.numItems + (i === 0 ? 1 : 0))
            }rem`}
            className={classes.gridSquare}
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
