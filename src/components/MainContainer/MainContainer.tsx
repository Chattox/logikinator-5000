import { LogicGrid } from "../LogicGrid";
import { Puzzle } from "../../Puzzle/Puzzle";
import { Box, Center } from "@mantine/core";
import { GridSettings } from "../GridSettings";
import { useState } from "react";

export const MainContainer = (props: { puzzle: Puzzle }) => {
  const [outerGrid, setOuterGrid] = useState(props.puzzle.outerGrid);

  return (
    <Center>
      <Box>
        <GridSettings puzzle={props.puzzle} setOuterGrid={setOuterGrid} />
        <LogicGrid puzzle={props.puzzle} outerGrid={outerGrid} />
      </Box>
    </Center>
  );
};
