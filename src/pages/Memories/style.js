import styled from "styled-components";
import { NEUTRAL_SHADES } from "../../utilities/globalStyles";

export const MemoriesContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  width: 60vw;
  gap: 24px;
`;

export const MemoriesHeaderContainer = styled.div`
  display: flex;
  margin: 0 auto;
  width: 60vw;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 40px;
  border: 1px solid ${NEUTRAL_SHADES[500]};
  background: ${NEUTRAL_SHADES.WHITE};
  padding: 16px;
  border-radius: 8px;
`;

export const GoBackContainer = styled.div`
  margin: 0 auto;
  width: 95vw;
  a {
    display: flex;
    gap: 8px;
    align-items: center;
    width: fit-content;
  }
`;
