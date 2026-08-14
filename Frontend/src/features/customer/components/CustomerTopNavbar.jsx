import React from 'react';
import TopNavbar from '../../../components/layout/TopNavbar';
import { getBookServiceClasses } from '../utils/customerTopNavbarUtils';

const CustomerTopNavbar = ({ sidebarOpen, setSidebarOpen }) => (
  <TopNavbar
    sidebarOpen={sidebarOpen}
    setSidebarOpen={setSidebarOpen}
    searchPlaceholder="Search services, requests..."
    actionButton={
      <button className={getBookServiceClasses()}>
        <span className="material-symbols-outlined text-[18px]">add</span>
        Book Service
      </button>
    }
  />
);

export default CustomerTopNavbar;