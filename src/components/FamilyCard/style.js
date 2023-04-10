import styled, { css } from "styled-components";
import {
  NEUTRAL_SHADES,
  SUCCESS_SHADES,
  PRIMARY_SHADES,
} from "../../utilities/globalStyles";

export const StyledFamilyCard = styled.div`
  ${({ color = SUCCESS_SHADES[300] }) => css`
    height: 24vw;
    background: ${NEUTRAL_SHADES.WHITE};
    box-shadow: 4px 4px 16px 4px #d4d4d4;
    border-radius: 16px;
    padding: 24px;
    display: flex;
    flex-direction: column;
    border-top: 64px solid ${color};
    &:hover {
      box-shadow: 4px 4px 16px 4px #ababab;
    }
  `}
`;
// border: ${(props) => props.color};

export const EmptyCard = styled(StyledFamilyCard)`
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  border-top: 64px solid ${NEUTRAL_SHADES[500]};
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

export const AvatarAndUsername = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
  &:not(:last-of-type) {
    margin-bottom: 8px;
  }
`;

export const paperPopoverStyles = { padding: "16px", borderRadius: "8px" };

export const avatarStyles = {
  bgcolor: PRIMARY_SHADES[800],
  width: 24,
  height: 24,
  fontSize: "12px",
};

export const StyledSkeletonCard = styled.div`
  height: 24vw;
`;
