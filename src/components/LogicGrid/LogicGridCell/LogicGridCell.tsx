import { Grid } from "@mantine/core";
import { Puzzle } from "../../../Puzzle/Puzzle";
import classes from "./LogicGridCell.module.css";

export const LogicGridCell = (props: {
  item1: string;
  item2: string;
  puzzle: Puzzle;
}) => {
  return (
    <Grid.Col span={1} className={classes.cell}>
      {/* {props.puzzle.getLink(props.item1, props.item2)} */}
      {props.item1.slice(0, 3)}/{props.item2.slice(0, 3)}
    </Grid.Col>
  );
};
