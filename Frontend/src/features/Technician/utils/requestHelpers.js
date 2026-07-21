// ── Formatting & category helpers for technician requests ──────────

export const formatDate = (dateStr) => {
  if (!dateStr) return 'N/A';
  const diff = Math.floor((Date.now() - new Date(dateStr)) / 60000);
  if (diff < 1) return 'Just now';
  if (diff < 60) return `${diff} min${diff !== 1 ? 's' : ''} ago`;
  const hrs = Math.floor(diff / 60);
  if (hrs < 24) return `${hrs} hr${hrs !== 1 ? 's' : ''} ago`;
  return new Date(dateStr).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
};

export const formatId = (id) => (id ? `#${id.slice(-6).toUpperCase()}` : '#—');

export const CATEGORY_CONFIG = {
  plumber: { bg: 'bg-blue-50', text: 'text-blue-600', border: 'border-blue-100', icon: 'plumbing', label: 'Plumbing' },
  electrician: { bg: 'bg-amber-50', text: 'text-amber-600', border: 'border-amber-100', icon: 'electrical_services', label: 'Electrical' },
  hvac: { bg: 'bg-emerald-50', text: 'text-emerald-600', border: 'border-emerald-100', icon: 'ac_unit', label: 'HVAC' },
  carpenter: { bg: 'bg-orange-50', text: 'text-orange-600', border: 'border-orange-100', icon: 'carpenter', label: 'Carpentry' },
  painter: { bg: 'bg-pink-50', text: 'text-pink-600', border: 'border-pink-100', icon: 'format_paint', label: 'Painting' },
};

export const getCat = (c) =>
  CATEGORY_CONFIG[c?.toLowerCase()] || {
    bg: 'bg-slate-50',
    text: 'text-slate-600',
    border: 'border-slate-100',
    icon: 'build',
    label: c || 'General',
  };

export const getInitials = (name) =>
  name?.split(' ').map((n) => n[0]).join('').toUpperCase() || '?';

export const FILTERS = [
  { key: 'all', label: 'All Requests', icon: 'list_alt' },
  { key: 'emergency', label: 'Emergency', icon: 'warning' },
  { key: 'standard', label: 'Standard', icon: 'schedule' },
];

export const SORT_OPTIONS = [
  { key: 'newest', label: 'Newest First' },
  { key: 'oldest', label: 'Oldest First' },
];