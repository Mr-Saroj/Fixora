import React from "react";

import {
  DEFAULT_ACCENT_CLASS,
  DEFAULT_BORDER_CLASS,
  REQUEST_CARD_BASE_CLASSES,
  MOBILE_BADGE_BASE_CLASSES,
  DESKTOP_BADGE_BASE_CLASSES,
  MOBILE_EMERGENCY_CLASSES,
  DESKTOP_EMERGENCY_CLASSES,
  MOBILE_STANDARD_CLASSES,
  DESKTOP_STANDARD_CLASSES,
  getMetaTextClass,
  getDesktopMetaTextClass,
} from "../../utils/requestCardUtils";

const RequestCard = ({
  // Accent / border
  isEmergency = false,
  accentClass = DEFAULT_ACCENT_CLASS,
  borderClass = DEFAULT_BORDER_CLASS,

  // Category chip
  category,

  // Extra badges
  badges,

  // ID + title
  id,
  title,
  onTitleClick,

  // Meta rows
  meta = [],

  // Optional extras
  mobileExtra,
  desktopExtra,

  // Action slots
  mobileActions,
  desktopActions,
}) => {
  const cat = category || {};

  return (
    <div className={`${REQUEST_CARD_BASE_CLASSES} ${borderClass}`}>
      {/* Accent bar */}
      <div className={`h-0.5 sm:h-1 ${accentClass}`} />

      <div className="px-4 py-3 sm:px-5 sm:py-4">

        {/* =====================================================
            MOBILE CARD
        ===================================================== */}
        <div className="sm:hidden space-y-2.5">

          {/* Badges */}
          <div className="flex items-center gap-1.5 flex-wrap">

            {/* Category */}
            {cat.bg && (
              <span
                className={`${MOBILE_BADGE_BASE_CLASSES} ${cat.bg} ${cat.text} ${cat.border}`}
              >
                <span className="material-symbols-outlined text-[12px]">
                  {cat.icon}
                </span>

                {cat.label}
              </span>
            )}

            {/* Emergency / Standard */}
            {isEmergency ? (
              <span className={MOBILE_EMERGENCY_CLASSES}>
                <span className="relative flex h-1.5 w-1.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75" />

                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-white" />
                </span>

                Emergency
              </span>
            ) : (
              <span className={MOBILE_STANDARD_CLASSES}>
                Standard
              </span>
            )}

            {/* Extra badges */}
            {badges}

            {/* Request ID */}
            {id && (
              <span className="text-[10px] text-slate-400 ml-auto">
                {id}
              </span>
            )}
          </div>

          {/* Title */}
          <p
            className="font-bold text-slate-800 text-sm leading-snug line-clamp-2 group-hover:text-[#004ac6] transition-colors cursor-pointer"
            onClick={onTitleClick}
          >
            {title || "No description provided."}
          </p>

          {/* Meta rows */}
          {meta.length > 0 && (
            <div className="flex flex-col gap-1">
              {meta.map((row, i) => (
                <div
                  key={row.id || row.label || `${row.icon}-${i}`}
                  className="flex items-center gap-2 text-[11px] text-slate-500 flex-wrap"
                >
                  <span
                    className={`flex items-center gap-0.5 ${getMetaTextClass(
                      i
                    )}`}
                  >
                    <span
                      className={`material-symbols-outlined text-[13px] ${
                        row.colorClass || ""
                      }`}
                    >
                      {row.icon}
                    </span>

                    <span className={row.truncate ? "truncate" : ""}>
                      {row.value}
                    </span>
                  </span>
                </div>
              ))}
            </div>
          )}

          {/* Mobile extra content */}
          {mobileExtra}

          {/* Mobile actions */}
          {mobileActions && (
            <div className="flex gap-2 pt-1">
              {mobileActions}
            </div>
          )}
        </div>

        {/* =====================================================
            DESKTOP CARD
        ===================================================== */}
        <div className="hidden sm:flex flex-col lg:flex-row lg:items-start gap-4">

          {/* Left: Content */}
          <div className="flex-1 min-w-0">

            {/* Badges */}
            <div className="flex items-center gap-2 flex-wrap mb-3">

              {/* Category */}
              {cat.bg && (
                <span
                  className={`${DESKTOP_BADGE_BASE_CLASSES} ${cat.bg} ${cat.text} ${cat.border}`}
                >
                  <span className="material-symbols-outlined text-[14px]">
                    {cat.icon}
                  </span>

                  {cat.label}
                </span>
              )}

              {/* Emergency / Standard */}
              {isEmergency ? (
                <span className={DESKTOP_EMERGENCY_CLASSES}>
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75" />

                    <span className="relative inline-flex rounded-full h-2 w-2 bg-white" />
                  </span>

                  Emergency
                </span>
              ) : (
                <span className={DESKTOP_STANDARD_CLASSES}>
                  Standard
                </span>
              )}

              {/* Extra badges */}
              {badges}

              {/* Request ID */}
              {id && (
                <span className="text-xs text-slate-400 ml-auto lg:ml-0">
                  {id}
                </span>
              )}
            </div>

            {/* Title */}
            <p
              className="font-bold text-slate-800 text-[15px] leading-snug mb-2 line-clamp-2 group-hover:text-[#004ac6] transition-colors cursor-pointer"
              onClick={onTitleClick}
            >
              {title || "No description provided."}
            </p>

            {/* Meta rows */}
            {meta.length > 0 && (
              <div className="flex items-center gap-3 flex-wrap text-xs text-slate-500">
                {meta.map((row, i) => (
                  <React.Fragment
                    key={row.id || row.label || `${row.icon}-${i}`}
                  >
                    {/* Separator */}
                    {i > 0 && (
                      <span className="text-slate-300">
                        •
                      </span>
                    )}

                    <span
                      className={`flex items-center gap-1 ${getDesktopMetaTextClass(
                        i
                      )}`}
                    >
                      <span
                        className={`material-symbols-outlined text-[14px] ${
                          row.colorClass || ""
                        }`}
                      >
                        {row.icon}
                      </span>

                      <span
                        className={
                          row.truncate
                            ? "truncate max-w-[200px]"
                            : ""
                        }
                      >
                        {row.value}
                      </span>
                    </span>
                  </React.Fragment>
                ))}
              </div>
            )}

            {/* Desktop extra content */}
            {desktopExtra}
          </div>

          {/* Right: Actions */}
          {desktopActions && (
            <div className="flex lg:flex-col items-center lg:items-end gap-2 lg:min-w-[170px] shrink-0">
              <div className="flex gap-2 w-full lg:w-auto">
                {desktopActions}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RequestCard;