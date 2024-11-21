import { useState, useEffect } from 'react';
import { fetchTopArtists } from '../services/spotifyApi';

export const useTopArtists = (timeRange = 'medium_term', limit = 5) => {
  const [topArtists, setTopArtists] = useState([]);
  const [totalArtists, setTotalArtists] = useState(0);  // Para almacenar el total de artistas
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchArtists = async () => {
      try {
        const data = await fetchTopArtists(timeRange, limit);
        setTopArtists(data.items);

        // Calcular el total de artistas únicos
        const uniqueArtists = new Set(data.items.map((artist) => artist.id));
        setTotalArtists(uniqueArtists.size);
      } catch (err) {
        console.error('Error fetching top artists:', err);
        setError(`Error: ${err.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchArtists();
  }, [timeRange, limit]);

  return { topArtists, totalArtists, loading, error };
};
