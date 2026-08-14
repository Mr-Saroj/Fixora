// src/features/customer/CustomerDashboardLayout.jsx

import React from 'react';

import CustomerSidebar from './CustomerSidebar';
import CustomerTopNavbar from './CustomerTopNavbar';
import DashboardLayout from '../../../components/layout/DashboardLayout';

const CustomerDashboardLayout = () => (
  <DashboardLayout
    SidebarComponent={CustomerSidebar}
    TopNavbarComponent={CustomerTopNavbar}
  />
);

export default CustomerDashboardLayout;