
import { useMemo, useCallback } from 'react';

import {
  getInitials,
  getFirstName,
  getGreetingText,
} from '../utils/topNavbarUtils';

const useTopNavbar = (sidebarOpen, setSidebarOpen) => {

  // Get user name from localStorage instead of Redux
  const userName = localStorage.getItem('name') || 'Guest';

  const firstName = useMemo(
    () => getFirstName(userName),
    [userName]
  );

  const initials = useMemo(
    () => getInitials(userName),
    [userName]
  );

  const avatarTitle = useMemo(
    () => userName,
    [userName]
  );

  const greeting = useMemo(
    () => getGreetingText(firstName),
    [firstName]
  );

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
