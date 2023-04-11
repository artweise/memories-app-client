import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  width: 60vw;
  margin: 0 auto;
`;

export const MemoriesContainer = styled(Container)`
  flex-direction: column;
  margin-bottom: 48px;
  gap: 24px;
`;

export const MemoriesHeaderContainer = styled(Container)`
  align-items: center;
  justify-content: space-between;
  margin-bottom: 40px;
  padding-block: 16px;
`;

export const MembersContainer = styled(Container)`
  margin-bottom: 16px;
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
