// // src/components/auth/LoginForm.jsx
// import React, { useState } from 'react';
// import { Eye, EyeOff, User, Lock } from 'lucide-react';
// import InputField from '../ui/InputField';
// import { useAuth } from '../../hooks/useAuth';
// import { useNavigate } from 'react-router-dom';

// const LoginForm = () => {
//   const { login, loading, error } = useAuth();
//   const navigate = useNavigate();
//   const [showPassword, setShowPassword] = useState(false);
//   const [formData, setFormData] = useState({
//     username: '',
//     password: '',
//   });

//   const handleSubmit = async (e) => {
    
//     e.preventDefault();
//     try {
//       await login(formData);
//       navigate('/dashboard'); // Redirect on successful login
//     } catch (err) {
//       console.error('Login failed:', err);
//     }
//   };

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   return (
//     <form className="space-y-6" onSubmit={handleSubmit}>
//       {error && (
//         <div className="p-3 rounded-lg bg-red-500 bg-opacity-10 text-red-400 text-sm">
//           {error}
//         </div>
//       )}

//       <InputField
//         icon={User}
//         name="username"
//         value={formData.username}
//         onChange={handleChange}
//         placeholder="Enter your username"
//         disabled={loading}
//       />

//       <InputField
//         icon={Lock}
//         type={showPassword ? 'text' : 'password'}
//         name="password"
//         value={formData.password}
//         onChange={handleChange}
//         placeholder="Enter your password"
//         rightIcon={showPassword ? EyeOff : Eye}
//         onRightIconClick={() => setShowPassword(!showPassword)}
//         disabled={loading}
//       />

//       <button
//         type="submit"
//         disabled={loading}
//         className={`w-full py-3 px-4 text-white bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg font-medium shadow-lg transform transition-all duration-300 
//           ${!loading && 'hover:scale-[1.02] hover:shadow-xl'} 
//           focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500
//           ${loading && 'opacity-70 cursor-not-allowed'}`}
//       >
//         {loading ? (
//           <div className="flex items-center justify-center">
//             <div className="w-5 h-5 border-t-2 border-b-2 border-white rounded-full animate-spin mr-2" />
//             Signing in...
//           </div>
//         ) : (
//           'Sign in'
//         )}
//       </button>
//     </form>
//   );
// };

// export default LoginForm;

import React, { useState, useEffect } from 'react';
import { Eye, EyeOff, User, Lock } from 'lucide-react';
import InputField from '../ui/InputField';
import { useAuth } from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
  const { login, loading, error } = useAuth();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const [formError, setFormError] = useState('');

  // Clear form error when inputs change
  useEffect(() => {
    if (formError) setFormError('');
  }, [formData]);

  const validateForm = () => {
    if (!formData.username.trim()) {
      setFormError('Username is required');
      return false;
    }
    if (!formData.password.trim()) {
      setFormError('Password is required');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError('');

    if (!validateForm()) return;

    try {
      await login(formData);
      // Store username in localStorage is now handled in authService
      navigate('/dashboard');
    } catch (err) {
      console.error('Login failed:', err);
      setFormError(err.message || 'Login failed. Please try again.');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
      {(error || formError) && (
        <div className="p-4 rounded-lg bg-red-50 border border-red-200">
          <p className="text-red-600 text-sm">
            {error || formError}
          </p>
        </div>
      )}

      <div className="space-y-4">
        <InputField
          icon={User}
          name="username"
          value={formData.username}
          onChange={handleChange}
          placeholder="Enter your username"
          disabled={loading}
          required
          autoComplete="username"
          className="w-full"
        />

        <InputField
          icon={Lock}
          type={showPassword ? 'text' : 'password'}
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Enter your password"
          rightIcon={showPassword ? EyeOff : Eye}
          onRightIconClick={() => setShowPassword(!showPassword)}
          disabled={loading}
          required
          autoComplete="current-password"
          className="w-full"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className={`
          w-full py-3 px-4 
          text-white text-sm font-medium
          bg-gradient-to-r from-indigo-600 to-purple-600 
          rounded-lg shadow-lg 
          transform transition-all duration-300 
          ${!loading && 'hover:scale-[1.02] hover:shadow-xl'} 
          focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500
          disabled:opacity-70 disabled:cursor-not-allowed
          flex items-center justify-center gap-2
        `}
      >
        {loading && (
          <svg 
            className="animate-spin h-5 w-5 text-white" 
            xmlns="http://www.w3.org/2000/svg" 
            fill="none" 
            viewBox="0 0 24 24"
          >
            <circle 
              className="opacity-25" 
              cx="12" 
              cy="12" 
              r="10" 
              stroke="currentColor" 
              strokeWidth="4"
            />
            <path 
              className="opacity-75" 
              fill="currentColor" 
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        )}
        <span>
          {loading ? 'Signing in...' : 'Sign in'}
        </span>
      </button>
    </form>
  );
};

export default LoginForm;