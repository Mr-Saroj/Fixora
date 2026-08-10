import { useState, useEffect, useCallback } from 'react';
import { BREAKPOINTS } from '../utils/layoutUtils';

/**
 * Custom hook to manage sidebar open/close state with responsive behavior
 *
 * - Initializes based on current viewport width
 * - Listens to window resize events
 * - Auto-opens sidebar when crossing above the breakpoint
 * - Auto-closes sidebar when crossing below the breakpoint
 * - Debounced resize handling to avoid excessive re-renders
 *
 * @param {number} [breakpoint] - Pixel width at which sidebar behavior changes
 * @returns {{ sidebarOpen: boolean, setSidebarOpen: function, toggleSidebar: function, isDesktop: boolean }}
 *
 * @example
 * const { sidebarOpen, setSidebarOpen, toggleSidebar, isDesktop } = useSidebarResponsive();
 */
const useSidebarResponsive = (breakpoint = BREAKPOINTS.SIDEBAR_TOGGLE) => {
  const [sidebarOpen, setSidebarOpen] = useState(() => window.innerWidth >= breakpoint);

  /**
   * Checks if current viewport is at or above the breakpoint
   * @returns {boolean}
   */
  const isDesktop = typeof window !== 'undefined' && window.innerWidth >= breakpoint;

  useEffect(() => {
    let timeoutId = null;

    const handleResize = () => {
      // Debounce resize by 100ms to prevent rapid state changes
      if (timeoutId) clearTimeout(timeoutId);

      timeoutId = setTimeout(() => {
        setSidebarOpen(window.innerWidth >= breakpoint);
      }, 100);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [breakpoint]);

  const toggleSidebar = useCallback(() => {
    setSidebarOpen((prev) => !prev);
  }, []);

  return {
    sidebarOpen,
    setSidebarOpen,
    toggleSidebar,
    isDesktop,
  };
};

export default useSidebarResponsive;