import React from 'react';
import { Grid, Container, Typography, Box } from '@mui/material';
import Top5Tracks from '../../components/top5tracks'; 
import Top5Artists from '../../components/top5artists'; 
import Top5Albums from '../../components/top5albums';
import { useTopTracks } from '../../hooks/useTopTracks';
import { useTopArtists } from '../../hooks/useTopArtists';
import { useTopAlbums } from '../../hooks/useTopAlbums';

const YearRecap = () => {
  const { topTracks } = useTopTracks('long_term');
  const { topArtists } = useTopArtists('long_term');
  const { topAlbums } = useTopAlbums('long_term');

  return (
    <Container maxWidth="xl" sx={{ paddingTop: 4 }}>
      <Typography sx={styles.title} variant="h3" gutterBottom>
        Year Recap
      </Typography>
      <Grid container spacing={4}>
        <Grid item xs={12} md={4}>
          <Box bgcolor="#DC4D56" p={3} borderRadius={6} textAlign="center">
            <Typography sx={styles.top} variant="h5" gutterBottom>
              Your Top Tracks
            </Typography>
            <Top5Tracks tracks={topTracks} />
          </Box>
        </Grid>
        <Grid item xs={12} md={4}>
          <Box bgcolor="#29B967" p={3} borderRadius={6} textAlign="center">
            <Typography sx={styles.top} variant="h5" gutterBottom>
              Your Top Artists
            </Typography>
            <Top5Artists artists={topArtists} />
          </Box>
        </Grid>
        <Grid item xs={12} md={4}>
          <Box bgcolor="rgb(94, 94, 205)" p={3} borderRadius={6} textAlign="center">
            <Typography sx={styles.top} variant="h5" gutterBottom>
              Your Top Albums
            </Typography>
            <Top5Albums albums={topAlbums} />
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};
const styles = {
  title: {
    textAlign: 'center',
    marginBottom: 4,
    fontWeight: 'bold',
    fontSize: '2rem',
  },
  top: {
    textAlign: 'center',
    marginBottom: 4,
    fontWeight: 'bold',
    fontSize: '1.3rem',
  },
};
export default YearRecap;
