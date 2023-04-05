import styled, { css } from "styled-components";
import { Button } from "@mui/material";

import { SUCCESS_SHADES } from "../../utilities/globalStyles";

export const StyledButton = styled(Button)`
  background: ${SUCCESS_SHADES[600]} !important;
`;

export const formButtonStyles = {
  width: "50%",
  marginLeft: "25%",
};
