import apiClient from './apiClient.js';

export function createResourceService(basePath, capabilities = {}) {
  return {
    list: () => apiClient.get(basePath).then((res) => res.data),
    create: capabilities.create === false ? null : (payload) => apiClient.post(basePath, payload).then((res) => res.data),
    update: capabilities.update ? (id, payload) => apiClient.put(`${basePath}/${id}`, payload).then((res) => res.data) : null,
    remove: capabilities.remove ? (id) => apiClient.delete(`${basePath}/${id}`).then((res) => res.data) : null
  };
}

export const catalogServices = {
  vehiculos: createResourceService('/vehiculos', { create: true, remove: true }),
  servicios: createResourceService('/servicios', { create: true }),
  marcas: createResourceService('/marcas', { create: true }),
  modelos: createResourceService('/modelos', { create: true }),
  motores: createResourceService('/motores', { create: true }),
  citas: createResourceService('/citas', { create: true, update: true })
};
