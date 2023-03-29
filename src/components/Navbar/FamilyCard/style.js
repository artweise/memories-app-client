import styled, { css } from "styled-components";

export const StyledFamilyCard = styled.div`
  ${({ color }) => css`
    border: 1px solid red;
    width: 20vw;
    height: 18vw;
    background: ${color};
  `}
`;
// border: ${(props) => props.color};
