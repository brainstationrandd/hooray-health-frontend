// src/config/apiConfig.js
export const API_CONFIG = {
    BASE_URL: process.env.REACT_APP_API_BASE_URL,
    ENDPOINTS: {
      LOGIN: '/auth/login',
      SIGNUP: '/auth/signup',
    },
    HEADERS: {
      'Content-Type': 'application/json',
    },
  };
  