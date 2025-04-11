// src/AppRoutes.js
import React from 'react';
import { Routes, Route, Outlet, Navigate } from 'react-router-dom';

// Components
import AdminLayout from './admin/AdminLayout';
import HeaderManagement from './admin/HeaderManagement';
import LogoManagement from './admin/LogoManagement';
import Home from './Home';
import Navbar from './Navbar';

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public routes (with Navbar) */}
      <Route element={
        <>
          <Navbar />
          <Outlet />
        </>
      }>
        <Route path="/" element={<Home />} />
      </Route>

      {/* Admin routes */}
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<Navigate to="header" replace />} />
        <Route path="header" element={<HeaderManagement />} />
        <Route path="logo" element={<LogoManagement />} />
        <Route path="*" element={<div>404 - Admin Page Not Found</div>} />
      </Route>

      {/* Global 404 */}
      <Route path="*" element={<div>404 - Page Not Found</div>} />
    </Routes>
  );
};

export default AppRoutes;