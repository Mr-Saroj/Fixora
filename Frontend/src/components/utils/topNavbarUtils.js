/**
 * Shared TopNavbar Utility Functions
 * @file topNavbarUtils.js
 */

// ─── String Helpers ───────────────────────────────────────────────────────────

export const getInitials = (name, fallback = '?') => {
  if (!name || typeof name !== 'string') return fallback;
  const trimmed = name.trim();
  if (!trimmed) return fallback;
  const parts = trimmed.split(/\s+/);
  if (parts.length === 1) return parts[0][0].toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
};

export const getFirstName = (name, fallback = 'Guest') => {
  if (!name || typeof name !== 'string') return fallback;
  const first = name.trim().split(/\s+/)[0];
  return first || fallback;
};

export const getGreetingText = (firstName) => {
  return `Welcome back, ${firstName}`;
};

// ─── Class Name Builders ──────────────────────────────────────────────────────

export const getHeaderClasses = () => {
  return 'sticky top-0 z-30 h-20 bg-white/80 backdrop-blur-xl border-b border-slate-100/80 flex items-center justify-between px-4 md:px-6 lg:px-8 transition-all duration-300';
};

export const getHamburgerButtonClasses = () => {
  return 'p-2.5 rounded-xl bg-slate-50 border border-slate-100 text-slate-500 hover:text-[#004ac6] hover:border-[#004ac6]/20 hover:bg-[#004ac6]/5 transition-all duration-200';
};

export const getHamburgerIconClasses = (isOpen) => {
  return `material-symbols-outlined text-[22px] transition-transform duration-300 ${
    !isOpen ? 'rotate-180' : ''
  }`;
};

export const getSearchContainerClasses = () => {
  return 'hidden xl:flex items-center bg-slate-50 rounded-xl px-4 py-2.5 border border-slate-100 w-64';
};

export const getActionButtonClasses = () => {
  return 'relative p-2.5 rounded-xl bg-slate-50 border border-slate-100 text-slate-500 hover:text-[#004ac6] hover:border-[#004ac6]/20 hover:bg-[#004ac6]/5 transition-all duration-200';
};

export const getAvatarClasses = () => {
  return 'w-10 h-10 rounded-full bg-gradient-to-br from-[#004ac6] to-[#57dffe] flex items-center justify-center text-white font-bold text-sm shadow-md cursor-pointer hover:scale-105 transition-transform';
};