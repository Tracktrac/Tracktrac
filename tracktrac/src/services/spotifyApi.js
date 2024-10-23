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