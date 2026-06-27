import apiClient from './apiClient';

const ORG_USER_ENDPOINT = import.meta.env.VITE_ORG_USER_ENDPOINT || '/api/orguser';

const unwrapList = (response) => {
  const payload = response.data;

  if (Array.isArray(payload)) return payload;
  if (Array.isArray(payload?.data)) return payload.data;
  if (Array.isArray(payload?.results)) return payload.results;
  if (Array.isArray(payload?.items)) return payload.items;

  return [];
};

export const orgUserService = {
  async getAll() {
    const response = await apiClient.get(ORG_USER_ENDPOINT);
    return unwrapList(response);
  },

  async create(userData) {
    const response = await apiClient.post(ORG_USER_ENDPOINT, userData);
    return response.data;
  },

  async update(id, userData) {
    const response = await apiClient.put(`${ORG_USER_ENDPOINT}/${id}`, userData);
    return response.data;
  },

  async remove(id) {
    const response = await apiClient.delete(`${ORG_USER_ENDPOINT}/${id}`);
    return response.data;
  },
};
