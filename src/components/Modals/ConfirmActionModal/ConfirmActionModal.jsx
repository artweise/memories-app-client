import Button from "../../Button/Button";
import ModalComponent from "../Modal";
import { Typography } from "@mui/material";

import { Container } from "./style";

const ConfirmActionModal = ({
  onClose,
  isOpen,
  onConfirm,
  loading = false,
  actionName = "",
  actionString = "",
  explanation = "",
}) => {
  return (
    <ModalComponent isOpen={isOpen} handleClose={() => onClose()}>
      <Container>
        <Typography variant="h6">
          {actionString ? actionString : "Are you sure?"}
        </Typography>
        {explanation && <Typography>{explanation}</Typography>}
        <Button onClick={onConfirm} loading={loading}>
          {actionName ? actionName : "Confirm"}
        </Button>
      </Container>
    </ModalComponent>
  );
};

export default ConfirmActionModal;
