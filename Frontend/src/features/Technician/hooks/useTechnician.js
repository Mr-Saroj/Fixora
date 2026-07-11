import { useState } from 'react';

const useTechnician = () => {
  const [activePage, setActivePage] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => setSidebarOpen(prev => !prev);

  return {
    activePage,
    setActivePage,
    sidebarOpen,
    setSidebarOpen,
    toggleSidebar,
  };
};

export default useTechnician;