// src/components/dashboard/DashboardPage.jsx
// import React, { useState, useEffect } from 'react';
// import { pdfService } from '../../services/pdfService';
// import DashboardHeader from './DashboardHeader';
// import PdfList from './PdfList';
// import BackgroundAnimation from '../auth/BackgroundAnimation';

// const DashboardPage = () => {
//   const [pdfs, setPdfs] = useState([]);
//   const [filteredPdfs, setFilteredPdfs] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');

//   useEffect(() => {
//     const fetchPdfs = async () => {
//       try {
//         const data = await pdfService.getAllPdfs();
//         setPdfs(data);
//         setFilteredPdfs(data);
//       } catch (err) {
//         setError('Failed to load PDF documents');
//         console.error('Error fetching PDFs:', err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchPdfs();
//   }, []);

//   const handleSearch = (searchTerm) => {
//     const filtered = pdfs.filter(pdf => 
//       pdf.name.toLowerCase().includes(searchTerm.toLowerCase())
//     );
//     setFilteredPdfs(filtered);
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-800 to-blue-900 relative overflow-hidden">
//       <BackgroundAnimation />
      
//       <div className="max-w-7xl mx-auto px-4 py-8 relative z-10">
//         <DashboardHeader onSearch={handleSearch} />
        
//         {error && (
//           <div className="p-4 mb-6 rounded-lg bg-red-500 bg-opacity-10 text-red-400">
//             {error}
//           </div>
//         )}
        
//         {loading ? (
//           <div className="flex items-center justify-center h-64">
//             <div className="w-8 h-8 border-t-2 border-b-2 border-white rounded-full animate-spin" />
//           </div>
//         ) : (
//           <>
//             {filteredPdfs.length === 0 ? (
//               <div className="text-center py-12">
//                 <p className="text-indigo-300 text-lg">No PDF documents found</p>
//               </div>
//             ) : (
//               <PdfList pdfs={filteredPdfs} />
//             )}
//           </>
//         )}
//       </div>
//     </div>
//   );
// };

// export default DashboardPage;

import React, { useState, useEffect } from 'react';
import { pdfService } from '../../services/pdfService';
import DashboardHeader from './DashboardHeader';
import PdfList from './PdfList';
import BackgroundAnimation from '../auth/BackgroundAnimation';

const DashboardPage = () => {
  const [pdfs, setPdfs] = useState([]);
  const [filteredPdfs, setFilteredPdfs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchPdfs = async () => {
      try {
        const data = await pdfService.getAllPdfs();
        setPdfs(data);
        setFilteredPdfs(data);
      } catch (err) {
        setError('Failed to load PDF documents');
        console.error('Error fetching PDFs:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchPdfs();
  }, []);

  const handleSearch = (searchTerm) => {
    setSearchQuery(searchTerm);
    
    if (!searchTerm.trim()) {
      setFilteredPdfs(pdfs);
      return;
    }

    const normalizedSearch = searchTerm.toLowerCase().trim();
    const filtered = pdfs.filter(pdf => {
      const fileName = pdf.name.toLowerCase();
      return fileName.includes(normalizedSearch);
    });

    setFilteredPdfs(filtered);
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
        
        {error && (
          <div className="p-4 mb-6 rounded-lg bg-red-500 bg-opacity-10 text-red-400">
            {error}
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
              <PdfList pdfs={filteredPdfs} />
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default DashboardPage;