import { StyledButton, formButtonStyles } from "./style";

const Button = ({
  children,
  type = "button",
  variant = "contained",
  isFormButton = false,
  fullWidth = false,
  sx = {},
  onClick = null,
}) => {
  return (
    <StyledButton
      variant={variant}
      sx={isFormButton ? { ...sx, ...formButtonStyles } : { ...sx }}
      type={type}
      fullWidth={fullWidth}
      onClick={onClick}
    >
      {children}
    </StyledButton>
  );
};

export default Button;
