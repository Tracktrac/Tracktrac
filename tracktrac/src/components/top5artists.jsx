import React from 'react';

const Top5Artists = ({ artists }) => {
  if (!artists.length) return <div>No top artists available</div>;

  return (
    <ul>
      {artists.map((artist, index) => (
        <li key={artist.id}>
          {index + 1}. {artist.name} 
        </li>
      ))}
    </ul>
  );
};

export default Top5Artists;
