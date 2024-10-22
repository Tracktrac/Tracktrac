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
