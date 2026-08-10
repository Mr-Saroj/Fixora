import { useMemo, useCallback } from 'react';
import { useAppSelector } from '../../../redux/hooks';
import {
  getInitials,
  getFirstName,
  getGreetingText,
  getSubtitleText,
} from '../utils/customerTopNavbarUtils';

/**
 * Custom hook for Customer TopNavbar state and logic
 * @param {boolean} sidebarOpen - Current sidebar state from parent
 * @param {function} setSidebarOpen - Setter function from parent
 * @returns {object} Computed values and event handlers
 */
const useCustomerTopNavbar = (sidebarOpen, setSidebarOpen) => {
  // ─── Redux State ─────────────────────────────────────────────────────────
  const user = useAppSelector((state) => state.auth.user);

  // ─── Computed Values ─────────────────────────────────────────────────────
  const firstName = useMemo(() => getFirstName(user?.name), [user?.name]);
  
  const initials = useMemo(() => getInitials(user?.name), [user?.name]);
  
  const avatarTitle = useMemo(() => user?.name || 'Guest', [user?.name]);
  
  const greeting = useMemo(() => getGreetingText(firstName), [firstName]);
  
  const subtitle = useMemo(() => getSubtitleText(), []);

  // ─── Handlers ────────────────────────────────────────────────────────────
  const toggleSidebar = useCallback(() => {
    setSidebarOpen((prev) => !prev);
  }, [setSidebarOpen]);

  // ─── Return ──────────────────────────────────────────────────────────────
  return {
    firstName,
    initials,
    avatarTitle,
    greeting,
    subtitle,
    toggleSidebar,
  };
};

export default useCustomerTopNavbar;