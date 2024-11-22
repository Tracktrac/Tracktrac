import { useState, useEffect } from 'react';
import { fetchTopTracks } from '../services/spotifyApi';

export const useTopTracks = (timeRange = 'medium_term', initialLimit = 10) => {
  const [topTracks, setTopTracks] = useState([]);
  const [totalTracks, setTotalTracks] = useState(0);
  const [totalMinutes, setTotalMinutes] = useState(0); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [limit, setLimit] = useState(initialLimit);

  useEffect(() => {
    const fetchTracks = async () => {
      try {
        // Solicitamos 50 tracks para tener suficientes datos
        const data = await fetchTopTracks(timeRange, 50);
        setTopTracks(data.items);

        // Calculamos totales
        const totalTrackCount = data.items.length;
        setTotalTracks(totalTrackCount);

        const totalMinutesCount = data.items.reduce((total, track) => {
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
  }, [timeRange]);

  return { 
    // Solo retornamos la cantidad solicitada de tracks
    topTracks: topTracks.slice(0, limit), 
    totalTracks, 
    totalMinutes, 
    loading, 
    error, 
    setLimit 
  };
};