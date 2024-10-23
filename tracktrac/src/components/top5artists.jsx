import React from 'react';
import Loading from '../components/loading';

const Top5Artists = ({ artists = [] }) => {
  if (!artists.length) return <Loading message="Loading artists..." />;

  return (
    <ul>
      {artists.map((artist, index) => (
        <li key={artist.id} style={{ display: 'flex', alignItems: 'center', marginBottom: '15px' }}>
          <img 
            src={artist.images[0]?.url} 
            alt={artist.name} 
            style={{ width: 100, height: 100, marginRight: '10px', borderRadius: '5px' }}
          />
          <h3>#{index + 1} {artist.name}</h3>
        </li>
      ))}
    </ul>
  );
};

export default Top5Artists;
