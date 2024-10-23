import React, { useState } from 'react';
import { AppBar, Toolbar, IconButton, Typography, Box, Tooltip, Button, Drawer, List, ListItem, ListItemText, Avatar } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useProfile } from '../hooks/useProfile';

const Navbar = () => {
  const { isAuthenticated } = useAuth();
  const { profileData, loading, error } = useProfile();
  const navigate = useNavigate();
  const location = useLocation();
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = (open) => () => {
    setDrawerOpen(open);
  };

  if (loading) return <div></div>;
  if (error) return <div style={{ color: 'red' }}>{error}</div>;

  const drawerContent = (
    <Box onClick={toggleDrawer(false)} sx={{ width: 250 }}>
      <List>
        <ListItem button onClick={() => navigate('/about')}>
          <ListItemText primary="About" />
        </ListItem>
        {isAuthenticated && (
          <>
            <ListItem button onClick={() => navigate('/month-recap')}>
              <ListItemText primary="Month Recap" />
            </ListItem>
            <ListItem button onClick={() => navigate('/year-recap')}>
              <ListItemText primary="Year Recap" />
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
          onClick={() => navigate('/')}
        >
          TrackTrac
        </Typography>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Button
            color="inherit"
            onClick={() => navigate('/about')}
          >
            About
          </Button>
          {!isAuthenticated && location.pathname === '/about' && (
            <Button
              color="inherit"
              onClick={() => navigate('/callback')} // Navega a la página de inicio de sesión
            >
              Sign In
            </Button>
          )}
          {isAuthenticated && (
            <>
              <Button
                color="inherit"
                onClick={() => navigate('/month-recap')}
                sx={{ display: { xs: 'none', md: 'inline-flex' } }}
              >
                Month Recap
              </Button>
              <Button
                color="inherit"
                onClick={() => navigate('/year-recap')}
                sx={{ display: { xs: 'none', md: 'inline-flex' } }}
              >
                Year Recap
              </Button>
              <Tooltip title={profileData?.display_name || "Profile"}>
                <IconButton onClick={() => navigate('/profile')} sx={{ p: 0 }}>
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
