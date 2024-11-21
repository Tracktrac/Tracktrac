import React from 'react';
import styled from 'styled-components';
import Loading from '../components/loading';

const Top5Albums = ({ albums = [], isExpanded = false }) => {
  if (!albums.length) return <Loading message="Loading albums..." />;

  const firstHalf = albums.slice(0, 5);
  const secondHalf = albums.slice(5);

  return (
    <AlbumContainer isExpanded={isExpanded}>
      {/* Primera columna (siempre visible) */}
      <AlbumList>
        {firstHalf.map((album, index) => (
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

      {/* Segunda columna (visible solo cuando está expandido) */}
      {isExpanded && (
        <AlbumList>
          {secondHalf.map((album, index) => (
            <AlbumItem key={album.id}>
              <AlbumIndex>{index + 6}</AlbumIndex>
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
      )}
    </AlbumContainer>
  );
};

const AlbumContainer = styled.div`
  display: grid;
  grid-template-columns: ${props => props.isExpanded ? '1fr 1fr' : '1fr'};
  gap: 20px;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const AlbumList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const AlbumItem = styled.li`
  display: flex;
  align-items: center;
  margin-bottom: ${props => props.isExpanded ? '0' : '15px'};
  padding: 10px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  backdrop-filter: blur(8px);
  
  &:hover {
    background: rgba(255, 255, 255, 0.08);
    transform: translateX(4px);
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  }

  &:last-child {
    margin-bottom: 0;
  }
`;

const AlbumIndex = styled.div`
  font-size: 2rem;
  font-weight: bold;
  margin-right: 15px; 
  color: #fff; 
  min-width: 40px;
  text-align: center;
`;

const AlbumImage = styled.img`
  width: 90px;
  height: 90px;
  margin-right: 16px;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
`;

const AlbumInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex: 1;
  min-width: 0;
`;

const AlbumTitle = styled.h3`
  font-size: 1.1rem;
  font-weight: 600;
  color: #fff;
  margin: 0 0 4px 0;
  white-space: normal;
  overflow: hidden;
  text-overflow: ellipsis;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const AlbumArtist = styled.p`
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.7);
  margin: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export default Top5Albums;