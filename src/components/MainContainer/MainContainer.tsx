import { LogicGrid } from "../LogicGrid";
import { Puzzle } from "../../Puzzle/Puzzle";
import { Box, Center } from "@mantine/core";
import { GridSettings } from "../GridSettings";
import { useState } from "react";

export const MainContainer = (props: { puzzle: Puzzle }) => {
  const [outerGrid, setOuterGrid] = useState(props.puzzle.outerGrid);

  return (
    <Box>
      <GridSettings puzzle={props.puzzle} setOuterGrid={setOuterGrid} />
      <Center>
        <LogicGrid puzzle={props.puzzle} outerGrid={outerGrid} />
      </Center>
    </Box>
  );
};
