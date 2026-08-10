import React from 'react';
import { NavLink } from 'react-router-dom';
import useCustomerSidebar from '../hooks/useCustomerSidebar';
import {
  NAV_LINKS,
  BOTTOM_LINKS,
  getBackdropClasses,
  getSidebarContainerClasses,
  getNavLinkClasses,
  getActiveIndicatorClasses,
  getIconClasses,
  getBadgeClasses,
  getBottomLinkClasses,
  getCloseButtonClasses,
} from '../utils/customerSidebarUtils';

const Sidebar = ({ sidebarOpen, setSidebarOpen }) => {
  const { handleMobileClose } = useCustomerSidebar(setSidebarOpen);

  return (
    <>
      {/* Mobile Backdrop */}
      <div
        className={getBackdropClasses(sidebarOpen)}
        onClick={() => setSidebarOpen(false)}
      />

      {/* Sidebar Container */}
      <aside className={getSidebarContainerClasses(sidebarOpen)}>
        <div className="w-72 min-w-[18rem] h-full flex flex-col">

          {/* Logo + Close Button */}
          <div className="p-6 pb-8 border-b border-slate-100 flex items-start justify-between">
            <NavLink to="/customer-dashboard" end className="inline-block" onClick={handleMobileClose}>
              <svg width="160" height="48" viewBox="0 0 200 60" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <linearGradient id="sidebar-logo-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style={{ stopColor: '#004ac6', stopOpacity: 1 }} />
                    <stop offset="100%" style={{ stopColor: '#57dffe', stopOpacity: 1 }} />
                  </linearGradient>
                </defs>
                <g transform="translate(0, 10)">
                  <path d="M10 0 C10 0 40 0 40 5 C40 10 20 12 20 15 L20 25 L35 25 C35 25 35 30 30 30 L20 30 L20 45 L10 45 L10 0" fill="url(#sidebar-logo-grad)" />
                  <circle cx="45" cy="5" r="5" fill="#10B981" />
                  <text x="65" y="35" fontFamily="Inter, sans-serif" fontWeight="800" fontSize="32" fill="#0F172A">Fixora</text>
                </g>
              </svg>
            </NavLink>
            <button
              onClick={() => setSidebarOpen(false)}
              className={getCloseButtonClasses()}
            >
              <span className="material-symbols-outlined text-[22px] group-hover:rotate-90 transition-transform duration-200">
                close
              </span>
            </button>
          </div>

          <p className="text-xs text-slate-400 font-medium tracking-wide -mt-6 mb-0 px-6">PRO TECH DASHBOARD</p>

          {/* Main Navigation */}
          <nav className="flex-grow p-4 space-y-1 mt-2">
            {NAV_LINKS.map((link) => (
              <NavLink
                key={link.label}
                to={link.to}
                end={link.end}
                onClick={handleMobileClose}
                className={({ isActive }) => getNavLinkClasses(isActive)}
              >
                {({ isActive }) => (
                  <>
                    {isActive && <div className={getActiveIndicatorClasses()} />}
                    <span className={getIconClasses(isActive)}>
                      {link.icon}
                    </span>
                    <span className="flex-1 text-left">{link.label}</span>
                    {link.badge && (
                      <span className={getBadgeClasses()}>
                        {link.badge}
                      </span>
                    )}
                  </>
                )}
              </NavLink>
            ))}
          </nav>

          {/* Bottom Navigation */}
          <div className="p-4 pt-4 mt-auto border-t border-slate-100 space-y-1">
            {BOTTOM_LINKS.map((link) => (
              <a
                key={link.label}
                href="#"
                className={getBottomLinkClasses()}
              >
                <span className="material-symbols-outlined text-[22px] group-hover:scale-110 transition-transform">
                  {link.icon}
                </span>
                <span>{link.label}</span>
              </a>
            ))}
          </div>

        </div>
      </aside>
    </>
  );
};

export default Sidebar;