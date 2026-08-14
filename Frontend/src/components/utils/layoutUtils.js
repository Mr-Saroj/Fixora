/**
 * Layout Utility Functions & Constants
 * @file layoutUtils.js
 * @description Static CSS and class builders for the Customer Dashboard layout
 */

// ─── Layout Dimensions ───────────────────────────────────────────────────────

export const SIDEBAR = {
  OPEN_MARGIN: 'lg:ml-72',
  CLOSED_MARGIN: 'lg:ml-0',
};

// ─── CSS ─────────────────────────────────────────────────────────────────────

/**
 * Global CSS injected into the layout
 * Covers Material Symbols, custom utility classes, and scrollbar styling
 */
export const LAYOUT_GLOBAL_CSS = `
  .material-symbols-outlined {
    font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
  }
  .spring {
    transition-timing-function: cubic-bezier(0.175, 0.885, 0.32, 1.275);
  }
  .shadow-soft {
    box-shadow: 0px 4px 20px rgba(0,0,0,0.03);
  }
  ::-webkit-scrollbar { width: 6px; }
  ::-webkit-scrollbar-track { background: transparent; }
  ::-webkit-scrollbar-thumb { background: #e0e3e5; border-radius: 10px; }
  ::-webkit-scrollbar-thumb:hover { background: #cbd5e1; }
`;

// ─── Class Name Builders ─────────────────────────────────────────────────────

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
  return 'flex min-h-screen bg-background text-on-surface overflow-hidden';
};

/**
 * Builds the main content area classes
 * @returns {string} Tailwind class string
 */
export const getMainContentClasses = () => {
  return 'flex-1 p-4 md:p-6 overflow-y-auto';
};