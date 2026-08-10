/**
 * Sidebar Responsive State Management
 * @file useSidebarResponsive.js
 * @description Contains pure utility functions at the top, and the React hook at the bottom.
 */

// ==========================================================================================
// 🛠️ UTILS (Pure functions & constants - No React dependencies)
// ==========================================================================================

export const SIDEBAR_BREAKPOINTS = {
  MOBILE: 640,
  TABLET: 768,
  DESKTOP: 1024,
  LARGE_DESKTOP: 1280,
};

export const DEFAULT_RESPONSIVE_CONFIG = {
  breakpoint: SIDEBAR_BREAKPOINTS.DESKTOP,
  resizeDebounceMs: 100,
};

/**
 * Checks if the current viewport meets or exceeds the given breakpoint
 * Safe for SSR — returns false if window is undefined
 */
export const isViewportAtLeast = (breakpoint = SIDEBAR_BREAKPOINTS.DESKTOP) => {
  if (typeof window === 'undefined') return false;
  return window.innerWidth >= breakpoint;
};

/**
 * Checks if the current viewport is below the given breakpoint
 * Safe for SSR — returns true if window is undefined
 */
export const isViewportBelow = (breakpoint = SIDEBAR_BREAKPOINTS.DESKTOP) => {
  if (typeof window === 'undefined') return true;
  return window.innerWidth < breakpoint;
};

/**
 * Determines the initial sidebar state based on current viewport
 */
export const getInitialSidebarState = (breakpoint = SIDEBAR_BREAKPOINTS.DESKTOP) => {
  return isViewportAtLeast(breakpoint);
};

/**
 * Creates a debounced version of a function
 * Returns an object with `invoke` and `cancel` methods
 */
export const createDebouncedFn = (fn, delay) => {
  let timeoutId = null;

  const invoke = (...args) => {
    if (timeoutId) clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      fn(...args);
      timeoutId = null;
    }, delay);
  };

  const cancel = () => {
    if (timeoutId) {
      clearTimeout(timeoutId);
      timeoutId = null;
    }
  };

  return { invoke, cancel };
};

/**
 * Creates a resize handler that syncs sidebar state to viewport width
 * Returns `onResize` to attach to the listener and `cleanup` for unmounting
 */
export const createResizeHandler = (setState, breakpoint, debounceMs) => {
  const debounced = createDebouncedFn(() => {
    setState(window.innerWidth >= breakpoint);
  }, debounceMs);

  const onResize = () => debounced.invoke();
  const cleanup = () => debounced.cancel();

  return { onResize, cleanup };
};


// ==========================================================================================
// ⚛️ HOOK (React state & side effects)
// ==========================================================================================

import { useState, useEffect, useCallback } from 'react';

/**
 * Custom hook to manage sidebar open/close state with responsive behavior
 *
 * - Initializes based on current viewport width
 * - Listens to window resize events (debounced)
 * - Auto-opens sidebar when viewport crosses above breakpoint
 * - Auto-closes sidebar when viewport crosses below breakpoint
 *
 * @param {object} [config] - Optional configuration
 * @param {number} [config.breakpoint=1024] - Pixel width threshold for auto-toggle
 * @param {number} [config.resizeDebounceMs=100] - Debounce delay for resize handler
 * @returns {object} Sidebar state and controls
 *
 * @example
 * const { sidebarOpen, setSidebarOpen, toggleSidebar, openSidebar, closeSidebar, isDesktop } = useSidebarResponsive();
 */
const useSidebarResponsive = (config = {}) => {
  const {
    breakpoint = DEFAULT_RESPONSIVE_CONFIG.breakpoint,
    resizeDebounceMs = DEFAULT_RESPONSIVE_CONFIG.resizeDebounceMs,
  } = config;

  // ─── State ──────────────────────────────────────────────────────────────
  const [sidebarOpen, setSidebarOpen] = useState(
    () => getInitialSidebarState(breakpoint)
  );

  // ─── Derived ────────────────────────────────────────────────────────────
  const isDesktop = typeof window !== 'undefined' && window.innerWidth >= breakpoint;

  // ─── Resize Listener ────────────────────────────────────────────────────
  useEffect(() => {
    const { onResize, cleanup } = createResizeHandler(
      setSidebarOpen,
      breakpoint,
      resizeDebounceMs
    );

    window.addEventListener('resize', onResize);

    return () => {
      window.removeEventListener('resize', onResize);
      cleanup();
    };
  }, [breakpoint, resizeDebounceMs]);

  // ─── Handlers ───────────────────────────────────────────────────────────
  const toggleSidebar = useCallback(() => setSidebarOpen((prev) => !prev), []);
  const openSidebar = useCallback(() => setSidebarOpen(true), []);
  const closeSidebar = useCallback(() => setSidebarOpen(false), []);

  // ─── Return ─────────────────────────────────────────────────────────────
  return {
    sidebarOpen,
    setSidebarOpen,
    toggleSidebar,
    openSidebar,
    closeSidebar,
    isDesktop,
    breakpoint,
  };
};

export default useSidebarResponsive;