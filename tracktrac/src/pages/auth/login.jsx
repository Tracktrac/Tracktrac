import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { redirectToAuthCodeFlow, getAccessToken } from '../../services/auth';
import { useAuth } from '../../context/AuthContext'; 
import { Grid, Box, Typography, Button, Container } from '@mui/material';

const clientId = 'dbacf683ae43492298f8bb02b206df60';

export default function Login() {
    const [code, setCode] = useState(localStorage.getItem('code') || null);
    const navigate = useNavigate();
    const { login } = useAuth(); 

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const urlCode = urlParams.get('code');
        if (urlCode) {
            setCode(urlCode);
            localStorage.setItem('code', urlCode);
        }
    }, []);

    useEffect(() => {
        const fetchToken = async () => {
            if (code) {
                try {
                    const api_token = await getAccessToken(clientId, code);
                    localStorage.setItem('api_token', api_token);
                    login();
                    navigate('/home');
                } catch (error) {
                    console.error('Error getting access token:', error);
                }
            }
        };
        fetchToken();
    }, [code, login, navigate]);

    const handleSpotifyLogin = () => {
        redirectToAuthCodeFlow(clientId);
    };

    return (
        <Container maxWidth="lg" sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center' }}>
            <Grid container spacing={2}>
                <Grid item xs={12} md={6} display="flex" alignItems="center" justifyContent="center">
                    <Typography
                        variant="h2"
                        sx={{ fontWeight: 'bold', textAlign: 'center', color: 'white' }}
                    >
                        Track, <br />
                        Stat, <br />
                        Repeat
                    </Typography>
                </Grid>
                <Grid item xs={12} md={6} display="flex" alignItems="center" justifyContent="center">
                    <Box textAlign="center">
                        <Typography variant="h5" sx={{ marginBottom: 2, color: 'white' }}>
                            TrackTrac offers real-time access to your personalized music listening habits. 
                            Dive into detailed stats on your favorite songs, artists, and albums 
                            whenever you want, not just at the end of the year!
                        </Typography>
                        <Button
                            variant="contained"
                            color="error"
                            size="large"
                            onClick={handleSpotifyLogin}
                            sx={{ borderRadius: 25, paddingX: 4 }}
                        >
                            Sign In with Spotify
                        </Button>
                    </Box>
                </Grid>
            </Grid>
        </Container>
    );
}
