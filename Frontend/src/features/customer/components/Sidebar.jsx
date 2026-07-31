import React from 'react';
import { NavLink } from 'react-router-dom';

const Sidebar = ({ sidebarOpen, setSidebarOpen }) => {
  const navLinks = [
  { icon: 'dashboard', label: 'Dashboard', to: '/customer-dashboard', end: true },
  { icon: 'assignment', label: 'Create Requests', to: '/customer-dashboard/requests' },
  { icon: 'history', label: 'Request History', to: '/customer-dashboard/history' },
  { icon: 'chat_bubble', label: 'Messages', to: '/customer-dashboard/messages' },
  { icon: 'settings', label: 'Settings', to: '/customer-dashboard/settings' },
];

  const bottomLinks = [
    { icon: 'help', label: 'Help Center' },
    { icon: 'logout', label: 'Logout' },
  ];

  const handleMobileClose = () => {
    if (window.innerWidth < 1024) {
      setSidebarOpen(false);
    }
  };

  return (
    <>
      <div
        className={`fixed inset-0 bg-black/40 backdrop-blur-sm z-40 lg:hidden transition-all duration-300 ${
          sidebarOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
        onClick={() => setSidebarOpen(false)}
      />

      <aside
        className={`fixed left-0 top-0 h-screen bg-white border-r border-slate-100 flex flex-col z-50 shadow-[4px_0_30px_-10px_rgba(0,0,0,0.05)] transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] ${
          sidebarOpen
            ? 'w-72 translate-x-0'
            : '-translate-x-full lg:translate-x-0 lg:w-0 lg:border-r-0 lg:shadow-none lg:overflow-hidden'
        }`}
      >
        <div className="w-72 min-w-[18rem] h-full flex flex-col">

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
              className="p-2 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-all duration-200 group"
            >
              <span className="material-symbols-outlined text-[22px] group-hover:rotate-90 transition-transform duration-200">close</span>
            </button>
          </div>

          <p className="text-xs text-slate-400 font-medium tracking-wide -mt-6 mb-0 px-6">PRO TECH DASHBOARD</p>

          <nav className="flex-grow p-4 space-y-1 mt-2">
            {navLinks.map((link) => (
              <NavLink
                key={link.label}
                to={link.to}
                end={link.end}
                onClick={handleMobileClose}
                className={({ isActive }) =>
                  `w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium text-sm transition-all duration-200 group relative ${
                    isActive
                      ? 'bg-gradient-to-r from-[#004ac6]/10 to-[#57dffe]/5 text-[#004ac6]'
                      : 'text-slate-500 hover:bg-slate-50 hover:text-slate-800'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    {isActive && (
                      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-gradient-to-b from-[#004ac6] to-[#57dffe] rounded-r-full" />
                    )}
                    <span
                      className={`material-symbols-outlined text-[22px] transition-transform duration-200 group-hover:scale-110 ${
                        isActive ? 'text-[#004ac6]' : ''
                      }`}
                    >
                      {link.icon}
                    </span>
                    <span className="flex-1 text-left">{link.label}</span>
                    {link.badge && (
                      <span className="bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-sm">
                        {link.badge}
                      </span>
                    )}
                  </>
                )}
              </NavLink>
            ))}
          </nav>

          <div className="p-4 pt-4 mt-auto border-t border-slate-100 space-y-1">
            {bottomLinks.map((link) => (
              <a
                key={link.label}
                href="#"
                className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm text-slate-400 hover:bg-red-50 hover:text-red-500 transition-all duration-200 group"
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