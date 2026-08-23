import React from 'react';

export const formatRelative = (date) => {
  if (!date) return '—';
  const diff = Math.floor((Date.now() - new Date(date)) / 60_000);
  if (diff < 1)  return 'just now';
  if (diff < 60) return `${diff}m ago`;
  const h = Math.floor(diff / 60);
  if (h < 24)    return `${h}h ago`;
  return `${Math.floor(h / 24)}d ago`;
};

export const Skeleton = ({ className }) =>
  React.createElement('span', {
    className: `inline-block bg-slate-100 animate-pulse rounded ${className}`,
  });

export const StatCard = ({ label, value, icon, colorClass, sub, loading }) =>
  React.createElement(
    'div',
    {
      className:
        'bg-white p-4 sm:p-6 rounded-xl sm:rounded-2xl border border-slate-100/80 shadow-sm hover:shadow-[0_15px_40px_-10px_rgba(0,74,198,0.12)] hover:-translate-y-0.5 transition-all duration-300 group',
    },
    React.createElement(
      'div',
      { className: 'flex justify-between items-start mb-3 sm:mb-4' },
      React.createElement(
        'div',
        {
          className: `p-2 sm:p-3 rounded-lg sm:rounded-xl group-hover:scale-110 transition-transform duration-300 ${colorClass}`,
        },
        React.createElement(
          'span',
          { className: 'material-symbols-outlined text-[20px] sm:text-[24px]' },
          icon
        )
      ),
      React.createElement(
        'span',
        {
          className:
            'hidden sm:inline text-[10px] font-bold tracking-widest text-slate-400 bg-slate-50 px-2 py-1 rounded-full border border-slate-100',
        },
        sub
      )
    ),
    React.createElement(
      'h3',
      { className: 'text-[11px] sm:text-sm text-slate-400 font-medium leading-tight' },
      label
    ),
    React.createElement(
      'p',
      { className: 'text-xl sm:text-2xl font-extrabold text-slate-800 mt-1 tracking-tight leading-none' },
      loading ? React.createElement(Skeleton, { className: 'w-12 h-6' }) : value
    )
  );