import React from 'react';
import styled from 'styled-components';
import Loading from '../components/loading';

const Top5Albums = ({ albums = [] }) => {
  if (albums.length === 0) return <Loading message="Loading albums..." />;

  return (
    <AlbumList>
      {albums.map((album, index) => (
        <AlbumItem key={album.id}>
          <AlbumIndex>{index + 1}</AlbumIndex>
          <AlbumImage 
            src={album.image} 
            alt={album.name} 
          />
          <AlbumInfo>
            <AlbumTitle>{album.name}</AlbumTitle>
            <AlbumArtist>by {album.artist}</AlbumArtist>
          </AlbumInfo>
        </AlbumItem>
      ))}
    </AlbumList>
  );
};

// Estilos con styled-components
const AlbumList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const AlbumItem = styled.li`
  display: flex;
  align-items: center;
  margin-bottom: 15px;
`;

const AlbumIndex = styled.div`
  font-size: 2rem; 
  font-weight: bold;
  margin-right: 15px; 
  color: #fff;
`;

const AlbumImage = styled.img`
  width: 100px;
  height: 100px;
  margin-right: 10px;
  border-radius: 10px; 
`;

const AlbumInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const AlbumTitle = styled.h3`
font-size: 1.1rem;
  color: #fff;
  margin: 0;
  align-items: flex-start;
  text-align: left;
`;

const AlbumArtist = styled.p`
  font-size: 0.9rem;
  color: #ccc; 
  margin: 0;
  align-items: flex-start;
  text-align: left;
`;

export default Top5Albums;
