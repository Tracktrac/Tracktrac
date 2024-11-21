const API_BASE_URL = "https://api.spotify.com/v1";

// Función para obtener el token desde localStorage
const getApiToken = () => localStorage.getItem('api_token');

// Función para hacer fetch del perfil del usuario
export const fetchProfileData = async () => {
  const apiToken = getApiToken();
  if (!apiToken) throw new Error("No API token found");

  const response = await fetch(`${API_BASE_URL}/me`, {
    headers: { Authorization: `Bearer ${apiToken}` },
  });

  if (!response.ok) throw new Error('Failed to fetch profile data');
  return response.json();
};


// Función para hacer fetch de las pistas reproducidas recientemente
export const fetchRecentlyPlayedTracks = async (limit = 20) => {
  const apiToken = getApiToken();
  if (!apiToken) throw new Error("No API token found");

  const response = await fetch(
    `${API_BASE_URL}/me/player/recently-played?limit=${limit}`,
    { headers: { Authorization: `Bearer ${apiToken}` } }
  );

  if (!response.ok) {
    const errorData = await response.json();
    console.error('Error fetching recently played tracks:', errorData);
    throw new Error(`Recently played tracks fetch failed: ${errorData.error.message}`);
  }

  return response.json();
};


// Función para hacer fetch de las top canciones 
export const fetchTopTracks = async (timeRange = 'medium_term', limit = 5) => {
  const apiToken = getApiToken();
  if (!apiToken) throw new Error("No API token found");

  const response = await fetch(
    `${API_BASE_URL}/me/top/tracks?time_range=${timeRange}&limit=${limit}`,
    { headers: { Authorization: `Bearer ${apiToken}` } }
  );

  if (!response.ok) {
    const errorData = await response.json();
    console.error('Error fetching top tracks:', errorData);
    throw new Error(`Top tracks fetch failed: ${errorData.error.message}`);
  }

  return response.json();
};

// Función para hacer fetch de las top artistas 
export const fetchTopArtists = async (timeRange = 'medium_term', limit = 5) => {
  const apiToken = getApiToken();
  if (!apiToken) throw new Error("No API token found");

  const response = await fetch(
    `${API_BASE_URL}/me/top/artists?time_range=${timeRange}&limit=${limit}`,
    { headers: { Authorization: `Bearer ${apiToken}` } }
  );

  if (!response.ok) {
    const errorData = await response.json();
    console.error('Error fetching top tracks:', errorData);
    throw new Error(`Top tracks fetch failed: ${errorData.error.message}`);
  }

  return response.json();
};


export const fetchGenres = async () => {
  const apiToken = getApiToken();

  if (!apiToken) {
    console.error("No API token found");
    return [];
  }

  try {
    const response = await fetch(`${API_BASE_URL}/recommendations/available-genre-seeds`, {
      headers: { Authorization: `Bearer ${apiToken}` },
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Error fetching genres:", errorData);
      throw new Error(`Failed to fetch genres: ${errorData.error.message}`);
    }

    const data = await response.json();
    console.log("Fetched genres:", data.genres);

    return data.genres; // Devuelve la lista de géneros
  } catch (error) {
    console.error("Error fetching genres:", error);
    return [];
  }
};

export const playTrack = async (trackId) => {
  const apiToken = getApiToken();
  console.log("API TOKEN: ", apiToken);
  if (!apiToken) {
    console.error("No API token found. Please authorize the app with the required scopes.");
    return;
  }

  try {
    // 1. Obtener los dispositivos del usuario
    const devicesResponse = await fetch(`${API_BASE_URL}/me/player/devices`, {
      headers: { Authorization: `Bearer ${apiToken}` },
    });

    if (!devicesResponse.ok) {
      const errorData = await devicesResponse.json();
      console.error("Error fetching devices:", errorData);
      throw new Error(`Failed to fetch devices: ${errorData.error.message}`);
    }

    const devices = await devicesResponse.json();
    // console.log("DEVICES: ", devices);

    // 2. Identificar el dispositivo activo
    const activeDevice = devices.devices.find((device) => device.is_active);
    if (!activeDevice) {
      console.error("No active device found. Please open Spotify on a device and try again.");
      return;
    }

    // console.log("Active Device ID:", activeDevice.id);
    console.log("Active Device Details:", activeDevice);

    // console.log("TRACK ID:", trackId);

    // 3. Usar el endpoint `/me/player/play` para iniciar reproducción
    const playResponse = await fetch(`${API_BASE_URL}/me/player/play?device_id=${activeDevice.id}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${apiToken}`,
        "Content-Type": "application/json", // Este encabezado es necesario
      },
      body: JSON.stringify({
        uris: [`spotify:track:${trackId}`], // ID de la pista
      }),
    });

    if (!playResponse.ok) {
      const errorData = await playResponse.json();
      console.error("Error playing track:", errorData);
      throw new Error(`Failed to play track: ${errorData.error.message}`);
    }

    console.log("Track is now playing!");
  } catch (error) {
    console.error("Error playing track:", error);
  }
};


// Función para hacer fetch de los detalles de los top artistas 
export const fetchArtistDetails = async (artistId) => {
  const apiToken = getApiToken();
  if (!apiToken) throw new Error("No API token found");

  const response = await fetch(
    `${API_BASE_URL}/artists/${artistId}`,
    { headers: { Authorization: `Bearer ${apiToken}` } }
  );

  if (!response.ok) {
    const errorData = await response.json();
    console.error('Error fetching artist details:', errorData);
    throw new Error(`Artist details fetch failed: ${errorData.error.message}`);
  }

  return response.json();
};

// Función para hacer fetch de las top tracks de los artistas 
export const fetchArtistTopTracks = async (artistId) => {
  const apiToken = getApiToken();
  if (!apiToken) throw new Error("No API token found");

  const response = await fetch(
    `${API_BASE_URL}/artists/${artistId}/top-tracks?market=ES`,
    { headers: { Authorization: `Bearer ${apiToken}` } }
  );

  if (!response.ok) {
    const errorData = await response.json();
    console.error('Error fetching artist top tracks:', errorData);
    throw new Error(`Artist top tracks fetch failed: ${errorData.error.message}`);
  }

  return response.json();
};

// Función para hacer fetch de los detalles de los albums 
export const fetchAlbumDetails = async (albumId) => {
  const apiToken = getApiToken();
  if (!apiToken) throw new Error("No API token found");

  const response = await fetch(
    `${API_BASE_URL}/albums/${albumId}`,
    { headers: { Authorization: `Bearer ${apiToken}` } }
  );

  if (!response.ok) {
    const errorData = await response.json();
    console.error('Error fetching album details:', errorData);
    throw new Error(`Album details fetch failed: ${errorData.error.message}`);
  }

  return response.json();
};

// Función para hacer fetch de los detalles de las tracks
export const fetchTrackDetails = async (trackId) => {
  const apiToken = getApiToken();
  if (!apiToken) throw new Error("No API token found");

  const response = await fetch(
    `${API_BASE_URL}/tracks/${trackId}`,
    { headers: { Authorization: `Bearer ${apiToken}` } }
  );

  if (!response.ok) {
    const errorData = await response.json();
    console.error('Error fetching track details:', errorData);
    throw new Error(`Track details fetch failed: ${errorData.error.message}`);
  }

  return response.json();
};