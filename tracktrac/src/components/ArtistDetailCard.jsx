import React, { useEffect, useState } from 'react';
import { Modal, Box, Typography, IconButton, List, ListItem, ListItemText, Avatar } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { fetchArtistTopTracks } from '../services/spotifyApi';

const ArtistDetailCard = ({ artist, open, onClose }) => {
  const [topTracks, setTopTracks] = useState([]);
  // eslint-disable-next-line
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchTopTracks = async () => {
      if (artist && open) {
        try {
          setLoading(true);
          const data = await fetchArtistTopTracks(artist.id);
          setTopTracks(data.tracks);
        } catch (error) {
          console.error('Error fetching top tracks:', error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchTopTracks();
  }, [artist, open]);

  if (!artist) return null;

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: { xs: '90%', sm: '600px' },
    maxHeight: '90vh',
    bgcolor: 'background.paper',
    borderRadius: 2,
    boxShadow: 24,
    overflow: 'auto',
    p: 0,
  };

  const formatDuration = (ms) => {
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const handleClose = (e) => {
    // Detener la propagación del evento
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    onClose();
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="artist-modal-title"
      aria-describedby="artist-modal-description"
      onClick={e => e.stopPropagation()}
    >
      <Box sx={style} >
        {/* Header Section with Background */}
        <Box sx={{ 
          position: 'relative', 
          height: '280px',
          overflow: 'hidden' 
        }}>
          {/* Background Image with Gradient */}
          <Box
            sx={{
              position: 'absolute',
              width: '100%',
              height: '100%',
              backgroundImage: `url(${artist.images?.[0]?.url})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              filter: 'blur(8px)',
              '&::before': {
                content: '""',
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: 'linear-gradient(180deg, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.8) 100%)',
              },
            }}
            onClick={e => e.stopPropagation()}
          />
          
          {/* Close Button */}
          <IconButton
            onClick={handleClose}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: 'white',
              bgcolor: 'rgba(0,0,0,0.2)',
              '&:hover': {
                bgcolor: 'rgba(0,0,0,0.4)',
              },
              zIndex: 1,
            }}
          >
            <CloseIcon />
          </IconButton>

          {/* Artist Image */}
          <Box
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: 180,
              height: 180,
              borderRadius: '50%',
              border: 4,
              borderColor: 'background.paper',
              overflow: 'hidden',
              boxShadow: 3,
            }}
          >
            <img
              src={artist.images?.[0]?.url}
              alt={artist.name}
              style={{ 
                width: '100%', 
                height: '100%', 
                objectFit: 'cover'
              }}
            />
          </Box>
        </Box>

        {/* Content Section */}
        <Box sx={{ pt: 4, pb: 4, px: 4 }}>
          <Typography 
            variant="h4" 
            component="h2" 
            align="center"
            sx={{ mb: 4 }}
          >
            {artist.name}
          </Typography>

          {/* Stats Grid */}
          <Box 
            sx={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: 2,
              mb: 4,
            }}
          >
            <Box sx={{ textAlign: 'center', p: 2, bgcolor: 'action.hover', borderRadius: 1 }}>
              <Typography variant="h6">
                {artist.followers?.total?.toLocaleString() || 0}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Followers
              </Typography>
            </Box>

            <Box sx={{ textAlign: 'center', p: 2, bgcolor: 'action.hover', borderRadius: 1 }}>
              <Typography variant="h6">
                {artist.popularity || 0}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Popularity
              </Typography>
            </Box>

            <Box sx={{ textAlign: 'center', p: 2, bgcolor: 'action.hover', borderRadius: 1 }}>
              <Typography variant="h6">
                {artist.genres?.length || 0}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Genres
              </Typography>
            </Box>
          </Box>

          {/* Top Tracks Section */}
          {topTracks.length > 0 && (
            <Box sx={{ mt: 4 }}>
              <Typography variant="h6" sx={{ mb: 2 }}>
                Popular Tracks
              </Typography>
              <List sx={{ bgcolor: 'background.paper', borderRadius: 1 }}>
                {topTracks.slice(0, 5).map((track, index) => (
                  <ListItem
                    key={track.id}
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 2,
                      '&:hover': {
                        bgcolor: 'action.hover',
                      },
                    }}
                  >
                    <Typography color="text.secondary" sx={{ minWidth: '24px' }}>
                      {index + 1}
                    </Typography>
                    <Avatar
                      src={track.album.images[0]?.url}
                      variant="square"
                      sx={{ width: 40, height: 40 }}
                    />
                    <ListItemText
                      primary={track.name}
                      secondary={track.artists.map(a => a.name).join(', ')}
                      sx={{ flex: 1 }}
                    />
                    <Typography variant="body2" color="text.secondary">
                      {formatDuration(track.duration_ms)}
                    </Typography>
                  </ListItem>
                ))}
              </List>
            </Box>
          )}

          {/* Genres */}
          {artist.genres && artist.genres.length > 0 && (
            <Box sx={{ mt: 4 }}>
              <Typography variant="h6" sx={{ mb: 2 }}>
                Genres
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                {artist.genres.map((genre, index) => (
                  <Box
                    key={index}
                    sx={{
                      px: 2,
                      py: 0.5,
                      bgcolor: 'primary.main',
                      color: 'primary.contrastText',
                      borderRadius: 10,
                      fontSize: '0.875rem',
                    }}
                  >
                    {genre}
                  </Box>
                ))}
              </Box>
            </Box>
          )}

          {/* Spotify Link */}
          {artist.external_urls?.spotify && (
            <Box sx={{ mt: 4, textAlign: 'center' }}>
              <Box
                component="a"
                href={artist.external_urls.spotify}
                target="_blank"
                rel="noopener noreferrer"
                sx={{
                  display: 'inline-block',
                  px: 4,
                  py: 1.5,
                  bgcolor: '#1DB954',
                  color: 'white',
                  borderRadius: 10,
                  textDecoration: 'none',
                  '&:hover': {
                    bgcolor: '#1ed760',
                  },
                }}
              >
                Open in Spotify
              </Box>
            </Box>
          )}
        </Box>
      </Box>
    </Modal>
  );
};

export default ArtistDetailCard;