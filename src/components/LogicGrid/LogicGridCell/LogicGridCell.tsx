import { Grid } from "@mantine/core";
import { Puzzle } from "../../../Puzzle/Puzzle";
import classes from "./LogicGridCell.module.css";

export const LogicGridCell = (props: {
  item1: string;
  item2: string;
  puzzle: Puzzle;
}) => {
  const getLinkIcon = () => {
    const link = props.puzzle.getLink(props.item1, props.item2);

    if (link === "true") {
      return "✅";
    } else if (link === "false") {
      return "❌";
    } else {
      return " ";
    }
  };
  return (
    <Grid.Col span={1} className={classes.cell}>
      {getLinkIcon()}
    </Grid.Col>
  );
};
