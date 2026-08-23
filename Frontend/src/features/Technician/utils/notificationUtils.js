// utils/notificationUtils.js

export const NOTIFICATION_TYPES = {
  ANNOUNCEMENT: {
    icon: 'campaign',
    bg: 'bg-amber-50',
    text: 'text-amber-600',
    border: 'border-amber-100',
  },
  NEW_REQUEST: {
    icon: 'add_circle',
    bg: 'bg-blue-50',
    text: 'text-blue-600',
    border: 'border-blue-100',
  },
  JOB_ACCEPTED: {
    icon: 'check_circle',
    bg: 'bg-emerald-50',
    text: 'text-emerald-600',
    border: 'border-emerald-100',
  },
  JOB_COMPLETED: {
    icon: 'task_alt',
    bg: 'bg-indigo-50',
    text: 'text-indigo-600',
    border: 'border-indigo-100',
  },
  SYSTEM: {
    icon: 'info',
    bg: 'bg-slate-100',
    text: 'text-slate-500',
    border: 'border-slate-200',
  },
};

export const FILTER_TABS = [
  { key: 'all', label: 'All' },
  { key: 'unread', label: 'Unread' },
  { key: 'read', label: 'Read' },
];

export const formatTime = (createdAt) => {
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

export const getNotificationType = (notification) => {
  if (notification.type === 'ANNOUNCEMENT') return 'ANNOUNCEMENT';
  const title = notification.title?.toLowerCase() || '';
  if (title.includes('new job')) return 'NEW_REQUEST';
  if (title.includes('accepted')) return 'JOB_ACCEPTED';
  if (title.includes('completed')) return 'JOB_COMPLETED';
  return 'SYSTEM';
};

export const getTypeStyle = (type) =>
  NOTIFICATION_TYPES[type] || NOTIFICATION_TYPES.SYSTEM;