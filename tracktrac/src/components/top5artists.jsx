import React from 'react';
import styled from 'styled-components';
import Loading from '../components/loading';

const Top5Artists = ({ artists = [] }) => {
  if (!artists.length) return <Loading message="Loading artists..." />;

  return (
    <ArtistList>
      {artists.map((artist, index) => (
        <ArtistItem key={artist.id}>
          <ArtistIndex>{index + 1}</ArtistIndex>
          <ArtistImage 
            src={artist.images[0]?.url} 
            alt={artist.name} 
          />
          <ArtistName>{artist.name}</ArtistName>
        </ArtistItem>
      ))}
    </ArtistList>
  );
};

// Estilos con styled-components
const ArtistList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const ArtistItem = styled.li`
  display: flex;
  align-items: center;
  margin-bottom: 15px;
`;

const ArtistIndex = styled.div`
  font-size: 2rem; 
  font-weight: bold;
  margin-right: 15px; 
  color: #fff; 
`;

const ArtistImage = styled.img`
  width: 100px;
  height: 100px;
  margin-right: 10px;
  border-radius: 10px; 
`;

const ArtistName = styled.h3`
  font-size: 1.1rem;
  color: #fff;
  margin: 0;
  align-items: flex-start;
  text-align: left;
`;

export default Top5Artists;
