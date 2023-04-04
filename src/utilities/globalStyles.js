import { createGlobalStyle } from "styled-components";

export const PRIMARY_SHADES = {
  50: "#ECECF0",
  100: "#F2EEF9",
  200: "#EEE7F8",
  300: "#DCCFF0",
  400: "#C5B5E5",
  500: "#A88FDA",
  600: "#8C6BCE",
  700: "#7743C9",
  800: "#5F10C5",
  900: "#3D1084",
  1000: "#22084C",
  1100: "#080213",
};

export const NEUTRAL_SHADES = {
  WHITE: "#FFFFFF",
  LIGHT_GRAY: "#FAFAFA",
  50: "#F8F9FA",
  100: "#F2F4F5",
  150: "#EFF1F3",
  200: "#E8EBEE",
  300: "#E1E4E7",
  400: "#E1E4E7",
  500: "#C6CBCF",
  600: "#AEB5BA",
  700: "#9AA2A7",
  800: "#73797E",
  900: "#555960",
  1000: "#43464F",
  1100: "#2F3135",
  BLACK: "#000000",
};

export const SUCCESS_SHADES = {
  50: "#E9F6F1",
  100: "#D4EEE3",
  200: "#A8DCC6",
  300: "#7DCBAA",
  400: "#51B98D",
  500: "#26A871",
  600: "#1E865A",
  700: "#176544",
  800: "#284029",
};

export const ERROR_SHADES = {
  50: "#FCEBED",
  100: "#F8D6DB",
  200: "#F1ADB6",
  300: "#EB8492",
  400: "#E45B6D",
  500: "#DD3249",
  600: "#B1283A",
  700: "#851E2C",
  800: "#58141D",
};

export const WARNING_SHADES = {
  50: "#FDF8ED",
  100: "#F9EBCA",
  200: "#F5DEA7",
  300: "#F1D085",
  400: "#EDC366",
  500: "#F4BA40",
  600: "#DDA939",
  700: "#D4A94F",
  800: "#A5843D",
  900: "#765E2B",
};

export const GlobalStyle = createGlobalStyle`
  *,
  * ::before,
  * ::after {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Roboto', sans-serif;
    font-size: 16px;
  }
  body{
    background-color: ${NEUTRAL_SHADES[150]};
  }
  a {
    text-decoration: none;
    color: ${NEUTRAL_SHADES.BLACK};
  }

`;
