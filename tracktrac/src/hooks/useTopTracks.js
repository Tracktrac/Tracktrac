import { useState, useEffect } from 'react';
import { fetchTopTracks } from '../services/spotifyApi';

export const useTopTracks = (timeRange = 'medium_term', limit = 5) => {
  const [topTracks, setTopTracks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTracks = async () => {
      try {
        const data = await fetchTopTracks(timeRange, limit);
        setTopTracks(data.items);
      } catch (err) {
        console.error('Error fetching top tracks:', err);
        setError(`Error: ${err.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchTracks();
  }, [timeRange, limit]);

  return { topTracks, loading, error };
};
