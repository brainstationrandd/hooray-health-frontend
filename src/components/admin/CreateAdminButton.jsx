// src/components/admin/CreateAdminButton.jsx
import React, { useState } from 'react';
import { UserPlus } from 'lucide-react';
import CreateAdminModal from './CreateAdminModal';

const CreateAdminButton = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsModalOpen(true)}
        className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-400 transition duration-200"
      >
        <UserPlus className="h-5 w-5" />
        <span>Create Admin</span>
      </button>
      
      {isModalOpen && (
        <CreateAdminModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </>
  );
};

export default CreateAdminButton;