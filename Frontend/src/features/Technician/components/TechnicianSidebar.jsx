// src/features/technician/components/TechnicianSidebar.jsx
import React from 'react';
import { useAppSelector } from '../../../redux/hooks';
import Sidebar from '../../../components/layout/Sidebar';
import { 
  TECHNICIAN_BOTTOM_LINKS, 
  DASHBOARD_LABEL, 
  getTechnicianNavLinks 
} from '../utils/technicianSidebarUtil';

const TechnicianSidebar = ({ sidebarOpen, setSidebarOpen }) => {
  const unreadNotifications = useAppSelector((state) => state.Notification.unreadCount);
  const unreadMessages      = useAppSelector((state) => state.Notification.unreadMessages);

  // Pass the Redux state into our util function
  const navLinksWithCounts = getTechnicianNavLinks(unreadMessages, unreadNotifications);

  return (
    <Sidebar
      sidebarOpen={sidebarOpen}
      setSidebarOpen={setSidebarOpen}
      navLinks={navLinksWithCounts}
      bottomLinks={TECHNICIAN_BOTTOM_LINKS}
      dashboardLabel={DASHBOARD_LABEL}
    />
  );
};

export default TechnicianSidebar;