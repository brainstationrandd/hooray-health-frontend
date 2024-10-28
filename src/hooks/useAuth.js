// src/hooks/useAuth.js
import { useState } from 'react';
import { authService } from '../services/authService';

export const useAuth = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const login = async (credentials) => {
    try {
      setLoading(true);
      setError('');
      
      const response = await authService.login(credentials);
      
      if (response.token) {
        authService.setToken(response.token);
      }
      
      return response;
    } catch (err) {
      setError('invalid credentials');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    authService.removeToken();
  };

  return {
    login,
    logout,
    loading,
    error,
    isAuthenticated: authService.isAuthenticated(),
  };
};