// src/components/ui/InputField.jsx
import React from 'react';

const InputField = ({ 
  icon: Icon, 
  type = 'text', 
  name, 
  value, 
  onChange, 
  placeholder, 
  rightIcon: RightIcon,
  onRightIconClick 
}) => (
  <div className="group">
    <div className="relative transition-all duration-300 transform">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <Icon className="h-5 w-5 text-indigo-300 group-focus-within:text-white" />
      </div>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        className="block w-full pl-10 pr-10 py-3 border border-transparent bg-white bg-opacity-10 rounded-lg placeholder-indigo-300 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-opacity-20 transition-all duration-300"
        placeholder={placeholder}
        required
      />
      {RightIcon && (
        <button
          type="button"
          className="absolute inset-y-0 right-0 pr-3 flex items-center transition-transform duration-200 hover:scale-110"
          onClick={onRightIconClick}
        >
          <RightIcon className="h-5 w-5 text-indigo-300 hover:text-white" />
        </button>
      )}
    </div>
  </div>
);

export default InputField;