import axios from 'axios';

const BASE_URL = 'http://localhost:8080/api/v1';

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const specializationAPI = {
  getAll: () => api.get('/specializations'),
  create: (data) => api.post('/specializations', data),
  update: (id, data) => api.put(`/specializations/${id}`, data),
  delete: (id) => api.delete(`/specializations/${id}`),
  getCourses: async (id) => {
    const response = await api.get(`/specializationcourse/${id}`);
    return response.data;
  }
};

export const authAPI = {
  login: (email, password) => api.post('/login', { email, password })
};