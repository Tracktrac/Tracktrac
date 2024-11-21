import React from 'react';
import styled from 'styled-components';
import Loading from '../components/loading';

const Top5Artists = ({ artists = [], isExpanded = false }) => {
  if (!artists.length) return <Loading message="Loading artists..." />;

  const firstHalf = artists.slice(0, 5);
  const secondHalf = artists.slice(5);

  return (
    <ArtistContainer isExpanded={isExpanded}>
      {/* Primera columna (siempre visible) */}
      <ArtistList>
        {firstHalf.map((artist, index) => (
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

      {/* Segunda columna (visible solo cuando está expandido) */}
      {isExpanded && (
        <ArtistList>
          {secondHalf.map((artist, index) => (
            <ArtistItem key={artist.id}>
              <ArtistIndex>{index + 6}</ArtistIndex>
              <ArtistImage 
                src={artist.images[0]?.url} 
                alt={artist.name} 
              />
              <ArtistName>{artist.name}</ArtistName>
            </ArtistItem>
          ))}
        </ArtistList>
      )}
    </ArtistContainer>
  );
};

const ArtistContainer = styled.div`
  display: grid;
  grid-template-columns: ${props => props.isExpanded ? '1fr 1fr' : '1fr'};
  gap: 20px;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const ArtistList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const ArtistItem = styled.li`
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

const ArtistIndex = styled.div`
  font-size: 2rem;
  font-weight: bold;
  margin-right: 15px; 
  color: #fff; 
  min-width: 40px;
  text-align: center;
`;

const ArtistImage = styled.img`
  width: 90px;
  height: 90px;
  margin-right: 16px;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
`;

const ArtistName = styled.h3`
  font-size: 1.1rem;
  font-weight: 600;
  color: #fff;
  margin: 0 0 4px 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

export default Top5Artists;