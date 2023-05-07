import { ThemeProvider } from "@mui/material";

import { globalTheme, GlobalStyle } from "../src/utilities/globalStyles";

export const withMuiTheme = (Story) => (
  <ThemeProvider theme={globalTheme}>
    <GlobalStyle />
    <Story />
  </ThemeProvider>
);

export const decorators = [withMuiTheme];

/** @type { import('@storybook/react').Preview } */
const preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
};

export default preview;
