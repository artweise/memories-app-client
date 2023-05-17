import React from 'react';

import { StyledTypography } from './style';
import { NEUTRAL_SHADES } from '../../../utilities/globalStyles';

const LinkTypography = ({
  color = NEUTRAL_SHADES.BLACK,
  variant = 'body1',
  sx = {},
  gutterBottom = false,
  align = 'inherit',
  noWrap = false,
  paragraph = false,
  text = '',
}) => {
  return (
    <StyledTypography
      color={color}
      variant={variant}
      sx={sx}
      gutterBottom={gutterBottom}
      align={align}
      noWrap={noWrap}
      paragraph={paragraph}
    >
      {text}
    </StyledTypography>
  );
};

export default LinkTypography;
