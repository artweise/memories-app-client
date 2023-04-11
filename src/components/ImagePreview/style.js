import styled from "styled-components";
import { NEUTRAL_SHADES } from "../../utilities/globalStyles";

export const FilesContainer = styled.div`
  position: relative;
  display: inline-block;
`;

export const CloseRoundedIconStyles = {
  position: "absolute",
  top: 2,
  right: 2,
  backgroundColor: NEUTRAL_SHADES.WHITE,
  color: NEUTRAL_SHADES[1100],
  borderRadius: "20%",
};
