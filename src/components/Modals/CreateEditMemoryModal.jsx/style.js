import styled from "styled-components"
import { NEUTRAL_SHADES } from "../../../utilities/globalStyles"

export const UploadContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 16px;
`

export const UploadedData = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  margin-top: 16px;
  gap: 8px;
`

export const FilesContainer = styled.div`
  position: relative;
  display: inline-block;
`

export const DuoContainer = styled.div`
  display: flex;
  gap: 16px;
`

export const FormContentContainer = styled.div`
  width: 600px;
  overflow-y: scroll;
  max-height: 80vh;
  padding-right: 8px;
  margin-right: -16px;
  ::-webkit-scrollbar {
    width: 6px;
  }
  ::-webkit-scrollbar-track {
    margin-block: 4px;
    border-radius: 5px;
  }
  ::-webkit-scrollbar-thumb {
    background: ${NEUTRAL_SHADES[400]};
    border-radius: 5px;
  }
  ::-webkit-scrollbar-thumb:hover {
    background: ${NEUTRAL_SHADES[600]}90;
  }
`

export const StyledImg = styled.img`
  width: auto;
  height: 100px;
  cursor: zoom-in;
`

export const closeRoundedIconStyles = {
  position: "absolute",
  top: 2,
  right: 2,
  backgroundColor: NEUTRAL_SHADES.WHITE,
  color: NEUTRAL_SHADES[1100],
  borderRadius: "20%",
  cursor: "pointer",
}

export const formControlStyleDuo = {
  width: "100%",
  marginTop: "16px",
  flex: 1,
}

export const notificationStyles = {
  display: "flex",
  alignItems: "center",
  gap: "4px",
  marginBottom: "8px",
}
