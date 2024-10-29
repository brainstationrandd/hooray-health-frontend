// // src/components/dashboard/DashboardHeader.jsx
// import React from 'react';
// import { LogOut, Search } from 'lucide-react';
// import { useAuth } from '../../hooks/useAuth';
// import { useNavigate } from 'react-router-dom';

// const DashboardHeader = ({ onSearch }) => {
//   const { logout } = useAuth();
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     logout();
//     navigate('/', { replace: true });
//   };

//   return (
//     <div className="flex flex-col md:flex-row justify-between items-center mb-8 space-y-4 md:space-y-0">
//       <div>
//         <h1 className="text-3xl font-bold text-white">Your PDF Documents</h1>
//         <p className="text-indigo-300">Manage and view your PDF files</p>
//       </div>
      
//       <div className="flex space-x-4 w-full md:w-auto">
//         <div className="relative flex-1 md:w-64">
//           <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-indigo-300" />
//           <input
//             type="text"
//             placeholder="Search PDFs..."
//             onChange={(e) => onSearch(e.target.value)}
//             className="w-full pl-10 pr-4 py-2 bg-white bg-opacity-10 rounded-lg text-white placeholder-indigo-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-opacity-20 transition-all duration-300"
//           />
//         </div>
//         <button
//           onClick={handleLogout}
//           className="px-4 py-2 bg-red-500 bg-opacity-20 hover:bg-opacity-30 rounded-lg text-red-300 hover:text-red-200 transition-all duration-300 flex items-center space-x-2"
//         >
//           <LogOut className="h-5 w-5" />
//           <span>Logout</span>
//         </button>
//       </div>
//     </div>
//   );
// };

// export default DashboardHeader;

// DashboardHeader.jsx
import React from 'react';
import { LogOut, Search, X } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

const DashboardHeader = ({ onSearch, searchQuery, totalPdfs, filteredPdfs }) => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/', { replace: true });
  };

  const clearSearch = () => {
    onSearch('');
  };

  return (
    <div className="flex flex-col md:flex-row justify-between items-center mb-8 space-y-4 md:space-y-0">
      <div>
        <h1 className="text-3xl font-bold text-white">Your PDF Documents</h1>
        <p className="text-indigo-300">
          {searchQuery 
            ? `Showing ${filteredPdfs} of ${totalPdfs} PDFs`
            : `${totalPdfs} PDF${totalPdfs !== 1 ? 's' : ''} available`
          }
        </p>
      </div>
     
      <div className="flex space-x-4 w-full md:w-auto">
        <div className="relative flex-1 md:w-64">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-indigo-300" />
          <input
            type="text"
            value={searchQuery}
            placeholder="Search PDFs..."
            onChange={(e) => onSearch(e.target.value)}
            className="w-full pl-10 pr-10 py-2 bg-white bg-opacity-10 rounded-lg text-white placeholder-indigo-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-opacity-20 transition-all duration-300"
          />
          {searchQuery && (
            <button
              onClick={clearSearch}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-indigo-300 hover:text-white"
              title="Clear search"
            >
              <X className="h-5 w-5" />
            </button>
          )}
        </div>
        <button
          onClick={handleLogout}
          className="px-4 py-2 bg-red-500 bg-opacity-20 hover:bg-opacity-30 rounded-lg text-red-300 hover:text-red-200 transition-all duration-300 flex items-center space-x-2"
        >
          <LogOut className="h-5 w-5" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};

export default DashboardHeader;