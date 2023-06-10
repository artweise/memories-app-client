import styled from 'styled-components';

import { NEUTRAL_SHADES } from '../../utilities/globalStyles';

export const titleStyles = {
  mr: 2,
  display: { xs: 'none', md: 'flex' },
  fontFamily: 'monospace',
  fontWeight: 700,
  letterSpacing: '0.3rem',
  textDecoration: 'none',
  color: NEUTRAL_SHADES.WHITE,
};

export const LogoutMenuContainer = styled.div`
  display: flex;
  gap: 4px;
`;
