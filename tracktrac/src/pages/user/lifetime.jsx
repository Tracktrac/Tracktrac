// pages/user/lifetime.jsx
import React, { useState, useEffect } from 'react';
import { useDataContext } from '../../context/DataContext';
import { Grid, Container, Typography, Box} from '@mui/material';

function UploadHistory() {
  const { uploadedData, uploadedFilesInfo, errorMessage, handleFilesUpload } = useDataContext();
  const [topSongs, setTopSongs] = useState([]);
  const [topAlbums, setTopAlbums] = useState([]);
  const [topArtists, setTopArtists] = useState([]);


  useEffect(() => {
    if (uploadedData.length > 0) {
      processTopSongs(uploadedData);
    }
  }, [uploadedData]);

  const processTopSongs = (data) => {
    const songCounts = {};
    const albumCounts = {};
    const artistCounts = {};
  
    data.forEach((item) => {
      const trackName = item.master_metadata_track_name;
      const albumName = item.master_metadata_album_album_name;
      const artistName = item.master_metadata_album_artist_name;
  
      // Conteo de canciones
      if (trackName) {
        songCounts[trackName] = (songCounts[trackName] || 0) + 1;
      }
  
      // Conteo de álbumes
      if (albumName) {
        albumCounts[albumName] = (albumCounts[albumName] || 0) + 1;
      }
  
      // Conteo de artistas
      if (artistName) {
        artistCounts[artistName] = (artistCounts[artistName] || 0) + 1;
      }
    });
  
    // Obtener las 5 canciones más escuchadas
    const sortedSongs = Object.entries(songCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10);
  
    // Obtener los 5 álbumes más escuchados
    const sortedAlbums = Object.entries(albumCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10);
  
    // Obtener los 5 artistas más escuchados
    const sortedArtists = Object.entries(artistCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10);
  
    // Actualizar estados
    setTopSongs(sortedSongs);
    setTopAlbums(sortedAlbums);
    setTopArtists(sortedArtists);
  };
  

  return (
    <Container maxWidth="lg" sx={{ paddingTop: 4 }}>
      <Typography variant="h3" gutterBottom>
        Recap de Canciones
      </Typography>

      {/* Subida de Archivos */}
      {uploadedFilesInfo.length === 0 ? (
        <Box textAlign="center" marginBottom={4}>
          <input
            type="file"
            accept=".json"
            multiple
            onChange={(e) => handleFilesUpload(e.target.files)}
          />
        </Box>
      ) : (
        <Box textAlign="center" marginBottom={4}>
          <Typography variant="h6">Archivos subidos:</Typography>
          <ul>
            {uploadedFilesInfo.map((fileName, index) => (
              <li key={index}>{fileName}</li>
            ))}
          </ul>
          <Typography>Total de archivos: {uploadedFilesInfo.length}</Typography>
        </Box>
      )}

      {/* Mensaje de error */}
      {errorMessage && <Typography color="error">{errorMessage}</Typography>}

      {/* Grilla para Canciones, Álbumes y Artistas */}
      <Grid container spacing={4}>
        {/* Canciones */}
        <Grid item xs={12} md={4}>
          <Box bgcolor="rgb(205, 94, 94)" p={3} borderRadius={2} textAlign="center">
            <Typography variant="h5" gutterBottom>
              Canciones Más Escuchadas
            </Typography>
            {topSongs.length > 0 ? (
              <ul>
                {topSongs.map(([song, count], index) => (
                  <li key={`song-${index}`}>
                    {index + 1}. {song} - {count} reproducciones
                  </li>
                ))}
              </ul>
            ) : (
              <Typography>Sube tus archivos para ver tus canciones más escuchadas.</Typography>
            )}
          </Box>
        </Grid>

        {/* Artistas */}
        <Grid item xs={12} md={4}>
          <Box bgcolor="rgb(94, 205, 128)" p={3} borderRadius={2} textAlign="center">
            <Typography variant="h5" gutterBottom>
              Artistas Más Escuchados
            </Typography>
            {topArtists.length > 0 ? (
              <ul>
                {topArtists.map(([artist, count], index) => (
                  <li key={`artist-${index}`}>
                    {index + 1}. {artist} - {count} reproducciones
                  </li>
                ))}
              </ul>
            ) : (
              <Typography>Sube tus archivos para ver tus artistas más escuchados.</Typography>
            )}
          </Box>
        </Grid>

        {/* Álbumes */}
        <Grid item xs={12} md={4}>
          <Box bgcolor="rgb(94, 94, 205)" p={3} borderRadius={2} textAlign="center">
            <Typography variant="h5" gutterBottom>
              Álbumes Más Escuchados
            </Typography>
            {topAlbums.length > 0 ? (
              <ul>
                {topAlbums.map(([album, count], index) => (
                  <li key={`album-${index}`}>
                    {index + 1}. {album} - {count} reproducciones
                  </li>
                ))}
              </ul>
            ) : (
              <Typography>Sube tus archivos para ver tus álbumes más escuchados.</Typography>
            )}
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}

export default UploadHistory;
