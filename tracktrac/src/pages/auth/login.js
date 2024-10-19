import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const clientId = 'dbacf683ae43492298f8bb02b206df60';

async function redirectToAuthCodeFlow(clientId) {
    const verifier = generateCodeVerifier(128);
    const challenge = await generateCodeChallenge(verifier);

    localStorage.setItem("verifier", verifier);

    const params = new URLSearchParams();
    params.append("client_id", clientId);
    params.append("response_type", "code");
    params.append("redirect_uri", "http://localhost:3000/callback");
    params.append("scope", "user-read-private user-read-email");
    params.append("code_challenge_method", "S256");
    params.append("code_challenge", challenge);

    document.location = `https://accounts.spotify.com/authorize?${params.toString()}`;
}

async function getAccessToken(clientId, code) {
    const verifier = localStorage.getItem("verifier");

    const params = new URLSearchParams();
    params.append("client_id", clientId);
    params.append("grant_type", "authorization_code");
    params.append("code", code);
    params.append("redirect_uri", "http://localhost:3000/callback");
    params.append("code_verifier", verifier);

    const result = await fetch("https://accounts.spotify.com/api/token", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: params
    });

    const { access_token } = await result.json();
    return access_token;
}

function generateCodeVerifier(length) {
    let text = '';
    let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (let i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
}

async function generateCodeChallenge(codeVerifier) {
    const data = new TextEncoder().encode(codeVerifier);
    const digest = await window.crypto.subtle.digest('SHA-256', data);
    return btoa(String.fromCharCode.apply(null, [...new Uint8Array(digest)]))
        .replace(/\+/g, '-')
        .replace(/\//g, '_')
        .replace(/=+$/, '');
}

export default function Login() {
    const [code, setCode] = useState(localStorage.getItem('code') || null);
    const navigate = useNavigate();

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
                    navigate('/home');
                } catch (error) {
                    console.error('Error getting access token:', error);
                }
            }
        };

        fetchToken();
    }, [code, navigate]);

    const handleSpotifyLogin = () => {
        redirectToAuthCodeFlow(clientId);
    };

    if (code) {
        return <div>Loading...</div>; // Show loading state while getting the token
    }

    return (
        <div>
            <h1>Login</h1>
            <button onClick={handleSpotifyLogin}>
                Sign in with Spotify
            </button>
        </div>
    );
}