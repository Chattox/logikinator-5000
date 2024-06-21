import { Grid } from "@mantine/core";
import { Puzzle } from "../../../Puzzle/Puzzle";
import classes from "./LogicGridCell.module.css";
import { useState } from "react";

export const LogicGridCell = (props: {
  item1: string;
  item2: string;
  puzzle: Puzzle;
  pos: string;
}) => {
  const [link, setLink] = useState<string>(
    props.puzzle.getLink(props.item1, props.item2)
  );

  const getLinkIcon = () => {
    if (link === "true") {
      return "✅";
    } else if (link === "false") {
      return "❌";
    } else {
      return " ";
    }
  };

  const cycleLink = () => {
    if (link === "unset") {
      props.puzzle.updateLink({
        item1: props.item1,
        item2: props.item2,
        link: false,
      });
      setLink("false");
    } else if (link === "false") {
      props.puzzle.updateLink({
        item1: props.item1,
        item2: props.item2,
        link: true,
      });
      setLink("true");
    } else if (link === "true") {
      props.puzzle.removeLink({
        item1: props.item1,
        item2: props.item2,
        link: Boolean(link),
      });
      setLink("unset");
    }
  };

  return (
    <Grid.Col span={1} className={classes[props.pos]} onClick={cycleLink}>
      {getLinkIcon()}
    </Grid.Col>
  );
};
