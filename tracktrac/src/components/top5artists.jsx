import React from 'react';
import Loading from '../components/loading';
import { ListContainer, List, ListItem, Index, Image, InfoContainer, Title } from "../styles/sharedStyles";

const Top5Artists = ({ artists = [], isExpanded = false }) => {
  if (!artists.length) return <Loading message="Loading artists..." />;

  const firstHalf = artists.slice(0, 5);
  const secondHalf = artists.slice(5);

  return (
    <ListContainer isExpanded={isExpanded}>
      <List>
        {firstHalf.map((artist, index) => (
          <ListItem key={artist.id}>
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
            <ListItem key={artist.id}>
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
  );
};

export default Top5Artists;