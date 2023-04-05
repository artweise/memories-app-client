import styled, { css } from "styled-components";
import LoadingButton from "@mui/lab/LoadingButton";

import { SUCCESS_SHADES, NEUTRAL_SHADES } from "../../utilities/globalStyles";

export const StyledButton = styled(LoadingButton)`
  ${({ disabled }) => css`
    background: ${disabled
      ? `${NEUTRAL_SHADES[300]}`
      : `${SUCCESS_SHADES[600]} !important`};
  `}
`;

export const formButtonStyles = {
  width: "50%",
  marginLeft: "25%",
};
