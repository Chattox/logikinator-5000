import { MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";
import { MainContainer } from "./components/MainContainer";

function App() {
  return (
    <MantineProvider>
      <MainContainer />
    </MantineProvider>
  );
}

export default App;
