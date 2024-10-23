import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Login from './pages/auth/login';
import Home from './pages/user/home';
import MonthRecap from './pages/user/monthrecap';
import YearRecap from './pages/user/yearrecap';
import Navbar from './components/navbar';
import { AuthProvider, useAuth } from './context/AuthContext';

const theme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      default: '#080920',
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <AuthProvider>
          <AppContent />
        </AuthProvider>
      </Router>
    </ThemeProvider>
  );
}

function AppContent() {
  const { isAuthenticated } = useAuth();

  return (
    <>
      {isAuthenticated && <Navbar />}
      <Routes>
        <Route
          path="/"
          element={isAuthenticated ? <Navigate to="/home" /> : <Navigate to="/callback" />}
        />
        <Route path="/callback" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/month-recap" element={<MonthRecap />} />
        <Route path="/year-recap" element={<YearRecap />} />
      </Routes>
    </>
  );
}

export default App;
