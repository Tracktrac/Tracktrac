import { useState, useEffect } from 'react';
import { useTopTracks } from './useTopTracks';

export const useTopAlbums = (timeRange = 'medium_term', limit = 50) => {
  const { topTracks, loading, error } = useTopTracks(timeRange, limit );
  const [topAlbums, setTopAlbums] = useState([]);

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
        .slice(0, 5);
      setTopAlbums(sortedAlbums);
    }
  }, [topTracks]);

  return { topAlbums, loading, error };
};
