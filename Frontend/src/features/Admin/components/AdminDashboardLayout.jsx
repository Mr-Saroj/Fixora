// src/features/admin/AdminDashboardLayout.jsx

import React from 'react';
import DashboardLayout from '../../../components/layout/DashboardLayout';
import AdminSidebar from './AdminSidebar';
import AdminTopNavbar from './AdminTopNavbar';

const AdminDashboardLayout = () => (
  <DashboardLayout
    SidebarComponent={AdminSidebar}
    TopNavbarComponent={AdminTopNavbar}
  />
);

export default AdminDashboardLayout;