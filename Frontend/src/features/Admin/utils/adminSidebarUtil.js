// src/features/Admin/utils/adminSidebarUtil.js

export const ADMIN_NAV_LINKS = [
  {
    icon: 'dashboard',
    label: 'Dashboard',
    to: '/admin-dashboard',
    end: true,
  },
  {
    icon: 'campaign',
    label: 'Create Announcement',
    to: '/admin-dashboard/announcements',
  },
  {
    icon: 'engineering',
    label: 'Technician List',
    to: '/admin-dashboard/technicians',
  },
  {
    icon: 'how_to_reg',
    label: 'Technician Login Approval',
    to: '/admin-dashboard/technician-approvals',
  },
  {
    icon: 'forum',
    label: 'User Query Messages',
    to: '/admin-dashboard/user-queries',
  },
];

export const ADMIN_BOTTOM_LINKS = [
  { icon: 'help',   label: 'Help Center' },
  { icon: 'logout', label: 'Logout', isDanger: true },
];

export const DASHBOARD_LABEL = 'ADMIN CONTROL PANEL';