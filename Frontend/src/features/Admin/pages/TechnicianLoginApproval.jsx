import React, { useState } from 'react';
import useLoginApproval from '../hooks/useLoginApproval';
import { typeIcon } from '../utils/technicianListUtils';
import PageLoader from '../../../components/common/PageLoader';
import ErrorPage from '../../../components/common/ErrorPage';

/* ─── Toast ───────────────────────────────────────────────────────── */
const Toast = ({ toasts }) => (
  <div className="fixed top-5 right-5 z-[60] flex flex-col gap-2 pointer-events-none">
    {toasts.map((t) => (
      <div
        key={t.id}
        className={`flex items-center gap-3 px-4 py-3 rounded-xl shadow-lg text-sm font-semibold text-white
          ${t.type === 'success' ? 'bg-emerald-500' : t.type === 'error' ? 'bg-red-500' : 'bg-yellow-500'}`}
      >
        <span className="material-symbols-outlined text-[18px]">
          {t.type === 'success' ? 'check_circle' : t.type === 'error' ? 'error' : 'warning'}
        </span>
        {t.message}
      </div>
    ))}
  </div>
);

/* ─── Detail Modal ────────────────────────────────────────────────── */
const DetailModal = ({ tech, onClose, onApprove }) => {
  const [loading, setLoading] = useState(false);

  const handleApprove = async () => {
    setLoading(true);
    await onApprove(tech.id);
    setLoading(false);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative bg-white w-full max-w-md rounded-2xl shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Gradient header */}
        <div className="bg-gradient-to-r from-[#004ac6] to-[#57dffe] px-6 pt-6 pb-16 relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center text-white transition-colors"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
          <span className="text-xs font-bold tracking-widest text-white/70 uppercase">
            Technician Profile
          </span>
        </div>

        {/* Avatar */}
        <div className="px-6 relative -mt-12 flex items-end gap-4 mb-4">
          {tech.profilePhotoUrl ? (
            <img
              src={tech.profilePhotoUrl}
              alt={tech.name}
              className="w-20 h-20 rounded-2xl object-cover shadow-lg border-4 border-white shrink-0"
            />
          ) : (
            <div className="w-20 h-20 rounded-2xl bg-white shadow-lg border-4 border-white flex items-center justify-center text-3xl font-extrabold text-[#004ac6] shrink-0">
              {tech.name?.charAt(0).toUpperCase()}
            </div>
          )}
          <div className="pb-1 min-w-0">
            <h2 className="text-lg font-extrabold text-slate-800 leading-tight truncate">
              {tech.name}
            </h2>
            <div className="flex items-center gap-1.5 mt-0.5">
              <span className="material-symbols-outlined text-[14px] text-[#004ac6]">
                {typeIcon(tech.technicianType)}
              </span>
              <span className="text-xs text-slate-500 font-medium">
                {tech.technicianType}
              </span>
            </div>
          </div>
        </div>

        {/* Status badge */}
        <div className="px-6 mb-4">
          <span className="inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-full border bg-yellow-50 text-yellow-600 border-yellow-100">
            <span className="w-1.5 h-1.5 rounded-full bg-yellow-400" />
            Pending Approval
          </span>
        </div>

        {/* Info grid */}
        <div className="px-6 mb-5">
          <div className="bg-slate-50 rounded-xl border border-slate-100 divide-y divide-slate-100">
            {[
              { icon: 'mail', label: 'Email', value: tech.email },
              { icon: 'call', label: 'Phone', value: tech.phone },
              { icon: 'location_on', label: 'City', value: tech.city },
              { icon: 'map', label: 'District', value: tech.district },
              { icon: 'flag', label: 'State', value: tech.state },
              { icon: 'pin_drop', label: 'PIN Code', value: tech.pinCode },
            ].map(({ icon, label, value }) =>
              value ? (
                <div key={label} className="flex items-start gap-3 px-4 py-2.5">
                  <span className="material-symbols-outlined text-[16px] text-[#004ac6] mt-0.5 shrink-0">
                    {icon}
                  </span>
                  <div className="min-w-0">
                    <p className="text-[10px] text-slate-400 font-medium uppercase tracking-wide">
                      {label}
                    </p>
                    <p className="text-xs sm:text-sm text-slate-700 font-semibold truncate">
                      {value}
                    </p>
                  </div>
                </div>
              ) : null
            )}
          </div>
        </div>

        {/* Govt ID link */}
        {tech.govtIdPhotoUrl && (
          <div className="px-6 mb-5">
            <a
              href={tech.govtIdPhotoUrl}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 text-sm text-[#004ac6] font-semibold hover:underline"
            >
              <span className="material-symbols-outlined text-[18px]">badge</span>
              View Government ID Proof
            </a>
          </div>
        )}

        {/* Action — Allow only */}
        <div className="px-6 pb-6 flex gap-3 flex-wrap">
          <button
            type="button"
            disabled={loading}
            onClick={handleApprove}
            className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-sm bg-emerald-500 hover:bg-emerald-600 text-white transition-all disabled:opacity-60"
          >
            {loading ? (
              <span className="material-symbols-outlined text-[18px] animate-spin">progress_activity</span>
            ) : (
              <span className="material-symbols-outlined text-[18px]">check_circle</span>
            )}
            Allow
          </button>
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-3 rounded-xl font-bold text-sm text-slate-500 bg-slate-100 hover:bg-slate-200 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

/* ─── Main Page ───────────────────────────────────────────────────── */
const TechnicianLoginApproval = () => {
  const {
    query,
    setQuery,
    technicians,
    filtered,
    selected,
    setSelected,
    isLoading,
    error,
    toasts,
    fetchTechnicians,
    handleApprove,
  } = useLoginApproval();

  return (
    <>
      <Toast toasts={toasts} />
      {selected && (
        <DetailModal
          tech={selected}
          onClose={() => setSelected(null)}
          onApprove={handleApprove}
        />
      )}

      <div className="space-y-5 sm:space-y-6">
        {/* Page header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <h1 className="text-xl sm:text-2xl font-extrabold text-slate-800 tracking-tight">
              Technician Login Approval
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Review and approve technicians awaiting login access.
            </p>
          </div>

          <div className="flex items-center gap-2 flex-wrap shrink-0">
            <span className="flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-full bg-yellow-50 text-yellow-600 border border-yellow-100">
              <span className="w-1.5 h-1.5 rounded-full bg-yellow-400" />
              {technicians.length} Pending
            </span>
            <button
              onClick={fetchTechnicians}
              className="flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-full bg-white border border-slate-200 text-slate-500 hover:bg-slate-50 transition"
            >
              <span className="material-symbols-outlined text-[14px]">refresh</span>
              Refresh
            </button>
          </div>
        </div>

        {/* Search */}
        <div className="relative">
          <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-[20px]">
            search
          </span>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by name, city, or specialty…"
            className="w-full bg-white border border-slate-100 shadow-sm rounded-xl pl-11 pr-4 py-3 text-sm text-slate-700 placeholder-slate-400 focus:ring-2 focus:ring-[#004ac6]/20 focus:border-[#004ac6] outline-none transition-all"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
            >
              <span className="material-symbols-outlined text-[18px]">close</span>
            </button>
          )}
        </div>

        {/* Loading */}
        {isLoading && <PageLoader />}

        {/* Error */}
        {error && !isLoading && (
          <ErrorPage
            message={error}
            onRetry={fetchTechnicians}
          />
        )}

        {/* Results count */}
        {!isLoading && !error && (
          <p className="text-xs text-slate-400 font-medium -mt-2">
            Showing {filtered.length} of {technicians.length} pending technicians
          </p>
        )}

        {/* Empty — nothing pending */}
        {!isLoading && !error && technicians.length === 0 && (
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm py-14 text-center">
            <span className="material-symbols-outlined text-slate-300 text-[48px]">task_alt</span>
            <p className="text-slate-500 font-semibold mt-3">No pending approvals.</p>
            <p className="text-xs text-slate-400 mt-1">
              All caught up — every technician has been reviewed.
            </p>
          </div>
        )}

        {/* No search results */}
        {!isLoading && !error && technicians.length > 0 && filtered.length === 0 && (
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm py-14 text-center">
            <span className="material-symbols-outlined text-slate-300 text-[48px]">search_off</span>
            <p className="text-slate-500 font-semibold mt-3">No technicians found</p>
            <p className="text-xs text-slate-400 mt-1">Try a different name, city, or specialty.</p>
          </div>
        )}

        {/* List */}
        {!isLoading && filtered.length > 0 && (
          <div className="bg-white rounded-2xl border border-slate-100/80 shadow-sm overflow-hidden">
            <div className="divide-y divide-slate-50">
              {filtered.map((tech) => (
                <div
                  key={tech.id}
                  className="flex items-center gap-3 sm:gap-4 px-4 py-3.5 sm:px-6 sm:py-4 hover:bg-slate-50/70 transition-colors group"
                >
                  {/* Avatar */}
                  {tech.profilePhotoUrl ? (
                    <img
                      src={tech.profilePhotoUrl}
                      alt={tech.name}
                      className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl object-cover shrink-0 border border-slate-100"
                    />
                  ) : (
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center text-white font-bold text-base sm:text-lg shrink-0 bg-gradient-to-br from-[#004ac6] to-[#57dffe]">
                      {tech.name?.charAt(0).toUpperCase()}
                    </div>
                  )}

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="text-sm font-bold text-slate-800 truncate">{tech.name}</h3>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full border bg-yellow-50 text-yellow-600 border-yellow-100">
                        Pending
                      </span>
                    </div>
                    <div className="flex items-center gap-2 mt-0.5 flex-wrap">
                      <span className="flex items-center gap-1 text-[11px] sm:text-xs text-slate-400">
                        <span className="material-symbols-outlined text-[13px] text-[#004ac6]">
                          {typeIcon(tech.technicianType)}
                        </span>
                        {tech.technicianType}
                      </span>
                      {tech.city && (
                        <>
                          <span className="text-slate-200 text-xs">•</span>
                          <span className="flex items-center gap-1 text-[11px] sm:text-xs text-slate-400">
                            <span className="material-symbols-outlined text-[13px]">location_on</span>
                            {tech.city}
                          </span>
                        </>
                      )}
                    </div>
                  </div>

                  {/* View details */}
                  <button
                    type="button"
                    onClick={() => setSelected(tech)}
                    className="shrink-0 flex items-center gap-1.5 px-3 sm:px-4 py-2 rounded-xl text-xs font-bold text-[#004ac6] bg-blue-50 border border-blue-100 hover:bg-[#004ac6] hover:text-white hover:border-[#004ac6] transition-all duration-200"
                  >
                    <span className="hidden sm:inline">View Details</span>
                    <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="h-4 sm:h-8" />
      </div>
    </>
  );
};

export default TechnicianLoginApproval;