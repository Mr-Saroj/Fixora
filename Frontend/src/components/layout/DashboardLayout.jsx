// src/components/layout/DashboardLayout.jsx

import React from 'react';
import { Outlet } from 'react-router-dom';
import useSidebarResponsive from '../hooks/useSidebarResponsive';
import useNotificationPolling from '../../features/technician/hooks/useNotificationPolling'; // adjust path to your actual location
import {
  LAYOUT_GLOBAL_CSS,
  getRootContainerClasses,
  getContentMarginClasses,
  getMainContentClasses,
} from '../utils/layoutUtils';

// ✅ NO Sidebar or TopNavbar imports here

const DashboardLayout = ({ SidebarComponent, TopNavbarComponent }) => {
  const { sidebarOpen, setSidebarOpen } = useSidebarResponsive();

  // Fires once when the dashboard mounts (any role), then polls on an
  // interval. Dispatches setUnreadCount to Redux, which both the
  // Sidebar badge and TopNavbar bell read from.
  useNotificationPolling();

  return (
    <div className={getRootContainerClasses()}>

      {/* ✅ Uses prop — not hardcoded Sidebar */}
      <SidebarComponent
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />

      <div className={getContentMarginClasses(sidebarOpen)}>

        {/* ✅ Uses prop — not hardcoded TopNavbar */}
        <TopNavbarComponent
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
        />

        <main className={getMainContentClasses()}>
          <Outlet />
        </main>

      </div>

      <style>{LAYOUT_GLOBAL_CSS}</style>
    </div>
  );
};

export default DashboardLayout;