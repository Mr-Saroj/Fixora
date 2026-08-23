import React from 'react';
import useCustomerNotifications from '../hooks/useCustomerNotifications';
import GradientButton from '../../../components/ui/GradientButton';


// ── Notification type styles ─────────────────────────────────────────
const NOTIFICATION_TYPES = {
  ANNOUNCEMENT: {
    icon: 'campaign',
    bg: 'bg-amber-50',
    text: 'text-amber-600',
    border: 'border-amber-100',
  },
  SYSTEM: {
    icon: 'info',
    bg: 'bg-slate-100',
    text: 'text-slate-500',
    border: 'border-slate-200',
  },
};

const FILTER_TABS = [
  { key: 'all', label: 'All' },
  { key: 'unread', label: 'Unread' },
  { key: 'read', label: 'Read' },
];

const formatTime = (createdAt) => {
  if (!createdAt) return '';
  const now = new Date();
  const created = new Date(createdAt);
  const diffMs = now - created;
  const diffMin = Math.floor(diffMs / 60000);
  const diffHr = Math.floor(diffMin / 60);
  const diffDay = Math.floor(diffHr / 24);

  if (diffMin < 1) return 'Just now';
  if (diffMin < 60) return `${diffMin} min ago`;
  if (diffHr < 24) return `${diffHr} hour${diffHr > 1 ? 's' : ''} ago`;
  return `${diffDay} day${diffDay > 1 ? 's' : ''} ago`;
};

const getNotificationType = (notification) =>
  notification.type === 'ANNOUNCEMENT' ? 'ANNOUNCEMENT' : 'SYSTEM';

const getTypeStyle = (type) => NOTIFICATION_TYPES[type] || NOTIFICATION_TYPES.SYSTEM;

// ── Main Component ───────────────────────────────────────────────────
const CustomerNotifications = () => {
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
  } = useCustomerNotifications();

  // ── Detail Panel ──────────────────────────────────────────────────
  const DetailPanel = () => {
    if (!selectedNotification) return null;
    const n = selectedNotification;
    const type = getNotificationType(n);
    const style = getTypeStyle(type);

    return (
      <>
        <div
          className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setSelectedNotification(null)}
        />

        <div
          className="fixed inset-x-0 bottom-0 z-50 lg:static lg:z-auto
          bg-white lg:bg-slate-50/50 rounded-t-2xl lg:rounded-2xl
          border border-slate-100 shadow-2xl lg:shadow-sm
          max-h-[80vh] lg:max-h-none overflow-y-auto
          animate-[slideUp_0.3s_ease-out] lg:animate-none"
        >
          <div className="lg:hidden flex justify-center pt-3 pb-1">
            <div className="w-10 h-1 rounded-full bg-slate-200" />
          </div>

          <div className="flex items-start justify-between gap-3 p-4 sm:p-5 border-b border-slate-100">
            <div className="flex items-start gap-3 min-w-0">
              <div className={`shrink-0 p-2.5 rounded-xl ${style.bg} ${style.text}`}>
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
              <span className="material-symbols-outlined text-[20px]">close</span>
            </button>
          </div>

          <div className="p-4 sm:p-5 space-y-4">
            <p className="text-sm text-slate-600 leading-relaxed">{n.message}</p>
          </div>
        </div>
      </>
    );
  };

  // ── Loading State ─────────────────────────────────────────────────
  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-4 border-[#004ac6]/20 border-t-[#004ac6] rounded-full animate-spin" />
          <p className="text-sm text-slate-400">Loading notifications...</p>
        </div>
      </div>
    );
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
          <button
            onClick={fetchNotifications}
            className="px-4 py-2 text-xs font-bold text-white bg-[#004ac6] rounded-lg hover:bg-[#004ac6]/90 transition-all"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  // ── Main Render ───────────────────────────────────────────────────
  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-lg sm:text-xl lg:text-2xl font-extrabold text-slate-800 tracking-tight">
            Notifications
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
            {notifications.length > 0
              ? `${notifications.length} announcement${notifications.length > 1 ? 's' : ''}`
              : "You're all caught up!"}
          </p>
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
                className="!px-3 sm:!px-4 !py-1.5 sm:!py-2 !rounded-lg !text-xs sm:!text-sm gap-1.5 !shadow-sm hover:!translate-y-0"
                onClick={() => setActiveFilter(tab.key)}
              >
                {tab.label}
                <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-white/20 text-white ml-1.5">
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
        {/* List */}
        <div className="flex-1 min-w-0">
          {filteredNotifications.length === 0 ? (
            <div className="text-center py-12 sm:py-16 bg-white rounded-2xl border border-slate-100">
              <div className="inline-flex p-4 rounded-2xl bg-slate-50 mb-4">
                <span className="material-symbols-outlined text-[40px] text-slate-300">
                  notifications_off
                </span>
              </div>
              <p className="font-bold text-slate-600 text-sm sm:text-base">
                No notifications yet
              </p>
              <p className="text-xs text-slate-400 mt-1">
                Announcements from the team will appear here.
              </p>
            </div>
          ) : (
            <div className="space-y-2">
              {filteredNotifications.map((notification) => {
                const type = getNotificationType(notification);
                const style = getTypeStyle(type);
                const isSelected = selectedNotification?.id === notification.id;

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
                        : 'bg-white border-slate-100/80 hover:border-slate-200 hover:shadow-sm'}
                    `}
                  >
                    <div
                      className={`shrink-0 p-2 sm:p-2.5 rounded-lg sm:rounded-xl ${style.bg} ${style.text} mt-0.5`}
                    >
                      <span className="material-symbols-outlined text-[18px] sm:text-[20px]">
                        {style.icon}
                      </span>
                    </div>

                    <div className="flex-1 min-w-0 ml-2 sm:ml-0">
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="text-[13px] sm:text-sm leading-snug line-clamp-1 font-bold text-slate-800">
                          {notification.title}
                        </h4>
                        <span className="shrink-0 text-[10px] sm:text-xs text-slate-400 whitespace-nowrap mt-0.5">
                          {formatTime(notification.createdAt)}
                        </span>
                      </div>
                      <p className="text-[11px] sm:text-xs text-slate-400 mt-0.5 line-clamp-2 leading-relaxed">
                        {notification.message}
                      </p>
                    </div>

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

export default CustomerNotifications;