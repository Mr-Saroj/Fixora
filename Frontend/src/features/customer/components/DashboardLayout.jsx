import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import TopNavbar from './TopNavbar';
import useSidebarResponsive from '../hooks/useSidebarResponsive';
import {
  LAYOUT_GLOBAL_CSS,
  getRootContainerClasses,
  getContentMarginClasses,
  getMainContentClasses,
} from '../utils/layoutUtils';

const DashboardLayout = () => {
  const { sidebarOpen, setSidebarOpen } = useSidebarResponsive();

  return (
    <div className={getRootContainerClasses()}>
      <Sidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />

      <div className={getContentMarginClasses(sidebarOpen)}>
        <TopNavbar
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