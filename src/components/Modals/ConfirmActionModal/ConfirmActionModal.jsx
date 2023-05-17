import Button from '../../AppComponents/Button/Button';
import ModalComponent from '../Modal';
import { Typography } from '@mui/material';
import { isFunction } from 'lodash';

import { Container, ButtonContainer } from './style';

const ConfirmActionModal = ({
  onClose,
  isOpen,
  onConfirm,
  onCancel,
  loading = false,
  actionName = '',
  cancelName = '',
  actionString = '',
  explanation = '',
}) => {
  return (
    <ModalComponent isOpen={isOpen} handleClose={() => onClose()}>
      <Container>
        <Typography variant='h6'>{actionString ? actionString : 'Are you sure?'}</Typography>
        {explanation && <Typography>{explanation}</Typography>}
        <ButtonContainer>
          {isFunction(onCancel) && (
            <Button variant='text' onClick={onCancel}>
              {cancelName ? cancelName : 'Cancel'}
            </Button>
          )}
          <Button onClick={onConfirm} loading={loading}>
            {actionName ? actionName : 'Confirm'}
          </Button>
        </ButtonContainer>
      </Container>
    </ModalComponent>
  );
};

export default ConfirmActionModal;
