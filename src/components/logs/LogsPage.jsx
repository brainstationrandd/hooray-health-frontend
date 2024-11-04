// // src/components/logs/LogsPage.jsx
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
import { LogOut, ArrowLeft } from 'lucide-react';
import { logsService } from '../../services/logsService';
import { useAuth } from '../../hooks/useAuth';

const LogsPage = () => {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { logout } = useAuth();

  useEffect(() => {
    fetchLogs();
  }, []);

  const fetchLogs = async () => {
    try {
      const data = await logsService.getLogs();
      setLogs(data);
    } catch (err) {
      setError('Failed to load logs');
    } finally {
      setLoading(false);
    }
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
                  {logs.map((log) => (
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
                  ))}
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