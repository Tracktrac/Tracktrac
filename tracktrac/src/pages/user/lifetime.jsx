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
  CardActions,
  List,
  ListItem,
  ListItemText,
} from '@mui/material';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

function UploadHistory() {
  const { uploadedData, uploadedFilesInfo, errorMessage, handleFilesUpload } = useDataContext();
  const [topSongs, setTopSongs] = useState([]);
  //const [topAlbums, setTopAlbums] = useState([]);
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
    setTotalMinutes(minutes.toFixed(2));
    setTotalHours(hours.toFixed(2));
    setTotalDays(days.toFixed(2));
  };

  const processTopSongs = (data) => {
    const songCounts = {};
    //const albumCounts = {};
    const artistCounts = {};

    data.forEach((item) => {
      const trackName = item.master_metadata_track_name;
      //const albumName = item.master_metadata_album_album_name;
      const artistName = item.master_metadata_album_artist_name;

      if (trackName) songCounts[trackName] = (songCounts[trackName] || 0) + 1;
      //if (albumName) albumCounts[albumName] = (albumCounts[albumName] || 0) + 1;
      if (artistName) artistCounts[artistName] = (artistCounts[artistName] || 0) + 1;
    });

    setTopSongs(Object.entries(songCounts).sort((a, b) => b[1] - a[1]).slice(0, 10));
    //setTopAlbums(Object.entries(albumCounts).sort((a, b) => b[1] - a[1]).slice(0, 10));
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

  return (
    <Container maxWidth="lg" sx={{ paddingY: 4 }}>
      <Typography variant="h3" gutterBottom align="center">
        Spotify Listening Recap
      </Typography>

      {uploadedFilesInfo.length === 0 ? (
        <Box textAlign="center" marginBottom={4}>
          <Button
            variant="contained"
            startIcon={<UploadFileIcon />}
            component="label"
            sx={{ padding: 2 }}
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
        <Card sx={{ marginBottom: 4 }}>
          <CardHeader title="Archivos Subidos" />
          <CardContent>
            <List>
              {uploadedFilesInfo.map((fileName, index) => (
                <ListItem key={index}>
                  <ListItemText primary={fileName} />
                </ListItem>
              ))}
            </List>
          </CardContent>
          <CardActions>
            <Typography>Total de archivos: {uploadedFilesInfo.length}</Typography>
          </CardActions>
        </Card>
      )}

      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardHeader title="Totales de Escucha" />
            <CardContent>
              <Typography>Total de Reproducciones: {totalPlays}</Typography>
              <Typography>Total de Minutos Escuchados: {totalMinutes} minutos</Typography>
              <Typography>Total de Horas Escuchadas: {totalHours} horas</Typography>
              <Typography>Total de Días Escuchados: {totalDays} días</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card>
            <CardHeader title="Gráfico: Reproducciones por Año" />
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={yearlyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="year" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="count" stroke="#8884d8" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card>
            <CardHeader title="Canciones Más Escuchadas" />
            <CardContent>
              {topSongs.length > 0 ? (
                <List>
                  {topSongs.map(([song, count], index) => (
                    <ListItem key={`song-${index}`}>
                      <ListItemText primary={`${index + 1}. ${song}`} secondary={`${count} reproducciones`} />
                    </ListItem>
                  ))}
                </List>
              ) : (
                <Typography>No hay datos disponibles</Typography>
              )}
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card>
            <CardHeader title="Artistas Más Escuchados" />
            <CardContent>
              {topArtists.length > 0 ? (
                <List>
                  {topArtists.map(([artist, count], index) => (
                    <ListItem key={`artist-${index}`}>
                      <ListItemText primary={`${index + 1}. ${artist}`} secondary={`${count} reproducciones`} />
                    </ListItem>
                  ))}
                </List>
              ) : (
                <Typography>No hay datos disponibles</Typography>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {errorMessage && (
        <Box marginTop={4}>
          <Typography color="error" variant="body1" align="center">
            {errorMessage}
          </Typography>
        </Box>
      )}
    </Container>
  );
}

export default UploadHistory;
