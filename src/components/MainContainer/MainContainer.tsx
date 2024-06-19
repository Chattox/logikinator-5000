import { LogicGrid } from "../LogicGrid";
import { Puzzle } from "../../Puzzle/Puzzle";
import { Container } from "@mantine/core";

export const MainContainer = (props: { puzzle: Puzzle }) => {
  return (
    <Container>
      <LogicGrid puzzle={props.puzzle} />
    </Container>
  );
};
