import React from 'react';
import { Grid, Container, Typography, Box } from '@mui/material';
import TopTracks from '../../components/toptracks'; 
import { useTopTracks } from '../../hooks/useTopTracks';

const TopSongsMonth = () => {
    const { topTracks } = useTopTracks('short_term', 50);

  
    return (
      <Container maxWidth="lg" sx={{ paddingTop: 4 }}>
        <Typography variant="h3" gutterBottom>
          This Month
        </Typography>
        <Typography variant="h6" gutterBottom>
                Your Top Tracks
              </Typography>
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Box display="flex" alignItems="center" gap={2} mb={2}>
              <TopTracks tracks={topTracks} />
            </Box>
          </Grid>
        </Grid>
      </Container>
    );
  };
  
  export default TopSongsMonth;
  