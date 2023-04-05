import { StyledButton } from "./style";

const Button = ({
  children,
  type = "button",
  variant = "contained",
  isformbutton = false,
  fullWidth = false,
  sx = {},
  onClick = null,
}) => {
  return (
    <StyledButton
      variant={variant}
      sx={sx}
      type={type}
      isformbutton={isformbutton}
      fullWidth={fullWidth}
      onClick={onClick}
    >
      {children}
    </StyledButton>
  );
};

export default Button;
