import { useState, useEffect } from 'react';
import { fetchTopArtists } from '../services/spotifyApi';

export const useTopArtists = (timeRange = 'medium_term', limit = 5) => {
  const [topArtists, setTopArtists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchArtists = async () => {
      try {
        const data = await fetchTopArtists(timeRange, limit);
        setTopArtists(data.items);
      } catch (err) {
        console.error('Error fetching top tracks:', err);
        setError(`Error: ${err.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchArtists();
  }, [timeRange, limit]);

  return { topArtists, loading, error };
};
