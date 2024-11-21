import { useState, useEffect } from 'react';
import { useTopTracks } from './useTopTracks';

export const useTopAlbums = (timeRange = 'medium_term', initialLimit = 5) => {
  const { topTracks, loading, error } = useTopTracks(timeRange, 50);
  const [topAlbums, setTopAlbums] = useState([]);
  const [totalAlbums, setTotalAlbums] = useState(0);  // Para almacenar el total de álbumes
  const [limit, setLimit] = useState(initialLimit);

  useEffect(() => {
    if (topTracks.length) {
      const albumMap = new Map();

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

      const sortedAlbums = Array.from(albumMap.values())
        .sort((a, b) => b.count - a.count)
        .slice(0, 10);
      setTopAlbums(sortedAlbums);

      // Establecer el total de álbumes diferentes
      setTotalAlbums(albumMap.size);
    }
  }, [topTracks]);

  return { topAlbums: topAlbums.slice(0, limit), totalAlbums, loading, error, setLimit };
};
