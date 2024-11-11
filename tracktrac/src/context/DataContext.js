// src/context/DataContext.js
import React, { createContext, useContext, useState } from 'react';

const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [uploadedData, setUploadedData] = useState([]);
  const [uploadedFilesInfo, setUploadedFilesInfo] = useState([]);
  const [errorMessage, setErrorMessage] = useState(''); // Nuevo estado para mensajes de error

  const handleFilesUpload = (files) => {
    const validFiles = Array.from(files).filter((file) => file.type === 'application/json');
    
    if (validFiles.length !== files.length) {
      setErrorMessage('Solo se permiten archivos JSON.');
      return;
    }

    setErrorMessage(''); // Limpia cualquier mensaje de error previo
    const fileNames = validFiles.map((file) => file.name);
    setUploadedFilesInfo(fileNames);

    const promises = validFiles.map((file) => {
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
        setUploadedData((prevData) => [...prevData, ...allData]);
      })
      .catch((error) => console.error('Error loading files:', error));
  };

  return (
    <DataContext.Provider value={{ uploadedData, uploadedFilesInfo, errorMessage, handleFilesUpload }}>
      {children}
    </DataContext.Provider>
  );
};

export const useDataContext = () => useContext(DataContext);
