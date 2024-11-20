import React from 'react';
import styled from 'styled-components';
import Loading from '../components/loading';

const MostListenedArtists = ({ artists = [] }) => {
    if (!artists.length) return <Loading message="Loading artists..." />;
  
    return (
      <TrackList>
        {artists.map(([artist, count], index) => (
          <TrackItem key={`artist-${index}`}>
            <TrackIndex>{index + 1}</TrackIndex>
            <TrackInfo>
              <TrackTitle>{artist}</TrackTitle>
              <TrackArtists>{count} streams</TrackArtists>
            </TrackInfo>
          </TrackItem>
        ))}
      </TrackList>
    );
  };

// Estilos con styled-components
const TrackList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const TrackItem = styled.li`
  display: flex;
  align-items: center;
  margin-bottom: 25px;
`;

const TrackIndex = styled.div`
  font-size: 1.3rem;
  font-weight: bold;
  margin-right: 15px; 
  color: #fff; 
`;

const TrackInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const TrackTitle = styled.h3`
  font-size: 1rem;
  margin: 0;
  align-items: flex-start;
  text-align: left;
`;

const TrackArtists = styled.p`
  font-size: 0.8rem;
  color: #fff;
  margin: 0;
  align-items: flex-start;
  text-align: left;
`;

export default MostListenedArtists;
