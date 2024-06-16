import { Container } from "@mantine/core";
import { LogicGrid } from "../LogicGrid";
import { Puzzle } from "../../Puzzle/Puzzle";

export const MainContainer = (props: { puzzle: Puzzle }) => {
  return (
    <Container>
      <LogicGrid puzzle={props.puzzle} />
    </Container>
  );
};
