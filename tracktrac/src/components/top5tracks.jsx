import React from 'react';
import Loading from '../components/loading';

const Top5Tracks = ({ tracks = [] }) => {
  if (!tracks.length) return <Loading message="Loading albums..." />;

  return (
    <ul>
      {tracks.map((track, index) => (
        <li key={track.id} style={{ display: 'flex', alignItems: 'center', marginBottom: '15px' }}>
          <img 
            src={track.album.images[0].url} 
            alt={track.album.name} 
            style={{ width: 100, height: 100, marginRight: '10px', borderRadius: '10px' }}
          />
          <div>
            <h3>#{index + 1} {track.name}</h3>
            <p>by {track.artists.map(artist => artist.name).join(', ')}</p>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default Top5Tracks;
