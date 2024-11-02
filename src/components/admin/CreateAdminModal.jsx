// import React, { useState } from 'react';
// import { X, Eye, EyeOff } from 'lucide-react';
// import { authService } from '../../services/authService';

// const CreateAdminModal = ({ isOpen, onClose }) => {
//   const [formData, setFormData] = useState({
//     username: '',
//     password: '',
//   });
//   const [error, setError] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [success, setSuccess] = useState(false);
//   const [showPassword, setShowPassword] = useState(false); // State for password visibility

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError('');
//     setLoading(true);

//     try {
//       await authService.createAdmin(formData);
//       setSuccess(true);
//       setTimeout(() => {
//         onClose();
//       }, 2000);
//     } catch (err) {
//       setError('Failed to create admin user');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className={`fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 ${!isOpen && 'hidden'}`}>
//       <div className="bg-white bg-opacity-30 backdrop-blur-md border border-gray-300 rounded-lg p-6 w-full max-w-md relative shadow-lg transition-transform transform hover:scale-105">
//         <button
//           onClick={onClose}
//           className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
//         >
//           <X className="h-6 w-6" />
//         </button>

//         <h2 className="text-2xl font-bold mb-4 text-center text-white">Create New Admin</h2>

//         {success ? (
//           <div className="text-green-600 text-center py-4">
//             Admin created successfully!
//           </div>
//         ) : (
//           <form onSubmit={handleSubmit} className="space-y-6">
//             {error && (
//               <div className="p-3 rounded-lg bg-red-500 bg-opacity-10 text-red-400 text-sm">
//                 {error}
//               </div>
//             )}

//             <div>
//               <label className="block text-sm font-medium text-white mb-1">
//                 Username
//               </label>
//               <input
//                 type="text"
//                 name="username"
//                 value={formData.username}
//                 onChange={handleChange}
//                 placeholder="Enter your username"
//                 className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white bg-opacity-20 backdrop-blur-md"
//                 required
//               />
//             </div>

//             <div className="relative">
//               <label className="block text-sm font-medium text-white mb-1">
//                 Password
//               </label>
//               <input
//                 type={showPassword ? 'text' : 'password'}
//                 name="password"
//                 value={formData.password}
//                 onChange={handleChange}
//                 placeholder="Enter your password"
//                 className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white bg-opacity-20 backdrop-blur-md pr-10"
//                 required
//               />
//               <button
//                 type="button"
//                 onClick={() => setShowPassword(!showPassword)}
//                 className="absolute inset-y-0 right-0 flex items-center justify-center w-10" // Center icon in a 10px wide area
//                 aria-label="Toggle password visibility"
//                 style={{ top: '50%', transform: 'translateY(-50%)' }} // Center vertically
//               >
//                 {showPassword ? (
//                   <EyeOff className="h-5 w-5 text-gray-800" />
//                 ) : (
//                   <Eye className="h-5 w-5 text-gray-800" />
//                 )}
//               </button>
//             </div>

//             <button
//               type="submit"
//               disabled={loading}
//               className={`w-full py-3 px-4 text-white bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg font-medium shadow-lg transform transition-all duration-300 
//                 ${!loading && 'hover:scale-[1.02] hover:shadow-xl'} 
//                 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500
//                 ${loading && 'opacity-70 cursor-not-allowed'}`}
//             >
//               {loading ? (
//                 <div className="flex items-center justify-center">
//                   <div className="w-5 h-5 border-t-2 border-b-2 border-white rounded-full animate-spin mr-2" />
//                   Creating...
//                 </div>
//               ) : (
//                 'Create Admin'
//               )}
//             </button>
//           </form>
//         )}
//       </div>
//     </div>
//   );
// };

// export default CreateAdminModal;

import React, { useState } from 'react';
import { X, Eye, EyeOff } from 'lucide-react';
import { authService } from '../../services/authService';

const CreateAdminModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    confirmPassword: '', // State for confirm password
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false); // State for password visibility
  const [showConfirmPassword, setShowConfirmPassword] = useState(false); // State for confirm password visibility

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Check if passwords match
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    try {
      await authService.createAdmin(formData);
      setSuccess(true);
      setTimeout(() => {
        onClose();
      }, 2000);
    } catch (err) {
      setError('Failed to create admin user');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 ${!isOpen && 'hidden'}`}>
      <div className="bg-white bg-opacity-30 backdrop-blur-md border border-gray-300 rounded-lg p-6 w-full max-w-md relative shadow-lg transition-transform transform hover:scale-105">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          <X className="h-6 w-6" />
        </button>

        <h2 className="text-2xl font-bold mb-4 text-center text-white">Create New Admin</h2>

        {success ? (
          <div className="text-green-600 text-center py-4">
            Admin created successfully!
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="p-3 rounded-lg bg-red-500 bg-opacity-10 text-red-400 text-sm">
                {error}
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-white mb-1">
                Username
              </label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="Enter your username"
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white bg-opacity-20 backdrop-blur-md"
                required
              />
            </div>

            <div className="relative">
              <label className="block text-sm font-medium text-white mb-1">
                Password
              </label>
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white bg-opacity-20 backdrop-blur-md pr-10"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 flex items-center justify-center w-10" // Center icon in a 10px wide area
                aria-label="Toggle password visibility"
                style={{ top: '50%', transform: 'translateY(-50%)' }} // Center vertically
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5 text-gray-800" />
                ) : (
                  <Eye className="h-5 w-5 text-gray-800" />
                )}
              </button>
            </div>

            <div className="relative">
              <label className="block text-sm font-medium text-white mb-1">
                Confirm Password
              </label>
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm your password"
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white bg-opacity-20 backdrop-blur-md pr-10"
                required
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute inset-y-0 right-0 flex items-center justify-center w-10" // Center icon in a 10px wide area
                aria-label="Toggle confirm password visibility"
                style={{ top: '50%', transform: 'translateY(-50%)' }} // Center vertically
              >
                {showConfirmPassword ? (
                  <EyeOff className="h-5 w-5 text-gray-800" />
                ) : (
                  <Eye className="h-5 w-5 text-gray-800" />
                )}
              </button>
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3 px-4 text-white bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg font-medium shadow-lg transform transition-all duration-300 
                ${!loading && 'hover:scale-[1.02] hover:shadow-xl'} 
                focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500
                ${loading && 'opacity-70 cursor-not-allowed'}`}
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <div className="w-5 h-5 border-t-2 border-b-2 border-white rounded-full animate-spin mr-2" />
                  Creating...
                </div>
              ) : (
                'Create Admin'
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default CreateAdminModal;
