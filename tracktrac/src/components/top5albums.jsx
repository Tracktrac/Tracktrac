import React, { useState } from 'react';
import Loading from '../components/loading';
import { ListContainer, List, ListItem, Index, Image, InfoContainer, Title, Subtitle } from "../styles/sharedStyles";
import AlbumDetailCard from './AlbumDetailCard';
import { fetchAlbumDetails } from '../services/spotifyApi';

const Top5Albums = ({ albums = [], isExpanded = false }) => {
  const [selectedAlbum, setSelectedAlbum] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  if (!albums.length) return <Loading message="Loading albums..." />;

  const firstHalf = albums.slice(0, 5);
  const secondHalf = albums.slice(5);

  const handleAlbumClick = async (albumId, e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (isExpanded) {
      try {
        setLoading(true);
        const albumDetails = await fetchAlbumDetails(albumId);
        setSelectedAlbum(albumDetails);
        setModalOpen(true);
      } catch (error) {
        console.error('Error fetching album details:', error);
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
      <ListContainer isExpanded={isExpanded}>
        <List>
          {firstHalf.map((album, index) => (
            <ListItem 
              key={album.id}
              onClick={(e) => handleAlbumClick(album.id, e)}
              sx={{ 
                cursor: isExpanded ? 'pointer' : 'default',
                '&:hover': isExpanded ? {
                  bgcolor: 'action.hover',
                } : {},
                transition: 'background-color 0.2s',
              }}
            >
              <Index>{index + 1}</Index>
              <Image src={album.image} alt={album.name} />
              <InfoContainer>
                <Title>{album.name}</Title>
                <Subtitle>by {album.artist}</Subtitle>
              </InfoContainer>
            </ListItem>
          ))}
        </List>

        {isExpanded && (
          <List>
            {secondHalf.map((album, index) => (
              <ListItem 
                key={album.id}
                onClick={(e) => handleAlbumClick(album.id, e)}
                sx={{ 
                  cursor: 'pointer',
                  '&:hover': {
                    bgcolor: 'action.hover',
                  },
                  transition: 'background-color 0.2s',
                }}
              >
                <Index>{index + 6}</Index>
                <Image src={album.image} alt={album.name} />
                <InfoContainer>
                  <Title>{album.name}</Title>
                  <Subtitle>by {album.artist}</Subtitle>
                </InfoContainer>
              </ListItem>
            ))}
          </List>
        )}
      </ListContainer>

      <AlbumDetailCard 
        album={selectedAlbum}
        open={modalOpen}
        onClose={handleCloseModal}
      />
    </div>
  );
};

export default Top5Albums;