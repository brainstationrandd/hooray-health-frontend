// src/components/admin/UserManagementButton.jsx
import React from 'react';
import { Users } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const UserManagementButton = () => {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate('/user-management')}
      className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-400 transition duration-200"
    >
      <Users className="h-5 w-5" />
      <span>User Management</span>
    </button>
  );
};

export default UserManagementButton;