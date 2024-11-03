// src/services/logsService.js
export const logsService = {
    getLogs: async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/logs/logs`);
        if (!response.ok) throw new Error('Failed to fetch logs');
        return await response.json();
      } catch (error) {
        console.error('Error fetching logs:', error);
        throw error;
      }
    }
  };