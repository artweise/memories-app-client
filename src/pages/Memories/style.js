import styled from "styled-components";
import { NEUTRAL_SHADES } from "../../utilities/globalStyles";

export const MemoriesContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 auto 48px;
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
  padding-block: 16px;
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
