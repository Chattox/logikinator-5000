import { MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";
import { MainContainer } from "./components/MainContainer";
import { Puzzle } from "./Puzzle/Puzzle";

function App() {
  const puzzle = new Puzzle();

  return (
    <MantineProvider>
      <MainContainer puzzle={puzzle} />
    </MantineProvider>
  );
}

export default App;
