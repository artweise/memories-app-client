import styled from "styled-components";

import { PRIMARY_SHADES } from "../../utilities/globalStyles";

export const Container = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
  &:not(:last-of-type) {
    margin-bottom: 8px;
  }
`;

export const avatarStyles = {
  bgcolor: PRIMARY_SHADES[800],
  width: 24,
  height: 24,
  fontSize: "12px",
};
