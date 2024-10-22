import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { redirectToAuthCodeFlow, getAccessToken } from '../../services/auth';
import { useAuth } from '../../context/AuthContext'; 
import '../../styles/login.css';

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
                    login(); // Actualizar el estado de autenticación
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
        <div className="login-container">
            <h1>Login</h1>
            <button onClick={handleSpotifyLogin}>
                Sign in with Spotify
            </button>
        </div>
    );
}
