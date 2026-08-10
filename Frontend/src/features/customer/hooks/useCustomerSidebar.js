import { useCallback } from 'react';
import { isMobileView, DESKTOP_BREAKPOINT } from '../utils/customerSidebarUtils';

/**
 * Custom hook for Customer Sidebar actions
 * @param {function} setSidebarOpen - State setter from parent layout
 * @returns {object} Handler functions
 */
const useCustomerSidebar = (setSidebarOpen) => {
  /**
   * Closes the sidebar if the user is on a mobile/tablet viewport
   * Typically passed to NavLink onClick to auto-close the menu after navigation
   */
  const handleMobileClose = useCallback(() => {
    if (isMobileView(DESKTOP_BREAKPOINT)) {
      setSidebarOpen(false);
    }
  }, [setSidebarOpen]);

  return {
    handleMobileClose,
  };
};

export default useCustomerSidebar;