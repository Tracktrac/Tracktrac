import React from 'react';
import Top5Tracks from '../../components/top5tracks'; 
import Top5Artists from '../../components/top5artists'; 
import { useTopTracks } from '../../hooks/useTopTracks';
import { useTopArtists } from '../../hooks/useTopArtists';
import '../../styles/recap.css';


const MonthRecap = () => {
  const { topTracks, loading, error } = useTopTracks('short_term'); 
  const { topArtists } = useTopArtists('short_term'); 

  if (loading) return <div>Loading...</div>;
  if (error) return <div style={{ color: 'red' }}>{error}</div>;
  

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
    </div>
  );
};

export default MonthRecap;
