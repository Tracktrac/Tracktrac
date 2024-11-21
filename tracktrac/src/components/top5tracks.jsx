import React from 'react';
import styled from 'styled-components';
import Loading from '../components/loading';

const Top5Tracks = ({ tracks = [], isExpanded = false }) => {
  if (!tracks.length) return <Loading message="Loading tracks..." />;

  const firstHalf = tracks.slice(0, 5);
  const secondHalf = tracks.slice(5);

  return (
    <TrackContainer isExpanded={isExpanded}>
      {/* Primera columna (siempre visible) */}
      <TrackList>
        {firstHalf.map((track, index) => (
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

      {/* Segunda columna (visible solo cuando está expandido) */}
      {isExpanded && (
        <TrackList>
          {secondHalf.map((track, index) => (
            <TrackItem key={track.id}>
              <TrackIndex>{index + 6}</TrackIndex>
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
      )}
    </TrackContainer>
  );
};


const TrackContainer = styled.div`
  display: grid;
  grid-template-columns: ${props => props.isExpanded ? '1fr 1fr' : '1fr'};
  gap: 20px;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const TrackList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const TrackItem = styled.li`
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

const TrackIndex = styled.div`
  font-size: 2rem;
  font-weight: bold;
  margin-right: 15px; 
  color: #fff; 
  min-width: 40px;
  text-align: center;
`;

const TrackImage = styled.img`
  width: 90px;
  height: 90px;
  margin-right: 16px;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
`;

const TrackInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex: 1;
  min-width: 0;
`;

const TrackTitle = styled.h3`
  font-size: 1.1rem;
  font-weight: 600;
  color: #fff;
  margin: 0 0 4px 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const TrackArtists = styled.p`
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.7);
  margin: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export default Top5Tracks;