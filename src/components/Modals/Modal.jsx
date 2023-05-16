import {
  Backdrop,
  Modal,
  Fade,
  Box,
  Typography,
  IconButton,
} from "@mui/material"
import CloseRoundedIcon from "@mui/icons-material/CloseRounded"

import { modalHeaderStyles, modalStyles } from "./style"

const ModalComponent = ({ isOpen, handleClose, children, title = "" }) => {
  return (
    <Modal
      open={isOpen}
      onClose={handleClose}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          timeout: 500,
        },
      }}>
      <Fade in={isOpen}>
        <Box sx={modalStyles}>
          <Box sx={modalHeaderStyles}>
            {title && <Typography variant="h5">{title}</Typography>}
            <IconButton onClick={handleClose} sx={{ marginLeft: "auto" }}>
              <CloseRoundedIcon />
            </IconButton>
          </Box>
          {children}
        </Box>
      </Fade>
    </Modal>
  )
}

export default ModalComponent
