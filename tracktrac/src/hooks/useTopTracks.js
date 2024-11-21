import { useState, useEffect } from 'react';
import { fetchTopTracks } from '../services/spotifyApi';

export const useTopTracks = (timeRange = 'medium_term', limit = 5) => {
  const [topTracks, setTopTracks] = useState([]);
  const [totalTracks, setTotalTracks] = useState(0);
  const [totalMinutes, setTotalMinutes] = useState(0); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTracks = async () => {
      try {
        const data = await fetchTopTracks(timeRange, limit);
        setTopTracks(data.items);

        // Calcular el total de tracks
        const totalTrackCount = data.items.length;
        setTotalTracks(totalTrackCount);

        // Calcular el total de minutos
        const totalMinutesCount = data.items.reduce((total, track) => {
          // Convertir duración de milisegundos a minutos
          const trackDurationInMinutes = track.duration_ms / 1000 / 60;
          return total + trackDurationInMinutes;
        }, 0);
        setTotalMinutes(totalMinutesCount);
      } catch (err) {
        console.error('Error fetching top tracks:', err);
        setError(`Error: ${err.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchTracks();
  }, [timeRange, limit]);

  return { topTracks, totalTracks, totalMinutes, loading, error };
};
