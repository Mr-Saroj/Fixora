// src/features/customer/components/CustomerSidebar.jsx
import React from 'react';
import Sidebar from '../../../components/layout/Sidebar';
import { 
  CUSTOMER_NAV_LINKS, 
  CUSTOMER_BOTTOM_LINKS, 
  DASHBOARD_LABEL 
} from '../utils/customerSidebarUtil';

const CustomerSidebar = ({ sidebarOpen, setSidebarOpen }) => (
  <Sidebar
    sidebarOpen={sidebarOpen}
    setSidebarOpen={setSidebarOpen}
    navLinks={CUSTOMER_NAV_LINKS}
    bottomLinks={CUSTOMER_BOTTOM_LINKS}
    dashboardLabel={DASHBOARD_LABEL}
  />
);

export default CustomerSidebar;