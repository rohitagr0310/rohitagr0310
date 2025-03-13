const API_BASE_URL = "https://collegology-backend.onrender.com";
//"http://localhost:5000";

const API_ENDPOINTS = {
  LOGIN: `${API_BASE_URL}/api/auth/login`,
  CHECK_SESSION: `${API_BASE_URL}/api/auth/check-session`,
  LOGOUT: `${API_BASE_URL}/api/auth/logout`
};

const API = {
  API_BASE_URL,
  API_ENDPOINTS
};

export default API;
