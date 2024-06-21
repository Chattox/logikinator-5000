import { CSSVariablesResolver, createTheme } from "@mantine/core";

export const theme = createTheme({
  white: "#fbfbf9",
  defaultRadius: "5px",
  other: {
    gridSizing: {
      gridCell: "2rem",
    },
  },
});

export const resolver: CSSVariablesResolver = (theme) => ({
  variables: {
    "--mantine-gridSizing-gridCell": theme.other.gridSizing.gridCell,
  },
  dark: {},
  light: {
    "--mantine-color-body": theme.white,
  },
});
