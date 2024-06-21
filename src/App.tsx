import { MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";
import { MainContainer } from "./components/MainContainer";
import { Puzzle } from "./Puzzle/Puzzle";
import { resolver, theme } from "./theme";

function App() {
  const puzzle = new Puzzle();

  return (
    <MantineProvider
      theme={theme}
      cssVariablesResolver={resolver}
      forceColorScheme="light"
    >
      <MainContainer puzzle={puzzle} />
    </MantineProvider>
  );
}

export default App;
