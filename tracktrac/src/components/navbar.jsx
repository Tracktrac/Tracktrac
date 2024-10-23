import React, { useState } from 'react';
import { AppBar, Toolbar, IconButton, Typography, Box, Avatar, Tooltip, Button, Drawer, List, ListItem, ListItemText } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useNavigate } from 'react-router-dom';
import { useProfile } from '../hooks/useProfile';

const Navbar = () => {
  const { profileData, loading, error } = useProfile();
  const navigate = useNavigate();
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleAvatarClick = () => {
    navigate('/home');
  };

  if (loading) return <div></div>;
  if (error) return <div style={{ color: 'red' }}>{error}</div>;

  const toggleDrawer = (open) => () => {
    setDrawerOpen(open);
  };

  const drawerContent = (
    <Box onClick={toggleDrawer(false)} sx={{ width: 250 }}>
      <List>
        <ListItem button onClick={() => navigate('/month-recap')}>
          <ListItemText primary="Month Recap" />
        </ListItem>
        <ListItem button onClick={() => navigate('/year-recap')}>
          <ListItemText primary="Year Recap" />
        </ListItem>
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
            fontFamily: 'monospace',
            fontWeight: 700,
            letterSpacing: '.3rem',
            color: 'inherit',
            display: { xs: 'none', md: 'block' },
          }}
        >
          TrackTrac
        </Typography>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
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
          <Tooltip title="Go to account">
            <IconButton onClick={handleAvatarClick} sx={{ p: 0 }}>
              <Avatar
                alt={profileData?.display_name}
                src={profileData?.images?.[0]?.url}
              />
            </IconButton>
          </Tooltip>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
