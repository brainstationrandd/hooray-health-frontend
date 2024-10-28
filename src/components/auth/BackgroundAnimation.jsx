import React from 'react';

const BackgroundAnimation = () => (
  <div className="absolute inset-0 overflow-hidden">
    <div className="animate-pulse absolute top-1/4 left-1/4 w-64 h-64 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-30" />
    <div className="animate-pulse absolute top-1/3 right-1/4 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-30" />
    <div className="animate-pulse absolute bottom-1/4 left-1/3 w-80 h-80 bg-indigo-500 rounded-full mix-blend-multiply filter blur-xl opacity-30" />
  </div>
);

export default BackgroundAnimation;