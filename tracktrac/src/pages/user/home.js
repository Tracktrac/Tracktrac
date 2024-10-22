import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Account = () => {
    const [profileData, setProfileData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchProfile() {
            const apiToken = localStorage.getItem('api_token');

            if (!apiToken) {
                setError("No API token found");
                setLoading(false);
                return;
            }

            try {
                const response = await fetch("https://api.spotify.com/v1/me", {
                    headers: { Authorization: `Bearer ${apiToken}` }
                });
                if (!response.ok) {
                    throw new Error('Failed to fetch profile data');
                }
                const data = await response.json();
                setProfileData(data);
            } catch (error) {
                console.error("Error fetching profile:", error);
                setError(error.message);
            } finally {
                setLoading(false);
            }
        }

        fetchProfile();
    }, []);

    const handleLogout = () => {
        if (window.confirm("Are you sure you want to log out?")) {
            localStorage.removeItem('api_token');
            localStorage.removeItem('code');
            navigate('/');
        }
    }

    if (loading) return <div>Loading...</div>;
    if (error) return <div style={{ color: 'red' }}>Error: {error}</div>;

    return (
        <div>
            <h2>Spotify Profile</h2>
            {profileData && (
                <ul>
                    <li>Display Name: {profileData.display_name}</li>
                    <li>Email: {profileData.email}</li>
                    <li>Country: {profileData.country}</li>
                    <li>Followers: {profileData.followers?.total}</li>
                    <li>Product: {profileData.product}</li>
                    <li>
                        Spotify URL: <a href={profileData.external_urls?.spotify} target="_blank" rel="noopener noreferrer">
                            {profileData.external_urls?.spotify}
                        </a>
                    </li>
                </ul>
            )}
            <button onClick={handleLogout} className="logout-button">
                Log Out
            </button>
        </div>
    );
};

export default Account;
