import React from 'react';
import DashboardLayout from '../../../components/layout/DashboardLayout';
import TechnicianSidebar from './TechnicianSidebar';
import TechnicianTopNavbar from './TechnicianTopNavbar';


const TechnicianDashboardLayout = () => (
  <DashboardLayout
    SidebarComponent={TechnicianSidebar}
    TopNavbarComponent={TechnicianTopNavbar}
  />
);

export default TechnicianDashboardLayout;