import styled from "styled-components";
import { NEUTRAL_SHADES } from "../../utilities/globalStyles";

export const StyledMemoryCard = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 16px;
  padding: 24px;
  background: ${NEUTRAL_SHADES.WHITE};
  box-shadow: 4px 4px 16px 4px #d4d4d4;
  &:hover {
    box-shadow: 4px 4px 16px 4px #ababab;
  }
  border: 1px solid red;
`;
