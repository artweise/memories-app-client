import { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Button,
  Avatar,
  Typography,
  IconButton,
  Box,
  Menu,
  Container,
  Tooltip,
  MenuItem,
} from '@mui/material';
import Diversity1RoundedIcon from '@mui/icons-material/Diversity1Rounded';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import { useNavigate, useLocation } from 'react-router-dom';

import { AuthContext } from '../../context/auth.context';
import { PURPLE_SHADES, NEUTRAL_SHADES } from '../../utilities/globalStyles';
import { LogoutMenuContainer, titleStyles } from './style';

const options = [{ text: 'My families', link: '/families' }];

const Navbar = () => {
  const [anchorElUser, setAnchorElUser] = useState(null);

  // Subscribe to the AuthContext to gain access to
  // the values from AuthContext.Provider `value` prop
  const { isLoggedIn, user, logOutUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const isMainPage = location.pathname === '/';

  return (
    <AppBar
      position='fixed'
      sx={{
        background: isMainPage ? 'transparent' : PURPLE_SHADES[700],
        boxShadow: 'none',
      }}
    >
      <Container maxWidth='xl'>
        <Toolbar disableGutters>
          {/* LOGO AND NAME for bigger screens*/}
          <Diversity1RoundedIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1, ml: 4 }} />
          <Tooltip title='Home' placement='bottom-start'>
            <Link to='/'>
              <Typography variant='h6' noWrap sx={titleStyles}>
                FamilyMemories
              </Typography>
            </Link>
          </Tooltip>

          {/* LOGO for small screens */}
          <Box sx={{ cursor: 'pointer', flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <Tooltip title='Home' placement='bottom'>
              <Link to='/'>
                <Diversity1RoundedIcon
                  sx={{ color: NEUTRAL_SHADES.WHITE, display: { xs: 'flex', md: 'none' }, mr: 1 }}
                />
              </Link>
            </Tooltip>
          </Box>

          <Box sx={{ flexGrow: 0, marginLeft: 'auto' }}>
            {isLoggedIn ? (
              <Box sx={{ flexGrow: 0, mr: 4 }}>
                <Tooltip title='Options'>
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar>{user && user.username.slice(0, 1).toUpperCase()}</Avatar>
                  </IconButton>
                </Tooltip>
                <Menu
                  sx={{ mt: '45px', mr: '10px' }}
                  id='menu-appbar'
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  {options.map((option, index) => (
                    <MenuItem
                      key={index}
                      onClick={
                        // if link was provided - navigate, else do not do anything
                        option?.link ? () => navigate(`${option.link}`) : undefined
                      }
                    >
                      <Typography sx={{ paddingRight: '16px' }}>{option.text}</Typography>
                    </MenuItem>
                  ))}
                  <MenuItem
                    onClick={() => {
                      logOutUser();
                      navigate('/login');
                    }}
                  >
                    <LogoutMenuContainer>
                      <LogoutRoundedIcon color='secondary' />
                      <Typography color={PURPLE_SHADES[700]}>Log out</Typography>
                    </LogoutMenuContainer>
                  </MenuItem>
                </Menu>
              </Box>
            ) : (
              <Button color='inherit' sx={{ mr: 4 }} onClick={() => navigate('/login')}>
                Log in
              </Button>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;
