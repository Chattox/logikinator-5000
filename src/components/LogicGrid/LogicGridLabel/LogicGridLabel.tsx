import { Box } from "@mantine/core";
import classes from "./LogicGridLabel.module.css";

export const LogicGridLabel = (props: { label: string; axis: string }) => {
  return (
    <Box className={props.axis === "col" ? classes.colLabel : classes.rowLabel}>
      {props.label}
    </Box>
  );
};
