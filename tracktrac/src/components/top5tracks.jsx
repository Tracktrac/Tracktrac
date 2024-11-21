import React from 'react';
import Loading from '../components/loading';
import { ListContainer, List, ListItem, Index, Image, InfoContainer, Title, Subtitle } from "../styles/sharedStyles";

const Top5Tracks = ({ tracks = [], isExpanded = false }) => {
  if (!tracks.length) return <Loading message="Loading tracks..." />;

  const firstHalf = tracks.slice(0, 5);
  const secondHalf = tracks.slice(5);

  return (
    <ListContainer isExpanded={isExpanded}>
      <List>
        {firstHalf.map((track, index) => (
          <ListItem key={track.id}>
            <Index>{index + 1}</Index>
            <Image src={track.album.images[0].url} alt={track.album.name} />
            <InfoContainer>
              <Title>{track.name}</Title>
              <Subtitle>
                by {track.artists.map(artist => artist.name).join(', ')}
              </Subtitle>
            </InfoContainer>
          </ListItem>
        ))}
      </List>

      {isExpanded && (
        <List>
          {secondHalf.map((track, index) => (
            <ListItem key={track.id}>
              <Index>{index + 6}</Index>
              <Image src={track.album.images[0].url} alt={track.album.name} />
              <InfoContainer>
                <Title>{track.name}</Title>
                <Subtitle>
                  by {track.artists.map(artist => artist.name).join(', ')}
                </Subtitle>
              </InfoContainer>
            </ListItem>
          ))}
        </List>
      )}
    </ListContainer>
  );
};

export default Top5Tracks;