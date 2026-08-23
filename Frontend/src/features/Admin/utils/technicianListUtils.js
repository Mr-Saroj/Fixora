import React from 'react';

/* ─── Type icon map ──────────────────────────────────────────────── */
export const typeIcon = (type) =>
  ({
    PLUMBER: 'water_drop',
    ELECTRICIAN: 'bolt',
    HVAC: 'ac_unit',
    CARPENTER: 'handyman',
    PAINTER: 'format_paint',
    CLEANER: 'cleaning_services',
    APPLIANCE_REPAIR: 'home_repair_service',
    OTHER: 'build',
  }[type] ?? 'build');

/* ─── Status badge config ────────────────────────────────────────── */
export const ACCESS_CONFIG = {
  PENDING: {
    label: 'Pending',
    dot: 'bg-yellow-400',
    badge: 'bg-yellow-50 text-yellow-600 border-yellow-100',
  },
  ALLOW: {
    label: 'Active',
    dot: 'bg-emerald-400',
    badge: 'bg-emerald-50 text-emerald-600 border-emerald-100',
  },
  BLOCK: {
    label: 'Blocked',
    dot: 'bg-red-400',
    badge: 'bg-red-50 text-red-500 border-red-100',
  },
};

/* ─── Star Rating (React.createElement for .js) ──────────────────── */
export const StarRating = ({ rating }) => {
  if (!rating) {
    return React.createElement('span', { className: 'text-xs text-slate-400' }, 'No rating');
  }

  const full  = Math.floor(rating);
  const half  = rating % 1 >= 0.5;
  const empty = 5 - full - (half ? 1 : 0);

  const starProps = {
    className: 'material-symbols-outlined text-amber-400 text-[14px]',
    style: { fontVariationSettings: "'FILL' 1" },
  };

  return React.createElement(
    'span',
    { className: 'flex items-center gap-0.5' },
    ...Array(full)
      .fill(0)
      .map((_, i) =>
        React.createElement('span', { key: `f${i}`, ...starProps }, 'star')
      ),
    half
      ? React.createElement('span', { key: 'half', ...starProps }, 'star_half')
      : null,
    ...Array(empty)
      .fill(0)
      .map((_, i) =>
        React.createElement('span', {
          key: `e${i}`,
          className: 'material-symbols-outlined text-slate-200 text-[14px]',
          style: { fontVariationSettings: "'FILL' 1" },
        }, 'star')
      ),
    React.createElement(
      'span',
      { className: 'ml-1 text-xs font-bold text-slate-600' },
      rating.toFixed(1)
    )
  );
};