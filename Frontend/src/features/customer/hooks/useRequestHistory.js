import { useState, useEffect, useCallback, useRef } from 'react';
import { getMyRequests } from '../services/requestService';

const STATUS_STEPS = ['PENDING', 'ACCEPTED', 'IN_PROGRESS', 'COMPLETED'];

export const useRequestHistory = () => {
    const [requests, setRequests]       = useState([]);
    const [loading, setLoading]         = useState(true);
    const [loadingMore, setLoadingMore] = useState(false);
    const [error, setError]             = useState(null);
    const [cursor, setCursor]           = useState(null);
    const [hasMore, setHasMore]         = useState(false);
    const [selectedRequest, setSelectedRequest] = useState(null);
    const [ratingOverrides, setRatingOverrides] = useState({});
    const sentinelRef = useRef(null);

    // ── Initial fetch ────────────────────────────────────────
    useEffect(() => {
        const fetchRequests = async () => {
            try {
                setLoading(true);
                setError(null);
                const response = await getMyRequests(null, 10);
                const { requests: data, nextCursor, hasMore } = response.data.data;
                setRequests(data || []);
                setCursor(nextCursor);
                setHasMore(hasMore);
            } catch (err) {
                setError("Failed to load your requests. Please try again.");
            } finally {
                setLoading(false);
            }
        };
        fetchRequests();
    }, []);

    // ── Load more ────────────────────────────────────────────
    const loadMore = useCallback(async () => {
        if (!hasMore || loadingMore) return;
        try {
            setLoadingMore(true);
            const response = await getMyRequests(cursor, 10);
            const { requests: data, nextCursor, hasMore: more } = response.data.data;
            setRequests((prev) => [...prev, ...(data || [])]);
            setCursor(nextCursor);
            setHasMore(more);
        } catch (err) {
            setError("Failed to load more requests.");
        } finally {
            setLoadingMore(false);
        }
    }, [cursor, hasMore, loadingMore]);

    // ── IntersectionObserver ─────────────────────────────────
    useEffect(() => {
        const sentinel = sentinelRef.current;
        if (!sentinel) return;
        const observer = new IntersectionObserver(
            (entries) => { if (entries[0].isIntersecting) loadMore(); },
            { threshold: 0.1 }
        );
        observer.observe(sentinel);
        return () => observer.disconnect();
    }, [loadMore]);

    // ── Rating ───────────────────────────────────────────────
    const withOverride = (req) =>
        ratingOverrides[req.id] ? { ...req, ...ratingOverrides[req.id] } : req;

    const handleRated = (requestId, { rating, review }) => {
        setRatingOverrides((prev) => ({ ...prev, [requestId]: { rating, review } }));
        setSelectedRequest((prev) =>
            prev && prev.id === requestId ? { ...prev, rating, review } : prev
        );
    };

    // ── Helpers ──────────────────────────────────────────────
    const getStatusStyles = (status) => {
        switch (status?.toUpperCase()) {
            case 'COMPLETED':   return 'bg-emerald-50 text-emerald-600 border-emerald-200';
            case 'IN_PROGRESS': return 'bg-amber-50 text-amber-600 border-amber-200';
            case 'ACCEPTED':    return 'bg-blue-50 text-blue-600 border-blue-200';
            case 'CANCELLED':   return 'bg-red-50 text-red-500 border-red-200';
            default:            return 'bg-slate-50 text-slate-500 border-slate-200';
        }
    };

    const getStatusIcon = (status) => {
        switch (status?.toUpperCase()) {
            case 'COMPLETED':   return 'check_circle';
            case 'IN_PROGRESS': return 'pending';
            case 'ACCEPTED':    return 'handshake';
            case 'CANCELLED':   return 'cancel';
            default:            return 'schedule';
        }
    };

    const getCategoryIcon = (category) => {
        switch (category?.toUpperCase()) {
            case 'PLUMBER':      return 'plumbing';
            case 'ELECTRICIAN':  return 'electrical_services';
            case 'CARPENTER':    return 'carpenter';
            case 'PAINTER':      return 'format_paint';
            case 'AC_REPAIR':    return 'ac_unit';
            case 'CLEANING':     return 'cleaning_services';
            case 'PEST_CONTROL': return 'pest_control';
            default:             return 'build';
        }
    };

    const formatDate = (dateStr) => {
        if (!dateStr) return 'N/A';
        return new Date(dateStr).toLocaleDateString('en-US', {
            year: 'numeric', month: 'short', day: 'numeric',
        });
    };

    const getStepIndex    = (status) => STATUS_STEPS.indexOf(status?.toUpperCase());
    const getProgressWidth = (stepIndex) => {
        if (stepIndex === 0) return '0%';
        if (stepIndex === 1) return '33%';
        if (stepIndex === 2) return '66%';
        return '92%';
    };
    const isStepDone       = (stepIndex, i) => i === stepIndex || i < stepIndex;
    const isStepActive     = (stepIndex, i) => i === stepIndex;
    const getStepCircleClass = (done, active) => {
        const base  = 'w-8 h-8 rounded-full flex items-center justify-center border-2 transition-all';
        const color = done ? 'bg-[#004ac6] border-[#004ac6]' : 'bg-white border-slate-200';
        const ring  = active ? 'ring-4 ring-[#004ac6]/20' : '';
        return `${base} ${color} ${ring}`;
    };
    const getStepLabelClass = (done) => {
        const base = 'text-[10px] font-bold text-center leading-tight';
        return done ? `${base} text-[#004ac6]` : `${base} text-slate-400`;
    };

    const modalHelpers = {
        STATUS_STEPS, getStepIndex, getProgressWidth,
        isStepDone, isStepActive, getStepCircleClass,
        getStepLabelClass, formatDate,
    };

    return {
        requests, loading, loadingMore, error,
        hasMore, sentinelRef,
        selectedRequest, setSelectedRequest,
        withOverride, handleRated, modalHelpers,
        STATUS_STEPS, getStatusStyles, getStatusIcon,
        getCategoryIcon, formatDate, getStepIndex,
        getProgressWidth, isStepDone, isStepActive,
        getStepCircleClass, getStepLabelClass,
    };
};