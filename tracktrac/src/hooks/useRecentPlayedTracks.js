import { useState, useEffect } from 'react';
import { fetchRecentlyPlayedTracks } from '../services/spotifyApi';

export const useRecentPlayedTracks = (limit = 30) => {
  const [recentTracks, setRecentTracks] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTracks = async () => {
      try {
        const data = await fetchRecentlyPlayedTracks(limit);
        setRecentTracks(data.items);
      } catch (err) {
        console.error('Error fetching recently played tracks:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    const token = localStorage.getItem('api_token');
    if (token) {
      fetchTracks();
    } else {
      setLoading(false);
      setError('No API token found, please log in.');
    }
  }, [limit]);

  return { recentTracks, loading, error };
};
