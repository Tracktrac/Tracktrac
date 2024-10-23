import React from 'react';

const Top5Songs = ({ tracks }) => {
  if (!tracks.length) return <div>No top songs available</div>;

  return (
    <ul>
      {tracks.map((track, index) => (
        <li key={track.id}>
          {index + 1}. {track.name} by {track.artists.map(artist => artist.name).join(', ')}
        </li>
      ))}
    </ul>
  );
};

export default Top5Songs;
