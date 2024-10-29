// src/components/dashboard/DashboardPage.jsx
import React, { useState, useEffect } from 'react';
import { pdfService } from '../../services/pdfService';
import { FaUpload } from 'react-icons/fa';
import DashboardHeader from './DashboardHeader';
import PdfList from './PdfList';
import BackgroundAnimation from '../auth/BackgroundAnimation';

const DashboardPage = () => {
  const [pdfs, setPdfs] = useState([]);
  const [filteredPdfs, setFilteredPdfs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState({ text: '', type: '' }); // Changed to an object
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchPdfs();
  }, []);

  const fetchPdfs = async () => {
    try {
      const data = await pdfService.getAllPdfs();
      setPdfs(data);
      setFilteredPdfs(data);
    } catch (err) {
      showTemporaryMessage('Failed to load PDF documents', 'error');
      console.error('Error fetching PDFs:', err);
    } finally {
      setLoading(false);
    }
  };

  const showTemporaryMessage = (messageText, messageType) => {
    setMessage({ text: messageText, type: messageType }); // Set message object
    setTimeout(() => setMessage({ text: '', type: '' }), 3000); // Clear message after 3 seconds
  };

  const handleSearch = (searchTerm) => {
    setSearchQuery(searchTerm);
    if (!searchTerm.trim()) {
      setFilteredPdfs(pdfs);
      return;
    }

    const normalizedSearch = searchTerm.toLowerCase().trim();
    const filtered = pdfs.filter(pdf => pdf.name.toLowerCase().includes(normalizedSearch));
    setFilteredPdfs(filtered);
  };

  const handleDelete = async (filename) => {
    try {
      await pdfService.deletePdf(filename);
      fetchPdfs();
      showTemporaryMessage('PDF deleted successfully', 'success'); // Success message
    } catch (err) {
      showTemporaryMessage('Failed to delete PDF', 'error'); // Error message
      console.error('Error deleting PDF:', err);
    }
  };

  const handleUpload = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append('files', file);
      
      try {
        await pdfService.uploadPdf(formData);
        fetchPdfs();
        showTemporaryMessage('PDF uploaded successfully', 'success'); // Success message
      } catch (err) {
        showTemporaryMessage('Failed to upload PDF', 'error'); // Error message
        console.error('Error uploading PDF:', err);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-800 to-blue-900 relative overflow-hidden">
      <BackgroundAnimation />
      <div className="max-w-7xl mx-auto px-4 py-8 relative z-10">
        <DashboardHeader 
          onSearch={handleSearch} 
          searchQuery={searchQuery} 
          totalPdfs={pdfs.length} 
          filteredPdfs={filteredPdfs.length} 
        />
        <div className="flex items-center gap-2 mb-4">
          <label htmlFor="file-upload" className="flex items-center gap-2 cursor-pointer px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-400 transition duration-200">
            <FaUpload className="text-lg" />
            <span>Upload PDF</span>
          </label>
          <input 
            id="file-upload" 
            type="file" 
            accept="application/pdf" 
            onChange={handleUpload} 
            className="hidden"
          />
        </div>
        {message.text && (
          <div className={`p-4 mb-6 rounded-lg ${message.type === 'success' ? 'bg-green-500 bg-opacity-10 text-green-400' : 'bg-red-500 bg-opacity-10 text-red-400'}`}>
            {message.text}
          </div>
        )}
        {loading ? (
          <div className="flex items-center justify-center h-64">
            <div className="w-8 h-8 border-t-2 border-b-2 border-white rounded-full animate-spin" />
          </div>
        ) : (
          <>
            {filteredPdfs.length === 0 && searchQuery ? (
              <div className="text-center py-12">
                <p className="text-indigo-300 text-lg">
                  No PDFs found matching "{searchQuery}"
                </p>
                <button
                  onClick={() => handleSearch('')}
                  className="mt-4 text-indigo-400 hover:text-indigo-300 underline"
                >
                  Clear search
                </button>
              </div>
            ) : filteredPdfs.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-indigo-300 text-lg">No PDF documents found</p>
              </div>
            ) : (
              <PdfList pdfs={filteredPdfs} onDelete={handleDelete} />
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default DashboardPage;