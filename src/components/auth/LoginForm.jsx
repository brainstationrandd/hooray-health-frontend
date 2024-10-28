// src/components/auth/LoginForm.jsx
import React, { useState } from 'react';
import { Eye, EyeOff, User, Lock } from 'lucide-react';
import InputField from '../ui/InputField';

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
      <InputField
        icon={User}
        name="username"
        value={formData.username}
        onChange={handleChange}
        placeholder="Enter your username"
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
      />

      <div className="flex items-center justify-between text-sm">
        <div className="flex items-center">
          <input
            id="remember-me"
            name="remember-me"
            type="checkbox"
            className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
          />
          <label htmlFor="remember-me" className="ml-2 text-indigo-200">
            Remember me
          </label>
        </div>

        <a href="#" className="text-indigo-200 hover:text-white transition-colors duration-200">
          Forgot password?
        </a>
      </div>

      <button
        type="submit"
        className="w-full py-3 px-4 text-white bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg font-medium shadow-lg transform transition-all duration-300 hover:scale-[1.02] hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        Sign in
      </button>

      <p className="text-center text-indigo-200">
        Don't have an account?{' '}
        <a href="#" className="font-medium text-white hover:text-indigo-400 transition-colors duration-200">
          Sign up
        </a>
      </p>
    </form>
  );
};

export default LoginForm;