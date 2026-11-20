export const TECHNICIAN_NAV_LINKS = [
  {
    id: 'dashboard',
    icon: 'dashboard',
    label: 'Dashboard',
    to: '/technician-dashboard',
    end: true
  },
  {
    id: 'customer-requests',
    icon: 'inbox',
    label: 'Customer Requests',
    to: '/technician-dashboard/customer-requests'
  },
  {
    id: 'accepted-requests',
    icon: 'task_alt',
    label: 'Accepted Requests',
    to: '/technician-dashboard/accepted-requests'
  },
  {
    id: 'profile',
    icon: 'person',
    label: 'My Profile',
    to: '/technician-dashboard/profile'
  },
  {
    id: 'notifications',
    icon: 'notifications',
    label: 'Notifications',
    to: '/technician-dashboard/notifications'
  },
  {
    id: 'settings',
    icon: 'settings',
    label: 'Settings',
    to: '/technician-dashboard/settings'
  },
];

export const TECHNICIAN_BOTTOM_LINKS = [
  { icon: 'help', label: 'Help Center' },
  { icon: 'logout', label: 'Logout', isDanger: true },
];

export const DASHBOARD_LABEL = "TECHNICIAN PORTAL";

export const getTechnicianNavLinks = (unreadMessages, unreadNotifications) => {
  return TECHNICIAN_NAV_LINKS.map((link) => {
    if (link.id === 'messages') {
      return { ...link, badgeCount: unreadMessages, showBadge: true };
    }

    if (link.id === 'notifications') {
      return { ...link, badgeCount: unreadNotifications, showBadge: true };
    }

    return link;
  });
};