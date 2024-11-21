import { useState, useEffect } from 'react';
import { fetchTopArtists } from '../services/spotifyApi';

export const useTopArtists = (timeRange = 'medium_term', initialLimit = 5) => {
  const [topArtists, setTopArtists] = useState([]);
  const [totalArtists, setTotalArtists] = useState(0);  // Para almacenar el total de artistas
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [limit, setLimit] = useState(initialLimit);

  useEffect(() => {
    const fetchArtists = async () => {
      try {
        const data = await fetchTopArtists(timeRange, 10);
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
  }, [timeRange]);

  return { topArtists: topArtists.slice(0, limit), totalArtists, loading, error, setLimit };
};
