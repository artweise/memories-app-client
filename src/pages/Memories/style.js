import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  gap: 48px;
  padding-inline: 4%;
`;

export const MemoriesContainer = styled.div`
  display: flex;
  flex-direction: column;
  // flex: 1;
  width: 60vw;
  margin: 0 auto;
`;

export const MemoryCardsContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 48px;
  gap: 24px;
`;

export const MemoriesHeaderContainer = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  margin-bottom: 16px;
  padding-block: 16px;
`;

export const TotalContainer = styled.div`
  display: flex;
  margin-bottom: 16px;
`;

export const GoBackContainer = styled.div`
  margin: 0 auto;
  margin-inline: 3.5%;
  a {
    display: flex;
    gap: 8px;
    align-items: center;
    width: fit-content;
  }
`;

export const SideMenu = styled.div`
  width: 232px;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;
