import { useState } from 'react';

const useCustomer = () => {
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

export default useCustomer;