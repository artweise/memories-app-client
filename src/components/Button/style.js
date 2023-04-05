import styled, { css } from "styled-components";
import { Button } from "@mui/material";

import { SUCCESS_SHADES } from "../../utilities/globalStyles";

export const StyledButton = styled(Button)`
  ${({ isformbutton }) => css`
    width: ${isformbutton && "50%"};
    margin-left: ${isformbutton && "25% !important"};
    background: ${SUCCESS_SHADES[600]} !important;
  `}
`;
