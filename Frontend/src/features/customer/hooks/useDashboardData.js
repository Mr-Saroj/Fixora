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

  // ── Live Location State ─────────────────────────────────
  const [locationStatus, setLocationStatus] = useState('idle'); // idle | sharing | shared | error
  const [locationError, setLocationError] = useState(null);
  const [locationAccuracy, setLocationAccuracy] = useState(null);

  // ── Fetch Requests ──────────────────────────────────────
  const fetchRequests = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const body = await getDashboardRequests();
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

  // ── Location Logic (UI only — no backend call yet) ──────
  const canShareLocation = useMemo(() => {
    return currentJob && (currentJob.status === 'ACCEPTED' || currentJob.status === 'IN_PROGRESS');
  }, [currentJob]);

  const handleShareLocation = useCallback(() => {
    if (!navigator.geolocation) {
      setLocationStatus('error');
      setLocationError('Geolocation is not supported by your browser');
      return;
    }

    const techPhone = currentJob?.technician?.phone;
    if (!techPhone) {
      setLocationStatus('error');
      setLocationError('Technician phone number is not available');
      return;
    }

    setLocationStatus('sharing');
    setLocationError(null);

    const sendToWhatsapp = (latitude, longitude) => {
      const mapsUrl = `https://www.google.com/maps?q=${latitude},${longitude}`;
      const message =
        `Hi ${currentJob.technician.name}, here's my live location for job ` +
        `#${currentJob.id?.slice(-6).toUpperCase()}: ${mapsUrl}`;
      const cleanPhone = techPhone.replace(/\D/g, '');
      const whatsappUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`;
      window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
      setLocationStatus('shared');
    };

    // A single getCurrentPosition() call can hand back a stale/cached reading,
    // or a rough WiFi/IP-based estimate before GPS has locked on. Watching
    // for a few seconds and keeping the most accurate fix gives a real position
    // instead of a "somewhere in the city" one.
    const GOOD_ENOUGH_ACCURACY_M = 30; // stop early once we're this precise
    const MAX_WAIT_MS = 12000;

    let best = null;
    let watchId = null;

    const finish = () => {
      if (watchId !== null) navigator.geolocation.clearWatch(watchId);
      if (!best) {
        setLocationStatus('error');
        setLocationError('Could not get an accurate location. Try again outdoors or with GPS on.');
        return;
      }
      setLocationAccuracy(best.coords.accuracy);
      sendToWhatsapp(best.coords.latitude, best.coords.longitude);
    };

    const timeoutId = setTimeout(finish, MAX_WAIT_MS);

    watchId = navigator.geolocation.watchPosition(
      (position) => {
        if (!best || position.coords.accuracy < best.coords.accuracy) {
          best = position;
        }
        if (position.coords.accuracy <= GOOD_ENOUGH_ACCURACY_M) {
          clearTimeout(timeoutId);
          finish();
        }
      },
      (err) => {
        clearTimeout(timeoutId);
        if (watchId !== null) navigator.geolocation.clearWatch(watchId);
        setLocationStatus('error');
        setLocationError(
          err.code === err.PERMISSION_DENIED
            ? 'Location permission denied'
            : 'Could not get your location'
        );
      },
      { enableHighAccuracy: true, maximumAge: 0, timeout: MAX_WAIT_MS }
    );
  }, [currentJob]);

  return {
    // State
    selectedUrgency,
    setSelectedUrgency,
    loading,
    error,
    locationStatus,
    locationError,
    locationAccuracy,
    
    // Actions
    fetchRequests,
    handleShareLocation,
    
    // Derived Data
    currentJob,
    recentActivity,
    stats,
    canShareLocation,
  };
};