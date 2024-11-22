import { useState, useEffect } from 'react';
import { useTopTracks } from './useTopTracks';

export const useTopAlbums = (timeRange = 'medium_term', initialLimit = 5) => {
  // Solicitamos 50 tracks para asegurarnos de tener suficientes álbumes únicos
  const { topTracks, loading, error } = useTopTracks(timeRange, 50);
  const [topAlbums, setTopAlbums] = useState([]);
  const [totalAlbums, setTotalAlbums] = useState(0);
  const [limit, setLimit] = useState(initialLimit);

  useEffect(() => {
    if (topTracks.length) {
      const albumMap = new Map();

      // Procesamos todos los tracks para obtener álbumes únicos
      topTracks.forEach((track) => {
        const album = track.album;
        if (albumMap.has(album.id)) {
          albumMap.get(album.id).count += 1;
        } else {
          albumMap.set(album.id, {
            id: album.id,
            name: album.name,
            artist: album.artists.map((artist) => artist.name).join(', '),
            image: album.images?.[0]?.url || '',
            count: 1,
          });
        }
      });

      // Convertimos el Map a array y ordenamos por conteo
      const sortedAlbums = Array.from(albumMap.values())
        .sort((a, b) => b.count - a.count);

      setTopAlbums(sortedAlbums);
      setTotalAlbums(albumMap.size);
    }
  }, [topTracks]);

  // Retornamos solo la cantidad solicitada de álbumes
  return {
    topAlbums: topAlbums.slice(0, limit),
    totalAlbums,
    loading,
    error,
    setLimit
  };
};