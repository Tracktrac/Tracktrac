import React from 'react';

const Top5Albums = ({ albums = [] }) => { // Valor por defecto: []
  if (albums.length === 0) return <div>No top albums available</div>;

  return (
    <ul>
      {albums.map((album, index) => (
        <li key={album.id}>
          <h3>{index + 1}. {album.name} by {album.artist}</h3>
          <img src={album.image} alt={album.name} style={{ width: 100, height: 100 }} />
        </li>
      ))}
    </ul>
  );
};

export default Top5Albums;
