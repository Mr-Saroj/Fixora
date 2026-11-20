// src/features/technician/components/NoActiveJob.jsx
import React from 'react';
import { Link } from 'react-router-dom';

/* Technician avatar illustration (inline SVG, no external assets) */
const TechnicianAvatar = () => (
  <svg viewBox="0 0 120 120" className="h-full w-full" aria-hidden="true">
    <defs>
      <linearGradient id="naj-bg" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#eaf1ff" />
        <stop offset="100%" stopColor="#d7f4ff" />
      </linearGradient>
      <linearGradient id="naj-body" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#004ac6" />
        <stop offset="100%" stopColor="#2f8bff" />
      </linearGradient>
      <linearGradient id="naj-hat" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#57dffe" />
        <stop offset="100%" stopColor="#2aa9f5" />
      </linearGradient>
      <clipPath id="naj-clip">
        <circle cx="60" cy="60" r="60" />
      </clipPath>
    </defs>

    <g clipPath="url(#naj-clip)">
      <rect width="120" height="120" fill="url(#naj-bg)" />

      {/* shoulders / uniform */}
      <path
        d="M14 128c0-26 20-42 46-42s46 16 46 42z"
        fill="url(#naj-body)"
      />
      <path d="M48 88l12 14 12-14" fill="#ffffff" opacity="0.9" />

      {/* neck + face */}
      <rect x="53" y="72" width="14" height="14" rx="6" fill="#f2c9a5" />
      <circle cx="60" cy="56" r="19" fill="#f8d7b5" />

      {/* face details */}
      <circle cx="53" cy="57" r="1.8" fill="#1e293b" />
      <circle cx="67" cy="57" r="1.8" fill="#1e293b" />
      <path
        d="M54 65c3.5 3 8.5 3 12 0"
        stroke="#1e293b"
        strokeWidth="2"
        strokeLinecap="round"
        fill="none"
      />

      {/* hard hat */}
      <path d="M39 50c0-13 9-21 21-21s21 8 21 21z" fill="url(#naj-hat)" />
      <rect x="35" y="48" width="50" height="6" rx="3" fill="#2aa9f5" />
      <rect x="56" y="29" width="8" height="12" rx="3" fill="#ffffff" opacity="0.7" />
    </g>
  </svg>
);

const FloatingChip = ({ icon, className = '', delay = '0s' }) => (
  <span
    className={`absolute flex h-8 w-8 items-center justify-center rounded-full border border-slate-100 bg-white text-[#004ac6] shadow-md sm:h-9 sm:w-9 animate-pulse ${className}`}
    style={{ animationDelay: delay, animationDuration: '2.4s' }}
  >
    <span className="material-symbols-outlined text-[16px] sm:text-[18px]">
      {icon}
    </span>
  </span>
);

const NoActiveJob = ({ requestsPath = '/technician-requests' }) => (
  <div className="flex flex-col items-center px-2 py-4 text-center sm:py-8">
    {/* Avatar with soft rings */}
    <div className="relative flex h-32 w-32 items-center justify-center sm:h-40 sm:w-40">
      {/* outer rings */}
      <span className="absolute inset-0 rounded-full bg-[#004ac6]/5 animate-pulse" />
      <span className="absolute inset-3 rounded-full bg-[#57dffe]/10" />

      {/* gradient ring + avatar */}
      <div className="relative h-24 w-24 rounded-full bg-gradient-to-br from-[#004ac6] to-[#57dffe] p-[3px] shadow-[0_10px_30px_-8px_rgba(0,74,198,0.45)] sm:h-28 sm:w-28">
        <div className="h-full w-full overflow-hidden rounded-full border-2 border-white bg-white">
          <TechnicianAvatar />
        </div>
      </div>

      {/* floating status chips */}
      <FloatingChip icon="build" className="-left-1 top-4 sm:left-0" />
      <FloatingChip
        icon="schedule"
        className="-right-1 top-2 sm:right-0"
        delay="0.6s"
      />
      <FloatingChip
        icon="near_me"
        className="bottom-2 right-0 sm:right-2"
        delay="1.2s"
      />

      {/* idle status dot */}
      <span className="absolute bottom-5 left-[26px] flex h-5 w-5 items-center justify-center rounded-full border-2 border-white bg-slate-300 sm:bottom-6 sm:left-8">
        <span className="h-1.5 w-1.5 rounded-full bg-white" />
      </span>
    </div>

    <h4 className="mt-4 text-sm font-bold text-slate-800 sm:text-base">
      No active job right now
    </h4>
    <p className="mt-1 max-w-xs text-xs text-slate-400 sm:text-sm">
      You&apos;re all caught up. New customer requests will show up here once
      you accept one.
    </p>

    <Link
      to={requestsPath}
      className="mt-4 inline-flex items-center gap-1.5 rounded-lg bg-gradient-to-r from-[#004ac6] to-[#2f8bff] px-4 py-2 text-xs font-bold text-white shadow-md shadow-[#004ac6]/25 transition hover:shadow-lg sm:text-sm"
    >
      <span className="material-symbols-outlined text-[16px]">inbox</span>
      Browse Requests
    </Link>
  </div>
);

export default NoActiveJob;