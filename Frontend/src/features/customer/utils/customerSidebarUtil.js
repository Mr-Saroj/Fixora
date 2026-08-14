// src/features/customer/utils/customerData.js

export const CUSTOMER_NAV_LINKS = [
  { icon: 'dashboard',   label: 'Dashboard',       to: '/customer-dashboard', end: true },
  { icon: 'assignment',  label: 'Create Requests',  to: '/customer-dashboard/requests' },
  { icon: 'history',     label: 'Request History',  to: '/customer-dashboard/history' },
  { icon: 'chat_bubble', label: 'Messages',         to: '/customer-dashboard/messages' },
  { icon: 'settings',    label: 'Settings',         to: '/customer-dashboard/settings' },
];

export const CUSTOMER_BOTTOM_LINKS = [
  { icon: 'help',   label: 'Help Center' },
  { icon: 'logout', label: 'Logout' },
];

export const DASHBOARD_LABEL = "PRO TECH DASHBOARD";