// src/features/technician/components/TechnicianTopNavbar.jsx
import React from 'react';
import TopNavbar from '../../../components/layout/TopNavbar';
import { getUpdateStatusClasses } from '../utils/techncicanTopNavbarUtil';

const TechnicianTopNavbar = ({ sidebarOpen, setSidebarOpen }) => (
  <TopNavbar
    sidebarOpen={sidebarOpen}
    setSidebarOpen={setSidebarOpen}
    searchPlaceholder="Search jobs, customers..."
    actionButton={
      <button className={getUpdateStatusClasses()}>
        <span className="material-symbols-outlined text-[18px]">update</span>
        Update Status
      </button>
    }
  />
);

export default TechnicianTopNavbar;