import React from 'react';
import useTopNavbar from '../hooks/useTopNavbar';

const TopNavbar = ({ sidebarOpen, setSidebarOpen }) => {
  const {
    searchOpen,
    initials,
    avatarTitle,
    displayCount,
    hasNotifications,
    notificationSummary,
    mobileGreeting,
    desktopGreeting,
    toggleSearch,
    closeSearch,
  } = useTopNavbar();

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  return (
    <>
      <header className="sticky top-0 z-30 h-16 sm:h-18 md:h-20 bg-white/90 backdrop-blur-xl border-b border-slate-100 flex items-center justify-between px-3 sm:px-4 md:px-6 lg:px-8 transition-all duration-300">

        {/* Left Section */}
        <div className="flex items-center gap-2 sm:gap-3 md:gap-4 min-w-0 flex-1">

          {/* Hamburger */}
          <button
            onClick={toggleSidebar}
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

          {/* Mobile: Notification + Avatar */}
          <div className="flex sm:hidden items-center gap-1.5 flex-shrink-0">
            <button className="relative flex-shrink-0 p-2 rounded-xl bg-slate-50 border border-slate-100 text-slate-500 hover:text-[#004ac6] hover:border-[#004ac6]/20 hover:bg-[#004ac6]/5 transition-all duration-200">
              <span className="material-symbols-outlined text-[20px]">notifications</span>
              {hasNotifications && (
                <span className="absolute -top-1 -right-1 min-w-[16px] h-4 flex items-center justify-center bg-red-500 text-white text-[9px] font-bold rounded-full px-1 shadow-sm">
                  {displayCount}
                </span>
              )}
            </button>

            <div
              title={avatarTitle}
              className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-[#004ac6] to-[#57dffe] flex items-center justify-center text-white font-bold text-xs shadow-md cursor-pointer hover:scale-105 transition-transform"
            >
              {initials}
            </div>
          </div>

          {/* Desktop Greeting */}
          <div className="hidden sm:block min-w-0">
            <h1 className="text-base md:text-lg lg:text-xl font-bold text-slate-800 truncate">
              {desktopGreeting}
            </h1>
            <p className="hidden lg:block text-sm text-slate-400 truncate">
              {notificationSummary}
            </p>
          </div>

          {/* Mobile Greeting */}
          <div className="block sm:hidden min-w-0">
            <h1 className="text-sm font-bold text-slate-800 truncate">
              {mobileGreeting}
            </h1>
          </div>
        </div>

        {/* Right Section */}
        <div className="hidden sm:flex items-center gap-1.5 md:gap-2 lg:gap-3 flex-shrink-0">

          {/* Inline Search (XL+) */}
          <div className="hidden xl:flex items-center bg-slate-50 rounded-xl px-4 py-2.5 border border-slate-100 w-72">
            <span className="material-symbols-outlined text-slate-400 text-[20px] mr-2">search</span>
            <input
              type="text"
              placeholder="Search jobs, customers..."
              className="bg-transparent outline-none text-sm text-slate-600 w-full placeholder-slate-400"
            />
          </div>

          {/* Search Toggle (below XL) */}
          <button
            onClick={toggleSearch}
            className="xl:hidden flex-shrink-0 p-2 sm:p-2.5 rounded-xl bg-slate-50 border border-slate-100 text-slate-500 hover:text-[#004ac6] hover:border-[#004ac6]/20 hover:bg-[#004ac6]/5 transition-all duration-200"
            title="Search"
          >
            <span className="material-symbols-outlined text-[20px] sm:text-[22px]">
              {searchOpen ? 'close' : 'search'}
            </span>
          </button>

          {/* Notification Bell */}
          <button className="relative flex-shrink-0 p-2 sm:p-2.5 rounded-xl bg-slate-50 border border-slate-100 text-slate-500 hover:text-[#004ac6] hover:border-[#004ac6]/20 hover:bg-[#004ac6]/5 transition-all duration-200">
            <span className="material-symbols-outlined text-[20px] sm:text-[22px]">notifications</span>
            {hasNotifications && (
              <span className="absolute -top-1 -right-1 min-w-[18px] h-5 flex items-center justify-center bg-red-500 text-white text-[10px] font-bold rounded-full px-1 shadow-sm">
                {displayCount}
              </span>
            )}
          </button>

          {/* Avatar */}
          <div
            title={avatarTitle}
            className="flex-shrink-0 w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 rounded-full bg-gradient-to-br from-[#004ac6] to-[#57dffe] flex items-center justify-center text-white font-bold text-xs sm:text-sm shadow-md cursor-pointer hover:scale-105 transition-transform"
          >
            {initials}
          </div>
        </div>
      </header>

      {/* Expandable Search Bar (tablet only) */}
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
          <button onClick={closeSearch}>
            <span className="material-symbols-outlined text-slate-400 text-[20px] hover:text-slate-600 transition-colors">close</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default TopNavbar;