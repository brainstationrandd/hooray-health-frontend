// src/services/pdfService.js
import { fetchApi } from '../utils/api';


export const pdfService = {
    getAllPdfs: async () => {
      try {
        const response = await fetchApi('/chat/get_all_pdfs', {
          method: 'GET',
        });
  
        // Transform the simple filename array into objects with required properties
        return response.map((filename, index) => ({
          id: `pdf-${index}`, // Generate a unique id
          name: filename, // Use the filename directly
          size: null, // Size unknown from API
          viewUrl: `/chat/view_pdf/${encodeURIComponent(filename)}`, // Adjust these URLs based on your API
          downloadUrl: `/chat/download_pdf/${encodeURIComponent(filename)}`,
          type: 'PDF Document'
        }));
  
      } catch (error) {
        console.error('Error fetching PDFs:', error);
        throw new Error('Failed to fetch PDF documents');
      }
    }};