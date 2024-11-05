import React from 'react';
import { Avatar, Box, Card, CardContent, CardActions, Typography, Button, Link, Grid, Container } from '@mui/material';
import { LibraryMusic } from '@mui/icons-material';
import { useAuth } from '../../context/AuthContext';
import { useProfile } from '../../hooks/useProfile';
import { useRecentPlayedTracks } from '../../hooks/useRecentPlayedTracks';
import Loading from '../../components/loading';
import RecentPlayedTracks from '../../components/RecentPlayedTracks';

const Home = () => {
  const { logout } = useAuth();
  const { profileData, loading, error } = useProfile();
  const { recentTracks, loading: loadingTracks, error: errorTracks } = useRecentPlayedTracks();

  if (loading || loadingTracks) return <Loading message="Loading your profile and recent tracks..." />;
  if (error) return <Typography variant="h6" align="center" color="error">{error}</Typography>;
  if (errorTracks) return <Typography variant="h6" align="center" color="error">{errorTracks}</Typography>;

  return (
    <Container maxWidth="lg" sx={{ paddingTop: 4 }}>
      <Grid container spacing={4}>
        {/* Columna Izquierda - Perfil */}
        <Grid item xs={12} md={6}>
          <Card sx={{ p: 3, borderRadius: 3, textAlign: 'center', backgroundColor: 'rgba(0, 0, 0, 0)' }}>
            <Box display="flex" flexDirection="column" alignItems="center" gap={2}>
              <Avatar
                alt={profileData.display_name}
                src={profileData.images?.[0]?.url}
                sx={{ width: 192, height: 192 }}
              />
              <Typography variant="h4" gutterBottom>
                {profileData.display_name}
              </Typography>
            </Box>
            <CardContent>
              <ul style={{ listStyle: 'none', padding: 0 }}>
                <li>
                  <Typography variant="body1">
                    <strong>Email:</strong> {profileData.email}
                  </Typography>
                </li>
                <li>
                  <Typography variant="body1">
                    <strong>Country:</strong> {profileData.country}
                  </Typography>
                </li>
                <li>
                  <Typography variant="body1">
                    <strong>Followers:</strong> {profileData.followers?.total}
                  </Typography>
                </li>
                <li>
                  <Typography variant="body1">
                    <strong>Product:</strong> {profileData.product}
                  </Typography>
                </li>
                <li>
                  <Typography variant="body1">
                    <strong>Spotify URL:</strong>{' '}
                    <Link
                      href={profileData.external_urls?.spotify}
                      target="_blank"
                      rel="noopener noreferrer"
                      underline="hover"
                      color="primary"
                      sx={{ display: 'inline-block', wordBreak: 'break-all' }}
                    >
                      {profileData.external_urls?.spotify}
                    </Link>
                  </Typography>
                </li>
              </ul>
            </CardContent>
            <CardActions sx={{ justifyContent: 'center', mt: 2 }}>
              <Button
                variant="contained"
                color="error"
                onClick={logout}
                sx={{ borderRadius: 25, paddingX: 4 }}
              >
                Log Out
              </Button>
            </CardActions>
          </Card>
        </Grid>

        {/* Columna Derecha - Pistas Reproducidas Recientemente */}
        <Grid item xs={12} md={6}>
          <Box p={3} borderRadius={2}>
            <Box display="flex" alignItems="center" gap={1} mb={2}>
              <Typography variant="h5" gutterBottom>
                Recently Played Tracks
              </Typography>
              <LibraryMusic />
            </Box>
            <RecentPlayedTracks tracks={recentTracks} />
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Home;
