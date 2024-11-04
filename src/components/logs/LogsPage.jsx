
// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { LogOut, ArrowLeft } from 'lucide-react';
// import { logsService } from '../../services/logsService';
// import { useAuth } from '../../hooks/useAuth';

// const LogsPage = () => {
//   const [logs, setLogs] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const navigate = useNavigate();
//   const { logout } = useAuth();

//   useEffect(() => {
//     fetchLogs();
//   }, []);

//   const fetchLogs = async () => {
//     try {
//       const data = await logsService.getLogs();
//       setLogs(data);
//     } catch (err) {
//       setError('Failed to load logs');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const formatDate = (dateString) => {
//     if (!dateString) return "N/A";
//     return new Date(dateString).toLocaleString();
//   };

//   const handleLogout = () => {
//     logout();
//     navigate('/', { replace: true });
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-800 to-blue-900">
//       <div className="max-w-7xl mx-auto px-4 py-8">
//         {/* Header */}
//         <div className="flex justify-between items-center mb-8">
//           <div className="flex items-center space-x-4">
//             <button
//               onClick={() => navigate('/dashboard')}
//               className="text-white hover:text-indigo-300 transition-colors"
//             >
//               <ArrowLeft className="h-6 w-6" />
//             </button>
//             <h1 className="text-3xl font-bold text-white">Operation Logs</h1>
//           </div>
          
//           <button
//             onClick={handleLogout}
//             className="px-4 py-2 bg-red-500 bg-opacity-20 hover:bg-opacity-30 rounded-lg text-red-300 hover:text-red-200 transition-all duration-300 flex items-center space-x-2"
//           >
//             <LogOut className="h-5 w-5" />
//             <span>Logout</span>
//           </button>
//         </div>

//         {/* Content */}
//         {loading ? (
//           <div className="flex justify-center items-center h-64">
//             <div className="w-8 h-8 border-t-2 border-b-2 border-white rounded-full animate-spin" />
//           </div>
//         ) : error ? (
//           <div className="bg-red-500 bg-opacity-10 text-red-400 p-4 rounded-lg">
//             {error}
//           </div>
//         ) : (
//           <div className="bg-white bg-opacity-10 rounded-lg overflow-hidden">
//             <div className="overflow-x-auto">
//               <table className="w-full">
//                 <thead>
//                   <tr className="text-left border-b border-indigo-700">
//                     <th className="px-6 py-3 text-indigo-300">Operation Type</th>
//                     <th className="px-6 py-3 text-indigo-300">PDF Name</th>
//                     <th className="px-6 py-3 text-indigo-300">Performed By</th>
//                     <th className="px-6 py-3 text-indigo-300">Started At</th>
//                     <th className="px-6 py-3 text-indigo-300">Ended At</th>
//                     <th className="px-6 py-3 text-indigo-300">Status</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {logs.map((log) => (
//                     <tr 
//                       key={log.id}
//                       className="border-b border-indigo-700/30 text-white hover:bg-white/5"
//                     >
//                       <td className="px-6 py-4">{log.operation_type}</td>
//                       <td className="px-6 py-4">{log.pdf_name}</td>
//                       <td className="px-6 py-4">{log.username}</td>
//                       <td className="px-6 py-4">{formatDate(log.started_at)}</td>
//                       <td className="px-6 py-4">{formatDate(log.ended_at)}</td>
//                       <td className="px-6 py-4">
//                         <span className={`px-2 py-1 rounded-full text-xs ${
//                           log.status === 'complete' 
//                             ? 'bg-green-500/20 text-green-400' 
//                             : 'bg-yellow-500/20 text-yellow-400'
//                         }`}>
//                           {log.status}
//                         </span>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default LogsPage;

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogOut, ArrowLeft, Search, HelpCircle } from 'lucide-react';
import { logsService } from '../../services/logsService';
import { useAuth } from '../../hooks/useAuth';

const LogsPage = () => {
  const [logs, setLogs] = useState([]);
  const [filteredLogs, setFilteredLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearchHelp, setShowSearchHelp] = useState(false);
  const navigate = useNavigate();
  const { logout } = useAuth();

  useEffect(() => {
    fetchLogs();
  }, []);

  useEffect(() => {
    filterLogs();
  }, [searchQuery, logs]);

  const fetchLogs = async () => {
    try {
      const data = await logsService.getLogs();
      setLogs(data);
      setFilteredLogs(data);
    } catch (err) {
      setError('Failed to load logs');
    } finally {
      setLoading(false);
    }
  };

  const filterLogs = () => {
    const query = searchQuery.toLowerCase().trim();
    if (!query) {
      setFilteredLogs(logs);
      return;
    }

    const filtered = logs.filter((log) => 
      log.operation_type?.toLowerCase().includes(query) ||
      log.pdf_name?.toLowerCase().includes(query) ||
      log.username?.toLowerCase().includes(query) ||
      log.status?.toLowerCase().includes(query)
    );
    setFilteredLogs(filtered);
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleString();
  };

  const handleLogout = () => {
    logout();
    navigate('/', { replace: true });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-800 to-blue-900">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => navigate('/dashboard')}
              className="text-white hover:text-indigo-300 transition-colors"
            >
              <ArrowLeft className="h-6 w-6" />
            </button>
            <h1 className="text-3xl font-bold text-white">Operation Logs</h1>
          </div>
          
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-500 bg-opacity-20 hover:bg-opacity-30 rounded-lg text-red-300 hover:text-red-200 transition-all duration-300 flex items-center space-x-2"
          >
            <LogOut className="h-5 w-5" />
            <span>Logout</span>
          </button>
        </div>

        {/* Search Bar */}
        <div className="mb-6">
          <div className="relative max-w-md">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-indigo-300" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search logs..."
              className="block w-full pl-10 pr-12 py-2 border border-indigo-700 rounded-lg bg-white/10 text-white placeholder-indigo-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
              <button
                className="text-indigo-300 hover:text-indigo-200"
                onMouseEnter={() => setShowSearchHelp(true)}
                onMouseLeave={() => setShowSearchHelp(false)}
              >
                <HelpCircle className="h-5 w-5" />
              </button>
            </div>
            {showSearchHelp && (
              <div className="absolute z-10 mt-2 w-80 p-4 bg-indigo-900 rounded-lg shadow-lg border border-indigo-700 text-sm text-white">
                <p className="font-semibold mb-2">Search across:</p>
                <ul className="space-y-1 text-indigo-200">
                  <li>• Operation Type (e.g., "Upload", "Delete")</li>
                  <li>• PDF Name (e.g., "report", "invoice")</li>
                  <li>• Username (e.g., "user1", "user2")</li>
                  <li>• Status (e.g., "complete", "in progress")</li>
                </ul>
                <p className="mt-2 text-xs text-indigo-300">
                  The search is instant and case-insensitive. Type any term to filter across all fields.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Content */}
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="w-8 h-8 border-t-2 border-b-2 border-white rounded-full animate-spin" />
          </div>
        ) : error ? (
          <div className="bg-red-500 bg-opacity-10 text-red-400 p-4 rounded-lg">
            {error}
          </div>
        ) : (
          <div className="bg-white bg-opacity-10 rounded-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-left border-b border-indigo-700">
                    <th className="px-6 py-3 text-indigo-300">Operation Type</th>
                    <th className="px-6 py-3 text-indigo-300">PDF Name</th>
                    <th className="px-6 py-3 text-indigo-300">Performed By</th>
                    <th className="px-6 py-3 text-indigo-300">Started At</th>
                    <th className="px-6 py-3 text-indigo-300">Ended At</th>
                    <th className="px-6 py-3 text-indigo-300">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredLogs.length === 0 ? (
                    <tr>
                      <td colSpan="6" className="px-6 py-8 text-center text-indigo-300">
                        No logs found matching your search criteria
                      </td>
                    </tr>
                  ) : (
                    filteredLogs.map((log) => (
                      <tr 
                        key={log.id}
                        className="border-b border-indigo-700/30 text-white hover:bg-white/5"
                      >
                        <td className="px-6 py-4">{log.operation_type}</td>
                        <td className="px-6 py-4">{log.pdf_name}</td>
                        <td className="px-6 py-4">{log.username}</td>
                        <td className="px-6 py-4">{formatDate(log.started_at)}</td>
                        <td className="px-6 py-4">{formatDate(log.ended_at)}</td>
                        <td className="px-6 py-4">
                          <span className={`px-2 py-1 rounded-full text-xs ${
                            log.status === 'complete' 
                              ? 'bg-green-500/20 text-green-400' 
                              : 'bg-yellow-500/20 text-yellow-400'
                          }`}>
                            {log.status}
                          </span>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LogsPage;