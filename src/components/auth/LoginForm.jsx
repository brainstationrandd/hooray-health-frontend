// src/components/auth/LoginForm.jsx
import React, { useState } from 'react';
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

  const handleSubmit = async (e) => {
    
    e.preventDefault();
    try {
      await login(formData);
      navigate('/dashboard'); // Redirect on successful login
    } catch (err) {
      console.error('Login failed:', err);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
      {error && (
        <div className="p-3 rounded-lg bg-red-500 bg-opacity-10 text-red-400 text-sm">
          {error}
        </div>
      )}

      <InputField
        icon={User}
        name="username"
        value={formData.username}
        onChange={handleChange}
        placeholder="Enter your username"
        disabled={loading}
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
      />

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
            Signing in...
          </div>
        ) : (
          'Sign in'
        )}
      </button>
    </form>
  );
};

export default LoginForm;