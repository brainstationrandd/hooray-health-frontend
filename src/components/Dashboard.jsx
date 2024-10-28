import React from 'react';

const Dashboard = () => (
  <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-900 via-indigo-800 to-blue-900">
    <div className="text-center p-8 bg-white bg-opacity-10 backdrop-blur-lg rounded-2xl shadow-2xl">
      <h1 className="text-3xl font-bold text-white mb-4">Welcome to your Dashboard</h1>
      <p className="text-indigo-200">You have successfully logged in!</p>
    </div>
  </div>
);

export default Dashboard;
