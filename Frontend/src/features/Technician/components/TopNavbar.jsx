import React from 'react';
import { useAppSelector } from '../../../redux/hooks';

const TopNavbar = ({ sidebarOpen, setSidebarOpen }) => {
  const user = useAppSelector((state) => state.auth.user);

  const getInitials = (name) => {
    if (!name) return '?';
    const parts = name.trim().split(' ');
    if (parts.length === 1) return parts[0][0].toUpperCase();
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  };

  const firstName = user?.name?.split(' ')[0] || 'Guest';
  const initials = getInitials(user?.name);

  return (
    <header className="sticky top-0 z-30 w-full h-20 bg-white/80 backdrop-blur-xl border-b border-slate-100/80 flex items-center justify-between px-8">
      {/* Left: Hamburger + Greeting */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 text-slate-500 hover:text-[#004ac6] hover:border-[#004ac6]/20 hover:bg-[#004ac6]/5 transition-all duration-200 group"
          title={sidebarOpen ? 'Collapse sidebar' : 'Expand sidebar'}
        >
          <span className={`material-symbols-outlined text-[22px] transition-transform duration-300 ${!sidebarOpen ? 'rotate-180' : ''}`}>
            menu_open
          </span>
        </button>

        <div>
          {/* ✅ Dynamic name from Redux */}
          <h1 className="text-xl font-bold text-slate-800 tracking-tight">
            Welcome back, {firstName}
          </h1>
          <p className="text-sm text-slate-400">You have 4 new customer requests waiting in your area.</p>
        </div>
      </div>

      {/* Right: Actions */}
      <div className="flex items-center gap-4">
        {/* Search */}
        <div className="hidden lg:flex items-center bg-slate-50 rounded-xl px-4 py-2.5 border border-slate-100 w-64">
          <span className="material-symbols-outlined text-slate-400 text-[20px] mr-2">search</span>
          <input
            type="text"
            placeholder="Search jobs, clients..."
            className="bg-transparent outline-none text-sm text-slate-600 w-full placeholder-slate-400"
          />
        </div>

        {/* Notification Bell */}
        <button className="relative p-2.5 rounded-xl bg-slate-50 border border-slate-100 text-slate-500 hover:text-[#004ac6] hover:border-[#004ac6]/20 hover:bg-[#004ac6]/5 transition-all duration-200">
          <span className="material-symbols-outlined text-[22px]">notifications</span>
          <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white"></span>
        </button>

        {/* ✅ Dynamic initials from Redux */}
        <div
          className="w-10 h-10 rounded-full bg-gradient-to-br from-[#004ac6] to-[#57dffe] flex items-center justify-center text-white font-bold text-sm shadow-md cursor-pointer hover:scale-105 transition-transform"
          title={user?.name || 'Guest'}
        >
          {initials}
        </div>
      </div>
    </header>
  );
};

export default TopNavbar;