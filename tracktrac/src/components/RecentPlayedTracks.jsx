import React, { useState, useEffect } from 'react';
import { Box, ListItem, ListItemText, ListItemAvatar} from '@mui/material';
import { FixedSizeList } from 'react-window';
import Loading from '../components/loading';

const RecentPlayedTracks = ({ tracks = [] }) => {
  const [listHeight, setListHeight] = useState(400); // Altura inicial de la lista

  useEffect(() => {
    // Función para calcular la altura disponible
    const updateHeight = () => {
      const headerHeight = 64; // Ajusta esto según la altura de tu header o cualquier otro elemento superior
      const footerHeight = 64; // Ajusta esto si tienes algún footer o margen adicional
      const availableHeight = window.innerHeight - headerHeight - footerHeight;
      setListHeight(availableHeight);
    };

    // Actualizar altura cuando cambia el tamaño de la ventana
    updateHeight();
    window.addEventListener('resize', updateHeight);

    // Limpiar el evento cuando el componente se desmonta
    return () => window.removeEventListener('resize', updateHeight);
  }, []);

  if (!tracks.length) return <Loading message="Loading recently played tracks..." />;

  const Row = ({ index, style }) => {
    const track = tracks[index].track;

    return (
      <ListItem style={style} key={track.id} disablePadding>
        <ListItemAvatar>
            <img
            src={track.album.images[0]?.url}
            alt={track.album.name}
            style={{ width: 60, height: 60, borderRadius: '3px', marginRight: '15px' }}
          />
        </ListItemAvatar>
        <ListItemText
          primary={track.name}
          secondary={`${track.artists.map((artist) => artist.name).join(', ')} • ${track.album.name}`}
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
        itemSize={70}
        itemCount={tracks.length}
        overscanCount={5}
      >
        {Row}
      </FixedSizeList>
    </Box>
  );
};

export default RecentPlayedTracks;



