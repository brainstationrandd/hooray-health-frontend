import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Trash2, ArrowLeft, AlertCircle, Search, CheckCircle } from 'lucide-react';
import { userService } from '../../services/userService';
import { authService } from '../../services/authService';

const UserManagementPage = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [notification, setNotification] = useState({ message: '', type: '' });
  const navigate = useNavigate();

  // Check if user is superadmin, if not redirect
  useEffect(() => {
    if (!authService.isSuperAdmin()) {
      navigate('/dashboard');
    }
  }, [navigate]);

  // Fetch users
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await userService.getAllUsers();
        const transformedUsers = response.map(username => ({ username }));
        setUsers(transformedUsers);
        setFilteredUsers(transformedUsers);
      } catch (err) {
        setError('Failed to fetch users');
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleDeleteUser = async (username) => {
    try {
      await userService.deleteUser(username);
      setUsers(users.filter(user => user.username !== username));
      setFilteredUsers(filteredUsers.filter(user => user.username !== username));
      setDeleteConfirm(null);
      showNotification('User deleted successfully', 'success');
    } catch (err) {
      showNotification('Failed to delete user', 'error');
    }
  };

  const handleSearch = (event) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);
    if (!query.trim()) {
      setFilteredUsers(users);
    } else {
      setFilteredUsers(users.filter(user => user.username.toLowerCase().includes(query)));
    }
  };

  const showNotification = (message, type) => {
    setNotification({ message, type });
    setTimeout(() => {
      setNotification({ message: '', type: '' });
    }, 3000);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-purple-900 via-indigo-800 to-blue-900">
        <div className="w-8 h-8 border-t-2 border-b-2 border-blue-500 rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-800 to-blue-900 p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate('/dashboard')}
              className="text-gray-300 hover:text-white"
            >
              <ArrowLeft size={24} />
            </button>
            <h1 className="text-2xl font-bold text-white">User Management</h1>
          </div>
          {error && (
            <div className="flex items-center gap-2 text-red-400">
              <AlertCircle size={20} />
              <span>{error}</span>
            </div>
          )}
        </div>

        {/* Search Bar */}
        <div className="flex items-center mb-6 bg-gray-800 bg-opacity-40 rounded-lg p-2">
          <Search size={20} className="text-gray-400 ml-2" />
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearch}
            placeholder="Search users..."
            className="w-full bg-transparent outline-none text-white p-2 ml-2 placeholder-gray-400"
          />
        </div>

        {/* Notification */}
        {notification.message && (
          <div className={`mb-4 p-3 rounded text-white text-center ${notification.type === 'success' ? 'bg-green-500' : 'bg-red-500'}`}>
            <CheckCircle size={20} className="inline mr-2" />
            {notification.message}
          </div>
        )}

        {/* Users List */}
        <ul className="space-y-4">
          {filteredUsers.length > 0 ? (
            filteredUsers.map((user) => (
              <li key={user.username} className="bg-gray-800 bg-opacity-40 p-4 rounded-lg flex items-center justify-between shadow-md">
                <h3 className="text-lg text-white font-semibold">{user.username}</h3>
                <button
                  onClick={() => setDeleteConfirm(user.username)}
                  className="text-red-500 hover:text-red-400"
                >
                  <Trash2 size={20} />
                </button>
              </li>
            ))
          ) : (
            <div className="text-center text-gray-300">
              No users found matching "{searchQuery}"
            </div>
          )}
        </ul>

        {/* Confirmation Dialog */}
        {deleteConfirm && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-gray-900 bg-opacity-80 border border-gray-700 rounded-lg p-6 max-w-sm mx-auto shadow-lg">
              <h3 className="text-lg font-bold mb-4 text-white">Confirm Deletion</h3>
              <p className="mb-4 text-gray-300">
                Are you sure you want to delete <strong>{deleteConfirm}</strong>?
              </p>
              <div className="flex justify-between">
                <button
                  onClick={() => handleDeleteUser(deleteConfirm)}
                  className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
                >
                  Delete
                </button>
                <button
                  onClick={() => setDeleteConfirm(null)}
                  className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-200 transition"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserManagementPage;
