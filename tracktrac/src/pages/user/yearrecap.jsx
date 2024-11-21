import React, { useState, useEffect } from 'react';
import { Grid, Container, Typography, Box, Card } from '@mui/material';
import { motion } from 'framer-motion';
import { 
  Album,
  MusicNote,
  Person,
} from '@mui/icons-material';
import Top5Tracks from '../../components/top5tracks';
import Top5Artists from '../../components/top5artists';
import Top5Albums from '../../components/top5albums';
import { useTopTracks } from '../../hooks/useTopTracks';
import { useTopArtists } from '../../hooks/useTopArtists';
import { useTopAlbums } from '../../hooks/useTopAlbums';
import { useProfile } from '../../hooks/useProfile';
import Loading from '../../components/loading';

const YearRecap = () => {
  const { topTracks, setLimit: setTracksLimit } = useTopTracks('long_term');
  const { topArtists, setLimit: setArtistsLimit } = useTopArtists('long_term');
  const { topAlbums, setLimit: setAlbumsLimit } = useTopAlbums('long_term');
  const { profileData, loading } = useProfile();
  
  const [expandedSection, setExpandedSection] = useState(null);
  // eslint-disable-next-line
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(true);
  }, []);

  if (loading) return <Loading message="Loading your yearly recap..." />;

  const handleExpand = (section) => {
    if (expandedSection === section) {
      setExpandedSection(null);
      setTracksLimit(5);
      setArtistsLimit(5);
      setAlbumsLimit(5);
    } else {
      setExpandedSection(section);
      switch(section) {
        case 'tracks':
          setTracksLimit(10);
          break;
        case 'artists':
          setArtistsLimit(10);
          break;
        case 'albums':
          setAlbumsLimit(10);
          break;
        default:
          break;
      }
    }
  };

  const sections = [
    { 
      id: 'tracks', 
      title: 'Top Tracks', 
      color: 'rgba(220, 77, 86, 0.95)', 
      component: Top5Tracks, 
      data: topTracks,
      icon: MusicNote,
      description: 'Your most played tracks this year',
      gradient: 'linear-gradient(145deg, rgba(220, 77, 86, 0.95), rgba(220, 77, 86, 0.8))'
    },
    { 
      id: 'artists', 
      title: 'Top Artists', 
      color: 'rgba(41, 185, 103, 0.95)', 
      component: Top5Artists, 
      data: topArtists,
      icon: Person,
      description: "Artists you've listened to the most",
      gradient: 'linear-gradient(145deg, rgba(41, 185, 103, 0.95), rgba(41, 185, 103, 0.8))'
    },
    { 
      id: 'albums', 
      title: 'Top Albums', 
      color: 'rgba(94, 94, 205, 0.95)', 
      component: Top5Albums, 
      data: topAlbums,
      icon: Album,
      description: 'Your favorite albums this year',
      gradient: 'linear-gradient(145deg, rgba(94, 94, 205, 0.95), rgba(94, 94, 205, 0.8))'
    }
  ];

  return (
    <Container maxWidth="xl" sx={styles.container}>
      <Box sx={styles.header}>
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <Typography sx={styles.title} variant="h3" gutterBottom>
            Your Year in Music
          </Typography>
          <Typography sx={styles.subtitle} variant="h6">
            Hey {profileData?.display_name}! Here's what you've been loving this year.
          </Typography>
        </motion.div>
      </Box>

      <Grid container spacing={4}>
        {sections.map((section, index) => (
          <Grid 
            item 
            key={section.id} 
            xs={12} 
            md={expandedSection ? (expandedSection === section.id ? 12 : 0) : 4}
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                delay: index * 0.2,
                duration: 0.5,
                ease: "easeOut"
              }}
              whileHover={{ 
                scale: expandedSection ? 1 : 1.02,
                transition: { duration: 0.2 }
              }}
            >
              <Card 
                sx={{
                  ...styles.sectionCard,
                  background: section.gradient,
                  display: expandedSection && expandedSection !== section.id ? 'none' : 'block',
                  transform: expandedSection === section.id ? 'scale(1)' : 'scale(1)',
                }}
                onClick={() => handleExpand(section.id)}
              >
                <Box sx={styles.sectionHeader}>
                  <Box sx={styles.iconWrapper}>
                    <section.icon sx={styles.sectionIcon} />
                  </Box>
                  <Box>
                    <Typography sx={styles.sectionTitle}>
                      {section.title}
                    </Typography>
                    <Typography sx={styles.sectionDescription}>
                      {section.description}
                    </Typography>
                  </Box>
                </Box>
                <Box sx={styles.contentWrapper}>
                  <section.component 
                    {...{ [section.id]: section.data }}
                    isExpanded={expandedSection === section.id}
                  />
                </Box>
              </Card>
            </motion.div>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

const styles = {
  container: {
    pt: 6,
    pb: 8,
    minHeight: '100vh',
    position: 'relative',
  },
  header: {
    textAlign: 'center',
    marginBottom: 8,
    padding: { xs: 2, md: 4 },
  },
  title: {
    fontWeight: 800,
    fontSize: { xs: '2rem', md: '2.5rem' },
    color: 'white',
    marginBottom: 2,
    textShadow: '0 2px 4px rgba(0,0,0,0.2)',
  },
  subtitle: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: { xs: '1rem', md: '1.1rem' },
    fontWeight: 400,
  },
  sectionCard: {
    p: 4,
    borderRadius: 4,
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    cursor: 'pointer',
    height: '100%',
    backdropFilter: 'blur(10px)',
    border: '1px solid rgba(255,255,255,0.1)',
    boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
    '&:hover': {
      boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
      border: '1px solid rgba(255,255,255,0.2)',
    },
  },
  sectionHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: 3,
    marginBottom: 4,
  },
  iconWrapper: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: '12px',
    padding: 1.5,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  sectionIcon: {
    fontSize: 32,
    color: 'white',
  },
  sectionTitle: {
    fontWeight: 700,
    fontSize: { xs: '1.3rem', md: '1.5rem' },
    color: 'white',
    textAlign: 'left',
    textShadow: '0 2px 4px rgba(0,0,0,0.1)',
  },
  sectionDescription: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: '0.9rem',
    textAlign: 'left',
    mt: 0.5,
  },
  contentWrapper: {
    mt: 2,
    transition: 'all 0.3s ease',
  }
};

export default YearRecap;
