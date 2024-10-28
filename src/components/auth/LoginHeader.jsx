// src/components/auth/LoginHeader.jsx
import React from 'react';
import { User } from 'lucide-react';

const LoginHeader = () => (
  <div className="text-center mb-8">
    <div className="w-20 h-20 mx-auto bg-white rounded-full flex items-center justify-center shadow-lg mb-4 animate-bounce">
      <User className="h-10 w-10 text-indigo-600" />
    </div>
    <h2 className="text-3xl font-bold text-white mb-2">Welcome Back</h2>
    <p className="text-indigo-200">Please sign in to continue</p>
  </div>
);

export default LoginHeader;