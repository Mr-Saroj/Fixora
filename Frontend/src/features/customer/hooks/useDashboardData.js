import { useState, useEffect, useCallback, useMemo } from 'react';
import { getDashboardRequests } from '../services/dashboardService';

// ── Constants & Utilities ──────────────────────────────────
export const STATUS_STEPS = ['PENDING', 'ACCEPTED', 'IN_PROGRESS', 'COMPLETED'];

export const getStepIndex = (status) => {
  const i = STATUS_STEPS.indexOf(status?.toUpperCase());
  return i === -1 ? 0 : i;
};

export const getCategoryIcon = (category) => {
  const map = { PLUMBING: 'plumbing', ELECTRICAL: 'bolt', HVAC: 'ac_unit', CARPENTER: 'carpenter' };
  return map[category?.toUpperCase()] || 'build';
};

export const formatDate = (iso) => {
  if (!iso) return '—';
  try {
    return new Date(iso).toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
  } catch {
    return iso;
  }
};

// ── Hook Logic ─────────────────────────────────────────────
export const useDashboardData = () => {
  const [selectedUrgency, setSelectedUrgency] = useState('standard');
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // ── Fetch Requests ──────────────────────────────────────
  const fetchRequests = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const body = await getDashboardRequests();
      // getMyRequests returns success:false with no data when the list is empty —
      // that's not an error condition for this page, just an empty state.
      setRequests(body.success && Array.isArray(body.data) ? body.data : []);
    } catch (err) {
      setError(err?.response?.data?.message || 'Could not load your jobs.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchRequests();
  }, [fetchRequests]);

  // ── Derived Stats ───────────────────────────────────────
  const activeJobs = useMemo(() => 
    requests.filter((r) => r.status !== 'COMPLETED' && r.status !== 'CANCELLED'), 
  [requests]);

  const pendingJobs = useMemo(() => 
    requests.filter((r) => r.status === 'PENDING'), 
  [requests]);

  const completedJobs = useMemo(() => 
    requests.filter((r) => r.status === 'COMPLETED'), 
  [requests]);

  // Most recently created active job — drives the Job Status + tracking cards
  const currentJob = useMemo(() => {
    return [...activeJobs].sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    )[0];
  }, [activeJobs]);

  const recentActivity = useMemo(() => {
    return [...requests]
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .slice(0, 4);
  }, [requests]);

  const stats = useMemo(() => [
    {
      icon: 'engineering',
      label: 'Active Jobs',
      value: String(activeJobs.length).padStart(2, '0'),
      sub: 'IN PROGRESS',
      color: 'blue',
    },
    {
      icon: 'hourglass_top',
      label: 'Pending Requests',
      value: String(pendingJobs.length).padStart(2, '0'),
      sub: 'AWAITING PRO',
      color: 'amber',
    },
    {
      icon: 'verified',
      label: 'Completed Jobs',
      value: String(completedJobs.length).padStart(2, '0'),
      sub: 'ALL TIME',
      color: 'emerald',
    },
  ], [activeJobs.length, pendingJobs.length, completedJobs.length]);

  return {
    // State
    selectedUrgency,
    setSelectedUrgency,
    loading,
    error,
    
    // Actions
    fetchRequests,
    
    // Derived Data
    currentJob,
    recentActivity,
    stats,
  };
};