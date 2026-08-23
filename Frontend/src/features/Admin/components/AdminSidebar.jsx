// src/features/admin/components/AdminSidebar.jsx

import React from 'react';
import Sidebar from '../../../components/layout/Sidebar';
import {
  ADMIN_NAV_LINKS,
  ADMIN_BOTTOM_LINKS,
  DASHBOARD_LABEL,
} from '../utils/adminSidebarUtil';

const AdminSidebar = ({ sidebarOpen, setSidebarOpen }) => (
  <Sidebar
    sidebarOpen={sidebarOpen}
    setSidebarOpen={setSidebarOpen}
    navLinks={ADMIN_NAV_LINKS}
    bottomLinks={ADMIN_BOTTOM_LINKS}
    dashboardLabel={DASHBOARD_LABEL}
  />
);

export default AdminSidebar;