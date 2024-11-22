import React from 'react';
import { Avatar, Box, Card, CardContent, CardActions, Typography, Button, Link, Grid, Container } from '@mui/material';
import { LibraryMusic } from '@mui/icons-material';
import { useAuth } from '../../context/AuthContext';
import { useProfile } from '../../hooks/useProfile';
import { useRecentPlayedTracks } from '../../hooks/useRecentPlayedTracks';
import Loading from '../../components/loading';
import RecentPlayedTracks from '../../components/RecentPlayedTracks';
import { FaCrown } from 'react-icons/fa';

const Home = () => {
  const { logout } = useAuth();
  const { profileData, loading, error } = useProfile();
  const { recentTracks, loading: loadingTracks, error: errorTracks } = useRecentPlayedTracks();
  console.log(profileData);
  if (loading || loadingTracks) return <Loading message="Loading your profile and recent tracks..." />;
  if (error) return <Typography variant="h6" align="center" color="error">{error}</Typography>;
  if (errorTracks) return <Typography variant="h6" align="center" color="error">{errorTracks}</Typography>;

  return (
    <Container maxWidth="xl" sx={styles.container}>
      <style>{scrollStyles}</style>

      {/* Banner con foto de perfil */}
      <Box sx={styles.banner}>
        <Avatar
          alt={profileData.display_name}
          src={profileData.images?.[0]?.url}
          sx={styles.bannerAvatar}
        />
      </Box>

      {/* Contenido principal */}
      <Grid container spacing={4}>
        {/* Columna Izquierda - Perfil */}
        <Grid item xs={12} md={3}>
          <Box sx={{ position: 'relative', mt: 5 }}>
            {/* Avatar superpuesto */}
            <Avatar
              alt={profileData.display_name}
              src={profileData.images?.[0]?.url}
              sx={styles.profileAvatar}
            />

            {/* Tarjeta de información del usuario */}
            <Card sx={styles.verticalCard}>
              <CardContent>
                <Typography sx={styles.name} gutterBottom align="center">
                  {profileData.display_name}
                </Typography>
                <Typography sx={styles.email} variant="body1" align="center">{profileData.email}</Typography>
                <Typography sx={styles.product} gutterBottom align="center">
                {profileData.product === 'premium' ? (
                  <>
                    <FaCrown style={styles.crownIcon} /> Spotify Premium
                  </>
                ) : (
                  `Spotify ${profileData.product.charAt(0).toUpperCase() + profileData.product.slice(1)}`
                )}
                </Typography>
                <Box sx={{ mt: 2 }}>
                  <Box sx={{ textAlign: 'center', mt: 2 }}>
                    <Typography variant="h3" sx={{ marginTop:4, fontWeight: 'bold', color: 'white', fontSize: '1.2rem', }}>
                      {profileData.followers?.total}
                    </Typography>
                    <Typography variant="body1" sx={{ marginBottom:3, fontSize: 14, color: 'white' }}>
                      Followers
                    </Typography>
                  </Box>
                  <Typography sx={{fontSize: 14}} variant="body1" align="center"><strong>Country:</strong> {profileData.country}</Typography>
                  <Typography sx={{fontSize: 14}} variant="body1" align="center">
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
                </Box>
              </CardContent>
              <CardActions sx={styles.cardActions}>
                <Button
                  variant="contained"
                  color="error"
                  onClick={logout}
                  sx={styles.logoutButton}
                >
                  Log Out
                </Button>
              </CardActions>
            </Card>
          </Box>
        </Grid>


        {/* Columna Derecha - Pistas Reproducidas Recientemente */}
        <Grid item xs={12} md={9}>
        <Card sx={{
          ...styles.recentTracksCard,
          '& .MuiListItem-root': {
            display: 'flex',
            justifyContent: 'space-between',
            gap: 2,
            pr: 3, // Padding derecho para el icono
            '&:hover': {
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              '& .play-icon': {
                opacity: 1,
                visibility: 'visible'
              }
            }
          }
        }}>
          <Box sx={styles.recentTracksHeader}>
            <LibraryMusic sx={styles.libraryMusicIcon} />
            <Typography variant="h5" sx={styles.recentTracksTypography} gutterBottom>
              Recently Played Tracks
            </Typography>
          </Box>
          <RecentPlayedTracks tracks={recentTracks} />
        </Card>
      </Grid>
      </Grid>
    </Container>
  );
};

const styles = {
  container: {
    pt: 4,
  },
  banner: {
    position: 'absolute', // Asegura que el banner esté por debajo del contenido
    top: 0, // Ubica el banner en la parte superior de la página
    left: 0, // Ajuste a la izquierda
    width: '100vw',
    // height: '100vw',
    height: '400px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)', // Fondo oscuro para resaltar la imagen
    zIndex: -1,
    
  },
  bannerAvatar: {
    width: '100%',
    height: '100%',
    borderRadius: 0, // Rectángulo sin bordes redondeados
    objectFit: 'cover',
    // filter: 'blur(8px)', // Efecto de desenfoque
    filter: 'blur(15px)', // Efecto de desenfoque
    overflow: 'hidden', // Asegura que no se desborde contenido del banner
  },
  profileAvatar: {
    width: 150,
    height: 150,
    position: 'absolute',
    top: '-80px', // La mitad del tamaño del avatar para superponer
    left: '50%',
    transform: 'translateX(-50%)',
    border: '6px solid #E14C38', // Borde blanco para destacar
  },
  verticalCard: {
    mt: 30,
    p: 3,
    pt: 9, // Espacio para la superposición del avatar
    borderRadius: 3,
    textAlign: 'center',
    backgroundColor: '#E14C38',
  },
  name: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'white',
  },
  product: {
    fontSize: 14,
    color: 'white',
  },
  email: {
    fontSize: 14,
    color: 'rgb(255,255,255,0.5)',
  },
  cardActions: {
    justifyContent: 'center',
    mt: 2,
  },
  logoutButton: {
    borderRadius: 2,
    paddingX: 4,
    boxShadow: 2,
    backgroundColor: '#fff',
    color: 'red',
    fontWeight: 'bold',
    '&:hover': {
      color: '#fff',
      backgroundColor: '#DC432E',
    },
  },
  card: {
    p: 3,
    paddingLeft: 5,
    borderRadius: 3,
    backgroundColor: 'rgba(0, 0, 0)',
  },
  avatar: {
    width: 210,
    height: 210,
    boxShadow: 3,
  },
  cardContentWhite: {
    color: 'white',
  },
  recentTracksCard: {
    p: 3,
    marginTop: 5,
    marginBottom: 5,
    borderRadius: 3,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    // Nuevo: asegurar que el contenedor tenga position relative para el icono absolute
    position: 'relative',
    overflow: 'hidden',
    // Nuevo: estilos para el hover y el icono
    '& .MuiListItem-root': {
      transition: 'background-color 0.2s ease',
    }
  },
  recentTracksHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: 1,
    mb: 2,
  },
  recentTracksTypography: {
    color: 'white',
    fontWeight: 'bold',
  },
  libraryMusicIcon: {
    color: 'white',
    marginBottom: 1.2,
  },
  crownIcon: {
    color: 'white',     // Color dorado para la corona
    fontSize: '1.2em', // Tamaño del ícono
    paddingTop: 2,
  },
};

const scrollStyles = `
  ::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }
  ::-webkit-scrollbar-thumb {
    background-color: rgba(255, 255, 255, 0.6);
    border-radius: 4px;
  }
  ::-webkit-scrollbar-thumb:hover {
    background-color: rgba(255, 255, 255, 0.9);
  }
  ::-webkit-scrollbar-track {
    background: rgba(0, 0, 0, 0.2);
    border-radius: 4px;
  }
`;

export default Home;
