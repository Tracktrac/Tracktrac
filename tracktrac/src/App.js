import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Login from './pages/auth/login';
import Home from './pages/user/home';

const theme = createTheme({
  palette: {
    mode: 'light',
  },
});

function App() {
  

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <AppContent />
      </Router>
    </ThemeProvider>
  );
}


function AppContent() {
  const apiToken = localStorage.getItem('apiToken');
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            apiToken ? (
              <Navigate to="/home" />
            ) : (
              <Navigate to="/callback" />
            )
          }
        />
        <Route path="/" element={<Login />} />
        <Route path="/callback" element={<Login />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </>
  );
}

export default App;
