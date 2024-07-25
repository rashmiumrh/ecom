// src/AdminApp.js
import React, { useState } from 'react';
import AdminLogin from './Admincomponents/AdminDashboard'
import AdminDashboard from './Admincomponents/AdminLogin'

const AdminApp = () => {
  const [admin, setAdmin] = useState(localStorage.getItem('admin'));

  const handleAdminLogin = (username) => setAdmin(username);
  const handleAdminLogout = () => {
    localStorage.removeItem('admin');
    setAdmin(null);
  };

  return (
    <div className="AdminApp">
      {!admin ? (
        <AdminLogin onLogin={handleAdminLogin} />
      ) : (
        <AdminDashboard onLogout={handleAdminLogout} />
      )}
    </div>
  );
};

export default AdminApp;
