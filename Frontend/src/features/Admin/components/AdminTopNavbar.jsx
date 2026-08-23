// src/features/admin/components/AdminTopNavbar.jsx

import React from 'react';
import TopNavbar from '../../../components/layout/TopNavbar';

/**
 * Admin variant of TopNavbar.
 * No actionButton prop is passed → the role-specific slot stays empty.
 * The notification bell and avatar are already built into TopNavbar.
 */
const AdminTopNavbar = ({ sidebarOpen, setSidebarOpen }) => (
  <TopNavbar
    sidebarOpen={sidebarOpen}
    setSidebarOpen={setSidebarOpen}
    subtitle="Admin Control Panel"
    // actionButton intentionally omitted — admins don't get a CTA button
  />
);

export default AdminTopNavbar;