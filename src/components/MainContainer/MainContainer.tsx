import { LogicGrid } from "../LogicGrid";
import { Puzzle } from "../../Puzzle/Puzzle";
import { Box, Center } from "@mantine/core";
import { GridSettings } from "../GridSettings";

export const MainContainer = (props: { puzzle: Puzzle }) => {
  return (
    <Center>
      <Box>
        <GridSettings puzzle={props.puzzle} />
        <LogicGrid puzzle={props.puzzle} />
      </Box>
    </Center>
  );
};
