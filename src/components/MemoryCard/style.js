import styled from "styled-components";
import { NEUTRAL_SHADES } from "../../utilities/globalStyles";

export const StyledMemoryCard = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 8px;
  padding: 24px;
  background: ${NEUTRAL_SHADES.WHITE};
  box-shadow: 2px 2px 6px 2px #d4d4d4;
  &:hover {
    box-shadow: 2px 2px 12px 2px #ababab;
  }
  border: 1px solid ${NEUTRAL_SHADES[500]};
  gap: 8px;
`;

export const TitleAndButtons = styled.div`
  display: flex;
  justify-content: space-between;
`;
export const ActionButtonsContainer = styled.div`
  margin-left: auto;
`;

export const FlexRow = styled.div`
  display: flex;
  gap: 8px;
`;
