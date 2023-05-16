import styled, { css } from "styled-components"

export const FamiliesContainer = styled.div`
  display: grid;
  margin: 0 auto;
  width: 60vw;
  grid-template-columns: repeat(auto-fill, minmax(30%, 1fr));
  column-gap: 24px;
  row-gap: 24px;
`
