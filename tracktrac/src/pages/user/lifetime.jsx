// pages/user/lifetime.jsx
import React, { useState, useEffect } from 'react';
import { useDataContext } from '../../context/DataContext';
import {
  Grid,
  Container,
  Typography,
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  List,
  ListItem,
  ListItemText,
} from '@mui/material';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import HeadphonesIcon from '@mui/icons-material/Headphones';
import { FileCopy } from '@mui/icons-material'; 
import { LineChart, Area, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

function UploadHistory() {
  const { uploadedData, uploadedFilesInfo, errorMessage, handleFilesUpload } = useDataContext();
  const [topSongs, setTopSongs] = useState([]);
  const [topArtists, setTopArtists] = useState([]);
  const [totalPlays, setTotalPlays] = useState(0);
  const [totalMinutes, setTotalMinutes] = useState(0);
  const [totalHours, setTotalHours] = useState(0);
  const [totalDays, setTotalDays] = useState(0);
  const [yearlyData, setYearlyData] = useState([]);

  useEffect(() => {
    if (uploadedData.length > 0) {
      calculateTotals(uploadedData);
      processTopSongs(uploadedData);
      processYearlyData(uploadedData);
    }
  }, [uploadedData]);

  const calculateTotals = (data) => {
    let plays = 0;
    let minutes = 0;

    data.forEach((item) => {
      if (item.ms_played) {
        plays += 1;
        minutes += item.ms_played / 60000; // Convert ms to minutes
      }
    });

    const hours = minutes / 60; // Convert minutes to hours
    const days = hours / 24; // Convert hours to days

    setTotalPlays(plays);
    setTotalMinutes(minutes.toFixed(1));
    setTotalHours(hours.toFixed(1));
    setTotalDays(days.toFixed(1));
  };

  const processTopSongs = (data) => {
    const songCounts = {};
    const artistCounts = {};

    data.forEach((item) => {
      const trackName = item.master_metadata_track_name;
      const artistName = item.master_metadata_album_artist_name;

      if (trackName) songCounts[trackName] = (songCounts[trackName] || 0) + 1;
      if (artistName) artistCounts[artistName] = (artistCounts[artistName] || 0) + 1;
    });

    setTopSongs(Object.entries(songCounts).sort((a, b) => b[1] - a[1]).slice(0, 10));
    setTopArtists(Object.entries(artistCounts).sort((a, b) => b[1] - a[1]).slice(0, 10));
  };

  const processYearlyData = (data) => {
    const yearlyCounts = {};

    data.forEach((item) => {
      const endTime = item.ts || item.endTime; // Adjust key based on your JSON format
      const year = new Date(endTime).getFullYear();

      if (year) {
        yearlyCounts[year] = (yearlyCounts[year] || 0) + 1;
      }
    });

    const formattedData = Object.entries(yearlyCounts).map(([year, count]) => ({
      year: parseInt(year, 10),
      count,
    }));

    setYearlyData(formattedData.sort((a, b) => a.year - b.year));
  };

  //POPUP DEL GRAFICO
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;  // Obtener los datos del gráfico
      return (
        <div style={{
          backgroundColor: 'rgba(0, 0, 0, 0.6)', // Fondo oscuro
          color: 'white', // Texto blanco
          padding: '15px',
          borderRadius: 16,
          fontSize: 18,
          textAlign: 'center', // Centrar el texto
          display: 'flex',
          flexDirection: 'column', // Asegura que los párrafos estén uno encima del otro
          alignItems: 'center' // Asegura que los elementos estén alineados al centro
        }}>
          <p style={{ margin: 0, lineHeight: 1.5 }}>{`${label}`}</p>
          <p style={{ margin: 0, lineHeight: 1.5 }}>{`${(data.count / 1000).toFixed(1)}k reproducciones`}</p> {/* Formato con 'k' */}
        </div>
      );
    }
  
    return null;
  };

  return (
    <Container maxWidth="lg" sx={styles.container}>
      <Typography variant="h3" gutterBottom sx={styles.title}>
        Spotify Listening Recap
      </Typography>

{/* SUBIR ARCHIVOS */}
      {uploadedFilesInfo.length === 0 ? (
        <Box textAlign="center">
          <Button
            variant="contained"
            startIcon={<UploadFileIcon />}
            component="label"
            sx={styles.uploadButton}
          >
            Subir Archivos JSON
            <input
              type="file"
              accept=".json"
              multiple
              hidden
              onChange={(e) => handleFilesUpload(e.target.files)}
            />
          </Button>
        </Box>
      ) : (
// ARCHIVOS SUBIDOS
        <Card sx={styles.uploadedCard}>
          <CardHeader
            sx={styles.uploadedCardTitle}
            title={`${uploadedFilesInfo.length} Archivos Subidos`} // Usando template string
          />
          <CardContent>
            <List>
              {uploadedFilesInfo.map((fileName, index) => (
                <Card sx={styles.filesCard}>
                  <CardContent sx={styles.filesCardContent}>
                    <FileCopy sx={{ color: '#7275C7' }}/>
                    <Typography variant="body1" sx={styles.fileName}>
                      {fileName}
                    </Typography>
                  </CardContent>
                </Card>
              ))}
            </List>
          </CardContent>
        </Card>
      )}

{/* TOTALES DE ESCUCHA */}
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Card sx={styles.listenedCard}>
            <CardHeader title="Totales de Escucha" />
            <CardContent>
              <Card sx={styles.listenedCardItem}>
                <CardContent sx={styles.listenedCardContent}>
                  <HeadphonesIcon sx={styles.listenedIcon} />
                  <Typography sx={styles.listenedText}>{totalPlays} reproducciones</Typography>
                </CardContent>
              </Card>
              <Card sx={styles.listenedCardItem}>
                <CardContent sx={styles.listenedCardContent}>
                  <HeadphonesIcon sx={styles.listenedIcon} />
                  <Typography sx={styles.listenedText}>{totalMinutes} minutos escuchados</Typography>
                </CardContent>
              </Card>
              <Card sx={styles.listenedCardItem}>
                <CardContent sx={styles.listenedCardContent}>
                  <HeadphonesIcon sx={styles.listenedIcon} />
                  <Typography sx={styles.listenedText}>{totalHours} horas escuchadas</Typography>
                </CardContent>
              </Card>
              <Card sx={styles.listenedCardItem}>
                <CardContent sx={styles.listenedCardContent}>
                  <HeadphonesIcon sx={styles.listenedIcon} />
                  <Typography sx={styles.listenedText}>{totalDays} días escuchados</Typography>
                </CardContent>
              </Card>
            </CardContent>
          </Card>
        </Grid>

{/* GRAFICO REPRODUCCIONES POR AÑO */}
        <Grid item xs={12} md={6}>
          <Card sx={styles.chartCard}>
            <CardHeader title="Gráfico: Reproducciones por Año" />
            <CardContent sx={styles.chartContainer}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={yearlyData}>
                  <CartesianGrid strokearray="3 3" vertical={false} />
                  <XAxis axisLine={false} stroke="#fff" dataKey="year" />
                  <YAxis axisLine={false} stroke="#fff" tickFormatter={(value) => `${(value / 1000).toFixed(1)}k`} />
                  <Tooltip content={<CustomTooltip />} />
                  <Area dataKey="count" stroke="#8884d8" fill="#fff" />
                  <Line dot={{ fill: '#0E8943', stroke: '#0E8943', r: 3 }} type="monotone" dataKey="count" stroke="#0E8943" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>

{/* CANCIONES MAS ESCUCHADAS */}
        <Grid item xs={12} md={6}>
          <Card sx={styles.card}>
            <CardHeader title="Canciones Más Escuchadas" />
            <CardContent>
              {topSongs.length > 0 ? (
                <List sx={styles.list}>
                  {topSongs.map(([song, count], index) => (
                    <ListItem key={`song-${index}`} sx={styles.listItem}>
                      <ListItemText
                        primary={`${index + 1}. ${song}`}
                        secondary={`${count} reproducciones`}
                        sx={styles.listItemText}
                      />
                    </ListItem>
                  ))}
                </List>
              ) : (
                <Typography sx={styles.typography}>No hay datos disponibles</Typography>
              )}
            </CardContent>
          </Card>
        </Grid>

{/* ARTISTAS MAS ESCUCHADOS */}
        <Grid item xs={12} md={6}>
          <Card sx={styles.card}>
            <CardHeader title="Artistas Más Escuchados" />
            <CardContent>
              {topArtists.length > 0 ? (
                <List sx={styles.list}>
                  {topArtists.map(([artist, count], index) => (
                    <ListItem key={`artist-${index}`} sx={styles.listItem}>
                      <ListItemText
                        primary={`${index + 1}. ${artist}`}
                        secondary={`${count} reproducciones`}
                        sx={styles.listItemText}
                      />
                    </ListItem>
                  ))}
                </List>
              ) : (
                <Typography sx={styles.typography}>No hay datos disponibles</Typography>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    
{/* ERROR */}
      {errorMessage && (
        <Box sx={styles.errorBox}>
          <Typography color="error" variant="body1" align="center">
            {errorMessage}
          </Typography>
        </Box>
      )}
    </Container>
  );
}

const styles = {
  container: {
    paddingY: 4,
  },
  title: {
    textAlign: 'center',
    marginBottom: 4,
    fontWeight: 'bold',
  },
  uploadButton: {
    paddingX: 4,
    paddingY: 2,
    backgroundColor: '#06b6d4',
    color: '#fff',
    ':hover': {
      backgroundColor: '#0891b2',
    },
  },
  // ARCHIVOS SUBIDOS
  uploadedCard: {
    marginBottom: 3,
    boxShadow: 3,
    borderRadius: 10,
    padding: 2,
    backgroundColor: '#0F0A33',
  },
  uploadedCardTitle:{
    marginLeft: 2,
    marginBottom: -2,
  },
  filesCard: {
    borderRadius: 5,
    marginBottom: 1,
    backgroundColor: '#19114C',
  },
  filesCardContent: {
    display: 'flex',
    alignItems: 'center',
    padding: 2,
  },
  fileName:{
    color: '#7275C7',
    marginLeft: 1,
  },

  //TOTALES DE ESCUCHA
  listenedCard: {
    boxShadow: 3,
    borderRadius: 10,
    padding: 2,
    backgroundColor: '#DC4D56',
  },
  listenedText: {
    fontSize: 18,
    marginBottom: 1,
    marginTop: 1,
    fontFamily: 'Host Grotesk, sans-serif',
    color: '#FDA5AB',
  },
  listenedCardItem: {
    marginBottom: 1,
    // boxShadow: 2,
    borderRadius: 6,
    backgroundColor: '#C02F39',
    // height: 80,
  },
  listenedCardContent: {
    display: 'flex',
    alignItems: 'center',
  },
  listenedIcon: {
    marginRight: 2,
    marginLeft: 1,
    color: '#FDA5AB',
  },

  //GRAFICO chartCard
  chartCard: {
    boxShadow: 3,
    borderRadius: 10,
    padding: 2,
    backgroundColor: '#29B967',
  },

  card: {
    boxShadow: 3,
    borderRadius: 10,
    padding: 2,
  },
  cardActions: {
    // total de archivos
    padding: 2,
    display: 'flex',
    justifyContent: 'space-between',
  },
  typography: {
    fontSize: '1rem',
    marginBottom: 1,
    fontFamily: 'Host Grotesk, sans-serif',
  },
  list: {
    padding: 0,
    marginTop: 2,
  },
  listItem: {
    padding: 1,
    borderBottom: '1px solid #e5e7eb',
  },
  listItemText: {
    primaryTypographyProps: {
      fontSize: '1rem',
      fontWeight: 'bold',
      fontFamily: 'Host Grotesk, sans-serif',
    },
    secondaryTypographyProps: {
      fontSize: '0.875rem',
      color: '#6b7280',
      fontFamily: 'Host Grotesk, sans-serif',
    },
  },
  errorBox: {
    marginTop: 4,
    padding: 2,
    backgroundColor: '#fee2e2',
    borderRadius: 2,
    border: '1px solid #fca5a5',
  },
  chartContainer: {
    height: 300,
    marginTop: 2,
    marginBottom: 2,
  },
};

export default UploadHistory;
