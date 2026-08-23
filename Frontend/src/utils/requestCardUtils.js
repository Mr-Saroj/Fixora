export const DEFAULT_ACCENT_CLASS =
  "bg-gradient-to-r from-[#004ac6] to-[#57dffe]";

export const DEFAULT_BORDER_CLASS =
  "border-slate-100/80";

export const REQUEST_CARD_BASE_CLASSES =
  "bg-white rounded-xl sm:rounded-2xl border shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 overflow-hidden group";

export const MOBILE_BADGE_BASE_CLASSES =
  "text-[10px] font-bold px-2 py-0.5 rounded-md border flex items-center gap-1";

export const DESKTOP_BADGE_BASE_CLASSES =
  "text-xs font-bold px-2.5 py-1 rounded-lg border flex items-center gap-1";

export const MOBILE_EMERGENCY_CLASSES =
  "text-[9px] font-extrabold uppercase bg-red-500 text-white px-2 py-0.5 rounded-md flex items-center gap-1 shadow-sm";

export const DESKTOP_EMERGENCY_CLASSES =
  "text-[10px] font-extrabold uppercase bg-red-500 text-white px-2.5 py-1 rounded-lg flex items-center gap-1.5 shadow-sm";

export const MOBILE_STANDARD_CLASSES =
  "text-[9px] font-bold uppercase bg-slate-100 text-slate-500 px-2 py-0.5 rounded-md";

export const DESKTOP_STANDARD_CLASSES =
  "text-[10px] font-bold uppercase bg-slate-100 text-slate-500 px-2.5 py-1 rounded-lg";

export const getMetaTextClass = (index) =>
  index === 0 ? "font-medium text-slate-700" : "";

export const getDesktopMetaTextClass = (index) =>
  index === 0 ? "font-medium text-slate-600" : "";