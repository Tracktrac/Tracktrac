import React, { useState } from 'react';
import { AppBar, Toolbar, IconButton, Typography, Box, Tooltip, Button, Drawer, List, ListItem, ListItemText, Avatar } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useProfile } from '../hooks/useProfile';

const Navbar = () => {
  const { isAuthenticated, logout } = useAuth(); // Se agrega 'logout' para manejar la salida
  const { profileData } = useProfile();
  const navigate = useNavigate();
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = (open) => () => {
    setDrawerOpen(open);
  };

  const handleNavigation = (path) => {
    navigate(path);
    setDrawerOpen(false);
  };

  const handleLogout = () => {
    logout(); // Llamada a la función logout para cerrar la sesión
    navigate('/'); // Redirige al usuario a la página principal
  };

  const drawerContent = (
    <Box onClick={toggleDrawer(false)} sx={{ width: 250 }}>
      <List>
        {!isAuthenticated ? (
          <>
            <ListItem button onClick={() => handleNavigation('/about')}>
              <ListItemText primary="About" />
            </ListItem>
            <ListItem button onClick={() => handleNavigation('/callback')}>
              <ListItemText primary="Sign In" />
            </ListItem>
          </>
        ) : (
          <>
            <ListItem button onClick={() => handleNavigation('/month-recap')}>
              <ListItemText primary="Month Stats" />
            </ListItem>
            <ListItem button onClick={() => handleNavigation('/year-recap')}>
              <ListItemText primary="Year Stats" />
            </ListItem>
            <ListItem button onClick={() => handleNavigation('/profile')}>
              <ListItemText primary="Your Profile" />
            </ListItem>
            <ListItem button onClick={handleLogout}>
              <ListItemText primary="Log Out" />
            </ListItem>
            <ListItem button onClick={() => handleNavigation('/about')}>
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

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
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
                Month Stats
              </Button>
              <Button color="inherit" onClick={() => handleNavigation('/year-recap')}>
                Year Stats
              </Button>
              
              <Button color="inherit" onClick={handleLogout}>
                Log Out
              </Button>
              <Button color="inherit" onClick={() => handleNavigation('/about')}>
                About
              </Button>
              <Tooltip title={profileData?.display_name || "Profile"}>
                <IconButton onClick={() => handleNavigation('/profile')} sx={{ p: 0 }}>
                  <Avatar
                    alt={profileData?.display_name}
                    src={profileData?.images?.[0]?.url}
                  />
                </IconButton>
              </Tooltip>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
