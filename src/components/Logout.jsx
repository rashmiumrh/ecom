// src/components/Logout.js
import React from 'react';

const Logout = ({ onLogout }) => {
  const handleLogout = () => {
    localStorage.removeItem('user');
    onLogout();
  };

  return <button onClick={handleLogout}>Logout</button>;
};

export default Logout;
