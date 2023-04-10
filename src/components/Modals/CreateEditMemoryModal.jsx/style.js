import styled from "styled-components";
import { NEUTRAL_SHADES } from "../../../utilities/globalStyles";

export const UploadContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 16px;
`;

export const UploadedData = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  margin-top: 16px;
  gap: 8px;
`;

export const Files = styled.div`
  position: relative;
  display: inline-block;
`;

export const CloseRoundedIconStyles = {
  position: "absolute",
  top: 2,
  right: 2,
  backgroundColor: NEUTRAL_SHADES.WHITE,
  color: NEUTRAL_SHADES[1100],
  borderRadius: "20%",
};
