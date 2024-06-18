import { Grid } from "@mantine/core";
import { Puzzle } from "../../Puzzle/Puzzle";
import classes from "./LogicGrid.module.css";

export const LogicGrid = (props: { puzzle: Puzzle }) => {
  const puzzle = props.puzzle;

  const testSetup = [
    { name: "suspects", items: ["maroon", "cyan", "avocado"] },
    { name: "murder weapons", items: ["knife", "log", "nuclear bomb"] },
    { name: "locations", items: ["the moon", "music festival", "space"] },
  ];

  puzzle.initCategories(testSetup);

  puzzle.createOuterGrid();

  const grid: JSX.Element[][] = [];
  puzzle.outerGrid.forEach((row) => {
    const gridSquareRows: JSX.Element[] = [];
    row.y.forEach((category) => {
      const gridSquare: JSX.Element[] = [];
      row.x.items.forEach((xItem) => {
        category.items.forEach((yItem) => {
          gridSquare.push(
            <Grid.Col span={1} className={classes.cell}>
              {xItem}/{yItem}
            </Grid.Col>
          );
        });
      });
      console.log(gridSquare);
      gridSquareRows.push(
        <Grid.Col span={1}>
          <Grid columns={puzzle.numItems} className={classes.innerGridSquare}>
            {gridSquare}
          </Grid>
        </Grid.Col>
      );
    });
    grid.push(gridSquareRows);
  });

  const gridDisplay = grid.map((row, i) => (
    <Grid
      columns={puzzle.numCategories - (i + 1)}
      gutter={0}
      className={classes.outerGridSquare}
    >
      {row}
    </Grid>
  ));

  return <>{gridDisplay}</>;
};
