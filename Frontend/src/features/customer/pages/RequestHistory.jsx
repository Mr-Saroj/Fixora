import React, { useState } from 'react';
import { useRequestHistory } from '../hooks/useRequestHistory';
import { submitRating } from '../services/requestService';
import PageLoader from '../../../components/common/PageLoader';
import ErrorPage from '../../../components/common/ErrorPage';

// ── Star rating input ─────────────────────────────────────
const StarInput = ({ value, onChange }) => {
    const [hover, setHover] = useState(0);
    return (
        <div className="flex items-center gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
                <button
                    key={star}
                    type="button"
                    onClick={() => onChange(star)}
                    onMouseEnter={() => setHover(star)}
                    onMouseLeave={() => setHover(0)}
                    className="p-0.5"
                >
                    <span
                        className={`material-symbols-outlined text-[28px] transition-colors ${star <= (hover || value) ? 'text-amber-400' : 'text-slate-200'
                            }`}
                        style={{ fontVariationSettings: star <= (hover || value) ? "'FILL' 1" : "'FILL' 0" }}
                    >
                        star
                    </span>
                </button>
            ))}
        </div>
    );
};

// ── Rate Technician block ─────────────────────────────────
const RateTechnicianBlock = ({ req, onRated }) => {
    const [rating, setRating] = useState(0);
    const [review, setReview] = useState('');
    const [submitting, setSubmitting] = useState(false);
    const [err, setErr] = useState(null);

    const handleSubmit = async () => {
        if (rating < 1) { setErr('Please select a star rating'); return; }
        setSubmitting(true);
        setErr(null);
        try {
            const res = await submitRating(req.id, { rating, review });
            if (!res.data.success) { setErr(res.data.message || 'Could not submit rating'); return; }
            onRated(req.id, { rating, review });
        } catch (e) {
            setErr(e?.response?.data?.message || 'Could not submit rating');
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="bg-amber-50/60 rounded-2xl p-5 border border-amber-100">
            <p className="text-xs font-bold text-amber-700 uppercase tracking-wide mb-3">Rate this technician</p>
            <StarInput value={rating} onChange={setRating} />
            <textarea
                value={review}
                onChange={(e) => setReview(e.target.value)}
                placeholder="Optional — tell us how it went"
                rows={2}
                className="w-full mt-3 text-sm bg-white rounded-xl border border-amber-100 p-3 outline-none focus:border-amber-300 resize-none"
            />
            {err && <p className="text-xs text-red-500 mt-2">{err}</p>}
            <button
                onClick={handleSubmit}
                disabled={submitting}
                className="mt-3 px-4 py-2 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-[#004ac6] to-[#57dffe] shadow-sm disabled:opacity-50 transition-all"
            >
                {submitting ? 'Submitting…' : 'Submit Rating'}
            </button>
        </div>
    );
};

// ── Read-only rating display ──────────────────────────────
const RatingDisplay = ({ rating, review }) => (
    <div className="bg-blue-50/60 rounded-2xl p-5 border border-blue-100/60">
        <p className="text-xs font-bold text-blue-700 uppercase tracking-wide mb-2">Your Rating</p>
        <div className="flex items-center gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
                <span
                    key={star}
                    className={`material-symbols-outlined text-[20px] ${star <= rating ? 'text-amber-400' : 'text-slate-200'}`}
                    style={{ fontVariationSettings: star <= rating ? "'FILL' 1" : "'FILL' 0" }}
                >
                    star
                </span>
            ))}
        </div>
        {review && <p className="text-sm text-blue-800 mt-2 leading-relaxed italic">"{review}"</p>}
    </div>
);

// ── Detail Modal ───────────────────────────────────────────
const DetailModal = ({ req, onClose, helpers, onRated }) => {
    if (!req) return null;
    const {
        STATUS_STEPS, getStepIndex, getProgressWidth,
        isStepDone, isStepActive, getStepCircleClass,
        getStepLabelClass, formatDate,
    } = helpers;

    const stepIndex = getStepIndex(req.status);
    const progressWidth = getProgressWidth(stepIndex);
    const isCompleted = req.status?.toUpperCase() === 'COMPLETED';

    return (
        <>
            <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[60]" onClick={onClose} />
            <div className="fixed inset-0 z-[70] flex items-center justify-center p-4 pointer-events-none">
                <div
                    className="bg-white rounded-3xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto pointer-events-auto"
                    onClick={(e) => e.stopPropagation()}
                >
                    {/* Header */}
                    <div className="sticky top-0 bg-white/90 backdrop-blur-xl p-6 pb-4 border-b border-slate-100 rounded-t-3xl z-10 flex items-center justify-between">
                        <div>
                            <h2 className="text-lg font-extrabold text-slate-800">Request Details</h2>
                            <p className="text-xs text-slate-400 mt-0.5">#{req.id?.slice(-6).toUpperCase()}</p>
                        </div>
                        <button onClick={onClose} className="p-2 rounded-xl text-slate-400 hover:bg-slate-100 transition-all">
                            <span className="material-symbols-outlined text-[22px]">close</span>
                        </button>
                    </div>

                    <div className="p-6 space-y-6">
                        {/* Status Tracker */}
                        <div className="bg-slate-50 rounded-2xl p-5 border border-slate-100">
                            <p className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-5">Job Status</p>
                            <div className="relative">
                                <div className="absolute top-4 left-4 right-4 h-0.5 bg-slate-200 z-0" />
                                <div
                                    className="absolute top-4 left-4 h-0.5 bg-gradient-to-r from-[#004ac6] to-[#57dffe] z-0 transition-all duration-500"
                                    style={{ width: progressWidth }}
                                />
                                <div className="relative z-10 flex justify-between">
                                    {STATUS_STEPS.map((step, i) => {
                                        const done = isStepDone(stepIndex, i);
                                        const active = isStepActive(stepIndex, i);
                                        return (
                                            <div key={step} className="flex flex-col items-center gap-2 w-16">
                                                <div className={getStepCircleClass(done, active)}>
                                                    {done
                                                        ? <span className="material-symbols-outlined text-white text-[14px]">check</span>
                                                        : <span className="w-2 h-2 rounded-full bg-slate-300" />
                                                    }
                                                </div>
                                                <span className={getStepLabelClass(done)}>
                                                    {step === 'IN_PROGRESS' ? 'IN PROGRESS' : step}
                                                </span>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>

                        {/* Technician Info */}
                        {req.technician ? (
                            <div className="bg-blue-50/60 rounded-2xl p-5 border border-blue-100">
                                <p className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-3">Assigned Technician</p>
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#004ac6] to-[#57dffe] flex items-center justify-center text-white font-bold text-lg shrink-0">
                                        {req.technician.name?.charAt(0).toUpperCase()}
                                    </div>
                                    <div className="flex-1">
                                        <p className="font-bold text-slate-800">{req.technician.name}</p>
                                        <p className="text-xs text-slate-500 mt-0.5">{req.technician.technicianType}</p>
                                        <p className="text-xs text-slate-400 mt-0.5">{req.technician.city}, {req.technician.district}</p>
                                    </div>
                                    <a
                                        href={`tel:${req.technician.phone}`}
                                        className="p-2.5 bg-white rounded-xl border border-slate-200 text-[#004ac6] hover:bg-[#004ac6] hover:text-white transition-all shadow-sm"
                                    >
                                        <span className="material-symbols-outlined text-[20px]">call</span>
                                    </a>
                                </div>
                            </div>
                        ) : (
                            <div className="bg-amber-50 rounded-2xl p-5 border border-amber-100 flex items-center gap-3">
                                <span className="material-symbols-outlined text-amber-400 text-[28px]">hourglass_top</span>
                                <div>
                                    <p className="font-bold text-amber-700 text-sm">Waiting for Technician</p>
                                    <p className="text-xs text-amber-500 mt-0.5">A technician in your area will accept your request shortly.</p>
                                </div>
                            </div>
                        )}

                        {/* Rating */}
                        {isCompleted && req.technician && (
                            req.rating
                                ? <RatingDisplay rating={req.rating} review={req.review} />
                                : <RateTechnicianBlock req={req} onRated={onRated} />
                        )}

                        {/* Info Grid */}
                        <div className="grid grid-cols-2 gap-3">
                            <div className="bg-slate-50 rounded-xl p-4 border border-slate-100">
                                <span className="material-symbols-outlined text-[18px] text-slate-400 mb-1 block">category</span>
                                <p className="text-xs text-slate-400">Category</p>
                                <p className="text-sm font-bold text-slate-700 mt-0.5">{req.category}</p>
                            </div>
                            <div className="bg-slate-50 rounded-xl p-4 border border-slate-100">
                                <span className="material-symbols-outlined text-[18px] text-slate-400 mb-1 block">location_on</span>
                                <p className="text-xs text-slate-400">Location</p>
                                <p className="text-sm font-bold text-slate-700 mt-0.5 leading-snug">{req.location}</p>
                            </div>
                            <div className="bg-slate-50 rounded-xl p-4 border border-slate-100">
                                <span className="material-symbols-outlined text-[18px] text-slate-400 mb-1 block">calendar_today</span>
                                <p className="text-xs text-slate-400">Submitted</p>
                                <p className="text-sm font-bold text-slate-700 mt-0.5">{formatDate(req.createdAt)}</p>
                            </div>
                            <div className="bg-slate-50 rounded-xl p-4 border border-slate-100">
                                <span className="material-symbols-outlined text-[18px] text-slate-400 mb-1 block">priority_high</span>
                                <p className="text-xs text-slate-400">Urgency</p>
                                <p className={req.urgency?.toUpperCase() === 'EMERGENCY'
                                    ? 'text-sm font-bold mt-0.5 text-red-500'
                                    : 'text-sm font-bold mt-0.5 text-slate-700'}>
                                    {req.urgency}
                                </p>
                            </div>
                        </div>

                        {/* Description */}
                        <div className="bg-slate-50 rounded-xl p-4 border border-slate-100">
                            <p className="text-xs text-slate-400 mb-1">Description</p>
                            <p className="text-sm text-slate-700 leading-relaxed">{req.description}</p>
                        </div>

                        {/* Photos */}
                        {req.photoUrls && req.photoUrls.length > 0 && (
                            <div>
                                <p className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-3">Attached Photos</p>
                                <div className="flex gap-2 flex-wrap">
                                    {req.photoUrls.map((url, i) => (
                                        <img
                                            key={i}
                                            src={url}
                                            alt={`Photo ${i + 1}`}
                                            className="w-20 h-20 rounded-xl object-cover border border-slate-100 cursor-pointer hover:scale-105 transition-transform"
                                            onClick={() => window.open(url, '_blank')}
                                            onError={(e) => { e.target.parentElement.style.display = 'none'; }}
                                        />
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

// ── Main Component ─────────────────────────────────────────
const RequestHistory = () => {
    const {
        requests, loading, loadingMore, error,
        hasMore, sentinelRef,
        selectedRequest, setSelectedRequest,
        withOverride, handleRated, modalHelpers,
        getStatusStyles, getStatusIcon,
        getCategoryIcon, formatDate,
    } = useRequestHistory();

    if (loading) {
        return (<PageLoader/> );
    }

   if (error) {
  return (
    <ErrorPage
      message={error}
      onRetry={fetchNotifications}
    />
  );
}

    return (
        <main className="flex-1 p-8 overflow-y-auto bg-[#f8fafc] min-h-[80vh]">
            <DetailModal
                req={selectedRequest ? withOverride(selectedRequest) : null}
                onClose={() => setSelectedRequest(null)}
                helpers={modalHelpers}
                onRated={handleRated}
            />

            {/* Header */}
            <div className="max-w-5xl mx-auto mb-8">
                <div className="flex items-center gap-3 mb-2">
                    <div className="p-2.5 bg-gradient-to-br from-[#004ac6]/10 to-[#57dffe]/5 rounded-xl border border-[#004ac6]/10">
                        <span className="material-symbols-outlined text-[#004ac6] text-[24px]">history</span>
                    </div>
                    <div>
                        <h1 className="text-2xl font-extrabold text-slate-800 tracking-tight">Request History</h1>
                        <p className="text-sm text-slate-400">Track all your past and ongoing service requests.</p>
                    </div>
                </div>
            </div>

            {/* List */}
            <div className="max-w-5xl mx-auto space-y-4">
                {requests.length === 0 ? (
                    <div className="text-center py-12 bg-white rounded-2xl border border-slate-100">
                        <span className="material-symbols-outlined text-slate-300 text-[48px] mb-3">inbox</span>
                        <h3 className="font-semibold text-slate-600">No requests yet</h3>
                        <p className="text-sm text-slate-400 mt-1">When you create a service request, it will appear here.</p>
                    </div>
                ) : (
                    requests.map((raw) => {
                        const req = withOverride(raw);
                        const isPending = req.status?.toUpperCase() === 'PENDING';
                        const isCompleted = req.status?.toUpperCase() === 'COMPLETED';
                        const isEmergency = req.urgency?.toUpperCase() === 'EMERGENCY';
                        return (
                            <div
                                key={req.id}
                                className="bg-white rounded-2xl border border-slate-100/80 shadow-sm p-6 flex flex-col md:flex-row md:items-center justify-between gap-5 hover:shadow-md transition-all"
                            >
                                {/* Left */}
                                <div className="flex items-start gap-4 flex-1">
                                    <div className="w-12 h-12 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center shrink-0">
                                        <span className="material-symbols-outlined text-slate-500">
                                            {getCategoryIcon(req.category)}
                                        </span>
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2 flex-wrap mb-1">
                                            <span className="font-mono text-xs font-bold text-slate-400">
                                                #{req.id?.slice(-6).toUpperCase()}
                                            </span>
                                            <span className="text-[10px] font-bold uppercase text-slate-400 bg-slate-50 px-2 py-0.5 rounded-full">
                                                {req.category}
                                            </span>
                                            {isEmergency && (
                                                <span className="text-[10px] font-bold uppercase text-red-500 bg-red-50 px-2 py-0.5 rounded-full">
                                                    Emergency
                                                </span>
                                            )}
                                            {req.rating && (
                                                <span className="text-[10px] font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full flex items-center gap-0.5">
                                                    <span className="material-symbols-outlined text-[12px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                                                    {req.rating}.0
                                                </span>
                                            )}
                                        </div>
                                        <h3 className="font-semibold text-slate-700 text-sm mb-1 line-clamp-1">
                                            {req.description}
                                        </h3>
                                        <div className="flex items-center gap-1 text-xs text-slate-400">
                                            <span className="material-symbols-outlined text-[14px]">calendar_today</span>
                                            {formatDate(req.createdAt)}
                                        </div>
                                    </div>
                                </div>

                                {/* Right */}
                                <div className="flex items-center justify-between md:flex-col md:items-end gap-3 border-t md:border-t-0 border-slate-100 pt-4 md:pt-0 shrink-0">
                                    <div className={`px-3 py-1 rounded-full border text-xs font-bold flex items-center gap-1.5 capitalize ${getStatusStyles(req.status)}`}>
                                        <span className="material-symbols-outlined text-[14px]">{getStatusIcon(req.status)}</span>
                                        {req.status?.replace('_', ' ').toLowerCase()}
                                    </div>
                                    {isPending ? (
                                        <div className="flex items-center gap-1.5 text-xs text-amber-500 font-semibold">
                                            <span className="material-symbols-outlined text-[16px]">hourglass_top</span>
                                            Technician not assigned yet
                                        </div>
                                    ) : (
                                        <button
                                            onClick={() => setSelectedRequest(req)}
                                            className="text-sm font-semibold text-[#004ac6] hover:text-[#004ac6]/80 transition-colors flex items-center gap-1"
                                        >
                                            {isCompleted && !req.rating ? 'Rate Technician' : 'View Details'}
                                            <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                                        </button>
                                    )}
                                </div>
                            </div>
                        );
                    })
                )}

                {/* ── Sentinel — infinite scroll ── */}
                <div ref={sentinelRef} className="h-8 flex items-center justify-center mt-2">
                    {loadingMore && (
                        <div className="flex items-center gap-2 text-slate-400">
                            <div className="w-4 h-4 border-2 border-slate-300 border-t-[#004ac6] rounded-full animate-spin" />
                            <span className="text-xs font-medium">Loading more...</span>
                        </div>
                    )}
                </div>
            </div>
        </main>
    );
};

export default RequestHistory;