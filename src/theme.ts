import { CSSVariablesResolver, createTheme, rem } from "@mantine/core";

export const theme = createTheme({
  white: "#fbfbf9",
  defaultRadius: "5px",
  other: {
    gridSizing: {
      gridCell: rem(64),
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
