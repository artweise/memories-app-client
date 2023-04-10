import { useState, useContext } from "react";
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
} from "@mui/material";
import Diversity1RoundedIcon from "@mui/icons-material/Diversity1Rounded";
import { useNavigate } from "react-router-dom";

import { AuthContext } from "../../context/auth.context";
import { PRIMARY_SHADES } from "../../utilities/globalStyles";
import { titleStyles } from "./style";

const settings = [{ text: "My families", link: "/families" }];

const Navbar = () => {
  const [anchorElUser, setAnchorElUser] = useState(null);

  // Subscribe to the AuthContext to gain access to
  // the values from AuthContext.Provider `value` prop
  const { isLoggedIn, user, logOutUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  return (
    <AppBar position="fixed" sx={{ background: PRIMARY_SHADES[700] }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {/* LOGO */}
          <Diversity1RoundedIcon
            sx={{ display: { xs: "none", md: "flex" }, mr: 1 }}
          />
          {/* APPLICATION TITLE */}
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={titleStyles}
          >
            FamilyMemories
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            {/* LOGO */}
            <Diversity1RoundedIcon
              sx={{ display: { xs: "flex", md: "none" }, mr: 1 }}
            />
          </Box>

          <Box sx={{ flexGrow: 0, marginLeft: "auto" }}>
            {isLoggedIn ? (
              <Box sx={{ flexGrow: 0 }}>
                <Tooltip title="Open settings">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar>
                      {user && user.username.slice(0, 1).toUpperCase()}
                    </Avatar>
                  </IconButton>
                </Tooltip>
                <Menu
                  sx={{ mt: "45px", mr: "10px" }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  {settings.map((setting, index) => (
                    <MenuItem
                      key={index}
                      onClick={
                        // if link was provided - navigate, else do not do anything
                        setting?.link
                          ? () => navigate(`${setting.link}`)
                          : undefined
                      }
                    >
                      <Typography sx={{ paddingRight: "16px" }}>
                        {setting.text}
                      </Typography>
                    </MenuItem>
                  ))}
                  <MenuItem
                    sx={{ height: "32px" }}
                    onClick={() => {
                      logOutUser();
                      navigate("/login");
                    }}
                  >
                    <Typography color={PRIMARY_SHADES[700]} variant="body2">
                      Log out
                    </Typography>
                  </MenuItem>
                </Menu>
              </Box>
            ) : (
              <Button color="inherit" onClick={() => navigate("/login")}>
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
