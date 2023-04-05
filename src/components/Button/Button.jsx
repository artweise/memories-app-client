import { StyledButton, formButtonStyles } from "./style";

const Button = ({
  children,
  type = "button",
  variant = "contained",
  isFormButton = false,
  fullWidth = false,
  sx = {},
  onClick = null,
  loading = false,
  disabled = false,
}) => {
  return (
    <StyledButton
      variant={variant}
      sx={isFormButton ? { ...sx, ...formButtonStyles } : { ...sx }}
      type={type}
      fullWidth={fullWidth}
      onClick={onClick}
      disabled={disabled}
      loading={loading}
    >
      {children}
    </StyledButton>
  );
};

export default Button;
