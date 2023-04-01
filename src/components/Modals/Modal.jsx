import { Backdrop, Modal, Fade, Box } from "@mui/material";
import { NEUTRAL_SHADES } from "../../utilities/globalStyles";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "fit-content",
  bgcolor: `${NEUTRAL_SHADES.WHITE}`,
  boxShadow: 24,
  p: 4,
};

const ModalComponent = ({ isOpen, handleClose, children }) => {
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
      }}
    >
      <Fade in={isOpen}>
        <Box sx={style}>{children}</Box>
      </Fade>
    </Modal>
  );
};

export default ModalComponent;