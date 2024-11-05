import React, { useState, useEffect } from 'react';
import { Box, ListItem, ListItemText, Typography } from '@mui/material';
import { FixedSizeList } from 'react-window';
import Loading from '../components/loading';

const TopTracks = ({ tracks = [] }) => {
  const [listHeight, setListHeight] = useState(400); 

  useEffect(() => {
    // Función para calcular la altura disponible
    const updateHeight = () => {
      const headerHeight = 64; 
      const footerHeight = 64; 
      const availableHeight = window.innerHeight - headerHeight - footerHeight;
      setListHeight(availableHeight);
    };

    updateHeight();
    window.addEventListener('resize', updateHeight);

    return () => window.removeEventListener('resize', updateHeight);
  }, []);

  if (!tracks.length) return <Loading message="Loading tracks..." />;

  const Row = ({ index, style }) => {
    const track = tracks[index];

    return (
      <ListItem style={style} key={track.id} disablePadding sx={{ display: 'flex', alignItems: 'center' }}>
        {/* Índice */}
        <Typography variant="body1" sx={{ fontWeight: 'bold', color: '#ffffff', width: 30, textAlign: 'center' }}>
          #{index + 1}
        </Typography>

        {/* Imagen del álbum */}
        <Box
          component="img"
          src={track.album.images[0]?.url}
          alt={track.name}
          sx={{ width: 60, height: 60, borderRadius: 1, marginRight: 2 }}
        />

        {/* Información de la canción */}
        <ListItemText
          primary={track.name}
          secondary={`by ${track.artists.map((artist) => artist.name).join(', ')}`}
          primaryTypographyProps={{ fontWeight: 'bold', color: '#ffffff' }}
          secondaryTypographyProps={{ color: 'rgba(255, 255, 255, 0.7)' }}
        />
      </ListItem>
    );
  };

  return (
    <Box sx={{ width: '100%', height: listHeight }}>
      <FixedSizeList
        height={listHeight}
        width="100%"
        itemSize={110}
        itemCount={tracks.length}
        overscanCount={5}
      >
        {Row}
      </FixedSizeList>
    </Box>
  );
};

export default TopTracks;
