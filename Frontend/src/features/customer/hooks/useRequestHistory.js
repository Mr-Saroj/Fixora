import { useState, useEffect } from 'react';
import { getMyRequests } from '../services/requestService';

const STATUS_STEPS = ['PENDING', 'ACCEPTED', 'IN_PROGRESS', 'COMPLETED'];

export const useRequestHistory = () => {
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedRequest, setSelectedRequest] = useState(null);
    
    // ── Rating State & Logic ──
    const [ratingOverrides, setRatingOverrides] = useState({});

    const withOverride = (req) =>
        ratingOverrides[req.id] ? { ...req, ...ratingOverrides[req.id] } : req;

    const handleRated = (requestId, { rating, review }) => {
        setRatingOverrides((prev) => ({ ...prev, [requestId]: { rating, review } }));
        setSelectedRequest((prev) => 
            prev && prev.id === requestId ? { ...prev, rating, review } : prev
        );
    };

    useEffect(() => {
        const fetchRequests = async () => {
            try {
                setLoading(true);
                const response = await getMyRequests();
                setRequests(response.data.data || []);
            } catch (err) {
                setError("Failed to load your requests. Please try again.");
            } finally {
                setLoading(false);
            }
        };
        fetchRequests();
    }, []);

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

    const getStepIndex = (status) => STATUS_STEPS.indexOf(status?.toUpperCase());

    const getProgressWidth = (stepIndex) => {
        if (stepIndex === 0) return '0%';
        if (stepIndex === 1) return '33%';
        if (stepIndex === 2) return '66%';
        return '92%';
    };

    const isStepDone = (stepIndex, i) => i === stepIndex || i < stepIndex;
    const isStepActive = (stepIndex, i) => i === stepIndex;

    const getStepCircleClass = (done, active) => {
        const base = 'w-8 h-8 rounded-full flex items-center justify-center border-2 transition-all';
        const color = done ? 'bg-[#004ac6] border-[#004ac6]' : 'bg-white border-slate-200';
        const ring = active ? 'ring-4 ring-[#004ac6]/20' : '';
        return `${base} ${color} ${ring}`;
    };

    const getStepLabelClass = (done) => {
        const base = 'text-[10px] font-bold text-center leading-tight';
        return done ? `${base} text-[#004ac6]` : `${base} text-slate-400`;
    };

    // ── Constructed Helpers for Modal ──
    const modalHelpers = {
        STATUS_STEPS,
        getStepIndex,
        getProgressWidth,
        isStepDone,
        isStepActive,
        getStepCircleClass,
        getStepLabelClass,
        formatDate,
    };

    return {
        // State
        requests,
        loading,
        error,
        selectedRequest,
        setSelectedRequest,

        // Rating Logic
        withOverride,
        handleRated,
        modalHelpers,

        // Helpers
        STATUS_STEPS,
        getStatusStyles,
        getStatusIcon,
        getCategoryIcon,
        formatDate,
        getStepIndex,
        getProgressWidth,
        isStepDone,
        isStepActive,
        getStepCircleClass,
        getStepLabelClass,
    };
};