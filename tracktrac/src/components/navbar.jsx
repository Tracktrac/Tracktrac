import React, { useState } from 'react';
import { AppBar, Toolbar, IconButton, Typography, Box, Tooltip, Button, Drawer, List, ListItem, ListItemText, Avatar, Menu, MenuItem } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useProfile } from '../hooks/useProfile';

const Navbar = () => {
  const { isAuthenticated, logout } = useAuth();
  const { profileData } = useProfile();
  const navigate = useNavigate();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [anchorElUser, setAnchorElUser] = useState(null); // Controlador del menú de usuario

  const toggleDrawer = (open) => () => {
    setDrawerOpen(open);
  };

  const handleNavigation = (path) => {
    navigate(path);
    setDrawerOpen(false);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget); // Abre el menú al hacer clic en el avatar
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null); // Cierra el menú
  };

  const drawerContent = (
    <Box onClick={toggleDrawer(false)} sx={{ width: 250 }}>
      <List>
        {!isAuthenticated ? (
          <>
            <ListItem button={true} onClick={() => handleNavigation('/about')}>
              <ListItemText primary="About" />
            </ListItem>
            <ListItem button={true} onClick={() => handleNavigation('/callback')}>
              <ListItemText primary="Sign In" />
            </ListItem>
          </>
        ) : (
          <>
            <ListItem button={true} onClick={() => handleNavigation('/month-recap')}>
              <ListItemText primary="Month Recap" />
            </ListItem>
            <ListItem button={true} onClick={() => handleNavigation('/six-month-recap')}>
              <ListItemText primary="6 Month Recap" />
            </ListItem>
            <ListItem button={true} onClick={() => handleNavigation('/year-recap')}>
              <ListItemText primary="Year Recap" />
            </ListItem>
            <ListItem button={true} onClick={() => handleNavigation('/lifetime')}>
              <ListItemText primary="Lifetime" />
            </ListItem>
            <ListItem button={true} onClick={() => handleNavigation('/profile')}>
              <ListItemText primary="Your Profile" />
            </ListItem>
            <ListItem button={true} onClick={handleLogout}>
              <ListItemText primary="Log Out" />
            </ListItem>
            <ListItem button={true} onClick={() => handleNavigation('/about')}>
              <ListItemText primary="About" />
            </ListItem>
          </>
        )}
      </List>
    </Box>
  );

  return (
    <AppBar position="static" sx={{ backgroundColor: '#0A0C2B' }}>
      <Toolbar>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          onClick={toggleDrawer(true)}
          sx={{ display: { xs: 'block', md: 'none' } }}
        >
          <MenuIcon />
        </IconButton>
        <Drawer open={drawerOpen} onClose={toggleDrawer(false)}>
          {drawerContent}
        </Drawer>

        <Typography
          variant="h6"
          noWrap
          sx={{
            flexGrow: 1,
            paddingLeft: 2,
            fontFamily: 'Arial Black',
            fontWeight: 700,
            letterSpacing: '.1rem',
            color: 'inherit',
            display: { xs: 'none', md: 'block' },
            cursor: 'pointer',
          }}
          onClick={() => handleNavigation('/')}
        >
          TrackTrac
        </Typography>

        <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center', gap: 2 }}>
          {!isAuthenticated ? (
            <>
              <Button color="inherit" onClick={() => handleNavigation('/about')}>
                About
              </Button>
              <Button color="inherit" onClick={() => handleNavigation('/callback')}>
                Sign In
              </Button>
            </>
          ) : (
            <>
              <Button color="inherit" onClick={() => handleNavigation('/month-recap')}>
                Month Recap
              </Button>
              <Button color="inherit" onClick={() => handleNavigation('/six-month-recap')}>
                6 Month Recap
              </Button>
              <Button color="inherit" onClick={() => handleNavigation('/year-recap')}>
                Year Recap
              </Button>
              <Button color="inherit" onClick={() => handleNavigation('/lifetime')}>
                Lifetime
              </Button>
              
              <Button color="inherit" onClick={() => handleNavigation('/about')}>
                About
              </Button>
              <Tooltip title={profileData?.display_name || "Profile"}>
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar
                    alt={profileData?.display_name}
                    src={profileData?.images?.[0]?.url}
                  />
                </IconButton>
              </Tooltip>
              <Menu
                anchorEl={anchorElUser}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
                sx={{ mt: '45px' }}
              >
                <MenuItem onClick={() => handleNavigation('/')}>Home</MenuItem>
                <MenuItem onClick={handleLogout}>Log Out</MenuItem>
              </Menu>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
