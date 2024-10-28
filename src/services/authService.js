
// src/services/authService.js
import { fetchApi } from '../utils/api';
import { API_CONFIG } from '../config/apiConfig';

export const authService = {
  login: async (credentials) => {
    return fetchApi(API_CONFIG.ENDPOINTS.LOGIN, {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
  },

  setToken: (token) => {
    localStorage.setItem('token', token);
  },

  getToken: () => {
    return localStorage.getItem('token');
  },

  removeToken: () => {
    localStorage.removeItem('token');
  },

  isAuthenticated: () => {
    return !!localStorage.getItem('token');
  },
};