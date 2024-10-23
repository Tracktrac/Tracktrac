import React from 'react';
import { Avatar, Box, Card, CardContent, CardActions, Typography, Button, Link, Grid } from '@mui/material';
import { useAuth } from '../../context/AuthContext';
import { useProfile } from '../../hooks/useProfile';
import Loading from '../../components/loading';

const Account = () => {
  const { logout } = useAuth();
  const { profileData, loading, error } = useProfile();

  if (loading) return <Loading message="Loading your profile..." />;
  if (error) return <Typography variant="h6" align="center" color="error">{error}</Typography>;

  return (
    <Grid container justifyContent="center" alignItems="center" sx={{ minHeight: '100vh', padding: 2 }}>
      <Grid item xs={12} md={6} lg={4}>
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
    </Grid>
  );
};

export default Account;
