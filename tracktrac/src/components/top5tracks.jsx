import React, { useState } from 'react';
import Loading from '../components/loading';
import { ListContainer, List, ListItem, Index, Image, InfoContainer, Title, Subtitle } from "../styles/sharedStyles";
import TrackDetailCard from './TrackDetailCard';
import { fetchTrackDetails } from '../services/spotifyApi';

const Top5Tracks = ({ tracks = [], isExpanded = false }) => {
  const [selectedTrack, setSelectedTrack] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  // eslint-disable-next-line
  const [loading, setLoading] = useState(false);

  if (!tracks.length) return <Loading message="Loading tracks..." />;

  const firstHalf = tracks.slice(0, 5);
  const secondHalf = tracks.slice(5);

  const handleTrackClick = async (trackId, e) => {
    e.preventDefault();
    e.stopPropagation();

    if (isExpanded) {
      try {
        setLoading(true);
        const trackDetails = await fetchTrackDetails(trackId);
        setSelectedTrack(trackDetails);
        setModalOpen(true); 
      } catch (error) {
        console.error('Error fetching track details:', error);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleCloseModal = (e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    setModalOpen(false);
  };

  return (
    <div className="relative" onClick={e => e.stopPropagation()}>
      <ListContainer isExpanded={isExpanded} >
        <List>
          {firstHalf.map((track, index) => (
            <ListItem 
              key={track.id}
              onClick={(e) => handleTrackClick(track.id, e)}
              sx={{ 
                cursor: isExpanded ? 'pointer' : 'default',
                '&:hover': isExpanded ? {
                  bgcolor: 'action.hover',
                } : {},
                transition: 'background-color 0.2s',
              }}
            >
              <Index>{index + 1}</Index>
              <Image src={track.album.images[0].url} alt={track.album.name} />
              <InfoContainer>
                <Title>{track.name}</Title>
                <Subtitle>by {track.artists.map(artist => artist.name).join(', ')}</Subtitle>
              </InfoContainer>
            </ListItem>
          ))}
        </List>

        {isExpanded && (
          <List>
            {secondHalf.map((track, index) => (
              <ListItem 
                key={track.id}
                onClick={(e) => handleTrackClick(track.id, e)}
                sx={{ 
                  cursor: 'pointer',
                  '&:hover': {
                    bgcolor: 'action.hover',
                  },
                  transition: 'background-color 0.2s',
                }}
              >
                <Index>{index + 6}</Index>
                <Image src={track.album.images[0].url} alt={track.album.name} />
                <InfoContainer>
                  <Title>{track.name}</Title>
                  <Subtitle>by {track.artists.map(artist => artist.name).join(', ')}</Subtitle>
                </InfoContainer>
              </ListItem>
            ))}
          </List>
        )}
      </ListContainer>
  
      <TrackDetailCard 
        track={selectedTrack}
        open={modalOpen}
        onClose={handleCloseModal}
      />
    </div>
  );
};

export default Top5Tracks;