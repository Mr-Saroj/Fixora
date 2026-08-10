/**
 * TopNavbar Utility Functions & Constants
 * @file topNavbarUtils.js
 * @description Pure utility functions and static configuration for the TopNavbar component
 */

// ─── Constants ───────────────────────────────────────────────────────────────

export const BADGE_MAX_DISPLAY = 9;

export const AVATAR_SIZES = {
  MOBILE: { width: 'w-8', height: 'h-8', text: 'text-xs' },
  SMALL: { width: 'w-9', height: 'h-9', text: 'text-sm' },
  MEDIUM: { width: 'w-10', height: 'h-10', text: 'text-sm' },
};

export const NAVBAR_HEIGHTS = {
  MOBILE: 'h-16',
  TABLET: 'sm:h-18',
  DESKTOP: 'md:h-20',
};

export const SEARCH_BREAKPOINTS = {
  SHOW_INLINE: 'xl',
  HIDE_INLINE: 'xl:hidden',
};

export const GRADIENT = {
  from: '#004ac6',
  to: '#57dffe',
};

// ─── Utility Functions ───────────────────────────────────────────────────────

/**
 * Extracts initials from a full name string
 * @param {string} name - Full name (e.g., "John Doe")
 * @param {string} fallback - Fallback character when name is empty (default: '?')
 * @returns {string} Uppercase initials (e.g., "JD")
 *
 * @example
 * getInitials('John Doe')       // 'JD'
 * getInitials('John')           // 'J'
 * getInitials('')               // '?'
 * getInitials(null)             // '?'
 * getInitials('  John  Doe  ')  // 'JD'
 */
export const getInitials = (name, fallback = '?') => {
  if (!name || typeof name !== 'string') return fallback;

  const trimmed = name.trim();
  if (!trimmed) return fallback;

  const parts = trimmed.split(/\s+/);

  if (parts.length === 1) {
    return parts[0][0].toUpperCase();
  }

  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
};

/**
 * Formats the unread count for badge display
 * @param {number} count - The unread notification count
 * @param {number} maxDisplay - Maximum number before showing "X+" (default: 9)
 * @returns {string|number|null} Formatted count, or null if count <= 0
 *
 * @example
 * formatBadgeCount(0)    // null
 * formatBadgeCount(5)    // 5
 * formatBadgeCount(9)    // 9
 * formatBadgeCount(15)   // '9+'
 */
export const formatBadgeCount = (count, maxDisplay = BADGE_MAX_DISPLAY) => {
  if (!count || count <= 0) return null;
  return count > maxDisplay ? `${maxDisplay}+` : count;
};

/**
 * Extracts the first name from a full name string
 * @param {string} name - Full name
 * @param {string} fallback - Fallback when name is empty (default: 'Guest')
 * @returns {string} First name or fallback
 *
 * @example
 * getFirstName('John Doe')   // 'John'
 * getFirstName('')           // 'Guest'
 * getFirstName(null)         // 'Guest'
 */
export const getFirstName = (name, fallback = 'Guest') => {
  if (!name || typeof name !== 'string') return fallback;
  const first = name.trim().split(/\s+/)[0];
  return first || fallback;
};

/**
 * Builds the notification summary text
 * @param {number} count - Unread notification count
 * @returns {string} Human-readable summary
 *
 * @example
 * getNotificationSummary(0)   // 'You have no new notifications waiting.'
 * getNotificationSummary(1)   // 'You have 1 new notification waiting.'
 * getNotificationSummary(5)   // 'You have 5 new notifications waiting.'
 */
export const getNotificationSummary = (count) => {
  const num = count > 0 ? count : 'no';
  const plural = count === 1 ? '' : 's';
  return `You have ${num} new notification${plural} waiting.`;
};

/**
 * Builds the mobile greeting text
 * @param {string} firstName - User's first name
 * @returns {string} Greeting string
 *
 * @example
 * getMobileGreeting('John')  // 'Hey, John 👋'
 */
export const getMobileGreeting = (firstName) => {
  return `Hey, ${firstName} 👋`;
};

/**
 * Builds the desktop greeting text
 * @param {string} firstName - User's first name
 * @returns {string} Greeting string
 *
 * @example
 * getDesktopGreeting('John')  // 'Welcome back, John'
 */
export const getDesktopGreeting = (firstName) => {
  return `Welcome back, ${firstName}`;
};