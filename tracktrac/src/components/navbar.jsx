import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import { useNavigate } from 'react-router-dom';
import { useProfile } from '../hooks/useProfile';
import Button from '@mui/material/Button';

const Navbar = () => {
  const { profileData, loading, error } = useProfile();
  const navigate = useNavigate();

  const handleAvatarClick = () => {
    navigate('/home');
  };

  if (loading) return <div></div>;
  if (error) return <div style={{ color: 'red' }}>{error}</div>;

  return (
    <AppBar position="static" sx={{ backgroundColor: '#0A0C2B' }}>
      <Toolbar disableGutters>
        <Typography
          variant="h6"
          noWrap
          sx={{
            mr: 2,
            flexGrow: 1,
            paddingLeft: 5,
            fontFamily: 'monospace',
            fontWeight: 700,
            letterSpacing: '.3rem',
            color: 'inherit',
          }}
        >
          TrackTrac
        </Typography>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Button color="inherit" onClick={() => navigate('/month-recap')}>
            Month Recap
          </Button>
          <Button color="inherit" onClick={() => navigate('/year-recap')}>
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
