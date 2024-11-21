import React from 'react';
import { Modal, Box, Typography, IconButton, List, ListItem, ListItemText } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { format } from 'date-fns';

const AlbumDetailCard = ({ album, open, onClose }) => {
  if (!album) return null;

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
          overflow: 'hidden' 
        }}>
          {/* Background Image with Gradient */}
          <Box
            sx={{
              position: 'absolute',
              width: '100%',
              height: '100%',
              backgroundImage: `url(${album.images?.[0]?.url})`,
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
              borderRadius: '8px',
              overflow: 'hidden',
              boxShadow: 3,
            }}
          >
            <img
              src={album.images?.[0]?.url}
              alt={album.name}
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
            sx={{ mb: 1 }}
          >
            {album.name}
          </Typography>

          <Typography 
            variant="subtitle1" 
            color="text.secondary"
            align="center"
            sx={{ mb: 4 }}
          >
            by {album.artists?.map(artist => artist.name).join(', ')}
          </Typography>

          {/* Album Stats */}
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
                {format(new Date(album.release_date), 'yyyy')}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Release Year
              </Typography>
            </Box>

            <Box sx={{ textAlign: 'center', p: 2, bgcolor: 'action.hover', borderRadius: 1 }}>
              <Typography variant="h6">
                {album.total_tracks}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Tracks
              </Typography>
            </Box>

            <Box sx={{ textAlign: 'center', p: 2, bgcolor: 'action.hover', borderRadius: 1 }}>
              <Typography variant="h6">
                {album.popularity || 0}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Popularity
              </Typography>
            </Box>
          </Box>

          {/* Tracks Section */}
          {album.tracks?.items?.length > 0 && (
            <Box sx={{ mt: 4 }}>
              <Typography variant="h6" sx={{ mb: 2 }}>
                Tracks
              </Typography>
              <List sx={{ bgcolor: 'background.paper', borderRadius: 1 }}>
                {album.tracks.items.map((track, index) => (
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
                      {(index + 1).toString().padStart(2, '0')}
                    </Typography>
                    <ListItemText
                      primary={track.name}
                      secondary={track.artists.map(a => a.name).join(', ')}
                      sx={{ flex: 1 }}
                    />
                    <Typography variant="body2" color="text.secondary">
                      {formatDuration(track.duration_ms)}
                    </Typography>
                    <IconButton
                      size="small"
                      sx={{ color: 'primary.main' }}
                    >
                    </IconButton>
                  </ListItem>
                ))}
              </List>
            </Box>
          )}

          {/* Copyright Information */}
          {album.copyrights && album.copyrights.length > 0 && (
            <Typography 
              variant="caption" 
              color="text.secondary"
              sx={{ 
                display: 'block',
                textAlign: 'center',
                mt: 4,
                px: 2
              }}
            >
              {album.copyrights[0].text}
            </Typography>
          )}

          {/* Spotify Link */}
          {album.external_urls?.spotify && (
            <Box sx={{ mt: 4, textAlign: 'center' }}>
              <Box
                component="a"
                href={album.external_urls.spotify}
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

export default AlbumDetailCard;