import styled, { css } from "styled-components";

export const StyledFamilyCard = styled.div`
  ${({ color = "#f9f9f9" }) => css`
    height: 18vw;
    background: ${color};
    box-shadow: 4px 4px 16px 4px #d4d4d4;
    &:hover {
      box-shadow: 4px 4px 16px 4px #ababab;
    }
    a {
      color: black;
    }
  `}
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
    fill: #adbac0;
  }
`;
