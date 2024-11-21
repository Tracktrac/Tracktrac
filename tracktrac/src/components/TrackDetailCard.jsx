import React from 'react';
import { Modal, Box, Typography, IconButton, Chip } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import AlbumIcon from '@mui/icons-material/Album';
import { format } from 'date-fns';

const TrackDetailCard = ({ track, open, onClose }) => {
  if (!track) return null;

  const handleClose = (e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    onClose();
  };

  const formatDuration = (ms) => {
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

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

  return (
    <Modal
      open={open}
      onClose={handleClose}
      onClick={e => e.stopPropagation()}
    >
      <Box sx={style} onClick={e => e.stopPropagation()}>
        {/* Header Section with Background */}
        <Box sx={{ 
          position: 'relative', 
          height: '280px',
          overflow: 'hidden',
          bgcolor: 'background.paper',
        }}>
          {/* Background Image with Gradient */}
          <Box
            sx={{
              position: 'absolute',
              width: '100%',
              height: '100%',
              backgroundImage: `url(${track.album?.images?.[0]?.url})`,
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

          {/* Album Cover */}
          <Box
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: 180,
              height: 180,
              borderRadius: '4px',
              overflow: 'hidden',
              boxShadow: 3,
              transition: 'transform 0.3s ease',
              '&:hover': {
                transform: 'translate(-50%, -50%) scale(1.05)',
              },
            }}
          >
            <img
              src={track.album?.images?.[0]?.url}
              alt={track.album?.name}
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
          {/* Track Title */}
          <Typography 
            variant="h4" 
            component="h2" 
            align="center"
            sx={{ mb: 1 }}
          >
            {track.name}
          </Typography>

          {/* Artists */}
          <Typography 
            variant="subtitle1" 
            color="text.secondary"
            align="center"
            sx={{ mb: 4 }}
          >
            by {track.artists?.map(artist => artist.name).join(', ')}
          </Typography>

          {/* Track Stats */}
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
                {formatDuration(track.duration_ms)}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Duration
              </Typography>
            </Box>

            <Box sx={{ textAlign: 'center', p: 2, bgcolor: 'action.hover', borderRadius: 1 }}>
              <Typography variant="h6">
                {track.popularity || 0}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Popularity
              </Typography>
            </Box>

            <Box sx={{ textAlign: 'center', p: 2, bgcolor: 'action.hover', borderRadius: 1 }}>
              <Typography variant="h6">
                {track.track_number}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Track Number
              </Typography>
            </Box>
          </Box>

          {/* Album Info */}
          <Box sx={{ mt: 4, p: 3, bgcolor: 'action.hover', borderRadius: 2 }}>
            <Typography variant="h6" sx={{ mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
              <AlbumIcon /> Album Information
            </Typography>
            
            <Typography variant="body1" sx={{ mb: 1 }}>
              {track.album?.name}
            </Typography>
            
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 2 }}>
              <Chip 
                label={`Released: ${format(new Date(track.album?.release_date), 'MMM d, yyyy')}`}
                size="small"
                variant="outlined"
              />
              <Chip 
                label={`Type: ${track.album?.album_type}`}
                size="small"
                variant="outlined"
              />
              <Chip 
                label={`Total Tracks: ${track.album?.total_tracks}`}
                size="small"
                variant="outlined"
              />
              {track.explicit && (
                <Chip 
                  label="Explicit"
                  size="small"
                  color="error"
                  variant="outlined"
                />
              )}
            </Box>
          </Box>

          {/* Preview and External Links */}
          <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center', gap: 2 }}>
            {track.preview_url && (
              <Box
                component="audio"
                controls
                src={track.preview_url}
                sx={{ 
                  width: '100%',
                  maxWidth: '400px',
                  '&::-webkit-media-controls-panel': {
                    bgcolor: 'action.hover',
                  },
                }}
              />
            )}
          </Box>

          {/* Spotify Link */}
          {track.external_urls?.spotify && (
            <Box sx={{ mt: 4, textAlign: 'center' }}>
              <Box
                component="a"
                href={track.external_urls.spotify}
                target="_blank"
                rel="noopener noreferrer"
                sx={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 1,
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
                <PlayArrowIcon /> Play on Spotify
              </Box>
            </Box>
          )}
        </Box>
      </Box>
    </Modal>
  );
};

export default TrackDetailCard