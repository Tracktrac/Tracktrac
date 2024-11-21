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
} from '@mui/material';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import HeadphonesIcon from '@mui/icons-material/Headphones';
import { FileCopy } from '@mui/icons-material'; 
import { LineChart, Area, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import MostListenedSongs from '../../components/topsongs';
import MostListenedArtists from '../../components/topartists';
import GeneratePdf from '../../components/generatePDF'; 
import YearSelect from '../../components/Select'; 

function UploadHistory() {
  const { uploadedData, uploadedFilesInfo, errorMessage, handleFilesUpload } = useDataContext();
  const [topSongs, setTopSongs] = useState([]);
  const [topArtists, setTopArtists] = useState([]);
  const [totalPlays, setTotalPlays] = useState(0);
  const [totalMinutes, setTotalMinutes] = useState(0);
  const [totalHours, setTotalHours] = useState(0);
  const [totalDays, setTotalDays] = useState(0);
  const [yearlyData, setYearlyData] = useState([]);
  const [selectedYear, setSelectedYear] = useState(null);
  const [monthlyData, setMonthlyData] = useState([]);
  const [structuredMonthlyData, setStructuredMonthlyData] = useState({});

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

  const processMonthlyData = (data, year) => {
    const monthlyCounts = Array(12).fill(0);
  
    data.forEach((item) => {
      const endTime = item.ts || item.endTime;
      const date = new Date(endTime);
      if (date.getFullYear() === year) {
        monthlyCounts[date.getMonth()] += 1;
      }
    });
  
    setMonthlyData(
      monthlyCounts.map((count, index) => ({
        month: new Date(0, index).toLocaleString('en', { month: 'short' }),
        count,
      }))
    );
  };
  
  useEffect(() => {
    if (selectedYear && uploadedData.length > 0) {
      processMonthlyData(uploadedData, selectedYear);
    }
  }, [selectedYear, uploadedData]);
  
  useEffect(() => {
  console.log("Updated Monthly Data:", monthlyData);
  }, [monthlyData]);

  const processYearlyMonthlyData = (data) => {
    const yearlyMonthlyCounts = {};
  
    data.forEach((item) => {
      const endTime = item.ts || item.endTime;  // Ajustar según el formato de tus datos
      const year = new Date(endTime).getFullYear();
      const month = new Date(endTime).toLocaleString('en', { month: 'short' });  // Ej. "Jan", "Feb", etc.
  
      if (year && month) {
        if (!yearlyMonthlyCounts[year]) {
          yearlyMonthlyCounts[year] = {};
        }
  
        yearlyMonthlyCounts[year][month] = (yearlyMonthlyCounts[year][month] || 0) + 1;
      }
    });
  
    setStructuredMonthlyData(yearlyMonthlyCounts); // Esto actualizará el estado con el formato deseado
  };
  
  useEffect(() => {
    if (uploadedData.length > 0) {
      processYearlyMonthlyData(uploadedData);  // Llamar a la nueva función
    }
  }, [uploadedData]);

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
          fontSize: '0.8rem',
          textAlign: 'center', // Centrar el texto
          display: 'flex',
          flexDirection: 'column', // Asegura que los párrafos estén uno encima del otro
          alignItems: 'center' // Asegura que los elementos estén alineados al centro
        }}>
          <p style={{ margin: 0, lineHeight: 1.5 }}>{`${label}`}</p>
          <p style={{ margin: 0, lineHeight: 1.5 }}>{`${(data.count / 1000).toFixed(1)}k streams`}</p> {/* Formato con 'k' */}
        </div>
      );
    }
  
    return null;
  };

  return (
    <Container maxWidth="xl" sx={styles.container}>
      <Typography variant="h3" gutterBottom sx={styles.title}>
        Spotify Listening Recap
      </Typography>

      {/* ROW CON TRES COLUMNAS */}
      <Grid container spacing={4}>
        {/* PRIMERA COLUMNA */}
        <Grid item xs={12} md={4}>

{/* SUBIR ARCHIVOS */}
        {uploadedFilesInfo.length === 0 ? (
          <Box textAlign="center">
            <Button
              variant="contained"
              startIcon={<UploadFileIcon />}
              component="label"
              sx={styles.uploadButton}
            >
              Upload JSON files
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
              title={`${uploadedFilesInfo.length} files uploaded`} // Usando template string
            />
            <CardContent sx={styles.uploadedContent}>
              <List>
                {uploadedFilesInfo.map((fileName, index) => (
                  <Card sx={styles.filesCard}>
                    <CardContent sx={styles.filesCardContent}>
                      <FileCopy sx={{ color: '#7275C7', fontSize: 13, marginLeft: 1, }}/>
                      <Typography sx={styles.fileName}>
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
            <Card sx={styles.listenedCard}>
              <CardHeader title="You listened" />
              <CardContent>
                <Card sx={styles.listenedCardItem}>
                  <CardContent sx={styles.listenedCardContent}>
                    <HeadphonesIcon sx={styles.listenedIcon} />
                    <Typography sx={styles.listenedText}>{totalPlays} streams</Typography>
                  </CardContent>
                </Card>
                <Card sx={styles.listenedCardItem}>
                  <CardContent sx={styles.listenedCardContent}>
                    <HeadphonesIcon sx={styles.listenedIcon} />
                    <Typography sx={styles.listenedText}>{totalMinutes} minutes</Typography>
                  </CardContent>
                </Card>
                <Card sx={styles.listenedCardItem}>
                  <CardContent sx={styles.listenedCardContent}>
                    <HeadphonesIcon sx={styles.listenedIcon} />
                    <Typography sx={styles.listenedText}>{totalHours} hours</Typography>
                  </CardContent>
                </Card>
                <Card sx={styles.listenedCardItem}>
                  <CardContent sx={styles.listenedCardContent}>
                    <HeadphonesIcon sx={styles.listenedIcon} />
                    <Typography sx={styles.listenedText}>{totalDays} days</Typography>
                  </CardContent>
                </Card>
              </CardContent>
            </Card>
          {/* </Grid> */}

  {/* GRAFICO REPRODUCCIONES POR AÑO */}
          <Card sx={styles.chartCard}>
            <CardHeader title="Streams per Year" />
            <CardContent sx={styles.chartContainer}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={yearlyData} >
                  <CartesianGrid strokearray="3 3" vertical={false} />
                  <XAxis axisLine={false} stroke="#fff" dataKey="year" tick={{ fontSize: '0.8rem' }} />
                  <YAxis axisLine={false} stroke="#fff" tickFormatter={(value) => `${(value / 1000).toFixed(1)}k`} tick={{ fontSize: '0.8rem' }} />
                  <Tooltip content={<CustomTooltip />} />
                  <Area dataKey="count" stroke="#8884d8" fill="#fff" />
                  <Line dot={{ fill: '#0E8943', stroke: '#0E8943', r: 3 }} type="monotone" dataKey="count" stroke="#0E8943" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
          </Grid>

  {/* CANCIONES MAS ESCUCHADAS */}
  {/* SEGUNDA COLUMNA */}
        <Grid item xs={12} md={4}>
          <Card sx={styles.songsCard}>
            <CardHeader title="Most listened Songs" />
            <CardContent>
              <MostListenedSongs songs={topSongs} />
            </CardContent>
          </Card>
          
          <style>{scrollStyles}</style>
          <Card sx={styles.chartCard}>
            <CardHeader title="Streams per Month" />
            <CardContent>
              <Box sx={{ marginBottom: 2 }}>
                <YearSelect
                years={yearlyData.map((data) => data.year)}
                selectedYear={selectedYear}
                onYearChange={(year) => setSelectedYear(year)}
              />
              </Box>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={monthlyData}>
                  <CartesianGrid strokearray="3 3" vertical={false} />
                  <XAxis
                    axisLine={false}
                    dataKey="month"
                    stroke="#fff"
                    tick={{ fontSize: '0.8rem' }}
                  />
                  <YAxis
                    axisLine={false}
                    stroke="#fff"
                    tickFormatter={(value) => `${(value / 1000).toFixed(1)}k`}
                    tick={{ fontSize: '0.8rem' }}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Area dataKey="count" stroke="#8884d8" fill="#fff" />
                  <Line
                    dot={{ fill: '#0E8943', stroke: '#0E8943', r: 3 }}
                    type="monotone"
                    dataKey="count"
                    stroke="#0E8943"
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>
        

  {/* ARTISTAS MAS ESCUCHADOS */}
  {/* TERCERA COLUMNA */}
  <Grid item xs={12} md={4}>
            <Card sx={styles.artistCard}>
              <CardHeader title="Most listened Artists" />
              <CardContent>
                <MostListenedArtists artists={topArtists} />
              </CardContent>
            </Card>
            <GeneratePdf data={{ totalPlays, totalMinutes, totalHours, totalDays, topSongs, topArtists, yearlyData, structuredMonthlyData  }}/>
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
    fontSize: '2rem',
  },
  uploadButton: {
    paddingX: 3, // Reducido de 4 a 3
    paddingY: 1.5, // Reducido de 2 a 1.5
    borderRadius: 2,
    marginBottom: 1.5,
    backgroundColor: '#06b6d4',
    color: '#fff',
    ':hover': {
      backgroundColor: '#0891b2',
    },
  },
  // ARCHIVOS SUBIDOS
  uploadedCard: {
    marginBottom: 2, // Reducido de 3 a 2
    boxShadow: 3,
    borderRadius: 8, // Reducido de 10 a 8
    paddingLeft: 2, // Reducido de 2 a 1.5
    paddingRight: 2,
    paddingTop: 2,
    paddingBottom: 0,
    backgroundColor: '#0F0A33',
  },
  uploadedCardTitle:{
    fontSize: '0.8rem', // Reducido de 1rem a 0.8rem
  },
  uploadedContent:{
    margin:0,
    paddingBottom:0,
    paddingTop:0
  },
  filesCard: {
    borderRadius: 3, // Reducido de 5 a 3
    marginBottom: 0.8, // Reducido de 1 a 0.8
    backgroundColor: '#19114C',
  },
  filesCardContent: {
    display: 'flex',
    alignItems: 'center',
    // padding: 2,
  },
  fileName:{
    color: '#7275C7',
    marginLeft: 1,
    // fontSize: 12,
    fontSize: '0.8rem', // Reducido de 12px a 0.9rem
  },

  //TOTALES DE ESCUCHA
  listenedCard: {
    boxShadow: 3,
    borderRadius: 8, // Reducido de 10 a 8
    paddingLeft: 1.5, // Reducido de 2 a 1.5
    paddingTop: 1.5,
    paddingRight: 1.5,
    backgroundColor: '#DC4D56',
    marginBottom: 2,
  },
  listenedText: {
    fontSize: '0.8rem', // Reducido de 1.5rem a 1rem
    marginTop: 0.4, // Reducido de 1 a 0.8
    fontFamily: 'Host Grotesk, sans-serif',
    color: '#FDA5AB',
  },
  listenedCardItem: {
    marginBottom: 1,
    // boxShadow: 2,
    borderRadius: 4,
    backgroundColor: '#C02F39',
  },
  listenedCardContent: {
    display: 'flex',
    alignItems: 'center',
  },
  listenedIcon: {
    marginRight: 1,
    marginLeft: 1,
    color: '#FDA5AB',
    fontSize: 15,
  },

  //GRAFICO chartCard
  chartCard: {
    marginTop: 3,
    boxShadow: 3,
    borderRadius: 10,
    padding: 2,
    paddingBottom:0,
    backgroundColor: '#29B967',
  },
  chartContainer: {
    height: 300,
    marginTop: 2,
  },

  //SONGS
  songsCard: {
    boxShadow: 3,
    borderRadius: 10,
    padding: 2,
    backgroundColor: '#E86940',
  },

  //ARTIST
  artistCard: {
    boxShadow: 3,
    borderRadius: 10,
    padding: 2,
    backgroundColor: '#CB399F',
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

export default UploadHistory;
