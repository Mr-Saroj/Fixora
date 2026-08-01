import React, { useState } from 'react';
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

  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);

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
        <div className="fixed inset-0 z-[70] flex items-end sm:items-center justify-center sm:p-4 pointer-events-none">
          <div
            className="bg-white sm:rounded-3xl rounded-t-3xl shadow-[0_25px_80px_-20px_rgba(0,0,0,0.3)] w-full sm:max-w-2xl max-h-[92vh] sm:max-h-[90vh] overflow-y-auto pointer-events-auto animate-[slideUp_0.3s_ease]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="sm:hidden flex justify-center pt-3 pb-1">
              <div className="w-10 h-1 rounded-full bg-slate-200" />
            </div>

            <div className="sticky top-0 bg-white/90 backdrop-blur-xl p-4 sm:p-6 pb-3 sm:pb-4 border-b border-slate-100 sm:rounded-t-3xl z-10">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3 min-w-0">
                  <div className={`w-11 h-11 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl ${cat.bg} ${cat.text} ${cat.border} border flex items-center justify-center shrink-0`}>
                    <span className="material-symbols-outlined text-[22px] sm:text-[28px]">{cat.icon}</span>
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className={`text-[11px] sm:text-xs font-bold px-2 sm:px-2.5 py-0.5 rounded-md ${cat.bg} ${cat.text} ${cat.border} border`}>
                        {cat.label}
                      </span>
                      {isEmergency ? (
                        <span className="text-[9px] sm:text-[10px] font-extrabold uppercase bg-red-500 text-white px-2 sm:px-2.5 py-0.5 rounded-md flex items-center gap-1 shadow-sm">
                          <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                          Emergency
                        </span>
                      ) : (
                        <span className="text-[9px] sm:text-[10px] font-bold uppercase bg-slate-100 text-slate-500 px-2 sm:px-2.5 py-0.5 rounded-md">
                          Standard
                        </span>
                      )}
                    </div>
                    <p className="text-[11px] sm:text-xs text-slate-400 mt-1 truncate">{formatId(req.id)} • {formatDate(req.createdAt)}</p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedRequest(null)}
                  className="p-1.5 sm:p-2 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-all shrink-0"
                >
                  <span className="material-symbols-outlined text-[20px] sm:text-[22px]">close</span>
                </button>
              </div>
            </div>

            <div className="p-4 sm:p-6 space-y-4 sm:space-y-5">
              <div className="bg-slate-50 rounded-xl sm:rounded-2xl p-4 sm:p-5 border border-slate-100">
                <div className="flex items-center gap-2 mb-2 sm:mb-3">
                  <span className="material-symbols-outlined text-[16px] sm:text-[18px] text-slate-400">description</span>
                  <span className="text-[11px] sm:text-xs font-bold text-slate-500 uppercase tracking-wide">Problem Description</span>
                </div>
                <p className="text-sm text-slate-600 leading-relaxed">{req.description || 'No description provided.'}</p>
              </div>

              <div className="grid grid-cols-2 gap-2.5 sm:gap-3">
                <div className="bg-slate-50 rounded-xl p-3 sm:p-4 border border-slate-100">
                  <span className="material-symbols-outlined text-[18px] sm:text-[20px] text-slate-400 mb-1 block">person</span>
                  <p className="text-[11px] sm:text-xs text-slate-400 font-medium">Customer</p>
                  <p className="text-sm font-bold text-slate-800 mt-0.5 truncate">{req.fullName || '—'}</p>
                  <p className="text-xs text-slate-500 mt-1 truncate">{req.mobileNumber || '—'}</p>
                </div>
                <div className="bg-slate-50 rounded-xl p-3 sm:p-4 border border-slate-100">
                  <span className="material-symbols-outlined text-[18px] sm:text-[20px] text-slate-400 mb-1 block">location_on</span>
                  <p className="text-[11px] sm:text-xs text-slate-400 font-medium">Location</p>
                  <p className="text-sm font-bold text-slate-800 mt-0.5 leading-snug">{req.location || '—'}</p>
                </div>
                <div className="bg-slate-50 rounded-xl p-3 sm:p-4 border border-slate-100">
                  <span className="material-symbols-outlined text-[18px] sm:text-[20px] text-slate-400 mb-1 block">category</span>
                  <p className="text-[11px] sm:text-xs text-slate-400 font-medium">Category</p>
                  <p className="text-sm font-bold text-slate-800 mt-0.5">{cat.label}</p>
                </div>
                <div className="bg-slate-50 rounded-xl p-3 sm:p-4 border border-slate-100">
                  <span className="material-symbols-outlined text-[18px] sm:text-[20px] text-slate-400 mb-1 block">schedule</span>
                  <p className="text-[11px] sm:text-xs text-slate-400 font-medium">Submitted</p>
                  <p className="text-sm font-bold text-slate-800 mt-0.5">{formatDate(req.createdAt)}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 bg-blue-50/60 rounded-xl border border-blue-100/60">
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

              {req.photoUrls && req.photoUrls.length > 0 && (
                <div>
                  <p className="text-[11px] sm:text-xs font-bold text-slate-500 uppercase tracking-wide mb-2 sm:mb-3 flex items-center gap-2">
                    <span className="material-symbols-outlined text-[14px] sm:text-[16px]">photo_library</span>
                    Attached Photos ({req.photoUrls.length})
                  </p>
                  <div className="flex gap-2 overflow-x-auto sm:overflow-visible sm:flex-wrap pb-1 sm:pb-0 -mx-1 px-1 sm:mx-0 sm:px-0">
                    {req.photoUrls.map((url, i) => (
                      <img
                        key={i}
                        src={url}
                        alt={`Photo ${i + 1}`}
                        className="w-20 h-20 rounded-xl object-cover border border-slate-100 cursor-pointer hover:scale-105 transition-transform shrink-0 sm:shrink"
                        onClick={() => window.open(url, '_blank')}
                        onError={(e) => { e.target.parentElement.style.display = 'none'; }}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="sticky bottom-0 bg-white/90 backdrop-blur-xl p-4 sm:p-6 pt-3 sm:pt-4 border-t border-slate-100">
              <div className="flex gap-2.5 sm:gap-3">
                <button
                  onClick={() => handleDecline(req.id)}
                  className="flex-1 py-3 sm:py-3.5 rounded-xl text-sm font-bold text-slate-500 bg-slate-50 border border-slate-200 hover:bg-red-50 hover:text-red-600 hover:border-red-200 transition-all flex items-center justify-center gap-2"
                >
                  <span className="material-symbols-outlined text-[18px]">close</span>
                  Decline
                </button>
                <button
                  onClick={() => handleAccept(req.id)}
                  className="flex-1 py-3 sm:py-3.5 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-[#004ac6] to-[#57dffe] shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2"
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
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="flex flex-col items-center gap-4">
          <div className="relative w-12 h-12">
            <div className="absolute inset-0 rounded-full border-4 border-[#004ac6]/10" />
            <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-[#004ac6] animate-spin" />
          </div>
          <p className="text-sm font-medium text-slate-400">Loading requests…</p>
        </div>
      </div>
    );
  }

  // ── Error ──────────────────────────────────────────────────
  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[60vh] p-4">
        <div className="text-center bg-white p-8 sm:p-10 rounded-3xl border border-red-100 shadow-sm max-w-sm w-full">
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
      </div>
    );
  }

  // ── Main ───────────────────────────────────────────────────
  return (
    <div className="space-y-4 sm:space-y-6">
      <RequestDetailModal />

      {/* ═══════════ MOBILE HEADER ═══════════ */}
      <div className="sm:hidden mb-4">
        <div className="flex items-center justify-between gap-3">
          <div className="min-w-0">
            <h1 className="text-lg font-extrabold text-slate-800 tracking-tight">Customer Requests</h1>
            <p className="text-xs text-slate-400 mt-0.5 truncate">Matching your skill category</p>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => { setMobileSearchOpen(!mobileSearchOpen); setSearchQuery(''); }}
              className="p-2.5 rounded-xl bg-white border border-slate-200 text-slate-500 hover:text-[#004ac6] hover:border-[#004ac6]/20 transition-all shadow-sm"
            >
              <span className="material-symbols-outlined text-[20px]">{mobileSearchOpen ? 'close' : 'search'}</span>
            </button>
            <button
              onClick={() => window.location.reload()}
              className="p-2.5 rounded-xl bg-white border border-slate-200 text-slate-500 hover:text-[#004ac6] hover:border-[#004ac6]/20 transition-all shadow-sm"
            >
              <span className="material-symbols-outlined text-[20px]">refresh</span>
            </button>
          </div>
        </div>
      </div>

      {/* ═══════════ DESKTOP HEADER — EXACT ORIGINAL ═══════════ */}
      <div className="hidden sm:block mb-8">
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

      {/* ═══════════ MOBILE STATS ═══════════ */}
      <div className="sm:hidden flex gap-2 overflow-x-auto pb-1 -mx-1.5 px-1.5 mb-4">
        <div className="flex items-center gap-2.5 bg-white px-3 py-2.5 rounded-xl border border-slate-100 shadow-sm shrink-0 min-w-0">
          <div className="w-9 h-9 bg-blue-50 rounded-lg flex items-center justify-center text-blue-600 shrink-0">
            <span className="material-symbols-outlined text-[20px]">inbox</span>
          </div>
          <div className="min-w-0">
            <p className="text-lg font-extrabold text-slate-800 leading-none">{totalCount}</p>
            <p className="text-[10px] text-slate-400 font-medium mt-0.5">Total</p>
          </div>
        </div>
        <div className="flex items-center gap-2.5 bg-white px-3 py-2.5 rounded-xl border border-red-100/80 shadow-sm shrink-0 min-w-0">
          <div className="w-9 h-9 bg-red-50 rounded-lg flex items-center justify-center text-red-500 relative shrink-0">
            <span className="material-symbols-outlined text-[20px]">warning</span>
            {emergencyCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-[9px] font-bold rounded-full flex items-center justify-center animate-pulse">
                {emergencyCount}
              </span>
            )}
          </div>
          <div className="min-w-0">
            <p className="text-lg font-extrabold text-red-600 leading-none">{emergencyCount}</p>
            <p className="text-[10px] text-slate-400 font-medium mt-0.5">Emergency</p>
          </div>
        </div>
        <div className="flex items-center gap-2.5 bg-white px-3 py-2.5 rounded-xl border border-slate-100 shadow-sm shrink-0 min-w-0">
          <div className="w-9 h-9 bg-emerald-50 rounded-lg flex items-center justify-center text-emerald-600 shrink-0">
            <span className="material-symbols-outlined text-[20px]">schedule</span>
          </div>
          <div className="min-w-0">
            <p className="text-lg font-extrabold text-slate-800 leading-none">{standardCount}</p>
            <p className="text-[10px] text-slate-400 font-medium mt-0.5">Standard</p>
          </div>
        </div>
      </div>

      {/* ═══════════ DESKTOP STATS — EXACT ORIGINAL ═══════════ */}
      <div className="hidden sm:grid grid-cols-3 gap-4 mb-8">
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

      {/* ═══════════ MOBILE SEARCH + SORT + FILTERS ═══════════ */}
      <div className="sm:hidden bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden mb-4">
        <div
          className={`overflow-hidden transition-all duration-300 ${
            mobileSearchOpen ? 'max-h-20 opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="p-3 pb-0">
            <div className="flex items-center bg-slate-50 rounded-lg px-3 py-2.5 border border-slate-100">
              <span className="material-symbols-outlined text-slate-400 text-[18px] mr-2">search</span>
              <input
                type="text"
                placeholder="Search name, location, category..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-transparent outline-none text-sm text-slate-600 w-full placeholder-slate-400"
                autoFocus={mobileSearchOpen}
              />
              {searchQuery && (
                <button onClick={() => setSearchQuery('')} className="p-0.5 rounded text-slate-400 hover:text-slate-600 transition-all">
                  <span className="material-symbols-outlined text-[16px]">close</span>
                </button>
              )}
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between px-3 py-2.5">
          {searchQuery && (
            <span className="text-xs text-slate-400 truncate mr-2">
              "{searchQuery}" — {filteredRequests.length} result{filteredRequests.length !== 1 ? 's' : ''}
            </span>
          )}
          <div className="relative ml-auto">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="appearance-none bg-slate-50 rounded-lg px-3 py-1.5 pr-8 border border-slate-100 text-xs text-slate-600 font-medium cursor-pointer outline-none"
            >
              {SORT_OPTIONS.map(opt => (
                <option key={opt.key} value={opt.key}>{opt.label}</option>
              ))}
            </select>
            <span className="material-symbols-outlined text-[14px] text-slate-400 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none">unfold_more</span>
          </div>
        </div>

        <div className="flex gap-1.5 px-3 pb-3 overflow-x-auto">
          {FILTERS.map(filter => {
            const count = filter.key === 'all' ? totalCount : filter.key === 'emergency' ? emergencyCount : standardCount;
            return (
              <button
                key={filter.key}
                onClick={() => setActiveFilter(filter.key)}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 whitespace-nowrap shrink-0
                  ${activeFilter === filter.key
                    ? 'bg-[#004ac6] text-white shadow-md shadow-[#004ac6]/20'
                    : filter.key === 'emergency'
                      ? 'bg-red-50 text-red-500 border border-red-100 hover:bg-red-100'
                      : 'bg-slate-50 text-slate-500 border border-slate-100 hover:bg-slate-100'
                  }`}
              >
                <span className="material-symbols-outlined text-[16px]">{filter.icon}</span>
                <span className="hidden xs:inline">{filter.label}</span>
                <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-md ${activeFilter === filter.key ? 'bg-white/20 text-white' : 'bg-slate-200/70 text-slate-500'}`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* ═══════════ DESKTOP SEARCH + SORT + FILTERS — EXACT ORIGINAL ═══════════ */}
      <div className="hidden sm:block bg-white rounded-2xl border border-slate-100 shadow-sm p-4 mb-6">
        <div className="flex flex-col sm:flex-row gap-4">
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

      {/* ═══════════ REQUEST LIST ═══════════ */}
      {filteredRequests.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-10 sm:p-16 text-center">
          <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-4 bg-slate-50 rounded-2xl flex items-center justify-center">
            <span className="material-symbols-outlined text-[32px] sm:text-[40px] text-slate-300">search_off</span>
          </div>
          <h3 className="text-base sm:text-lg font-bold text-slate-700">No requests found</h3>
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
        <div className="space-y-2.5 sm:space-y-4">
          {filteredRequests.map((req) => {
            const cat = getCat(req.category);
            const isEmergency = req.urgency?.toLowerCase() === 'emergency';

            return (
              <div
                key={req.id}
                className={`bg-white rounded-xl sm:rounded-2xl border shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 overflow-hidden group
                  ${isEmergency ? 'border-red-200/80' : 'border-slate-100/80'}`}
              >
                {isEmergency && (
                  <div className="h-0.5 sm:h-1 bg-gradient-to-r from-red-500 via-red-400 to-orange-400" />
                )}

                <div className="px-5 py-3 sm:p-5">

                  {/* ═══════ MOBILE CARD ═══════ */}
                  <div className="sm:hidden space-y-2.5">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${cat.bg} ${cat.text} ${cat.border} border flex items-center gap-1`}>
                        <span className="material-symbols-outlined text-[12px]">{cat.icon}</span>
                        {cat.label}
                      </span>
                      {isEmergency ? (
                        <span className="text-[9px] font-extrabold uppercase bg-red-500 text-white px-2 py-0.5 rounded-md flex items-center gap-1 shadow-sm">
                          <span className="relative flex h-1.5 w-1.5">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75" />
                            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-white" />
                          </span>
                          Emergency
                        </span>
                      ) : (
                        <span className="text-[9px] font-bold uppercase bg-slate-100 text-slate-500 px-2 py-0.5 rounded-md">
                          Standard
                        </span>
                      )}
                      <span className="text-[10px] text-slate-400 ml-auto">{formatId(req.id)}</span>
                    </div>

                    <p
                      className="font-bold text-slate-800 text-sm leading-snug line-clamp-2 group-hover:text-[#004ac6] transition-colors cursor-pointer"
                      onClick={() => setSelectedRequest(req)}
                    >
                      {req.description || 'No description provided.'}
                    </p>

                    <div className="flex items-center gap-2 text-xs text-slate-500">
                      <span className="flex items-center gap-1 font-medium text-slate-700">
                        <span className="material-symbols-outlined text-[14px] text-[#004ac6]">person</span>
                        {req.fullName || '—'}
                      </span>
                      <span className="text-slate-300">•</span>
                      <span className="flex items-center gap-1 truncate">
                        <span className="material-symbols-outlined text-[14px] text-red-400">location_on</span>
                        <span className="truncate">{req.location || '—'}</span>
                      </span>
                    </div>

                    <div className="flex items-center gap-2 text-[11px] text-slate-400">
                      <span className="flex items-center gap-0.5">
                        <span className="material-symbols-outlined text-[13px]">schedule</span>
                        {formatDate(req.createdAt)}
                      </span>
                      {req.photoUrls && req.photoUrls.length > 0 && (
                        <>
                          <span className="text-slate-300">•</span>
                          <span className="flex items-center gap-0.5">
                            <span className="material-symbols-outlined text-[13px]">photo_library</span>
                            {req.photoUrls.length} photo{req.photoUrls.length !== 1 ? 's' : ''}
                          </span>
                        </>
                      )}
                    </div>

                    <div className="flex gap-2 pt-1">
                      <button
                        onClick={() => setSelectedRequest(req)}
                        className="flex-1 py-2.5 rounded-lg text-xs font-bold text-[#004ac6] bg-blue-50 border border-blue-100 active:bg-[#004ac6] active:text-white transition-all flex items-center justify-center gap-1"
                      >
                        <span className="material-symbols-outlined text-[15px]">visibility</span>
                        Details
                      </button>
                      <button
                        onClick={() => handleDecline(req.id)}
                        className="py-2.5 px-4 rounded-lg text-xs font-bold text-slate-400 bg-slate-50 border border-slate-200 active:bg-red-50 active:text-red-600 transition-all"
                      >
                        Decline
                      </button>
                      <button
                        onClick={() => handleAccept(req.id)}
                        className="flex-[1.5] py-2.5 rounded-lg text-xs font-bold text-white bg-gradient-to-r from-[#004ac6] to-[#57dffe] shadow-sm active:shadow-md transition-all flex items-center justify-center gap-1"
                      >
                        <span className="material-symbols-outlined text-[15px]">check_circle</span>
                        Accept
                      </button>
                    </div>
                  </div>

                  {/* ═══════ DESKTOP CARD — EXACT ORIGINAL ═══════ */}
                  <div className="hidden sm:flex flex-col lg:flex-row lg:items-center gap-4">
                    <div className="flex-1 min-w-0">
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

                      <p
                        className="font-bold text-slate-800 text-[15px] leading-snug mb-2 line-clamp-2 group-hover:text-[#004ac6] transition-colors cursor-pointer"
                        onClick={() => setSelectedRequest(req)}
                      >
                        {req.description || 'No description provided.'}
                      </p>

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

      <div className="h-8 sm:h-12" />

      <style>{`
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes slideUp { from { opacity: 0; transform: translateY(30px) scale(0.97); } to { opacity: 1; transform: translateY(0) scale(1); } }
      `}</style>
    </div>
  );
};

export default CustomerRequest;