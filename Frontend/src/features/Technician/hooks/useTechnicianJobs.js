import { useState, useMemo, useEffect, useCallback } from 'react';
import { getMyJobs, updateJobStatus } from '../services/technicianService';

// ── Backend status -> UI status ─────────────────────────────
const STATUS_MAP = {
    ACCEPTED: 'scheduled',
    IN_PROGRESS: 'in-progress',
    COMPLETED: 'completed',
};

const STEP_TO_STATUS = ['ACCEPTED', 'IN_PROGRESS', 'COMPLETED'];

const steps = [
    { icon: 'assignment_turned_in', label: 'Accepted' },
    { icon: 'engineering', label: 'In Progress' },
    { icon: 'task_alt', label: 'Completed' },
];

const filters = [
    { key: 'all', label: 'All Jobs', icon: 'list_alt' },
    { key: 'in-progress', label: 'In Progress', icon: 'engineering' },
    { key: 'scheduled', label: 'Scheduled', icon: 'event' },
    { key: 'completed', label: 'Completed', icon: 'check_circle' },
];

const formatDate = (iso) => {
    if (!iso) return '—';
    try {
        return new Date(iso).toLocaleString(undefined, {
            month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit',
        });
    } catch {
        return iso;
    }
};

const capitalize = (str) =>
    str ? str.charAt(0).toUpperCase() + str.slice(1).toLowerCase() : '';

const mapJob = (req) => {
    const currentStep = Math.max(0, STEP_TO_STATUS.indexOf(req.status));
    return {
        id: req.id,
        name: req.fullName,
        phone: req.mobileNumber,
        category: req.category ? capitalize(req.category) : 'General',
        issue: req.description,
        address: req.location,
        urgency: req.urgency ? capitalize(req.urgency) : 'Standard',
        status: STATUS_MAP[req.status] || 'scheduled',
        rawStatus: req.status,
        currentStep,
        createdAt: req.createdAt,
        photos: req.photoUrls ? req.photoUrls.length : 0,
        photoUrls: req.photoUrls || [],
        rating: req.rating || null,
        review: req.review || null,
    };
};

export const useTechnicianJobs = () => {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [updatingId, setUpdatingId] = useState(null);

    const [activeFilter, setActiveFilter] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedJob, setSelectedJob] = useState(null);
    const [showCompleteConfirm, setShowCompleteConfirm] = useState(null);

    // ── Fetch technician's jobs ──────────────────────────────
    const fetchJobs = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const res = await getMyJobs();
            const body = res.data;
            if (!body.success) {
                setError(body.message || 'Failed to load jobs');
                setJobs([]);
                return;
            }
            const list = Array.isArray(body.data) ? body.data : [];
            setJobs(list.map(mapJob));
        } catch (err) {
            setError(
                err?.response?.data?.message || 'Something went wrong loading your jobs.'
            );
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchJobs();
    }, [fetchJobs]);

    // ── Advance status via API ───────────────────────────────
    const advanceJob = async (jobId) => {
        const job = jobs.find((j) => j.id === jobId);
        if (!job || job.currentStep >= 2) return;

        const nextStatus = STEP_TO_STATUS[job.currentStep + 1];
        setUpdatingId(jobId);
        try {
            const res = await updateJobStatus(jobId, nextStatus);
            const body = res.data;
            if (!body.success) {
                alert(body.message || 'Could not update status');
                return;
            }
            setJobs((prev) =>
                prev.map((j) =>
                    j.id === jobId
                        ? { ...j, currentStep: j.currentStep + 1, rawStatus: nextStatus, status: STATUS_MAP[nextStatus] }
                        : j
                )
            );
            setSelectedJob((prev) =>
                prev && prev.id === jobId
                    ? { ...prev, currentStep: prev.currentStep + 1, rawStatus: nextStatus, status: STATUS_MAP[nextStatus] }
                    : prev
            );
        } catch (err) {
            alert(err?.response?.data?.message || 'Could not update status');
        } finally {
            setUpdatingId(null);
            setShowCompleteConfirm(null);
        }
    };

    // ── UI Helpers ───────────────────────────────────────────
    const getCategoryColor = (category) => {
        const map = {
            Plumbing: { bg: 'bg-blue-50', text: 'text-blue-600', border: 'border-blue-100' },
            Electrical: { bg: 'bg-amber-50', text: 'text-amber-600', border: 'border-amber-100' },
            Hvac: { bg: 'bg-emerald-50', text: 'text-emerald-600', border: 'border-emerald-100' },
        };
        return map[category] || { bg: 'bg-slate-50', text: 'text-slate-600', border: 'border-slate-100' };
    };

    const getCategoryIcon = (category) => {
        const map = { Plumbing: 'water_drop', Electrical: 'bolt', Hvac: 'ac_unit' };
        return map[category] || 'build';
    };

    const getStatusConfig = (status) => {
        const map = {
            'in-progress': { label: 'In Progress', bg: 'bg-blue-50', text: 'text-blue-600', border: 'border-blue-200', icon: 'engineering' },
            scheduled: { label: 'Accepted', bg: 'bg-purple-50', text: 'text-purple-600', border: 'border-purple-200', icon: 'event' },
            completed: { label: 'Completed', bg: 'bg-emerald-50', text: 'text-emerald-600', border: 'border-emerald-200', icon: 'check_circle' },
        };
        return map[status] || map.scheduled;
    };

    // ── Memoized Data ────────────────────────────────────────
    const filteredJobs = useMemo(() => {
        let result = [...jobs];
        if (activeFilter !== 'all') {
            result = result.filter((job) => job.status === activeFilter);
        }
        if (searchQuery.trim()) {
            const q = searchQuery.toLowerCase();
            result = result.filter(
                (job) =>
                    job.name?.toLowerCase().includes(q) ||
                    job.issue?.toLowerCase().includes(q) ||
                    job.category?.toLowerCase().includes(q) ||
                    job.id?.toLowerCase().includes(q) ||
                    job.address?.toLowerCase().includes(q)
            );
        }
        return result;
    }, [jobs, activeFilter, searchQuery]);

    const counts = {
        all: jobs.length,
        'in-progress': jobs.filter((j) => j.status === 'in-progress').length,
        scheduled: jobs.filter((j) => j.status === 'scheduled').length,
        completed: jobs.filter((j) => j.status === 'completed').length,
    };

    return {
        // State
        jobs,
        loading,
        error,
        updatingId,
        activeFilter,
        setActiveFilter,
        searchQuery,
        setSearchQuery,
        selectedJob,
        setSelectedJob,
        showCompleteConfirm,
        setShowCompleteConfirm,

        // Data
        filteredJobs,
        counts,

        // Actions
        fetchJobs,
        advanceJob,

        // Constants & Helpers
        steps,
        filters,
        formatDate,
        getCategoryColor,
        getCategoryIcon,
        getStatusConfig,
    };
};