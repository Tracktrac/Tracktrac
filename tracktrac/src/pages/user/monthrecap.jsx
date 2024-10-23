import React from 'react';
import Top5Tracks from '../../components/top5tracks'; 
import Top5Artists from '../../components/top5artists'; 
import Top5Albums from '../../components/top5albums';
import { useTopTracks } from '../../hooks/useTopTracks';
import { useTopArtists } from '../../hooks/useTopArtists';
import { useTopAlbums } from '../../hooks/useTopAlbums';
import '../../styles/recap.css';


const MonthRecap = () => {
  const { topTracks, loading, error } = useTopTracks('short_term'); 
  const { topArtists } = useTopArtists('short_term'); 
  const { topAlbums } = useTopAlbums('short_term');

  if (loading) return <div>Loading...</div>;
  if (error) return <div style={{ color: 'red' }}>{error}</div>;
  console.log('Top Albums (Passed to Component):', topAlbums); 
  

  return (
    <div>
      <h1>Month Recap</h1>
      <div className='top-container'>
        <h1>Your Top Tracks</h1>
        <Top5Tracks tracks={topTracks} />
      </div>
      <div className='top-container'>
        <h1>Your Top Artists</h1>
        <Top5Artists artists={topArtists} />
      </div>
      <div className='top-container'>
        <h1>Your Top Albums</h1>
        <Top5Albums albums={topAlbums} />
      </div>
    </div>
  );
};

export default MonthRecap;
