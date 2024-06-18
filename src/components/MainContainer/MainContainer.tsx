import { LogicGrid } from "../LogicGrid";
import { Puzzle } from "../../Puzzle/Puzzle";

export const MainContainer = (props: { puzzle: Puzzle }) => {
  return (
    <>
      <LogicGrid puzzle={props.puzzle} />
    </>
  );
};
