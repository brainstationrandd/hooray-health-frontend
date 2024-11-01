
// // src/services/authService.js
// import { fetchApi } from '../utils/api';
// import { API_CONFIG } from '../config/apiConfig';

// export const authService = {
//   login: async (credentials) => {
//     return fetchApi(API_CONFIG.ENDPOINTS.LOGIN, {
//       method: 'POST',
//       body: JSON.stringify(credentials),
//     });
//   },

//   setToken: (token) => {
//     localStorage.setItem('token', token);
//   },

//   getToken: () => {
//     return localStorage.getItem('token');
//   },

//   removeToken: () => {
//     localStorage.removeItem('token');
//   },

//   isAuthenticated: () => {
//     return !!localStorage.getItem('token');
//   },
// };

// src/services/authService.js
import { fetchApi } from '../utils/api';
import { API_CONFIG } from '../config/apiConfig';

export const authService = {
  login: async (credentials) => {
    try {
      const response = await fetchApi(API_CONFIG.ENDPOINTS.LOGIN, {
        method: 'POST',
        body: JSON.stringify(credentials),
      });

      // Check if credentials match super admin
      const isSuperAdmin = 
        credentials.username === process.env.REACT_APP_SUPER_ADMIN_USERNAME &&
        credentials.password === process.env.REACT_APP_SUPER_ADMIN_PASSWORD;
      
      // Store the user role
      if (isSuperAdmin) {
        localStorage.setItem('userRole', 'superadmin');
      } else {
        localStorage.setItem('userRole', 'admin');
      }

      if (response.token) {
        localStorage.setItem('token', response.token);
      }

      return response;
    } catch (error) {
      console.error('Login error:', error);
      throw new Error(error.message || 'Login failed');
    }
  },

  createAdmin: async (adminData) => {
    console.log('Creating admin with data:', {
      username: adminData.username,
      password: '***' // Hide password in logs
    });
    
    try {
      const response = await fetchApi(API_CONFIG.ENDPOINTS.SIGNUP, {
        method: 'POST',
        body: JSON.stringify({
          username: adminData.username,
          password: adminData.password,
        }),
      });
      
      console.log('Admin created successfully:', response);
      return response;
    } catch (error) {
      console.error('Failed to create admin:', error);
      throw error;
    }
  },

  setToken: (token) => {
    if (token) {
      localStorage.setItem('token', token);
    }
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

  isSuperAdmin: () => {
    return localStorage.getItem('userRole') === 'superadmin';
  },

  getUserRole: () => {
    return localStorage.getItem('userRole') || 'admin';
  },

  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userRole');
  },

  // Utility method to check if token is expired
  isTokenExpired: (token) => {
    if (!token) return true;
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.exp < Date.now() / 1000;
    } catch {
      return true;
    }
  },


  // Method to check if user has permission
  hasPermission: (requiredRole) => {
    const userRole = authService.getUserRole();
    if (requiredRole === 'superadmin') {
      return userRole === 'superadmin';
    }
    // Add more role checks if needed
    return true;
  },

  // Method to handle authentication errors
  handleAuthError: (error) => {
    if (error.status === 401) {
      authService.logout();
      return 'Your session has expired. Please log in again.';
    }
    if (error.status === 403) {
      return 'You do not have permission to perform this action.';
    }
    return error.message || 'An authentication error occurred.';
  },

  // Initialize auth state
  initializeAuth: () => {
    const token = authService.getToken();
    if (token && authService.isTokenExpired(token)) {
      authService.logout();
    }
  }
};

export default authService;