import styled from "styled-components";

import { NEUTRAL_SHADES } from "../../utilities/globalStyles";

export const modalHeaderStyles = {
  display: "flex",
  alignItems: "center",
};

export const modalStyles = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "fit-content",
  bgcolor: `${NEUTRAL_SHADES.WHITE}`,
  boxShadow: 24,
  p: 4,
};

export const StyledForm = styled.form`
  width: 600px;
`;

export const formControlStyle = {
  width: "100%",
  marginTop: "16px",
};
