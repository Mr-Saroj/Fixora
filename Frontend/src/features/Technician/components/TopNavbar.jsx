import React, { useState } from 'react';
import { useAppSelector } from '../../../redux/hooks';

const TopNavbar = ({ sidebarOpen, setSidebarOpen }) => {
  const user = useAppSelector((state) => state.auth.user);
  const [searchOpen, setSearchOpen] = useState(false);

  const getInitials = (name) => {
    if (!name) return '?';
    const parts = name.trim().split(' ');
    if (parts.length === 1) return parts[0][0].toUpperCase();
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  };

  const firstName = user?.name?.split(' ')[0] || 'Guest';
  const initials = getInitials(user?.name);

  return (
    <>
      <header className="sticky top-0 z-30 h-16 sm:h-18 md:h-20 bg-white/90 backdrop-blur-xl border-b border-slate-100 flex items-center justify-between px-3 sm:px-4 md:px-6 lg:px-8 transition-all duration-300">

        {/* Left Section */}
        <div className="flex items-center gap-2 sm:gap-3 md:gap-4 min-w-0 flex-1">

          {/* Hamburger */}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="flex-shrink-0 p-2 sm:p-2.5 rounded-xl bg-slate-50 border border-slate-100 text-slate-500 hover:text-[#004ac6] hover:border-[#004ac6]/20 hover:bg-[#004ac6]/5 transition-all duration-200"
            title={sidebarOpen ? 'Collapse Sidebar' : 'Expand Sidebar'}
          >
            <span
              className={`material-symbols-outlined text-[20px] sm:text-[22px] transition-transform duration-300 ${
                !sidebarOpen ? 'rotate-180' : ''
              }`}
            >
              menu_open
            </span>
          </button>

          {/* Mobile: Notification + Avatar (left side, before greeting) */}
          <div className="flex sm:hidden items-center gap-1.5 flex-shrink-0">

            {/* Notification Bell — mobile only, left side */}
            <button className="relative flex-shrink-0 p-2 rounded-xl bg-slate-50 border border-slate-100 text-slate-500 hover:text-[#004ac6] hover:border-[#004ac6]/20 hover:bg-[#004ac6]/5 transition-all duration-200">
              <span className="material-symbols-outlined text-[20px]">notifications</span>
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full border-2 border-white" />
            </button>

            {/* Avatar — mobile only, left side */}
            <div
              title={user?.name || 'Guest'}
              className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-[#004ac6] to-[#57dffe] flex items-center justify-center text-white font-bold text-xs shadow-md cursor-pointer hover:scale-105 transition-transform"
            >
              {initials}
            </div>
          </div>

          {/* Greeting — hidden on xs, shown sm+ */}
          <div className="hidden sm:block min-w-0">
            <h1 className="text-base md:text-lg lg:text-xl font-bold text-slate-800 truncate">
              Welcome back, {firstName}
            </h1>
            <p className="hidden lg:block text-sm text-slate-400 truncate">
              You have 4 new customer requests waiting in your area.
            </p>
          </div>

          {/* xs only: just the name, no subtitle */}
          <div className="block sm:hidden min-w-0">
            <h1 className="text-sm font-bold text-slate-800 truncate">
              Hey, {firstName} 👋
            </h1>
          </div>
        </div>

        {/* Right Section — hidden on mobile (xs), shown sm+ */}
        <div className="hidden sm:flex items-center gap-1.5 md:gap-2 lg:gap-3 flex-shrink-0">

          {/* Search — xl+ static bar */}
          <div className="hidden xl:flex items-center bg-slate-50 rounded-xl px-4 py-2.5 border border-slate-100 w-72">
            <span className="material-symbols-outlined text-slate-400 text-[20px] mr-2">
              search
            </span>
            <input
              type="text"
              placeholder="Search jobs, customers..."
              className="bg-transparent outline-none text-sm text-slate-600 w-full placeholder-slate-400"
            />
          </div>

          {/* Search icon button — sm to lg only */}
          <button
            onClick={() => setSearchOpen(!searchOpen)}
            className="xl:hidden flex-shrink-0 p-2 sm:p-2.5 rounded-xl bg-slate-50 border border-slate-100 text-slate-500 hover:text-[#004ac6] hover:border-[#004ac6]/20 hover:bg-[#004ac6]/5 transition-all duration-200"
            title="Search"
          >
            <span className="material-symbols-outlined text-[20px] sm:text-[22px]">
              {searchOpen ? 'close' : 'search'}
            </span>
          </button>

          {/* Notification Bell — sm+ only, right side */}
          <button className="relative flex-shrink-0 p-2 sm:p-2.5 rounded-xl bg-slate-50 border border-slate-100 text-slate-500 hover:text-[#004ac6] hover:border-[#004ac6]/20 hover:bg-[#004ac6]/5 transition-all duration-200">
            <span className="material-symbols-outlined text-[20px] sm:text-[22px]">notifications</span>
            <span className="absolute top-1 right-1 sm:top-1.5 sm:right-1.5 w-2 h-2 sm:w-2.5 sm:h-2.5 bg-red-500 rounded-full border-2 border-white" />
          </button>

          {/* Avatar — sm+ only, right side */}
          <div
            title={user?.name || 'Guest'}
            className="flex-shrink-0 w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 rounded-full bg-gradient-to-br from-[#004ac6] to-[#57dffe] flex items-center justify-center text-white font-bold text-xs sm:text-sm shadow-md cursor-pointer hover:scale-105 transition-transform"
          >
            {initials}
          </div>

        </div>
      </header>

      {/* Expandable search bar for tablet only (sm to lg) — hidden on mobile (xs) and desktop (xl+) */}
      <div
        className={`hidden sm:block xl:hidden sticky top-16 sm:top-18 md:top-20 z-20 bg-white/95 backdrop-blur-xl border-b border-slate-100 px-3 sm:px-4 md:px-6 transition-all duration-300 overflow-hidden ${
          searchOpen ? 'h-14 py-2.5' : 'h-0 py-0'
        }`}
      >
        <div className="flex items-center bg-slate-50 rounded-xl px-4 py-2 border border-slate-100 w-full">
          <span className="material-symbols-outlined text-slate-400 text-[20px] mr-2">search</span>
          <input
            type="text"
            placeholder="Search jobs, customers..."
            className="bg-transparent outline-none text-sm text-slate-600 w-full placeholder-slate-400"
            autoFocus={searchOpen}
          />
          <button onClick={() => setSearchOpen(false)}>
            <span className="material-symbols-outlined text-slate-400 text-[20px] hover:text-slate-600 transition-colors">close</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default TopNavbar;