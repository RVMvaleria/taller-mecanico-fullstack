import apiClient from './apiClient';

export const publicService = {
  getServiciosComunes: async () => {
    try {
      const response = await apiClient.get('/servicios/comunes');
      return response.data;
    } catch (error) {
      console.error('Error fetching common services:', error);
      throw error;
    }
  }
};
