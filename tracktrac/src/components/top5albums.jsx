import React from 'react';
import Loading from '../components/loading';

const Top5Albums = ({ albums = [] }) => {
  if (albums.length === 0) return <Loading message="Loading albums..." />;

  return (
    <ul>
      {albums.map((album, index) => (
        <li key={album.id} style={{ display: 'flex', alignItems: 'center', marginBottom: '15px' }}>
          <img 
          src={album.image} 
          alt={album.name} 
          style={{ width: 100, height: 100, marginRight: '10px', borderRadius: '10px' }} 
          />
					<div>
						<h3>#{index + 1} {album.name} </h3>
						<p> by {album.artist} </p>
					</div>
        </li>
      ))}
    </ul>
  );
};

export default Top5Albums;
