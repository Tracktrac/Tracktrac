import React from 'react';
import { Box, Typography, Link, Container, Grid } from '@mui/material';
import CDImage from './../assets/logo.png'; 

const AboutUs = () => {
  return (
    <Box
      sx={{
        backgroundColor: '#0A0C2B',
        color: 'white',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 4,
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4} alignItems="center">
          <Grid item xs={12} md={6}>
            <Typography variant="h3" gutterBottom sx={{ fontWeight: 'bold' }}>
              About Us
            </Typography>
            <Typography variant="body1" paragraph>
              Our purpose is to give music lovers the ability to explore and interact with their listening habits like never before. We believe that music is personal, and with TrackTrac, you can access real-time statistics about your favorite songs, artists, and genres—anytime you want. Unlike year-end summaries, TrackTrac offers continuous insights into your musical journey, helping you stay connected with the music that moves you.
            </Typography>
            <Typography variant="body1" paragraph>
              Your privacy is our priority. We do not store or retain any personal data or music listening history. Your data is accessed securely through your Spotify account and remains entirely in your control.
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box
              component="img"
              src={CDImage}
              alt="CD Image"
              sx={{
                width: '100%',
                maxWidth: 400,
                opacity: 0.8,
              }}
            />
          </Grid>
        </Grid>

        <Grid container justifyContent="space-between" sx={{ marginTop: 4 }}>
          <Grid item>
            <Typography variant="body2">
              Have questions or feedback? We’d love to hear from you! Contact us at{' '}
              <Link href="mailto:support@tracktrac.com" color="inherit" underline="hover">
                support@tracktrac.com
              </Link>
            </Typography>
          </Grid>
          <Grid item>
            <Link href="#" color="inherit" underline="hover">
              Terms and Services
            </Link>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default AboutUs;
