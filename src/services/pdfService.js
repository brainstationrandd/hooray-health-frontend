import { fetchApi } from '../utils/api';
import { authService } from './authService';

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
  },

//   uploadPdf: async (files) => {
//     try {
//         const formData = new FormData();
//         files.forEach(file => formData.append("files", file));

//         // formData.append("files", files)
//         const requestOptions = {
//             method: "POST",
//             body: formData,
//             redirect: "follow"
//           };
          
         

//         const response = await  fetch(`${process.env.REACT_APP_API_BASE_URL}/chat/upload_pdf`, requestOptions)
      
//         if (!response.ok) {
//             throw new Error(`Server error: ${response.statusText}`);
//         }

//         return await response.json();

//     } catch (error) {
//         console.error('Error uploading PDF:', error);
//         throw new Error('Failed to upload PDF document');
//     }
// },
//   deletePdf: async (filename) => {
//     try {
//       const response = await fetchApi('/chat/delete_pdf', {
//         method: 'DELETE',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ filename }),
//       });
//       console.log(response);

//       return response; // Adjust based on the actual response from the API
//     } catch (error) {
//       console.error('Error deleting PDF:', error);
//       throw new Error('Failed to delete PDF document');
//     }
//   },
// };
uploadPdf: async (files) => {
  try {
    const formData = new FormData();
    files.forEach(file => formData.append("files", file));
    
    // Get username from localStorage
    const username = authService.getUsername();
    
    const requestOptions = {
      method: "POST",
      body: formData,
      redirect: "follow"
    };
    
    // Add username as query parameter
    const response = await fetch(
      `${process.env.REACT_APP_API_BASE_URL}/chat/upload_pdf?username=${encodeURIComponent(username)}`, 
      requestOptions
    );
    
    if (!response.ok) {
      throw new Error(`Server error: ${response.statusText}`);
    }

    return await response.json();

  } catch (error) {
    console.error('Error uploading PDF:', error);
    throw new Error('Failed to upload PDF document');
  }
},

deletePdf: async (filename) => {
  try {
    // Get username from localStorage
    const username = authService.getUsername();

    const response = await fetchApi('/chat/delete_pdf', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ 
        filename,
        username 
      }),
    });

    return response;
  } catch (error) {
    console.error('Error deleting PDF:', error);
    throw new Error('Failed to delete PDF document');
  }
},
};