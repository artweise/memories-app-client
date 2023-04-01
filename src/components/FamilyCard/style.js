import styled, { css } from "styled-components";
import { NEUTRAL_SHADES } from "../../utilities/globalStyles";

export const StyledFamilyCard = styled.div`
  height: 18vw;
  background: ${NEUTRAL_SHADES.WHITE};
  box-shadow: 4px 4px 16px 4px #d4d4d4;
  border-radius: 16px;
  padding: 24px;
  display: flex;
  flex-direction: column;
  &:hover {
    box-shadow: 4px 4px 16px 4px #ababab;
  }
`;
// border: ${(props) => props.color};

export const EmptyCard = styled(StyledFamilyCard)`
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  .MuiSvgIcon-root.MuiSvgIcon-fontSizeLarge {
    width: 60%;
    height: 60%;
    fill: ${NEUTRAL_SHADES[600]};
  }
`;

export const Description = styled.div`
  height: 60%;
`;

export const MembersContainer = styled.div`
  width: 100%;
  display: flex;
  gap: 8px;
  margin-top: 8px;
  align-items: center;
  height: 22%;
`;
