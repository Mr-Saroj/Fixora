import { useState, useMemo, useCallback } from 'react';
import { useAppSelector } from '../../../redux/hooks';
import {
  getInitials,
  getFirstName,
  getNotificationSummary,
  getMobileGreeting,
  getDesktopGreeting,
  formatBadgeCount,
} from '../utils/topNavbarUtils';

/**
 * Custom hook for TopNavbar component logic
 * @returns {object} All state, computed values, and handlers needed by TopNavbar
 */
const useTopNavbar = () => {
  // ─── Local State ─────────────────────────────────────────────────────────
  const [searchOpen, setSearchOpen] = useState(false);

  // ─── Redux State ─────────────────────────────────────────────────────────
  const user = useAppSelector((state) => state.auth.user);
  const unreadCount = useAppSelector((state) => state.Notification.unreadCount);

  // ─── Computed Values ─────────────────────────────────────────────────────
  const firstName = useMemo(() => getFirstName(user?.name), [user?.name]);

  const initials = useMemo(() => getInitials(user?.name), [user?.name]);

  const displayCount = useMemo(() => formatBadgeCount(unreadCount), [unreadCount]);

  const hasNotifications = useMemo(() => unreadCount > 0, [unreadCount]);

  const notificationSummary = useMemo(
    () => getNotificationSummary(unreadCount),
    [unreadCount]
  );

  const mobileGreeting = useMemo(() => getMobileGreeting(firstName), [firstName]);

  const desktopGreeting = useMemo(() => getDesktopGreeting(firstName), [firstName]);

  const avatarTitle = useMemo(
    () => user?.name || 'Guest',
    [user?.name]
  );

  // ─── Handlers ────────────────────────────────────────────────────────────
  const toggleSearch = useCallback(() => {
    setSearchOpen((prev) => !prev);
  }, []);

  const closeSearch = useCallback(() => {
    setSearchOpen(false);
  }, []);

  const openSearch = useCallback(() => {
    setSearchOpen(true);
  }, []);

  // ─── Return ──────────────────────────────────────────────────────────────
  return {
    // State
    searchOpen,
    setSearchOpen,

    // User data
    user,
    firstName,
    initials,
    avatarTitle,

    // Notifications
    unreadCount,
    displayCount,
    hasNotifications,
    notificationSummary,

    // Greetings
    mobileGreeting,
    desktopGreeting,

    // Handlers
    toggleSearch,
    closeSearch,
    openSearch,
  };
};

export default useTopNavbar;