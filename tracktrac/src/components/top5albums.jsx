import React from 'react';
import Loading from '../components/loading';
import { ListContainer, List, ListItem, Index, Image, InfoContainer, Title, Subtitle } from "../styles/sharedStyles";

const Top5Albums = ({ albums = [], isExpanded = false }) => {
  if (!albums.length) return <Loading message="Loading albums..." />;

  const firstHalf = albums.slice(0, 5);
  const secondHalf = albums.slice(5);

  return (
    <ListContainer isExpanded={isExpanded}>
      <List>
        {firstHalf.map((album, index) => (
          <ListItem key={album.id}>
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
            <ListItem key={album.id}>
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
  );
};

export default Top5Albums;