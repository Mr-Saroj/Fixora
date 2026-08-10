/**
 * Layout Utility Functions & Constants
 * @file layoutUtils.js
 * @description Static configuration, CSS generators, and pure helpers for the dashboard layout
 */

// ─── Breakpoints ─────────────────────────────────────────────────────────────

export const BREAKPOINTS = {
  SIDEBAR_TOGGLE: 1024,
};

// ─── Polling ─────────────────────────────────────────────────────────────────

export const POLLING = {
  NOTIFICATION_INTERVAL_MS: 30000,
};

// ─── Layout Dimensions ───────────────────────────────────────────────────────

export const SIDEBAR = {
  OPEN_MARGIN: 'lg:ml-72',
  CLOSED_MARGIN: 'lg:ml-0',
};

// ─── CSS ─────────────────────────────────────────────────────────────────────

/**
 * Global CSS injected into the layout
 * Covers Material Symbols font settings and custom scrollbar styling
 */
export const LAYOUT_GLOBAL_CSS = `
  .material-symbols-outlined {
    font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
  }
  ::-webkit-scrollbar { width: 6px; }
  ::-webkit-scrollbar-track { background: transparent; }
  ::-webkit-scrollbar-thumb { background: #e0e3e5; border-radius: 10px; }
  ::-webkit-scrollbar-thumb:hover { background: #cbd5e1; }
`;

/**
 * Builds the main content area margin classes based on sidebar state
 * @param {boolean} sidebarOpen - Whether the sidebar is currently open
 * @returns {string} Tailwind class string
 */
export const getContentMarginClasses = (sidebarOpen) => {
  return `flex-1 flex flex-col relative transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] ${
    sidebarOpen ? SIDEBAR.OPEN_MARGIN : SIDEBAR.CLOSED_MARGIN
  }`;
};

/**
 * Builds the root layout container classes
 * @returns {string} Tailwind class string
 */
export const getRootContainerClasses = () => {
  return 'flex min-h-screen bg-[#f8fafc] text-slate-800 overflow-hidden font-sans';
};

/**
 * Builds the main content area classes
 * @returns {string} Tailwind class string
 */
export const getMainContentClasses = () => {
  return 'flex-1 p-4 md:p-6 overflow-y-auto';
};