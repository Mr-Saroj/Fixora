import React from 'react';
import useNotifications from '../hooks/useNotifications';
import GradientButton from '../../../components/ui/GradientButton';
import {
  NOTIFICATION_TYPES,
  FILTER_TABS,
  formatTime,
  getNotificationType,
  getTypeStyle,
} from '../utils/notificationUtils';
import PageLoader from '../../../components/common/PageLoader';

// ── Main Component ────────────────────────────────────────────────────
const Notifications = () => {
  const {
    loading,
    error,
    activeFilter,
    setActiveFilter,
    selectedNotification,
    setSelectedNotification,
    unreadCount,
    filteredNotifications,
    notifications,
    fetchNotifications,
    markAsRead,
    markAsUnread,
    markAllAsRead,
    deleteNotification,
    clearAll,
  } = useNotifications();

  // ── Detail Panel ──────────────────────────────────────────────────
  const DetailPanel = () => {
    if (!selectedNotification) return null;
    const n = selectedNotification;
    const type = getNotificationType(n);
    const style = getTypeStyle(type);

    return (
      <>
        {/* Mobile backdrop */}
        <div
          className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setSelectedNotification(null)}
        />

        {/* Panel */}
        <div
          className="fixed inset-x-0 bottom-0 z-50 lg:static lg:z-auto
          bg-white lg:bg-slate-50/50 rounded-t-2xl lg:rounded-2xl
          border border-slate-100 shadow-2xl lg:shadow-sm
          max-h-[80vh] lg:max-h-none
          animate-[slideUp_0.3s_ease-out] lg:animate-none"
        >
          {/* Mobile drag handle */}
          <div className="lg:hidden flex justify-center pt-3 pb-1">
            <div className="w-10 h-1 rounded-full bg-slate-200" />
          </div>

          {/* Header */}
          <div className="flex items-start justify-between gap-3 p-4 sm:p-5 border-b border-slate-100">
            <div className="flex items-start gap-3 min-w-0">
              <div
                className={`shrink-0 p-2.5 rounded-xl ${style.bg} ${style.text}`}
              >
                <span className="material-symbols-outlined text-[22px]">
                  {style.icon}
                </span>
              </div>
              <div className="min-w-0">
                <h3 className="font-bold text-slate-800 text-sm sm:text-base truncate">
                  {n.title}
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  {formatTime(n.createdAt)}
                </p>
              </div>
            </div>
            <button
              onClick={() => setSelectedNotification(null)}
              className="shrink-0 p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-all"
            >
              <span className="material-symbols-outlined text-[20px]">
                close
              </span>
            </button>
          </div>

          {/* Body */}
          <div className="p-4 sm:p-5 space-y-4">
            <p className="text-sm text-slate-600 leading-relaxed">
              {n.message}
            </p>

            {n.category && (
              <div className="flex items-center gap-2 text-xs text-slate-500 bg-slate-50 px-3 py-2 rounded-lg border border-slate-100">
                <span className="material-symbols-outlined text-[16px]">
                  category
                </span>
                Category:{' '}
                <span className="font-semibold text-slate-700">
                  {n.category}
                </span>
              </div>
            )}

            {n.location && (
              <div className="flex items-center gap-2 text-xs text-slate-500 bg-slate-50 px-3 py-2 rounded-lg border border-slate-100">
                <span className="material-symbols-outlined text-[16px]">
                  location_on
                </span>
                Location:{' '}
                <span className="font-semibold text-slate-700">
                  {n.location}
                </span>
              </div>
            )}

            {/* Actions */}
            {n.type !== 'ANNOUNCEMENT' && (
              <div className="flex flex-wrap gap-2 pt-2">
                {n.read ? (
                  <button
                    onClick={() => markAsUnread(n.id)}
                    className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-lg transition-all"
                  >
                    <span className="material-symbols-outlined text-[16px]">
                      mark_email_unread
                    </span>
                    Mark as Unread
                  </button>
                ) : (
                  <GradientButton
                    onClick={() => markAsRead(n.id)}
                    size="small"
                    className="!px-3 !py-2 !text-xs !rounded-lg !font-semibold hover:!translate-y-0"
                  >
                    <span className="material-symbols-outlined text-[16px]">
                      done
                    </span>
                    Mark as Read
                  </GradientButton>
                )}

                <button
                  onClick={() => deleteNotification(n.id)}
                  className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-red-500 bg-red-50 hover:bg-red-100 border border-red-100 rounded-lg transition-all ml-auto"
                >
                  <span className="material-symbols-outlined text-[16px]">
                    delete
                  </span>
                  Delete
                </button>
              </div>
            )}
          </div>
        </div>
      </>
    );
  };

  // ── Loading State ─────────────────────────────────────────────────
  if (loading) {
    return (<PageLoader />);
  }

  // ── Error State ───────────────────────────────────────────────────
  if (error) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="text-center space-y-3">
          <span className="material-symbols-outlined text-[40px] text-red-300">
            error
          </span>
          <p className="text-sm font-semibold text-slate-600">{error}</p>
          <GradientButton
            onClick={fetchNotifications}
            size="small"
            className="!text-xs !rounded-lg"
          >
            Try Again
          </GradientButton>
        </div>
      </div>
    );
  }

  // ── Main Render ───────────────────────────────────────────────────
  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-lg sm:text-xl lg:text-2xl font-extrabold text-slate-800 tracking-tight">
            Notifications
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
            {unreadCount > 0
              ? `You have ${unreadCount} unread notification${unreadCount > 1 ? 's' : ''}`
              : "You're all caught up!"}
          </p>
        </div>

        <div className="flex items-center gap-2">
          {unreadCount > 0 && (
            <button
              onClick={markAllAsRead}
              className="flex items-center gap-1.5 px-3 sm:px-4 py-2 text-[11px] sm:text-xs font-bold text-[#004ac6] bg-[#004ac6]/5 hover:bg-[#004ac6]/10 border border-[#004ac6]/15 rounded-lg transition-all"
            >
              <span className="material-symbols-outlined text-[16px]">
                done_all
              </span>
              Mark All as Read
            </button>
          )}
          {notifications.length > 0 && (
            <button
              onClick={clearAll}
              className="flex items-center gap-1.5 px-3 sm:px-4 py-2 text-[11px] sm:text-xs font-bold text-red-500 bg-red-50 hover:bg-red-100 border border-red-100 rounded-lg transition-all"
            >
              <span className="material-symbols-outlined text-[16px]">
                delete_sweep
              </span>
              Clear All
            </button>
          )}
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-1.5 bg-white rounded-xl p-1.5 border border-slate-100 shadow-sm w-fit">
        {FILTER_TABS.map((tab) => {
          const count =
            tab.key === 'all'
              ? notifications.length
              : tab.key === 'unread'
                ? unreadCount
                : notifications.length - unreadCount;
          const isActive = activeFilter === tab.key;

          if (isActive) {
            return (
              <GradientButton
                key={tab.key}
                size="small"
                onClick={() => setActiveFilter(tab.key)}
                className="!px-3 sm:!px-4 !py-1.5 sm:!py-2 !text-xs sm:!text-sm !rounded-lg !shadow-sm !font-semibold hover:!translate-y-0"
              >
                {tab.label}
                <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-white/20">
                  {count}
                </span>
              </GradientButton>
            );
          }

          return (
            <button
              key={tab.key}
              onClick={() => setActiveFilter(tab.key)}
              className="flex items-center gap-1.5 px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all duration-200 text-slate-500 hover:text-slate-700 hover:bg-slate-50"
            >
              {tab.label}
              <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-slate-100 text-slate-500">
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Content */}
      <div className="flex gap-4 sm:gap-6">
        {/* Notification List */}
        <div className="flex-1 min-w-0">
          {filteredNotifications.length === 0 ? (
            <div className="text-center py-12 sm:py-16 bg-white rounded-2xl border border-slate-100">
              <div className="inline-flex p-4 rounded-2xl bg-slate-50 mb-4">
                <span className="material-symbols-outlined text-[40px] text-slate-300">
                  {activeFilter === 'unread'
                    ? 'mark_email_read'
                    : 'notifications_off'}
                </span>
              </div>
              <p className="font-bold text-slate-600 text-sm sm:text-base">
                {activeFilter === 'unread'
                  ? 'No unread notifications'
                  : activeFilter === 'read'
                    ? 'No read notifications'
                    : 'No notifications yet'}
              </p>
              <p className="text-xs text-slate-400 mt-1">
                {activeFilter === 'unread'
                  ? "You're all caught up!"
                  : 'Notifications about your jobs will appear here.'}
              </p>
            </div>
          ) : (
            <div className="space-y-2">
              {filteredNotifications.map((notification) => {
                const type = getNotificationType(notification);
                const style = getTypeStyle(type);
                const isSelected =
                  selectedNotification?.id === notification.id;

                return (
                  <div
                    key={notification.id}
                    onClick={() =>
                      setSelectedNotification(isSelected ? null : notification)
                    }
                    className={`
                      group relative flex items-start gap-3 sm:gap-4 p-3 sm:p-4
                      rounded-xl sm:rounded-2xl border cursor-pointer
                      transition-all duration-200
                      ${isSelected
                        ? 'bg-[#004ac6]/[0.03] border-[#004ac6]/20 shadow-sm'
                        : notification.read
                          ? 'bg-white border-slate-100/80 hover:border-slate-200 hover:shadow-sm'
                          : 'bg-white border-blue-100/60 hover:border-blue-200/80 hover:shadow-sm'}
                    `}
                  >
                    {/* Unread dot */}
                    {!notification.read && (
                      <div className="absolute top-4 left-1.5 w-2 h-2 rounded-full bg-[#004ac6] shadow-sm" />
                    )}

                    {/* Icon */}
                    <div
                      className={`shrink-0 p-2 sm:p-2.5 rounded-lg sm:rounded-xl ${style.bg} ${style.text} mt-0.5`}
                    >
                      <span className="material-symbols-outlined text-[18px] sm:text-[20px]">
                        {style.icon}
                      </span>
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0 ml-2 sm:ml-0">
                      <div className="flex items-start justify-between gap-2">
                        <h4
                          className={`text-[13px] sm:text-sm leading-snug line-clamp-1 ${notification.read
                            ? 'font-medium text-slate-600'
                            : 'font-bold text-slate-800'
                            }`}
                        >
                          {notification.title}
                        </h4>
                        <span className="shrink-0 text-[10px] sm:text-xs text-slate-400 whitespace-nowrap mt-0.5">
                          {formatTime(notification.createdAt)}
                        </span>
                      </div>
                      <p className="text-[11px] sm:text-xs text-slate-400 mt-0.5 line-clamp-2 leading-relaxed">
                        {notification.message}
                      </p>
                      {notification.category && (
                        <span className="inline-block mt-1.5 text-[10px] font-semibold text-slate-400 bg-slate-50 px-2 py-0.5 rounded-md border border-slate-100">
                          {notification.category}
                        </span>
                      )}
                    </div>

                    {/* Hover actions */}
                    <div className="hidden sm:flex flex-col gap-1 opacity-0 group-hover:opacity-100 transition-opacity shrink-0">
                      {notification.read ? (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            markAsUnread(notification.id);
                          }}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-all"
                          title="Mark as unread"
                        >
                          <span className="material-symbols-outlined text-[16px]">
                            mark_email_unread
                          </span>
                        </button>
                      ) : (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            markAsRead(notification.id);
                          }}
                          className="p-1.5 rounded-lg text-[#004ac6] hover:bg-[#004ac6]/5 transition-all"
                          title="Mark as read"
                        >
                          <span className="material-symbols-outlined text-[16px]">
                            done
                          </span>
                        </button>
                      )}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          deleteNotification(notification.id);
                        }}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-50 transition-all"
                        title="Delete"
                      >
                        <span className="material-symbols-outlined text-[16px]">
                          delete
                        </span>
                      </button>
                    </div>

                    {/* Mobile chevron */}
                    <span className="sm:hidden material-symbols-outlined text-[18px] text-slate-300 mt-1 shrink-0">
                      chevron_right
                    </span>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Desktop Detail Panel */}
        <div className="hidden lg:block w-80 xl:w-96 shrink-0">
          <DetailPanel />
        </div>
      </div>

      {/* Mobile Detail Panel */}
      <div className="lg:hidden">
        <DetailPanel />
      </div>

      <div className="h-4 sm:h-8" />

      <style>{`
        @keyframes slideUp {
          from { transform: translateY(100%); opacity: 0; }
          to   { transform: translateY(0);    opacity: 1; }
        }
      `}</style>
    </div>
  );
};

export default Notifications;