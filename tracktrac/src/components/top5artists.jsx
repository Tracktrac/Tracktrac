import React, { useState } from 'react';
import Loading from '../components/loading';
import { ListContainer, List, ListItem, Index, Image, InfoContainer, Title } from "../styles/sharedStyles";
import ArtistDetailCard from './ArtistDetailCard';
import { fetchArtistDetails } from '../services/spotifyApi';

const Top5Artists = ({ artists = [], isExpanded = false }) => {
  const [selectedArtist, setSelectedArtist] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  if (!artists.length) return <Loading message="Loading artists..." />;

  const firstHalf = artists.slice(0, 5);
  const secondHalf = artists.slice(5);

  const handleArtistClick = async (artistId, e) => {
    // Detener la propagación del evento aquí
    e.preventDefault();
    e.stopPropagation();
    
    if (isExpanded) {
      try {
        setLoading(true);
        const artistDetails = await fetchArtistDetails(artistId);
        setSelectedArtist(artistDetails);
        setModalOpen(true);
      } catch (error) {
        console.error('Error fetching artist details:', error);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleCloseModal = (e) => {
    // Detener la propagación del evento aquí también
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    setModalOpen(false);
  };

  return (
    <div className="relative" onClick={e => e.stopPropagation()}>
      <ListContainer isExpanded={isExpanded}>
        <List>
          {firstHalf.map((artist, index) => (
            <ListItem 
              key={artist.id}
              onClick={(e) => handleArtistClick(artist.id, e)}
              sx={{ 
                cursor: isExpanded ? 'pointer' : 'default',
                '&:hover': isExpanded ? {
                  bgcolor: 'action.hover',
                } : {},
                transition: 'background-color 0.2s',
              }}
            >
              <Index>{index + 1}</Index>
              <Image src={artist.images[0]?.url} alt={artist.name} />
              <InfoContainer>
                <Title>{artist.name}</Title>
              </InfoContainer>
            </ListItem>
          ))}
        </List>

        {isExpanded && (
          <List>
            {secondHalf.map((artist, index) => (
              <ListItem 
                key={artist.id}
                onClick={(e) => handleArtistClick(artist.id, e)}
                sx={{ 
                  cursor: 'pointer',
                  '&:hover': {
                    bgcolor: 'action.hover',
                  },
                  transition: 'background-color 0.2s',
                }}
              >
                <Index>{index + 6}</Index>
                <Image src={artist.images[0]?.url} alt={artist.name} />
                <InfoContainer>
                  <Title>{artist.name}</Title>
                </InfoContainer>
              </ListItem>
            ))}
          </List>
        )}
      </ListContainer>
      
      <ArtistDetailCard 
        artist={selectedArtist}
        open={modalOpen}
        onClose={handleCloseModal}
      />
    </div>
  );
};

export default Top5Artists;