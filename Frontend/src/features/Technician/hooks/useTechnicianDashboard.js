
import { useState, useEffect, useCallback, useMemo } from 'react';

import {
  getMyJobs,
  updateJobStatus,
  getSubscriptionStatus
} from '../services/technicianService';

export const STEPS = [
  { status: 'ACCEPTED', icon: 'assignment_turned_in', label: 'Accepted' },
  { status: 'IN_PROGRESS', icon: 'engineering', label: 'In Progress' },
  { status: 'COMPLETED', icon: 'task_alt', label: 'Completed' },
];

export const getCategoryIcon = (category) => {
  const map = {
    PLUMBING: 'plumbing',
    ELECTRICAL: 'bolt',
    HVAC: 'ac_unit',
    CARPENTER: 'carpenter'
  };

  return map[category?.toUpperCase()] || 'build';
};

export const formatDate = (iso) => {
  if (!iso) return '—';

  return new Date(iso).toLocaleDateString(undefined, {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

export const useTechnicianDashboard = () => {
  const [jobs, setJobs] = useState([]);
  const [jobsLoading, setJobsLoading] = useState(true);
  const [advancing, setAdvancing] = useState(false);
  const [error, setError] = useState(null);

  // Subscription
  const [subscription, setSubscription] = useState(null);
  const [subLoading, setSubLoading] = useState(true);

  // Fetch Jobs
  const fetchJobs = useCallback(async () => {
    setJobsLoading(true);
    setError(null);

    try {
      const response = await getMyJobs(null, 10);
      const body = response.data;

      // Same paginated response structure as getMatchingRequests()
      const data = body?.data;

      const requests = Array.isArray(data)
        ? data
        : data?.requests;

      setJobs(
        body?.success && Array.isArray(requests)
          ? requests
          : []
      );

    } catch (err) {
      setError(
        err?.response?.data?.message ||
        'Could not load your jobs.'
      );
    } finally {
      setJobsLoading(false);
    }
  }, []);

  // Fetch Subscription
  const fetchSubscription = useCallback(async () => {
    setSubLoading(true);

    try {
      const response = await getSubscriptionStatus();
      setSubscription(response.data.data);
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

  // Active Jobs
  const activeJobs = useMemo(
    () =>
      jobs.filter(
        (job) =>
          job.status === 'ACCEPTED' ||
          job.status === 'IN_PROGRESS'
      ),
    [jobs]
  );

  // Completed Jobs
  const completedJobs = useMemo(
    () =>
      jobs.filter((job) => job.status === 'COMPLETED'),
    [jobs]
  );

  // Current Active Job
  const currentJob = useMemo(() => {
    return [...activeJobs].sort(
      (a, b) =>
        new Date(b.createdAt) - new Date(a.createdAt)
    )[0] || null;
  }, [activeJobs]);

  // Current Step
  const currentStepIdx = currentJob
    ? STEPS.findIndex(
        (step) => step.status === currentJob.status
      )
    : -1;

  // Dashboard Stats
  const stats = useMemo(
    () => [
      {
        icon: 'engineering',
        label: 'Active Jobs',
        value: String(activeJobs.length).padStart(2, '0'),
        sub: `${activeJobs.filter(
          (job) => job.status === 'IN_PROGRESS'
        ).length} IN PROGRESS`,
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
      }
    ],
    [activeJobs, completedJobs]
  );

  // Advance Current Job
  const advanceCurrentJob = async () => {
    if (!currentJob || advancing) return;

    const stepIdx = STEPS.findIndex(
      (step) => step.status === currentJob.status
    );

    if (stepIdx === -1 || stepIdx >= STEPS.length - 1) {
      return;
    }

    const nextStatus = STEPS[stepIdx + 1].status;

    setAdvancing(true);

    try {
      const response = await updateJobStatus(
        currentJob.id,
        nextStatus
      );

      const body = response.data;

      if (!body.success) {
        alert(body.message || 'Could not update status');
        return;
      }

      setJobs((prev) =>
        prev.map((job) =>
          job.id === currentJob.id
            ? { ...job, status: nextStatus }
            : job
        )
      );

    } catch (err) {
      alert(
        err?.response?.data?.message ||
        'Could not update status'
      );
    } finally {
      setAdvancing(false);
    }
  };

  return {
    jobsLoading,
    error,
    fetchJobs,
    advancing,
    advanceCurrentJob,
    currentJob,
    currentStepIdx,
    stats,
    completedJobs,
    subscription,
    subLoading,
    fetchSubscription
  };
};
