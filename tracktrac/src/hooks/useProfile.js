import { useState, useEffect } from 'react';
import { fetchProfileData } from '../services/spotifyApi';


export const useProfile = () => {
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await fetchProfileData();
        setProfileData(data);
      } catch (err) {
        console.error('Error fetching profile:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    const token = localStorage.getItem('api_token');
    if (token) {
      fetchProfile();
    } else {
      setLoading(false); 
      setError('No API token found, please log in.');
    }
  }, []);

  return { profileData, loading, error };
};
