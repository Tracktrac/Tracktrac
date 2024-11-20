import React, { useState } from 'react';
import { AppBar, Toolbar, IconButton, Typography, Box, Tooltip, Button, Drawer, List, ListItem, ListItemText, Avatar, Menu, MenuItem } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import InfoIcon from '@mui/icons-material/Info';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
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
    <Box onClick={toggleDrawer(false)} sx={{ width: 250, }}>
      <List >
        {!isAuthenticated ? (
          <>
            <ListItem button={true} onClick={() => handleNavigation('/about')}>
              <IconButton edge="start" color="inherit">
                <InfoIcon />
              </IconButton>
              <ListItemText primary="About" />
            </ListItem>
            <ListItem button={true} onClick={() => handleNavigation('/callback')}>
              <IconButton edge="start" color="inherit">
                <AccountCircleIcon />
              </IconButton>
              <ListItemText primary="Sign In" />
            </ListItem>
          </>
        ) : (
          <>
            <ListItem button={true} onClick={() => handleNavigation('/month-recap')}>
              <IconButton edge="start" color="inherit">
                <TrendingUpIcon />
              </IconButton>
              <ListItemText primary="Month Recap" />
            </ListItem>
            <ListItem button={true} onClick={() => handleNavigation('/six-month-recap')}>
              <IconButton edge="start" color="inherit">
                <TrendingUpIcon />
              </IconButton>
              <ListItemText primary="6 Month Recap" />
            </ListItem>
            <ListItem button={true} onClick={() => handleNavigation('/year-recap')}>
              <IconButton edge="start" color="inherit">
                <TrendingUpIcon />
              </IconButton>
              <ListItemText primary="Year Recap" />
            </ListItem>
            <ListItem button={true} onClick={() => handleNavigation('/lifetime')}>
              <IconButton edge="start" color="inherit">
                <TrendingUpIcon />
              </IconButton>
              <ListItemText primary="Lifetime" />
            </ListItem>
            <ListItem button={true} onClick={() => handleNavigation('/profile')}>
              <IconButton edge="start" color="inherit">
                <AccountCircleIcon />
              </IconButton>
              <ListItemText primary="Your Profile" />
            </ListItem>
            <ListItem button={true} onClick={handleLogout}>
              <IconButton edge="start" color="inherit">
                <ExitToAppIcon />
              </IconButton>
              <ListItemText primary="Log Out" />
            </ListItem>
            <ListItem button={true} onClick={() => handleNavigation('/about')}>
              <IconButton edge="start" color="inherit">
                <InfoIcon />
              </IconButton>
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
        <Drawer
          open={drawerOpen}
          onClose={toggleDrawer(false)}
          sx={{
            backgroundColor: '#0A0C2B', // Aquí aplicas el color deseado
            '& .MuiDrawer-paper': {
              backgroundColor: '#0A0C2B', // Para asegurarte de que el color se aplique al contenido del Drawer
            },
          }}
        >
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
                <InfoIcon sx={{ marginRight: 1 }} />
                About
              </Button>
              <Button color="inherit" onClick={() => handleNavigation('/callback')}>
                <AccountCircleIcon sx={{ marginRight: 1 }} />
                Sign In
              </Button>
            </>
          ) : (
            <>
              <Button color="inherit" onClick={() => handleNavigation('/month-recap')}>
                <TrendingUpIcon sx={{ marginRight: 1 }} />
                Month Recap
              </Button>
              <Button color="inherit" onClick={() => handleNavigation('/six-month-recap')}>
                <TrendingUpIcon sx={{ marginRight: 1 }} />
                6 Month Recap
              </Button>
              <Button color="inherit" onClick={() => handleNavigation('/year-recap')}>
                <TrendingUpIcon sx={{ marginRight: 1 }} />
                Year Recap
              </Button>
              <Button color="inherit" onClick={() => handleNavigation('/lifetime')}>
                <TrendingUpIcon sx={{ marginRight: 1 }} />
                Lifetime
              </Button>
              <Button color="inherit" onClick={() => handleNavigation('/about')}>
                <InfoIcon sx={{ marginRight: 1 }} />
                About
              </Button>
              <Tooltip title={profileData?.display_name || 'Profile'}>
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
