import React, { useState, useEffect } from 'react';

const Home = () => {
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchProfile() {
      const apiToken = localStorage.getItem('api_token');
      
      if (!apiToken) {
        setError("No API token found in local storage");
        setLoading(false);
        return;
      }

      try {
        const result = await fetch("https://api.spotify.com/v1/me", {
          method: "GET",
          headers: { Authorization: `Bearer ${apiToken}` }
        });
        if (!result.ok) {
          throw new Error('Failed to fetch profile data');
        }
        const data = await result.json();
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

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div style={{ color: 'red' }}>Error: {error}</div>;
  }

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
          <li>Spotify URL: <a href={profileData.external_urls?.spotify} target="_blank" rel="noopener noreferrer">{profileData.external_urls?.spotify}</a></li>
        </ul>
      )}
    </div>
  );
};

export default Home;