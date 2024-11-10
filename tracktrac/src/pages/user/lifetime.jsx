import React, { useState } from 'react';

function UploadHistory() {
  const [topSongs, setTopSongs] = useState([]);

  const handleFilesUpload = (event) => {
    const files = Array.from(event.target.files);
    const promises = files.map((file) => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (e) => {
          try {
            const json = JSON.parse(e.target.result);
            resolve(json);
          } catch (error) {
            reject(error);
          }
        };
        reader.readAsText(file);
      });
    });

    Promise.all(promises)
      .then((results) => {
        const allData = results.flat(); // Combina todos los datos de los archivos
        processTopSongs(allData);
      })
      .catch((error) => console.error('Error loading files:', error));
  };

  const processTopSongs = (data) => {
    const songCounts = {};

    data.forEach((item) => {
      const trackName = item.master_metadata_track_name;
      if (trackName) {
        songCounts[trackName] = (songCounts[trackName] || 0) + 1;
      }
    });

    // Ordena las canciones por cantidad de reproducciones
    const sortedSongs = Object.entries(songCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5); // Top 5 canciones

    setTopSongs(sortedSongs);
  };

  return (
    <div>
      <h1>Top 5 Canciones Más Escuchadas</h1>
      <input type="file" accept=".json" multiple onChange={handleFilesUpload} />
      <div>
        {topSongs.length > 0 ? (
          <ul>
            {topSongs.map(([song, count], index) => (
              <li key={index}>
                {index + 1}. {song} - {count} reproducciones
              </li>
            ))}
          </ul>
        ) : (
          <p>Sube tus archivos para ver tus canciones más escuchadas.</p>
        )}
      </div>
    </div>
  );
}

export default UploadHistory;
