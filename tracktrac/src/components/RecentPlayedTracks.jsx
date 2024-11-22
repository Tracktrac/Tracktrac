import React, { useState, useEffect } from 'react';
import { Box, ListItem, ListItemText, ListItemAvatar } from '@mui/material';
import { FixedSizeList } from 'react-window';
import { Play } from 'lucide-react';
import Loading from '../components/loading';
import { playTrack } from '../services/spotifyApi';

const RecentPlayedTracks = ({ tracks = [] }) => {
  const [listHeight, setListHeight] = useState(400);
  
  useEffect(() => {
    const updateHeight = () => {
      const headerHeight = 150;
      const footerHeight = 150;
      const availableHeight = window.innerHeight - headerHeight - footerHeight;
      setListHeight(availableHeight);
    };

    updateHeight();
    window.addEventListener('resize', updateHeight);
    return () => window.removeEventListener('resize', updateHeight);
  }, []);

  if (!tracks.length) return <Loading message="Loading recently played tracks..." />;

  const handleTrackClick = (trackId) => {
    playTrack(trackId);
  };

  const Row = ({ index, style }) => {
    const track = tracks[index].track;

    return (
      <ListItem 
        style={style} 
        key={track.id} 
        onClick={() => handleTrackClick(track.id)}
        sx={{
          cursor: 'pointer',
          paddingY: 1,
          paddingX: 2,
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', flex: 1 }}>
          <ListItemAvatar>
            <img
              src={track.album.images[0]?.url}
              alt={track.album.name}
              style={{ width: 50, height: 50, borderRadius: '3px', marginRight: '15px' }}
            />
          </ListItemAvatar>
          <ListItemText
            primary={track.name}
            secondary={`${track.artists.map((artist) => artist.name).join(', ')} • ${track.album.name}`}
            primaryTypographyProps={{ fontWeight: 'bold', color: '#ffffff' }}
            secondaryTypographyProps={{ color: 'rgba(255, 255, 255, 0.7)' }}
          />
        </Box>
        <Play 
          className="play-icon" 
          size={24}
          style={{ 
            opacity: 0,
            visibility: 'hidden',
            color: '#1DB954',
            transition: 'all 0.2s ease',
            marginLeft: '8px'
          }}
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