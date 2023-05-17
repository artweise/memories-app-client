import LoadingButton from '@mui/lab/LoadingButton';

import { formButtonStyles } from './style';

const Button = ({
  children,
  type = 'button',
  variant = 'contained',
  isFormButton = false,
  fullWidth = false,
  sx = {},
  onClick = null,
  loading = false,
  disabled = false,
}) => {
  return (
    <LoadingButton
      variant={variant}
      sx={isFormButton ? { ...sx, ...formButtonStyles } : { ...sx }}
      type={type}
      fullWidth={fullWidth}
      onClick={onClick}
      disabled={disabled}
      loading={loading}
    >
      {/* There is a known issue with translating a page using Chrome tools 
      when a Loading Button is present. After the page is translated, 
      the application crashes when the loading state of a Button changes.
      To prevent this, ensure that the contents of the Loading Button are 
      nested inside any HTML element, such as a <span>: */}
      {/* https://mui.com/material-ui/react-button/ */}
      <span>{children}</span>
    </LoadingButton>
  );
};

export default Button;
