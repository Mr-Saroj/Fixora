import { useCallback } from 'react';
import { isMobileView, DESKTOP_BREAKPOINT } from '../utils/sidebarUtils';

const useSidebar = (setSidebarOpen) => {
  const handleMobileClose = useCallback(() => {
    if (isMobileView(DESKTOP_BREAKPOINT)) {
      setSidebarOpen(false);
    }
  }, [setSidebarOpen]);

  return { handleMobileClose };
};

export default useSidebar;