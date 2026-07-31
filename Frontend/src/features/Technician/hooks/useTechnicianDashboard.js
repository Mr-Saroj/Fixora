import { useState, useEffect, useCallback, useMemo } from 'react';
import { getMyJobs, updateJobStatus, getSubscriptionStatus } from '../services/technicianService';

export const STEPS = [
  { status: 'ACCEPTED', icon: 'assignment_turned_in', label: 'Accepted' },
  { status: 'IN_PROGRESS', icon: 'engineering', label: 'In Progress' },
  { status: 'COMPLETED', icon: 'task_alt', label: 'Completed' },
];

export const getCategoryIcon = (category) => {
  const map = { PLUMBING: 'plumbing', ELECTRICAL: 'bolt', HVAC: 'ac_unit', CARPENTER: 'carpenter' };
  return map[category?.toUpperCase()] || 'build';
};

export const formatDate = (iso) => {
  if (!iso) return '—';
  return new Date(iso).toLocaleDateString(undefined, {
    month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit'
  });
};

export const useTechnicianDashboard = () => {
  const [jobs, setJobs] = useState([]);
  const [jobsLoading, setJobsLoading] = useState(true);
  const [advancing, setAdvancing] = useState(false);
  const [error, setError] = useState(null);

  // ── Subscription state ──────────────────────────────────
  const [subscription, setSubscription] = useState(null); // { status, daysRemaining, subscriptionEndDate }
  const [subLoading, setSubLoading] = useState(true);

  // ── Fetch Jobs ──────────────────────────────────────────
  const fetchJobs = useCallback(async () => {
    setJobsLoading(true);
    try {
      const res = await getMyJobs();
      const body = res.data;
      setJobs(body.success && Array.isArray(body.data) ? body.data : []);
    } catch (err) {
      setError(err?.response?.data?.message || 'Could not load your jobs.');
    } finally {
      setJobsLoading(false);
    }
  }, []);

  // ── Fetch Subscription ──────────────────────────────────
  const fetchSubscription = useCallback(async () => {
    setSubLoading(true);
    try {
      const res = await getSubscriptionStatus();
      setSubscription(res.data.data); // { status, daysRemaining, subscriptionEndDate }
    } catch (err) {
      setSubscription(null);
    } finally {
      setSubLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchJobs();
    fetchSubscription();
  }, [fetchJobs, fetchSubscription]);

  // ── Derived Data ────────────────────────────────────────
  const activeJobs = useMemo(() =>
    jobs.filter((j) => j.status === 'ACCEPTED' || j.status === 'IN_PROGRESS'),
  [jobs]);

  const completedJobs = useMemo(() =>
    jobs.filter((j) => j.status === 'COMPLETED'),
  [jobs]);

  const currentJob = useMemo(() => {
    return [...activeJobs].sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    )[0];
  }, [activeJobs]);

  const currentStepIdx = currentJob
    ? STEPS.findIndex((s) => s.status === currentJob.status)
    : -1;

  const stats = useMemo(() => [
    {
      icon: 'engineering',
      label: 'Active Jobs',
      value: String(activeJobs.length).padStart(2, '0'),
      sub: `${activeJobs.filter(j => j.status === 'IN_PROGRESS').length} IN PROGRESS`,
      color: 'blue'
    },
    {
      icon: 'verified',
      label: 'Completed Jobs',
      value: String(completedJobs.length).padStart(2, '0'),
      sub: 'ALL TIME',
      color: 'emerald'
    },
    {
      icon: 'star',
      label: 'My Tech Rating',
      value: '4.95/5.0',
      sub: 'TOP RATED PRO',
      color: 'amber'
    },
  ], [activeJobs, completedJobs]);

  // ── Actions ─────────────────────────────────────────────
  const advanceCurrentJob = async () => {
    if (!currentJob) return;
    const stepIdx = STEPS.findIndex((s) => s.status === currentJob.status);
    if (stepIdx === -1 || stepIdx >= STEPS.length - 1) return;
    const nextStatus = STEPS[stepIdx + 1].status;

    setAdvancing(true);
    try {
      const res = await updateJobStatus(currentJob.id, nextStatus);
      const body = res.data;
      if (!body.success) { alert(body.message || 'Could not update status'); return; }
      setJobs((prev) => prev.map((j) => (j.id === currentJob.id ? { ...j, status: nextStatus } : j)));
    } catch (err) {
      alert(err?.response?.data?.message || 'Could not update status');
    } finally {
      setAdvancing(false);
    }
  };

  return {
    jobsLoading, error, advancing,
    fetchJobs, advanceCurrentJob,
    currentJob, currentStepIdx, stats, completedJobs,
    subscription, subLoading, // ✅ new
    fetchSubscription,
  };
};