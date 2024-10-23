import React from 'react';
import { Grid, Container, Typography, Box } from '@mui/material';
import Top5Tracks from '../../components/top5tracks'; 
import Top5Artists from '../../components/top5artists'; 
import Top5Albums from '../../components/top5albums';
import { useTopTracks } from '../../hooks/useTopTracks';
import { useTopArtists } from '../../hooks/useTopArtists';
import { useTopAlbums } from '../../hooks/useTopAlbums';

const MonthRecap = () => {
  const { topTracks } = useTopTracks('short_term');
  const { topArtists } = useTopArtists('short_term');
  const { topAlbums } = useTopAlbums('short_term');

  return (
    <Container maxWidth="lg" sx={{ paddingTop: 4 }}>
      <Typography variant="h3" gutterBottom>
        Month Recap
      </Typography>
      <Grid container spacing={4}>
        <Grid item xs={12} md={4}>
          <Box bgcolor="rgb(205, 94, 94)" p={3} borderRadius={2} textAlign="center">
            <Typography variant="h5" gutterBottom>
              Your Top Tracks
            </Typography>
            <Top5Tracks tracks={topTracks} />
          </Box>
        </Grid>
        <Grid item xs={12} md={4}>
          <Box bgcolor="rgb(94, 205, 128)" p={3} borderRadius={2} textAlign="center">
            <Typography variant="h5" gutterBottom>
              Your Top Artists
            </Typography>
            <Top5Artists artists={topArtists} />
          </Box>
        </Grid>
        <Grid item xs={12} md={4}>
          <Box bgcolor="rgb(94, 94, 205)" p={3} borderRadius={2} textAlign="center">
            <Typography variant="h5" gutterBottom>
              Your Top Albums
            </Typography>
            <Top5Albums albums={topAlbums} />
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default MonthRecap;
