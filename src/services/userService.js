// src/services/userService.js
import { fetchApi } from '../utils/api';

export const userService = {
  getAllUsers: async () => {
    try {
      const response = await fetchApi('/auth/users', {
        method: 'GET',
      });
      return response;
    } catch (error) {
      console.error('Error fetching users:', error);
      throw new Error('Failed to fetch users');
    }
  },

  deleteUser: async (username) => {
    try {
      const response = await fetchApi('/auth/delete_user', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username }),
      });
      return response;
    } catch (error) {
      console.error('Error deleting user:', error);
      throw new Error('Failed to delete user');
    }
  },
};