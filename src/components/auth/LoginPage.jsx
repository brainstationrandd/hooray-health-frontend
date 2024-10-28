
// src/components/auth/LoginPage.jsx
import React from 'react';
import BackgroundAnimation from './BackgroundAnimation';
import LoginHeader from './LoginHeader';
import LoginForm from './LoginForm';

const LoginPage = () => (
  <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-900 via-indigo-800 to-blue-900 relative overflow-hidden">
    <BackgroundAnimation />
    
    <div className="max-w-md w-full mx-4 p-8 bg-white bg-opacity-10 backdrop-blur-lg rounded-2xl shadow-2xl relative z-10 transform transition-all duration-500 hover:scale-[1.02]">
      <LoginHeader />
      <LoginForm />
    </div>
  </div>
);

export default LoginPage;