import React, { useState, useEffect } from 'react';
import { getMyRequests } from '../services/requestService'; // adjust path if needed

const RequestHistory = () => {
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchRequests = async () => {
            try {
                setLoading(true);
                const response = await getMyRequests();
                setRequests(response.data.data || []); // ApiResponse → data field
            } catch (err) {
                setError("Failed to load your requests. Please try again.");
            } finally {
                setLoading(false);
            }
        };

        fetchRequests();
    }, []);

    const getStatusStyles = (status) => {
        switch (status?.toLowerCase()) {
            case 'completed':
                return 'bg-emerald-50 text-emerald-600 border-emerald-200';
            case 'in_progress':
                return 'bg-amber-50 text-amber-600 border-amber-200';
            case 'accepted':
                return 'bg-blue-50 text-blue-600 border-blue-200';
            case 'cancelled':
                return 'bg-red-50 text-red-500 border-red-200';
            case 'pending':
            default:
                return 'bg-slate-50 text-slate-500 border-slate-200';
        }
    };

    const getStatusIcon = (status) => {
        switch (status?.toLowerCase()) {
            case 'completed': return 'check_circle';
            case 'in_progress': return 'pending';
            case 'accepted': return 'handshake';
            case 'cancelled': return 'cancel';
            case 'pending':
            default: return 'schedule';
        }
    };

    const getCategoryIcon = (category) => {
        switch (category?.toLowerCase()) {
            case 'plumber': return 'plumbing';
            case 'electrician': return 'electrical_services';
            case 'hvac': return 'hvac';
            default: return 'build';
        }
    };

    const formatDate = (dateStr) => {
        if (!dateStr) return 'N/A';
        return new Date(dateStr).toLocaleDateString('en-US', {
            year: 'numeric', month: 'short', day: 'numeric'
        });
    };

    // ── Loading State ──────────────────────────────────────────
    if (loading) {
        return (
            <main className="flex-1 p-8 bg-[#f8fafc] min-h-[80vh] flex items-center justify-center">
                <div className="flex flex-col items-center gap-3">
                    <div className="w-8 h-8 border-4 border-[#004ac6]/20 border-t-[#004ac6] rounded-full animate-spin" />
                    <p className="text-sm text-slate-400">Loading your requests...</p>
                </div>
            </main>
        );
    }

    // ── Error State ────────────────────────────────────────────
    if (error) {
        return (
            <main className="flex-1 p-8 bg-[#f8fafc] min-h-[80vh] flex items-center justify-center">
                <div className="text-center bg-white p-8 rounded-2xl border border-red-100">
                    <span className="material-symbols-outlined text-red-400 text-[48px] mb-3">error</span>
                    <p className="text-slate-600 font-semibold">{error}</p>
                    <button
                        onClick={() => window.location.reload()}
                        className="mt-4 px-4 py-2 bg-[#004ac6] text-white text-sm rounded-xl font-semibold hover:bg-[#004ac6]/90"
                    >
                        Retry
                    </button>
                </div>
            </main>
        );
    }

    // ── Main UI ────────────────────────────────────────────────
    return (
        <main className="flex-1 p-8 overflow-y-auto bg-[#f8fafc] min-h-[80vh]">
            {/* Page Header */}
            <div className="max-w-5xl mx-auto mb-8">
                <div className="flex items-center gap-3 mb-2">
                    <div className="p-2.5 bg-gradient-to-br from-[#004ac6]/10 to-[#57dffe]/5 rounded-xl border border-[#004ac6]/10">
                        <span className="material-symbols-outlined text-[#004ac6] text-[24px]">history</span>
                    </div>
                    <div>
                        <h1 className="text-2xl font-extrabold text-slate-800 tracking-tight">Request History</h1>
                        <p className="text-sm text-slate-400">View and track all your past and ongoing service requests.</p>
                    </div>
                </div>
            </div>

            {/* History List */}
            <div className="max-w-5xl mx-auto space-y-4">
                {requests.map((request) => (
                    <div
                        key={request.id}
                        className="bg-white rounded-2xl border border-slate-100/80 shadow-[0_4px_6px_-1px_rgba(0,0,0,0.02)] p-6 flex flex-col md:flex-row md:items-center justify-between gap-5 transition-all hover:shadow-md"
                    >
                        <div className="flex items-start gap-4 flex-1">
                            {/* Category Icon */}
                            <div className="w-12 h-12 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center shrink-0">
                                <span className="material-symbols-outlined text-slate-500">
                                    {getCategoryIcon(request.category)}
                                </span>
                            </div>

                            {/* Request Details */}
                            <div className="flex-1">
                                <div className="flex items-center gap-3 mb-1 flex-wrap">
                                    <span className="font-mono text-xs font-bold text-slate-400">
                                        #{request.id?.slice(-6).toUpperCase()}
                                    </span>
                                    <span className="text-[10px] font-bold tracking-wider uppercase text-slate-400 bg-slate-50 px-2 py-0.5 rounded-full">
                                        {request.category}
                                    </span>
                                    {request.urgency === 'emergency' && (
                                        <span className="text-[10px] font-bold tracking-wider uppercase text-red-500 bg-red-50 px-2 py-0.5 rounded-full flex items-center gap-1">
                                            <span className="material-symbols-outlined text-[12px]">emergency</span> Emergency
                                        </span>
                                    )}
                                </div>

                                <h3 className="font-semibold text-slate-700 text-sm mb-1 line-clamp-1">
                                    {request.description}
                                </h3>

                                <div className="flex items-center gap-1 text-xs text-slate-400 mb-2">
                                    <span className="material-symbols-outlined text-[14px]">calendar_today</span>
                                    {formatDate(request.createdAt)}
                                </div>

                                {/* ── Photo Gallery ── */}
                                {request.photoUrls && request.photoUrls.length > 0 && (
                                    <div className="flex gap-2 flex-wrap">
                                        {request.photoUrls.map((url, index) => (
                                            <img
                                                key={index}
                                                src={url}
                                                alt={`Request photo ${index + 1}`}
                                                className="w-16 h-16 rounded-xl object-cover border border-slate-100 cursor-pointer hover:scale-105 transition-transform"
                                                onClick={() => window.open(url, '_blank')}
                                                onError={(e) => { e.target.style.display = 'none'; }}
                                            />
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Status & Actions */}
                        <div className="flex items-center justify-between md:flex-col md:items-end gap-3 border-t md:border-t-0 border-slate-100 pt-4 md:pt-0">
                            <div className={`px-3 py-1 rounded-full border text-xs font-bold flex items-center gap-1.5 capitalize ${getStatusStyles(request.status)}`}>
                                <span className="material-symbols-outlined text-[14px]">{getStatusIcon(request.status)}</span>
                                {request.status?.replace('_', ' ').toLowerCase()}
                            </div>
                            <button className="text-sm font-semibold text-[#004ac6] hover:text-[#004ac6]/80 transition-colors flex items-center gap-1">
                                View Details
                                <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                            </button>
                        </div>
                    </div>
                ))}

                {/* Empty State */}
                {requests.length === 0 && (
                    <div className="text-center py-12 bg-white rounded-2xl border border-slate-100">
                        <span className="material-symbols-outlined text-slate-300 text-[48px] mb-3">inbox</span>
                        <h3 className="font-semibold text-slate-600">No requests yet</h3>
                        <p className="text-sm text-slate-400 mt-1">When you create a service request, it will appear here.</p>
                    </div>
                )}
            </div>
        </main>
    );
};

export default RequestHistory;