import { Box, Group } from "@mantine/core";
import { Puzzle } from "../../Puzzle/Puzzle";

export const GridSettings = (props: { puzzle: Puzzle }) => {
  const puzzle = props.puzzle;

  return (
    <Box>
      <Group>
        <p># of categories: {puzzle.numCategories}</p>
        <p># of items: {puzzle.numItems}</p>
      </Group>
    </Box>
  );
};
