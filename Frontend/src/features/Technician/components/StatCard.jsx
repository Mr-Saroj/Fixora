// src/features/technician/components/StatCard.jsx
import React from 'react';

const COLOR_MAP = {
  blue: 'bg-blue-50 text-blue-600',
  emerald: 'bg-emerald-50 text-emerald-600'
};

/**
 * `wide` = last card of an odd-numbered grid.
 * Below `lg` it spans both columns and switches to a horizontal layout,
 * so the empty slot beside it disappears. At `lg` (3 columns) it is a
 * normal card again.
 */
const StatCard = ({ stat, wide = false }) => {
  const tint = COLOR_MAP[stat.color] || 'bg-amber-50 text-amber-600';

  return (
    <div
      className={`group rounded-xl border border-slate-100/80 bg-white p-3.5 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_15px_40px_-10px_rgba(0,74,198,0.12)] sm:rounded-2xl sm:p-6 ${
        wide ? 'col-span-2 lg:col-span-1' : ''
      }`}
    >
      <div className={wide ? 'flex items-center gap-3 sm:gap-4 lg:block' : ''}>
        {/* Icon (+ badge on normal cards) */}
        <div
          className={`flex items-start justify-between ${
            wide ? 'shrink-0 lg:mb-4' : 'mb-3 sm:mb-4'
          }`}
        >
          <div
            className={`rounded-lg p-2 transition-transform duration-300 group-hover:scale-110 sm:rounded-xl sm:p-3 ${tint}`}
          >
            <span className="material-symbols-outlined text-[20px] sm:text-[24px]">
              {stat.icon}
            </span>
          </div>

          <span
            className={`rounded-full bg-slate-50 px-2 py-1 text-[10px] font-bold tracking-widest text-slate-400 ${
              wide ? 'hidden lg:inline' : 'hidden sm:inline'
            }`}
          >
            {stat.sub}
          </span>
        </div>

        {/* Label + value */}
        <div className={wide ? 'min-w-0 flex-1 lg:flex-none' : ''}>
          <h3 className="text-[11px] font-medium leading-tight text-slate-400 sm:text-sm">
            {stat.label}
          </h3>
          <p className="mt-1 text-xl font-extrabold leading-none tracking-tight text-slate-800 sm:text-2xl">
            {stat.value}
          </p>
        </div>

        {/* Badge moved to the right on the wide mobile layout */}
        {wide && (
          <span className="shrink-0 rounded-full bg-slate-50 px-2 py-1 text-[10px] font-bold tracking-widest text-slate-400 lg:hidden">
            {stat.sub}
          </span>
        )}
      </div>
    </div>
  );
};

export default StatCard;