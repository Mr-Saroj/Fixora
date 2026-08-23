import React from 'react';

export const Toast = ({ toasts }) => (
  <div className="fixed top-5 right-5 z-50 flex flex-col gap-2 pointer-events-none">
    {toasts.map((t) => (
      <div
        key={t.id}
        className={`flex items-center gap-3 px-4 py-3 rounded-xl shadow-lg text-sm font-semibold text-white transition-all duration-300 ${
          t.type === 'success' ? 'bg-emerald-500' : 'bg-red-500'
        }`}
      >
        <span className="material-symbols-outlined text-[18px]">
          {t.type === 'success' ? 'check_circle' : 'error'}
        </span>
        {t.message}
      </div>
    ))}
  </div>
);

export const SectionCard = ({ icon, title, badge, children }) => (
  <div className="bg-white rounded-2xl border border-slate-100/80 shadow-sm overflow-hidden">
    <div className="px-5 py-4 border-b border-slate-100 flex items-center gap-3">
      <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#004ac6] to-[#57dffe] flex items-center justify-center text-white shrink-0">
        <span className="material-symbols-outlined text-[18px]">{icon}</span>
      </div>
      <div className="flex-1 min-w-0">
        <h2 className="font-bold text-slate-800 text-sm sm:text-base leading-tight">{title}</h2>
      </div>
      {badge && (
        <span className="text-[10px] font-bold tracking-widest text-slate-400 bg-slate-50 px-2.5 py-1 rounded-full border border-slate-100">
          {badge}
        </span>
      )}
    </div>
    <div className="p-5">{children}</div>
  </div>
);

export const TitleInput = ({ value, onChange, placeholder }) => (
  <input
    type="text"
    value={value}
    onChange={(e) => onChange(e.target.value)}
    placeholder={placeholder}
    maxLength={120}
    className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-2.5 text-sm text-slate-700 placeholder-slate-400 focus:ring-2 focus:ring-[#004ac6]/20 focus:border-[#004ac6] outline-none transition-all"
  />
);

export const MessageTextarea = ({ value, onChange, placeholder, maxLength = 500 }) => (
  <div className="relative">
    <textarea
      value={value}
      onChange={(e) => onChange(e.target.value)}
      maxLength={maxLength}
      placeholder={placeholder}
      rows={4}
      className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 text-sm text-slate-700 placeholder-slate-400 focus:ring-2 focus:ring-[#004ac6]/20 focus:border-[#004ac6] outline-none transition-all resize-none"
    />
    <span className="absolute bottom-3 right-3 text-[10px] text-slate-400 font-medium">
      {value.length}/{maxLength}
    </span>
  </div>
);

export const SendButton = ({ onClick, loading, disabled, label = 'Send Message', icon = 'send' }) => (
  <button
    type="button"
    onClick={onClick}
    disabled={disabled || loading}
    className="flex items-center gap-2 bg-gradient-to-r from-[#004ac6] to-[#57dffe] text-white px-5 py-2.5 rounded-xl font-bold text-sm shadow-[0_8px_20px_-5px_rgba(0,74,198,0.3)] hover:shadow-[0_12px_25px_-5px_rgba(0,74,198,0.5)] hover:-translate-y-0.5 active:scale-95 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:shadow-none"
  >
    {loading ? (
      <span className="material-symbols-outlined text-[18px] animate-spin">progress_activity</span>
    ) : (
      <span className="material-symbols-outlined text-[18px]">{icon}</span>
    )}
    {loading ? 'Sending…' : label}
  </button>
);