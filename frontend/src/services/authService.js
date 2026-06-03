import apiClient from './apiClient.js';

export const authService = {
  login: (payload) => apiClient.post('/auth/login', payload).then((res) => res.data),
  register: (payload) => apiClient.post('/auth/register', payload).then((res) => res.data),
  logout: () => apiClient.post('/auth/logout').then((res) => res.data),
  me: () => apiClient.get('/users/mi-cuenta').then((res) => res.data),
  updateMe: (payload) => apiClient.put('/users/mi-cuenta', payload).then((res) => res.data)
};
