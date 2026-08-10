import React from 'react';
import useCustomerTopNavbar from '../hooks/useCustomerTopNavbar';
import {
  getHeaderClasses,
  getHamburgerButtonClasses,
  getHamburgerIconClasses,
  getSearchContainerClasses,
  getActionButtonClasses,
  getBookServiceClasses,
  getAvatarClasses,
} from '../utils/customerTopNavbarUtils';

const TopNavbar = ({ sidebarOpen, setSidebarOpen }) => {
  const {
    initials,
    avatarTitle,
    greeting,
    subtitle,
    toggleSidebar,
  } = useCustomerTopNavbar(sidebarOpen, setSidebarOpen);

  return (
    <header className={getHeaderClasses()}>
      
      {/* Left: Hamburger + Greeting */}
      <div className="flex items-center gap-3 md:gap-4">
        <button
          onClick={toggleSidebar}
          className={getHamburgerButtonClasses()}
          title={sidebarOpen ? 'Collapse sidebar' : 'Expand sidebar'}
        >
          <span className={getHamburgerIconClasses(sidebarOpen)}>
            menu_open
          </span>
        </button>

        <div className="hidden sm:block">
          <h1 className="text-lg lg:text-xl font-bold text-slate-800">
            {greeting}
          </h1>
          <p className="hidden lg:block text-sm text-slate-400">
            {subtitle}
          </p>
        </div>
      </div>

      {/* Right: Actions */}
      <div className="flex items-center gap-2 md:gap-4">
        
        {/* Search — xl+ only */}
        <div className={getSearchContainerClasses()}>
          <span className="material-symbols-outlined text-slate-400 text-[20px] mr-2">
            search
          </span>
          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent outline-none text-sm text-slate-600 w-full placeholder-slate-400"
          />
        </div>

        {/* Notification Bell */}
        <button className={getActionButtonClasses()}>
          <span className="material-symbols-outlined text-[22px]">notifications</span>
          <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white" />
        </button>

        {/* Book Service — md+ only */}
        <button className={getBookServiceClasses()}>
          <span className="material-symbols-outlined text-[18px]">add</span>
          Book Service
        </button>

        {/* Avatar */}
        <div
          title={avatarTitle}
          className={getAvatarClasses()}
        >
          {initials}
        </div>
      </div>
    </header>
  );
};

export default TopNavbar;