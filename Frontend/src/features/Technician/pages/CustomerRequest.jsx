import React from 'react';
import { useCustomerRequests } from '../hooks/useCustomerRequests';
import {
  formatDate,
  formatId,
  getCat,
  getInitials,
  FILTERS,
  SORT_OPTIONS,
} from '../utils/requestHelpers';

const CustomerRequest = () => {
  const {
    activeFilter,
    searchQuery,
    sortBy,
    selectedRequest,
    loading,
    error,
    filteredRequests,
    totalCount,
    emergencyCount,
    standardCount,
    setActiveFilter,
    setSearchQuery,
    setSortBy,
    setSelectedRequest,
    handleAccept,
    handleDecline,
  } = useCustomerRequests();

  // ─── DETAIL MODAL ──────────────────────────────────────────
  const RequestDetailModal = () => {
    if (!selectedRequest) return null;
    const req = selectedRequest;
    const cat = getCat(req.category);
    const isEmergency = req.urgency?.toLowerCase() === 'emergency';

    return (
      <>
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[60] animate-[fadeIn_0.2s_ease]"
          onClick={() => setSelectedRequest(null)}
        />
        <div className="fixed inset-0 z-[70] flex items-center justify-center p-4 pointer-events-none">
          <div
            className="bg-white rounded-3xl shadow-[0_25px_80px_-20px_rgba(0,0,0,0.3)] w-full max-w-2xl max-h-[90vh] overflow-y-auto pointer-events-auto animate-[slideUp_0.3s_ease]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="sticky top-0 bg-white/90 backdrop-blur-xl p-6 pb-4 border-b border-slate-100 rounded-t-3xl z-10">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className={`w-14 h-14 rounded-2xl ${cat.bg} ${cat.text} ${cat.border} border flex items-center justify-center`}>
                    <span className="material-symbols-outlined text-[28px]">{cat.icon}</span>
                  </div>
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className={`text-xs font-bold px-2.5 py-0.5 rounded-md ${cat.bg} ${cat.text} ${cat.border} border`}>
                        {cat.label}
                      </span>
                      {isEmergency ? (
                        <span className="text-[10px] font-extrabold uppercase bg-red-500 text-white px-2.5 py-0.5 rounded-md flex items-center gap-1 shadow-sm">
                          <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                          Emergency
                        </span>
                      ) : (
                        <span className="text-[10px] font-bold uppercase bg-slate-100 text-slate-500 px-2.5 py-0.5 rounded-md">
                          Standard
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-400 mt-1">{formatId(req.id)} • {formatDate(req.createdAt)}</p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedRequest(null)}
                  className="p-2 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-all"
                >
                  <span className="material-symbols-outlined text-[22px]">close</span>
                </button>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-5">
              {/* Description */}
              <div className="bg-slate-50 rounded-2xl p-5 border border-slate-100">
                <div className="flex items-center gap-2 mb-3">
                  <span className="material-symbols-outlined text-[18px] text-slate-400">description</span>
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wide">Problem Description</span>
                </div>
                <p className="text-sm text-slate-600 leading-relaxed">{req.description || 'No description provided.'}</p>
              </div>

              {/* Info Grid */}
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-slate-50 rounded-xl p-4 border border-slate-100">
                  <span className="material-symbols-outlined text-[20px] text-slate-400 mb-1 block">person</span>
                  <p className="text-xs text-slate-400 font-medium">Customer</p>
                  <p className="text-sm font-bold text-slate-800 mt-0.5">{req.fullName || '—'}</p>
                  <p className="text-xs text-slate-500 mt-1">{req.mobileNumber || '—'}</p>
                </div>
                <div className="bg-slate-50 rounded-xl p-4 border border-slate-100">
                  <span className="material-symbols-outlined text-[20px] text-slate-400 mb-1 block">location_on</span>
                  <p className="text-xs text-slate-400 font-medium">Location</p>
                  <p className="text-sm font-bold text-slate-800 mt-0.5 leading-snug">{req.location || '—'}</p>
                </div>
                <div className="bg-slate-50 rounded-xl p-4 border border-slate-100">
                  <span className="material-symbols-outlined text-[20px] text-slate-400 mb-1 block">category</span>
                  <p className="text-xs text-slate-400 font-medium">Category</p>
                  <p className="text-sm font-bold text-slate-800 mt-0.5">{cat.label}</p>
                </div>
                <div className="bg-slate-50 rounded-xl p-4 border border-slate-100">
                  <span className="material-symbols-outlined text-[20px] text-slate-400 mb-1 block">schedule</span>
                  <p className="text-xs text-slate-400 font-medium">Submitted</p>
                  <p className="text-sm font-bold text-slate-800 mt-0.5">{formatDate(req.createdAt)}</p>
                </div>
              </div>

              {/* Customer row */}
              <div className="flex items-center gap-4 p-4 bg-blue-50/60 rounded-xl border border-blue-100/60">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#004ac6] to-[#57dffe] flex items-center justify-center text-white font-bold text-sm shrink-0">
                  {getInitials(req.fullName)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-slate-800">{req.fullName || 'Customer'}</p>
                  <p className="text-xs text-slate-400 mt-0.5">{req.mobileNumber || 'No phone'}</p>
                </div>
                <div className="flex gap-2">
                  <a
                    href={`tel:${req.mobileNumber}`}
                    className="p-2.5 bg-white rounded-xl border border-slate-200 text-[#004ac6] hover:bg-[#004ac6] hover:text-white transition-all shadow-sm"
                    title="Call"
                  >
                    <span className="material-symbols-outlined text-[20px]">call</span>
                  </a>
                </div>
              </div>

              {/* Photos */}
              {req.photoUrls && req.photoUrls.length > 0 && (
                <div>
                  <p className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-3 flex items-center gap-2">
                    <span className="material-symbols-outlined text-[16px]">photo_library</span>
                    Attached Photos ({req.photoUrls.length})
                  </p>
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

            {/* Modal Footer */}
            <div className="sticky bottom-0 bg-white/90 backdrop-blur-xl p-6 pt-4 border-t border-slate-100 rounded-b-3xl">
              <div className="flex gap-3">
                <button
                  onClick={() => handleDecline(req.id)}
                  className="flex-1 py-3.5 rounded-xl text-sm font-bold text-slate-500 bg-slate-50 border border-slate-200 hover:bg-red-50 hover:text-red-600 hover:border-red-200 transition-all flex items-center justify-center gap-2"
                >
                  <span className="material-symbols-outlined text-[18px]">close</span>
                  Decline
                </button>
                <button
                  onClick={() => handleAccept(req.id)}
                  className="flex-1 py-3.5 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-[#004ac6] to-[#57dffe] shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2"
                >
                  <span className="material-symbols-outlined text-[18px]">check_circle</span>
                  Accept Job
                </button>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  };

  // ── Loading ────────────────────────────────────────────────
  if (loading) {
    return (
      <main className="flex-1 p-8 bg-[#f8fafc] min-h-[80vh] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="relative w-12 h-12">
            <div className="absolute inset-0 rounded-full border-4 border-[#004ac6]/10" />
            <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-[#004ac6] animate-spin" />
          </div>
          <p className="text-sm font-medium text-slate-400">Loading requests…</p>
        </div>
      </main>
    );
  }

  // ── Error ──────────────────────────────────────────────────
  if (error) {
    return (
      <main className="flex-1 p-8 bg-[#f8fafc] min-h-[80vh] flex items-center justify-center">
        <div className="text-center bg-white p-10 rounded-3xl border border-red-100 shadow-sm max-w-sm w-full">
          <div className="w-16 h-16 rounded-2xl bg-red-50 flex items-center justify-center mx-auto mb-4">
            <span className="material-symbols-outlined text-red-400 text-[32px]">wifi_off</span>
          </div>
          <h3 className="font-bold text-slate-700 mb-1">Couldn't load requests</h3>
          <p className="text-sm text-slate-400 mb-5">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-5 py-2.5 bg-[#004ac6] text-white text-sm rounded-xl font-semibold hover:bg-[#003aa0] transition-colors"
          >
            Try again
          </button>
        </div>
      </main>
    );
  }

  // ── Main ───────────────────────────────────────────────────
  return (
    <main className="flex-1 p-8 overflow-y-auto bg-[#f8fafc]">
      <RequestDetailModal />

      {/* Header */}
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-extrabold text-slate-800 tracking-tight">Customer Requests</h1>
            <p className="text-sm text-slate-400 mt-1">Showing requests matching your skill category</p>
          </div>
          <button
            onClick={() => window.location.reload()}
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm font-semibold text-slate-600 hover:bg-slate-50 transition-all shadow-sm self-start"
          >
            <span className="material-symbols-outlined text-[18px]">refresh</span>
            Refresh
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600">
            <span className="material-symbols-outlined text-[24px]">inbox</span>
          </div>
          <div>
            <p className="text-2xl font-extrabold text-slate-800">{totalCount}</p>
            <p className="text-xs text-slate-400 font-medium">Total Requests</p>
          </div>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-red-100/80 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 bg-red-50 rounded-xl flex items-center justify-center text-red-500 relative">
            <span className="material-symbols-outlined text-[24px]">warning</span>
            {emergencyCount > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center animate-pulse">
                {emergencyCount}
              </span>
            )}
          </div>
          <div>
            <p className="text-2xl font-extrabold text-red-600">{emergencyCount}</p>
            <p className="text-xs text-slate-400 font-medium">Emergency</p>
          </div>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center text-emerald-600">
            <span className="material-symbols-outlined text-[24px]">schedule</span>
          </div>
          <div>
            <p className="text-2xl font-extrabold text-slate-800">{standardCount}</p>
            <p className="text-xs text-slate-400 font-medium">Standard</p>
          </div>
        </div>
      </div>

      {/* Search + Sort + Filters */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-4 mb-6">
        <div className="flex flex-col sm:flex-row gap-4">
          {/* Search */}
          <div className="flex-1 flex items-center bg-slate-50 rounded-xl px-4 py-3 border border-slate-100">
            <span className="material-symbols-outlined text-slate-400 text-[20px] mr-3">search</span>
            <input
              type="text"
              placeholder="Search by name, description, category, or location..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-transparent outline-none text-sm text-slate-600 w-full placeholder-slate-400"
            />
            {searchQuery && (
              <button onClick={() => setSearchQuery('')} className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-200 transition-all">
                <span className="material-symbols-outlined text-[18px]">close</span>
              </button>
            )}
          </div>

          {/* Sort */}
          <div className="relative">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="appearance-none bg-slate-50 rounded-xl px-4 py-3 pr-10 border border-slate-100 text-sm text-slate-600 font-medium cursor-pointer outline-none focus:border-[#004ac6]/30 transition-all w-full sm:w-auto"
            >
              {SORT_OPTIONS.map(opt => (
                <option key={opt.key} value={opt.key}>{opt.label}</option>
              ))}
            </select>
            <span className="material-symbols-outlined text-[18px] text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">unfold_more</span>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex gap-2 mt-4 flex-wrap">
          {FILTERS.map(filter => {
            const count = filter.key === 'all' ? totalCount : filter.key === 'emergency' ? emergencyCount : standardCount;
            return (
              <button
                key={filter.key}
                onClick={() => setActiveFilter(filter.key)}
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200
                  ${activeFilter === filter.key
                    ? 'bg-[#004ac6] text-white shadow-md shadow-[#004ac6]/20'
                    : filter.key === 'emergency'
                      ? 'bg-red-50 text-red-500 border border-red-100 hover:bg-red-100'
                      : 'bg-slate-50 text-slate-500 border border-slate-100 hover:bg-slate-100'
                  }`}
              >
                <span className="material-symbols-outlined text-[18px]">{filter.icon}</span>
                {filter.label}
                <span className={`text-[11px] font-bold px-1.5 py-0.5 rounded-md ${activeFilter === filter.key ? 'bg-white/20 text-white' : 'bg-slate-200/70 text-slate-500'}`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Request List */}
      {filteredRequests.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-16 text-center">
          <div className="w-20 h-20 mx-auto mb-4 bg-slate-50 rounded-2xl flex items-center justify-center">
            <span className="material-symbols-outlined text-[40px] text-slate-300">search_off</span>
          </div>
          <h3 className="text-lg font-bold text-slate-700">No requests found</h3>
          <p className="text-sm text-slate-400 mt-1 max-w-sm mx-auto">
            {searchQuery
              ? `No results for "${searchQuery}".`
              : 'No pending requests in your category right now. Check back soon.'}
          </p>
          {(searchQuery || activeFilter !== 'all') && (
            <button
              onClick={() => { setSearchQuery(''); setActiveFilter('all'); }}
              className="mt-4 text-sm font-semibold text-[#004ac6] hover:underline"
            >
              Clear filters
            </button>
          )}
        </div>
      ) : (
        <div className="space-y-4">
          {filteredRequests.map((req) => {
            const cat = getCat(req.category);
            const isEmergency = req.urgency?.toLowerCase() === 'emergency';

            return (
              <div
                key={req.id}
                className={`bg-white rounded-2xl border shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 overflow-hidden group
                  ${isEmergency ? 'border-red-200/80' : 'border-slate-100/80'}`}
              >
                {/* Emergency bar */}
                {isEmergency && (
                  <div className="h-1 bg-gradient-to-r from-red-500 via-red-400 to-orange-400" />
                )}

                <div className="p-5">
                  <div className="flex flex-col lg:flex-row lg:items-center gap-4">

                    {/* Left */}
                    <div className="flex-1 min-w-0">
                      {/* Badges */}
                      <div className="flex items-center gap-2 flex-wrap mb-3">
                        <span className={`text-xs font-bold px-2.5 py-1 rounded-lg ${cat.bg} ${cat.text} ${cat.border} border flex items-center gap-1`}>
                          <span className="material-symbols-outlined text-[14px]">{cat.icon}</span>
                          {cat.label}
                        </span>

                        {isEmergency ? (
                          <span className="text-[10px] font-extrabold uppercase bg-red-500 text-white px-2.5 py-1 rounded-lg flex items-center gap-1.5 shadow-sm">
                            <span className="relative flex h-2 w-2">
                              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75" />
                              <span className="relative inline-flex rounded-full h-2 w-2 bg-white" />
                            </span>
                            Emergency
                          </span>
                        ) : (
                          <span className="text-[10px] font-bold uppercase bg-slate-100 text-slate-500 px-2.5 py-1 rounded-lg">
                            Standard
                          </span>
                        )}

                        <span className="text-xs text-slate-400 ml-auto lg:ml-0">{formatId(req.id)}</span>
                      </div>

                      {/* Description */}
                      <p
                        className="font-bold text-slate-800 text-[15px] leading-snug mb-2 line-clamp-2 group-hover:text-[#004ac6] transition-colors cursor-pointer"
                        onClick={() => setSelectedRequest(req)}
                      >
                        {req.description || 'No description provided.'}
                      </p>

                      {/* Meta */}
                      <div className="flex items-center gap-3 flex-wrap text-xs text-slate-500">
                        <span className="flex items-center gap-1 font-medium text-slate-600">
                          <span className="material-symbols-outlined text-[14px]">person</span>
                          {req.fullName || '—'}
                        </span>
                        <span className="text-slate-300">•</span>
                        <span className="flex items-center gap-1">
                          <span className="material-symbols-outlined text-[14px] text-red-400">location_on</span>
                          {req.location || '—'}
                        </span>
                        <span className="text-slate-300">•</span>
                        <span className="flex items-center gap-1">
                          <span className="material-symbols-outlined text-[14px]">schedule</span>
                          {formatDate(req.createdAt)}
                        </span>
                        {req.photoUrls && req.photoUrls.length > 0 && (
                          <>
                            <span className="text-slate-300">•</span>
                            <span className="flex items-center gap-1">
                              <span className="material-symbols-outlined text-[14px]">photo_library</span>
                              {req.photoUrls.length} photo{req.photoUrls.length !== 1 ? 's' : ''}
                            </span>
                          </>
                        )}
                      </div>
                    </div>

                    {/* Right: Actions */}
                    <div className="flex lg:flex-col items-center lg:items-end gap-3 lg:min-w-[160px]">
                      <div className="flex gap-2 w-full lg:w-auto">
                        <button
                          onClick={() => setSelectedRequest(req)}
                          className="flex-1 lg:flex-none px-4 py-2.5 rounded-xl text-xs font-bold text-[#004ac6] bg-blue-50 border border-blue-100 hover:bg-[#004ac6] hover:text-white hover:border-[#004ac6] transition-all flex items-center justify-center gap-1.5"
                        >
                          <span className="material-symbols-outlined text-[16px]">visibility</span>
                          View
                        </button>
                        <button
                          onClick={() => handleDecline(req.id)}
                          className="flex-1 lg:flex-none px-4 py-2.5 rounded-xl text-xs font-bold text-slate-500 bg-slate-50 border border-slate-200 hover:bg-red-50 hover:text-red-600 hover:border-red-200 transition-all"
                        >
                          Decline
                        </button>
                        <button
                          onClick={() => handleAccept(req.id)}
                          className="flex-1 lg:flex-none px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-[#004ac6] to-[#57dffe] shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all"
                        >
                          Accept
                        </button>
                      </div>
                    </div>

                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      <div className="h-12" />

      <style>{`
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes slideUp { from { opacity: 0; transform: translateY(30px) scale(0.97); } to { opacity: 1; transform: translateY(0) scale(1); } }
      `}</style>
    </main>
  );
};

export default CustomerRequest;