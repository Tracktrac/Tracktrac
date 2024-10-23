import React from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';

const Loading = ({ message = 'Loading...' }) => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      sx={{ minHeight: '100vh', textAlign: 'center' }}
    >
      <CircularProgress size={60} thickness={4} />
      <Typography variant="h6" sx={{ marginTop: 2 }}>
        {message}
      </Typography>
    </Box>
  );
};

export default Loading;
