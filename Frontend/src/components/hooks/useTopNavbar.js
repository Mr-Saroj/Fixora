import { useMemo, useCallback } from 'react';
import { useAppSelector } from '../../redux/hooks';
import {
  getInitials,
  getFirstName,
  getGreetingText,
} from '../utils/topNavbarUtils';

/**
 * Reusable hook for TopNavbar state and logic
 * @param {boolean} sidebarOpen - Current sidebar state
 * @param {function} setSidebarOpen - Setter from parent
 * @returns {object} Computed values and handlers
 */
const useTopNavbar = (sidebarOpen, setSidebarOpen) => {

  const user = useAppSelector((state) => state.auth.user);

  const firstName  = useMemo(() => getFirstName(user?.name),  [user?.name]);
  const initials   = useMemo(() => getInitials(user?.name),   [user?.name]);
  const avatarTitle = useMemo(() => user?.name || 'Guest',    [user?.name]);
  const greeting   = useMemo(() => getGreetingText(firstName),[firstName]);

  const toggleSidebar = useCallback(() => {
    setSidebarOpen((prev) => !prev);
  }, [setSidebarOpen]);

  return {
    firstName,
    initials,
    avatarTitle,
    greeting,
    toggleSidebar,
  };
};

export default useTopNavbar;