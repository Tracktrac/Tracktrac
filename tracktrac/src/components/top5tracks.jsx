import React from 'react';
import styled from 'styled-components';
import Loading from '../components/loading';

const Top5Tracks = ({ tracks = [] }) => {
  if (!tracks.length) return <Loading message="Loading tracks..." />;

  return (
    <TrackList>
      {tracks.map((track, index) => (
        <TrackItem key={track.id}>
          <TrackIndex>{index + 1}</TrackIndex>
          <TrackImage 
            src={track.album.images[0].url} 
            alt={track.album.name} 
          />
          <TrackInfo>
            <TrackTitle>
              {track.name}
            </TrackTitle>
            <TrackArtists>
              by {track.artists.map(artist => artist.name).join(', ')}
            </TrackArtists>
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
  margin-bottom: 15px;
`;

const TrackIndex = styled.div`
  font-size: 2rem;
  font-weight: bold;
  margin-right: 15px; 
  color: #fff; 
`;

const TrackImage = styled.img`
  width: 100px;
  height: 100px;
  margin-right: 10px;
  border-radius: 10px;
`;

const TrackInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const TrackTitle = styled.h3`
  font-size: 1.1rem;
  margin: 0;
  align-items: flex-start;
  text-align: left;
`;

const TrackArtists = styled.p`
  font-size: 0.9rem;
  color: #fff;
  margin: 0;
  align-items: flex-start;
  text-align: left;
`;

export default Top5Tracks;
