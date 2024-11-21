import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Login from './pages/auth/login';
import Home from './pages/user/home';
import MonthRecap from './pages/user/monthrecap';
import SixMonthRecap from './pages/user/sixmonthrecap';
import YearRecap from './pages/user/yearrecap';
import Lifetime from './pages/user/lifetime';
import Navbar from './components/navbar';
import AboutUs from './components/about'; 
import StatsTopSongsMonth from './features/TopSongs/StatsTopTracksMonth'; 
import { AuthProvider, useAuth } from './context/AuthContext';
import { DataProvider } from './context/DataContext';


const theme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      default: '#080920',
    },
  },
  typography: {
    fontFamily: '"Host Grotesk", sans-serif',
    h3: {
      fontFamily: '"Host Grotesk", sans-serif',
    },
    body1: {
      fontFamily: '"Host Grotesk", sans-serif',
    },
    button: {
      fontFamily: '"Host Grotesk", sans-serif',
    },
  },
  components: {
    MuiCardHeader: {
      styleOverrides: {
        title: {
          fontSize: '1.3rem !important',
          fontWeight: 'bold',
          textAlign: 'center',
        },
        root: {
          paddingBottom: 0,
        },
      },
    },
    MuiCardContent: {
      styleOverrides: {
        root: {
          padding: 0,
          paddingBottom: 0,
          '&:last-child': {
            // paddingBottom: 2,
            // paddingTop: 2,
            padding: '8px 8px',
          },
        },
      },
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <AuthProvider>
          <DataProvider>
            <AppContent />
          </DataProvider>
        </AuthProvider>
      </Router>
    </ThemeProvider>
  );
}

function AppContent() {
  const { isAuthenticated } = useAuth();

  return (
    <>
      <Navbar /> {/* Muestra el Navbar para todos los usuarios */}
      <Routes>
        <Route
          path="/"
          element={isAuthenticated ? <Navigate to="/home" /> : <Navigate to="/callback" />} // Redirige a /home si está autenticado, sino a /callback
        />
        <Route path="/about" element={<AboutUs />} /> 
        <Route path="/callback" element={<Login />} /> 
        {isAuthenticated && (
          <>
            <Route path="/home" element={<Home />} />
            <Route path="/month-recap" element={<MonthRecap />} />
            <Route path="/six-month-recap" element={<SixMonthRecap />} />
            <Route path="/year-recap" element={<YearRecap />} />
            <Route path="/lifetime" element={<Lifetime />} />
            <Route path="/top-songs-month" element={<StatsTopSongsMonth />} /> {/* Nueva ruta */}
          </>
        )}
        {/* Redirección para rutas desconocidas */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
  );
}

export default App;
