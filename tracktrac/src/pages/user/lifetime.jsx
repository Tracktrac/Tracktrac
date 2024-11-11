// pages/user/lifetime.jsx
import React, { useState, useEffect } from 'react';
import { useDataContext } from '../../context/DataContext';

function UploadHistory() {
  const { uploadedData, uploadedFilesInfo, errorMessage, handleFilesUpload } = useDataContext();
  const [topSongs, setTopSongs] = useState([]);

  useEffect(() => {
    if (uploadedData.length > 0) {
      processTopSongs(uploadedData);
    }
  }, [uploadedData]);

  const processTopSongs = (data) => {
    const songCounts = {};

    data.forEach((item) => {
      const trackName = item.master_metadata_track_name;
      if (trackName) {
        songCounts[trackName] = (songCounts[trackName] || 0) + 1;
      }
    });

    const sortedSongs = Object.entries(songCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5);

    setTopSongs(sortedSongs);
  };

  return (
    <div>
      <h1>Top 5 Canciones Más Escuchadas</h1>

      {/* Muestra los archivos subidos o el campo para subir archivos si no hay archivos subidos */}
      {uploadedFilesInfo.length === 0 ? (
        <input
          type="file"
          accept=".json"
          multiple
          onChange={(e) => handleFilesUpload(e.target.files)}
        />
      ) : (
        <div>
          <h3>Archivos subidos:</h3>
          <ul>
            {uploadedFilesInfo.map((fileName, index) => (
              <li key={index}>{fileName}</li>
            ))}
          </ul>
          <p>Total de archivos: {uploadedFilesInfo.length}</p>
        </div>
      )}

      {/* Mensaje de error si el archivo no es JSON */}
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}

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
