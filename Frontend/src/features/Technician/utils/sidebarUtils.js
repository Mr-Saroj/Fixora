/**
 * Sidebar Configuration & Utilities for Technician Portal
 * @file sidebarUtils.js
 * @description Contains navigation links, bottom links, and helper functions for the Sidebar component
 */

// ─── Main Navigation Links ───────────────────────────────────────────────────
export const NAV_LINKS = [
  {
    id: 'dashboard',
    icon: 'dashboard',
    label: 'Dashboard',
    to: '/technician-dashboard',
    end: true,
    requiresAuth: true,
  },
  {
    id: 'customer-requests',
    icon: 'inbox',
    label: 'Customer Requests',
    to: '/technician-dashboard/customer-requests',
    end: false,
    requiresAuth: true,
  },
  {
    id: 'accepted-requests',
    icon: 'task_alt',
    label: 'Accepted Requests',
    to: '/technician-dashboard/accepted-requests',
    end: false,
    requiresAuth: true,
  },
  {
    id: 'messages',
    icon: 'chat_bubble',
    label: 'Messages',
    to: '/technician-dashboard/messages',
    end: false,
    requiresAuth: true,
  },
  {
    id: 'notifications',
    icon: 'notifications',
    label: 'Notifications',
    to: '/technician-dashboard/notifications',
    end: false,
    requiresAuth: true,
    showBadge: true,
  },
  {
    id: 'settings',
    icon: 'settings',
    label: 'Settings',
    to: '/technician-dashboard/settings',
    end: false,
    requiresAuth: true,
  },
];

// ─── Bottom Navigation Links ─────────────────────────────────────────────────
export const BOTTOM_LINKS = [
  {
    id: 'help-center',
    icon: 'help',
    label: 'Help Center',
    href: '/help',
    isExternal: false,
  },
  {
    id: 'logout',
    icon: 'logout',
    label: 'Logout',
    href: '#',
    isExternal: false,
    isDanger: true,
  },
];

// ─── Breakpoints ─────────────────────────────────────────────────────────────
export const BREAKPOINTS = {
  MOBILE: 640,
  TABLET: 768,
  DESKTOP: 1024,
  LARGE_DESKTOP: 1280,
};

// ─── Sidebar Dimensions ──────────────────────────────────────────────────────
export const SIDEBAR = {
  WIDTH: '18rem',        // 288px
  WIDTH_PX: 288,
  MIN_WIDTH: '18rem',
  LOGO_WIDTH: 160,
  LOGO_HEIGHT: 48,
  CLOSE_BUTTON_SIZE: 22,
  ICON_SIZE: 22,
  BADGE_MIN_WIDTH: 20,
  BADGE_HEIGHT: 20,
  ACTIVE_INDICATOR_WIDTH: 4,
  ACTIVE_INDICATOR_HEIGHT: 32,
};

// ─── Color Tokens ────────────────────────────────────────────────────────────
export const SIDEBAR_COLORS = {
  primary: '#004ac6',
  secondary: '#57dffe',
  activeBgFrom: 'rgba(0, 74, 198, 0.1)',
  activeBgTo: 'rgba(87, 223, 254, 0.05)',
  badgeBg: '#004ac6',
  badgeText: '#ffffff',
  indicatorFrom: '#004ac6',
  indicatorTo: '#57dffe',
  textDefault: '#64748b',
  textHover: '#1e293b',
  textActive: '#004ac6',
  border: '#f1f5f9',
  background: '#ffffff',
  dangerHoverBg: '#fef2f2',
  dangerHoverText: '#ef4444',
  mutedText: '#94a3b8',
};

// ─── Helper Functions ─────────────────────────────────────────────────────────

/**
 * Checks if the current viewport is mobile/tablet size
 * Used to determine if sidebar should auto-close on navigation
 * @param {number} breakpoint - The breakpoint threshold (default: 1024)
 * @returns {boolean} True if viewport is below breakpoint
 */
export const isMobileView = (breakpoint = BREAKPOINTS.DESKTOP) => {
  if (typeof window === 'undefined') return false;
  return window.innerWidth < breakpoint;
};

/**
 * Handles closing the sidebar on mobile devices
 * Call this on navigation click events
 * @param {function} setSidebarOpen - State setter for sidebar visibility
 * @param {number} breakpoint - The breakpoint threshold
 */
export const handleMobileClose = (setSidebarOpen, breakpoint = BREAKPOINTS.DESKTOP) => {
  if (isMobileView(breakpoint)) {
    setSidebarOpen(false);
  }
};

/**
 * Formats the unread count for badge display
 * @param {number} count - The unread notification count
 * @param {number} maxDisplay - Maximum number to display before showing "X+"
 * @returns {string|number} Formatted count (e.g., "9+" if count > 9)
 */
export const formatBadgeCount = (count, maxDisplay = 9) => {
  if (count <= 0) return null;
  return count > maxDisplay ? `${maxDisplay}+` : count;
};

/**
 * Gets the active indicator gradient style
 * @returns {string} CSS gradient string
 */
export const getActiveIndicatorGradient = () => {
  return `linear-gradient(to bottom, ${SIDEBAR_COLORS.indicatorFrom}, ${SIDEBAR_COLORS.indicatorTo})`;
};

/**
 * Finds a nav link by its ID
 * @param {string} id - The link ID to search for
 * @returns {object|undefined} The found nav link object
 */
export const findNavLinkById = (id) => {
  return NAV_LINKS.find((link) => link.id === id);
};

/**
 * Finds a bottom link by its ID
 * @param {string} id - The link ID to search for
 * @returns {object|undefined} The found bottom link object
 */
export const findBottomLinkById = (id) => {
  return BOTTOM_LINKS.find((link) => link.id === id);
};

/**
 * Gets all links that should display a badge
 * @returns {string[]} Array of link IDs that show badges
 */
export const getBadgeEnabledLinks = () => {
  return NAV_LINKS.filter((link) => link.showBadge).map((link) => link.id);
};

// ─── Class Name Builders ─────────────────────────────────────────────────────

/**
 * Builds the sidebar container classes
 * @param {boolean} isOpen - Whether the sidebar is open
 * @returns {string} Combined class names
 */
export const getSidebarClasses = (isOpen) => {
  const base = 'fixed left-0 top-0 h-screen bg-white border-r border-slate-100 flex flex-col z-50 transition-all duration-300 ease-in-out shadow-[4px_0_30px_-10px_rgba(0,0,0,0.05)]';
  const open = 'translate-x-0 w-72';
  const closed = '-translate-x-full lg:translate-x-0 lg:w-0 lg:overflow-hidden lg:border-r-0 lg:shadow-none';
  return `${base} ${isOpen ? open : closed}`;
};

/**
 * Builds the backdrop classes
 * @param {boolean} isVisible - Whether the backdrop should be visible
 * @returns {string} Combined class names
 */
export const getBackdropClasses = (isVisible) => {
  const base = 'fixed inset-0 bg-black/40 backdrop-blur-sm z-40 lg:hidden transition-all duration-300';
  const visible = 'opacity-100 visible';
  const hidden = 'opacity-0 invisible';
  return `${base} ${isVisible ? visible : hidden}`;
};

/**
 * Builds the nav link classes based on active state
 * @param {boolean} isActive - Whether the link is currently active
 * @returns {string} Combined class names
 */
export const getNavLinkClasses = (isActive) => {
  const base = 'w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium text-sm transition-all duration-200 group relative';
  const active = 'bg-gradient-to-r from-[#004ac6]/10 to-[#57dffe]/5 text-[#004ac6]';
  const inactive = 'text-slate-500 hover:bg-slate-50 hover:text-slate-800';
  return `${base} ${isActive ? active : inactive}`;
};

/**
 * Builds the bottom link classes
 * @param {boolean} isDanger - Whether the link is a danger action (e.g., logout)
 * @returns {string} Combined class names
 */
export const getBottomLinkClasses = (isDanger = false) => {
  if (isDanger) {
    return 'flex items-center gap-3 px-4 py-3 rounded-xl text-sm text-slate-400 hover:bg-red-50 hover:text-red-500 transition-all duration-200 group';
  }
  return 'flex items-center gap-3 px-4 py-3 rounded-xl text-sm text-slate-400 hover:bg-slate-50 hover:text-slate-600 transition-all duration-200 group';
};

/**
 * Builds the close button classes
 * @returns {string} Combined class names
 */
export const getCloseButtonClasses = () => {
  return 'lg:hidden p-2 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-all duration-200 group';
};

/**
 * Builds the icon classes based on active state
 * @param {boolean} isActive - Whether the parent link is active
 * @returns {string} Combined class names
 */
export const getIconClasses = (isActive) => {
  const base = 'material-symbols-outlined text-[22px] transition-transform duration-200 group-hover:scale-110';
  const activeColor = isActive ? 'text-[#004ac6]' : '';
  return `${base} ${activeColor}`;
};

/**
 * Builds the notification badge classes
 * @returns {string} Combined class names
 */
export const getBadgeClasses = () => {
  return 'bg-[#004ac6] text-white text-[10px] font-bold min-w-[20px] h-5 flex items-center justify-center px-1.5 rounded-full shadow-sm';
};

/**
 * Builds the active indicator classes
 * @returns {string} Combined class names
 */
export const getActiveIndicatorClasses = () => {
  return 'absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-gradient-to-b from-[#004ac6] to-[#57dffe] rounded-r-full';
};