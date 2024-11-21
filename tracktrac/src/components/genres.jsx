import React, { useEffect, useState } from "react";
import styled from "styled-components"; // Importamos styled-components
import { fetchGenres } from "../services/spotifyApi"; // Ajusta la ruta si es necesario

const GenresList = ({ limit = 5 }) => {
  const [genres, setGenres] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getGenres = async () => {
      const fetchedGenres = await fetchGenres();
      setGenres(fetchedGenres);
      setLoading(false);
    };

    getGenres();
  }, []);

  if (loading) return <p>Loading genres...</p>;

  const genresToDisplay = genres.slice(0, limit);

  return (
    <GenreList>
      {genresToDisplay.map((genre, index) => (
        <GenreItem key={genre}>
          <GenreIndex>{index + 1}</GenreIndex>
          <GenreName>{genre}</GenreName>
        </GenreItem>
      ))}
    </GenreList>
  );
};

// Estilos con styled-components
const GenreList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const GenreItem = styled.li`
  display: flex;
  align-items: center;
  margin-bottom: 15px;
`;

const GenreIndex = styled.div`
  font-size: 2rem;
  font-weight: bold;
  margin-right: 15px;
  color: #fff;
`;

const GenreName = styled.h3`
  font-size: 1rem;
  color: #fff;
  margin: 0;
  text-align: left;
  flex: 1;
  text-transform: uppercase;
`;

export default GenresList;
