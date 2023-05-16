import ModalComponent from "../Modal"
import { FileContainer, StyledImg } from "./style"

const PreviewModal = ({ isOpen, handleClose, fileUrl }) => {
  return (
    <ModalComponent isOpen={isOpen} handleClose={handleClose}>
      <FileContainer>
        <StyledImg src={fileUrl} alt="preview" />
      </FileContainer>
    </ModalComponent>
  )
}

export default PreviewModal
