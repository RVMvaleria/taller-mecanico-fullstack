import axios from 'axios';

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:4001/api',
  withCredentials: true,
  headers: { 'Content-Type': 'application/json' }
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error?.response?.status;
    const url = error?.config?.url || '';
    const isProfileCheck = url.includes('users/mi-cuenta');

    //console.log('[apiClient] Error:', status, 'URL:', url, 'isProfileCheck:', isProfileCheck);

    //no disparar auth:expired durante el check inicial de perfil
    if ((status === 401 || status === 403) && window.location.pathname !== '/login' && !isProfileCheck) {
      //console.log('[apiClient] Dispatching auth:expired event');
      window.dispatchEvent(new CustomEvent('auth:expired'));
    }
    return Promise.reject(error);
  }
);

export default apiClient;
