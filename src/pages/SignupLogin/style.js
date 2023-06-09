import styled from "styled-components";

import { PRIMARY_SHADES } from "../../utilities/globalStyles";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 48px;
`;

export const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  border: 2px solid ${PRIMARY_SHADES[800]};
  align-items: center;
  padding: 16px 16px 24px;
  margin-top: 16px;
  border-radius: 8px;
`;

export const FlexRow = styled.div`
  display: flex;
  gap: 4px;
`;
