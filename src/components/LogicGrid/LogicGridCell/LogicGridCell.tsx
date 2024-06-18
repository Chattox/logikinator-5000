import { Grid } from "@mantine/core";
import classes from "./LogicGridCell.module.css";

export const LogicGridCell = (props: { item1: string; item2: string }) => {
  return (
    <Grid.Col span={1} className={classes.cell}>
      {props.item1[0]}/{props.item2[0]}
    </Grid.Col>
  );
};
