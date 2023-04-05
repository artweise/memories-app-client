import styled from "styled-components";
import { Button } from "@mui/material";

import { ERROR_SHADES } from "../../../utilities/globalStyles";

export const StyledForm = styled.form`
  width: 600px;
`;

export const helperTextStyle = {
  color: ERROR_SHADES[600],
};

export const formControlStyle = {
  width: "100%",
  marginTop: "16px",
};
