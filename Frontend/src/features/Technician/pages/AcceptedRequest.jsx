import React from 'react';
import { useTechnicianJobs } from '../hooks/useTechnicianJobs';
import RequestCard from '../../../components/ui/RequestCard';
import GradientButton from '../../../components/ui/GradientButton';
import ErrorPage from '../../../components/common/ErrorPage';
import PageLoader from '../../../components/common/PageLoader';

// ── Mini Stepper Sub-component ─────────────────────────
const MiniStepper = ({ currentStep, status, steps }) => {
  if (status === 'completed') return null;
  return (
    <div className="flex items-center gap-1 sm:gap-1.5 mt-3">
      {steps.map((step, i) => (
        <React.Fragment key={i}>
          <div className="flex flex-col items-center">
            <div
              className={`w-5 h-5 sm:w-6 sm:h-6 rounded-full flex items-center justify-center text-[9px] sm:text-[10px] font-bold transition-all
              ${i < currentStep
                  ? 'bg-gradient-to-br from-[#004ac6] to-[#57dffe] text-white shadow-sm'
                  : i === currentStep
                    ? 'bg-gradient-to-br from-[#004ac6] to-[#57dffe] text-white ring-2 ring-[#004ac6]/20'
                    : 'bg-slate-100 text-slate-400'
                }`}
            >
              {i < currentStep ? '✓' : i + 1}
            </div>
          </div>
          {i < steps.length - 1 && (
            <div className={`flex-1 h-0.5 rounded-full transition-all ${i < currentStep ? 'bg-gradient-to-r from-[#004ac6] to-[#57dffe]' : 'bg-slate-100'}`} />
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

// ── Job Detail Modal Sub-component ─────────────────────
const JobDetailModal = ({ hook }) => {
  const {
    jobs, selectedJob, setSelectedJob, showCompleteConfirm, setShowCompleteConfirm,
    updatingId, advanceJob, getCategoryColor, getCategoryIcon, getStatusConfig,
    formatDate, steps
  } = hook;

  if (!selectedJob) return null;
  const job = jobs.find((j) => j.id === selectedJob.id) || selectedJob;
  const catColor = getCategoryColor(job.category);
  const statusConfig = getStatusConfig(job.status);
  const isUpdating = updatingId === job.id;

  return (
    <>
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[60] animate-[fadeIn_0.2s_ease]"
        onClick={() => { setSelectedJob(null); setShowCompleteConfirm(null); }}
      />
      <div className="fixed inset-0 z-[70] flex items-end sm:items-center justify-center sm:p-4 pointer-events-none">
        <div
          className="bg-white sm:rounded-3xl rounded-t-3xl shadow-[0_25px_80px_-20px_rgba(0,0,0,0.3)] w-full sm:max-w-2xl max-h-[92vh] sm:max-h-[90vh] overflow-y-auto pointer-events-auto animate-[slideUp_0.3s_ease]"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="sm:hidden flex justify-center pt-3 pb-1">
            <div className="w-10 h-1 rounded-full bg-slate-200" />
          </div>

          {/* Modal Header */}
          <div className="sticky top-0 bg-white/90 backdrop-blur-xl p-4 sm:p-6 pb-3 sm:pb-4 border-b border-slate-100 sm:rounded-t-3xl z-10">
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-3 min-w-0">
                <div className={`w-11 h-11 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl ${catColor.bg} ${catColor.text} ${catColor.border} border flex items-center justify-center shrink-0`}>
                  <span className="material-symbols-outlined text-[22px] sm:text-[28px]">{getCategoryIcon(job.category)}</span>
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap">
                    <span className={`text-[10px] sm:text-xs font-bold px-2 sm:px-2.5 py-0.5 rounded-md ${catColor.bg} ${catColor.text} ${catColor.border} border`}>{job.category}</span>
                    <span className={`text-[10px] sm:text-xs font-bold px-2 sm:px-2.5 py-0.5 rounded-md ${statusConfig.bg} ${statusConfig.text} ${statusConfig.border} border flex items-center gap-1`}>
                      <span className="material-symbols-outlined text-[11px] sm:text-[12px]">{statusConfig.icon}</span>
                      {statusConfig.label}
                    </span>
                    {job.urgency === 'Emergency' && (
                      <span className="text-[9px] sm:text-[10px] font-extrabold uppercase bg-red-500 text-white px-2 py-0.5 rounded-md flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse"></span>
                        Emergency
                      </span>
                    )}
                  </div>
                  <p className="text-[10px] sm:text-xs text-slate-400 mt-1 truncate">{job.id} • Requested {formatDate(job.createdAt)}</p>
                </div>
              </div>
              <button onClick={() => { setSelectedJob(null); setShowCompleteConfirm(null); }} className="p-1.5 sm:p-2 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-all shrink-0">
                <span className="material-symbols-outlined text-[20px] sm:text-[22px]">close</span>
              </button>
            </div>
          </div>

          {/* Modal Body */}
          <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
            <h2 className="text-base sm:text-lg font-bold text-slate-800 leading-snug">{job.issue}</h2>

            {/* Progress Section */}
            {job.status !== 'completed' && (
              <div className="bg-slate-50 rounded-xl sm:rounded-2xl p-4 sm:p-5 border border-slate-100">
                <div className="flex items-center justify-between mb-3 sm:mb-4 gap-2">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-[16px] sm:text-[18px] text-slate-400">route</span>
                    <span className="text-[10px] sm:text-xs font-bold text-slate-500 uppercase tracking-wide">Job Progress</span>
                  </div>
                  <GradientButton
                    onClick={() => {
                      if (job.currentStep === 1) setShowCompleteConfirm(job.id);
                      else advanceJob(job.id);
                    }}
                    disabled={job.currentStep >= 2 || isUpdating}
                    size="small"
                    className="!px-3 sm:!px-4 !py-1.5 !text-[11px] sm:!text-xs !rounded-lg !shadow-sm hover:!shadow-md hover:!translate-y-0"
                  >
                    {isUpdating ? 'Updating…' : job.currentStep === 1 ? 'Mark Complete' : 'Start Job'}
                  </GradientButton>
                </div>

                <div className="relative flex justify-between items-start pt-1">
                  <div className="absolute top-5 left-6 right-6 h-1 bg-slate-200 rounded-full z-0">
                    <div className="h-full bg-gradient-to-r from-[#004ac6] to-[#57dffe] rounded-full transition-all duration-500" style={{ width: `${(job.currentStep / 2) * 100}%` }} />
                  </div>
                  {steps.map((step, i) => {
                    const isDone = i < job.currentStep;
                    const isActive = i === job.currentStep;
                    return (
                      <div key={i} className="relative z-10 flex flex-col items-center text-center w-14 sm:w-16">
                        <div className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center text-white transition-all duration-300
                          ${isActive ? 'bg-gradient-to-br from-[#004ac6] to-[#57dffe] scale-110 ring-4 ring-[#004ac6]/10 shadow-[0_8px_20px_-4px_rgba(0,74,198,0.4)]' : isDone ? 'bg-gradient-to-br from-[#004ac6] to-[#57dffe] shadow-md' : 'bg-slate-200 text-slate-400 shadow-none'}`}>
                          <span className="material-symbols-outlined text-[18px] sm:text-[20px]">{isDone ? 'check' : step.icon}</span>
                        </div>
                        <span className={`text-[9px] sm:text-[10px] mt-1.5 sm:mt-2 font-medium leading-tight ${isActive ? 'text-[#004ac6] font-bold' : 'text-slate-500'}`}>{step.label}</span>
                      </div>
                    );
                  })}
                </div>

                {showCompleteConfirm === job.id && (
                  <div className="mt-3 sm:mt-4 p-3 sm:p-4 bg-amber-50 rounded-xl border border-amber-200 flex items-start gap-2.5 sm:gap-3">
                    <span className="material-symbols-outlined text-[18px] sm:text-[20px] text-amber-600 mt-0.5 shrink-0">warning_amber</span>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs sm:text-sm font-bold text-amber-800">Confirm job completion?</p>
                      <p className="text-[11px] sm:text-xs text-amber-600 mt-0.5">This will mark the job as completed for the customer.</p>
                      <div className="flex gap-2 mt-2.5 sm:mt-3">
                        <button onClick={() => setShowCompleteConfirm(null)} className="px-3 py-1.5 text-[11px] sm:text-xs font-semibold rounded-lg border border-amber-200 text-amber-700 hover:bg-amber-100 transition-all">Cancel</button>
                        <button onClick={() => advanceJob(job.id)} disabled={isUpdating} className="px-3 sm:px-4 py-1.5 text-[11px] sm:text-xs font-bold rounded-lg bg-emerald-500 text-white shadow-sm hover:bg-emerald-600 disabled:opacity-50 transition-all">
                          {isUpdating ? 'Updating…' : 'Yes, Complete'}
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Completed Badge */}
            {job.status === 'completed' && (
              <div className="bg-emerald-50 rounded-xl sm:rounded-2xl p-4 sm:p-5 border border-emerald-200 flex items-center gap-3 sm:gap-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-emerald-100 rounded-xl flex items-center justify-center text-emerald-600 shrink-0">
                  <span className="material-symbols-outlined text-[24px] sm:text-[28px]">verified</span>
                </div>
                <div>
                  <p className="text-sm font-bold text-emerald-800">Job Completed</p>
                  <p className="text-xs text-emerald-600 mt-0.5">Nice work — this one's done.</p>
                </div>
              </div>
            )}

            {/* Rating */}
            {job.status === 'completed' && job.rating && (
              <div className="bg-amber-50 rounded-xl sm:rounded-2xl p-4 sm:p-5 border border-amber-100">
                <p className="text-[10px] sm:text-xs font-bold text-amber-700 uppercase tracking-wide mb-2">Customer Rating</p>
                <div className="flex items-center gap-0.5 sm:gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <span
                      key={star}
                      className={`material-symbols-outlined text-[18px] sm:text-[20px] ${star <= job.rating ? 'text-amber-400' : 'text-slate-200'}`}
                      style={{ fontVariationSettings: star <= job.rating ? "'FILL' 1" : "'FILL' 0" }}
                    >
                      star
                    </span>
                  ))}
                </div>
                {job.review && <p className="text-sm text-amber-800 mt-2 leading-relaxed italic">"{job.review}"</p>}
              </div>
            )}

            {job.status === 'completed' && !job.rating && (
              <div className="bg-slate-50 rounded-xl sm:rounded-2xl p-4 sm:p-5 border border-slate-100 flex items-center gap-3">
                <span className="material-symbols-outlined text-slate-300 text-[20px] sm:text-[24px] shrink-0">hourglass_empty</span>
                <p className="text-xs text-slate-400">Customer hasn't rated this job yet.</p>
              </div>
            )}

            {/* Customer & Address Info */}
            <div className="grid grid-cols-2 gap-2.5 sm:gap-4">
              <div className="bg-slate-50 rounded-xl p-3 sm:p-4 border border-slate-100">
                <span className="material-symbols-outlined text-[18px] sm:text-[20px] text-slate-400 mb-1 block">person</span>
                <p className="text-[10px] sm:text-xs text-slate-400 font-medium">Customer</p>
                <p className="text-sm font-bold text-slate-800 mt-0.5 truncate">{job.name}</p>
                <p className="text-xs text-slate-500 mt-1">{job.phone}</p>
              </div>
              <div className="bg-slate-50 rounded-xl p-3 sm:p-4 border border-slate-100">
                <span className="material-symbols-outlined text-[18px] sm:text-[20px] text-slate-400 mb-1 block">location_on</span>
                <p className="text-[10px] sm:text-xs text-slate-400 font-medium">Address</p>
                <p className="text-sm font-bold text-slate-800 mt-0.5 leading-snug">{job.address}</p>
              </div>
            </div>

            {job.photos > 0 && (
              <div className="flex items-center gap-2 sm:gap-3">
                <span className="material-symbols-outlined text-[18px] sm:text-[20px] text-slate-400">photo_library</span>
                <span className="text-xs sm:text-sm text-slate-500">{job.photos} photo{job.photos !== 1 ? 's' : ''} attached</span>
              </div>
            )}
          </div>

          {/* Modal Footer */}
          <div className="sticky bottom-0 bg-white/90 backdrop-blur-xl p-4 sm:p-6 pt-3 sm:pt-4 border-t border-slate-100">
            <div className="flex gap-2.5 sm:gap-3">
              <button className="flex-1 py-3 rounded-xl text-sm font-bold text-[#004ac6] bg-blue-50 border border-blue-100 hover:bg-[#004ac6] hover:text-white transition-all flex items-center justify-center gap-2">
                <span className="material-symbols-outlined text-[18px]">call</span>
                Call
              </button>
              <button className="flex-1 py-3 rounded-xl text-sm font-bold text-[#004ac6] bg-blue-50 border border-blue-100 hover:bg-[#004ac6] hover:text-white transition-all flex items-center justify-center gap-2">
                <span className="material-symbols-outlined text-[18px]">chat</span>
                Message
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

// ── Main Component ─────────────────────────────────────────
const AcceptedRequest = () => {
  const hook = useTechnicianJobs();

  const {
    loading, loadingMore, error, filteredJobs, counts, fetchJobs,
    activeFilter, setActiveFilter, searchQuery, setSearchQuery,
    steps, filters, getCategoryColor, getCategoryIcon, getStatusConfig,
    formatDate, updatingId, advanceJob, setSelectedJob,
    hasMore, sentinelRef,
  } = hook;

  // ── Loading ────────────────────────────────────────────────
  if (loading) return <PageLoader />;
  // ── Error ──────────────────────────────────────────────────
  if (error) return <ErrorPage message={error} onRetry={fetchJobs} />;

  // ── Main ───────────────────────────────────────────────────
  return (
    <div className="space-y-4 sm:space-y-5">
      <JobDetailModal hook={hook} />

      {/* ═══════════ UNIFIED PAGE HEADER ═══════════ */}
      <div className="flex items-center justify-between gap-3">
        <div className="min-w-0">
          <h1 className="text-lg sm:text-2xl font-extrabold text-slate-800 tracking-tight">Accepted Requests</h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-0.5 truncate">Manage your jobs and track progress</p>
        </div>
        <button
          onClick={fetchJobs}
          className="shrink-0 inline-flex items-center gap-1.5 px-3 sm:px-4 py-2 sm:py-2.5 bg-white border border-slate-200 rounded-xl text-xs sm:text-sm font-semibold text-slate-600 hover:bg-slate-50 hover:border-slate-300 transition-all shadow-sm"
        >
          <span className="material-symbols-outlined text-[16px] sm:text-[18px]">refresh</span>
          <span className="hidden sm:inline">Refresh</span>
        </button>
      </div>

      {/* ═══════════ STATS ═══════════ */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-4">
        {[
          { icon: 'work', label: 'Total Accepted', value: counts.all, color: 'bg-blue-50 text-blue-600' },
          { icon: 'engineering', label: 'In Progress', value: counts['in-progress'], color: 'bg-orange-50 text-orange-500' },
          { icon: 'event', label: 'Accepted', value: counts.scheduled, color: 'bg-purple-50 text-purple-500' },
          { icon: 'verified', label: 'Completed', value: counts.completed, color: 'bg-emerald-50 text-emerald-600' },
        ].map((stat, i) => (
          <div key={i} className="bg-white p-3 sm:p-5 rounded-xl sm:rounded-2xl border border-slate-100/80 shadow-sm">
            <div className={`w-8 h-8 sm:w-11 sm:h-11 rounded-lg sm:rounded-xl flex items-center justify-center ${stat.color} mb-2 sm:mb-3`}>
              <span className="material-symbols-outlined text-[18px] sm:text-[22px]">{stat.icon}</span>
            </div>
            <p className="text-xl sm:text-2xl font-extrabold text-slate-800 tracking-tight leading-none">{stat.value}</p>
            <p className="text-[10px] sm:text-xs text-slate-400 font-medium mt-1 sm:mt-0.5 leading-tight">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* ═══════════ SEARCH + FILTERS ═══════════ */}
      <div className="bg-white rounded-xl sm:rounded-2xl border border-slate-100/80 shadow-sm p-3 sm:p-4">
        <div className="flex items-center bg-slate-50 rounded-lg sm:rounded-xl px-3 sm:px-4 py-2.5 sm:py-3 border border-slate-100">
          <span className="material-symbols-outlined text-slate-400 text-[18px] sm:text-[20px] mr-2 sm:mr-3">search</span>
          <input
            type="text"
            placeholder="Search by job, customer, address…"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-transparent outline-none text-sm text-slate-600 w-full placeholder-slate-400"
          />
          {searchQuery && (
            <button onClick={() => setSearchQuery('')} className="p-0.5 sm:p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-200 transition-all shrink-0">
              <span className="material-symbols-outlined text-[16px] sm:text-[18px]">close</span>
            </button>
          )}
        </div>

        {searchQuery && (
          <p className="text-[11px] sm:text-xs text-slate-400 mt-2 px-1 truncate">
            &ldquo;{searchQuery}&rdquo; — {filteredJobs.length} result{filteredJobs.length !== 1 ? 's' : ''}
          </p>
        )}

        {/* ── Filter Pills ── */}
        <div className="flex gap-1.5 sm:gap-2 mt-3 overflow-x-auto pb-0.5 -mx-0.5 px-0.5">
          {filters.map((filter) => {
            const isActive = activeFilter === filter.key;

            if (isActive) {
              return (
                <GradientButton
                  key={filter.key}
                  size="small"
                  onClick={() => setActiveFilter(filter.key)}
                  className="!px-2.5 sm:!px-4 !py-1.5 sm:!py-2 !text-[11px] sm:!text-sm !rounded-lg sm:!rounded-xl !shadow-md !shadow-[#004ac6]/20 !font-semibold hover:!translate-y-0 whitespace-nowrap shrink-0 !border-0"
                >
                  <span className="material-symbols-outlined text-[14px] sm:text-[18px]">{filter.icon}</span>
                  <span className="hidden xs:inline">{filter.label}</span>
                  <span className="text-[9px] sm:text-[11px] font-bold px-1.5 py-0.5 rounded-md bg-white/20">
                    {counts[filter.key]}
                  </span>
                </GradientButton>
              );
            }

            return (
              <button
                key={filter.key}
                onClick={() => setActiveFilter(filter.key)}
                className="inline-flex items-center gap-1 sm:gap-2 px-2.5 sm:px-4 py-1.5 sm:py-2 rounded-lg sm:rounded-xl text-[11px] sm:text-sm font-semibold transition-all duration-200 whitespace-nowrap shrink-0 border bg-slate-50 text-slate-500 border-slate-100 hover:bg-slate-100 active:bg-slate-200"
              >
                <span className="material-symbols-outlined text-[14px] sm:text-[18px]">{filter.icon}</span>
                <span className="hidden xs:inline">{filter.label}</span>
                <span className="text-[9px] sm:text-[11px] font-bold px-1.5 py-0.5 rounded-md bg-slate-200/70 text-slate-500">
                  {counts[filter.key]}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* ═══════════ REQUEST LIST ═══════════ */}
      {filteredJobs.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-100/80 shadow-sm p-10 sm:p-16 text-center">
          <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-4 bg-slate-50 rounded-2xl flex items-center justify-center">
            <span className="material-symbols-outlined text-[32px] sm:text-[40px] text-slate-300">work_off</span>
          </div>
          <h3 className="text-base sm:text-lg font-bold text-slate-700">No jobs found</h3>
          <p className="text-sm text-slate-400 mt-1 max-w-sm mx-auto">
            {searchQuery
              ? `No results for "${searchQuery}".`
              : `No ${activeFilter === 'all' ? '' : activeFilter.replace('-', ' ') + ' '}jobs at the moment.`}
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
        <div className="space-y-2.5 sm:space-y-3">
          {filteredJobs.map((job) => {
            const catColor = getCategoryColor(job.category);
            const catIcon = getCategoryIcon(job.category);
            const statusConfig = getStatusConfig(job.status);
            const isUpdating = updatingId === job.id;

            const accentClass =
              job.status === 'completed'
                ? 'bg-gradient-to-r from-emerald-400 to-emerald-300'
                : job.status === 'in-progress'
                  ? 'bg-gradient-to-r from-[#004ac6] to-[#57dffe]'
                  : 'bg-gradient-to-r from-purple-400 to-purple-300';

            const borderClass =
              job.status === 'completed'
                ? 'border-emerald-100'
                : job.urgency === 'Emergency'
                  ? 'border-red-200/60'
                  : 'border-slate-100/80';

            const stepper = <MiniStepper currentStep={job.currentStep} status={job.status} steps={steps} />;

            return (
              <RequestCard
                key={job.id}
                isEmergency={job.urgency === 'Emergency' && job.status !== 'completed'}
                accentClass={accentClass}
                borderClass={borderClass}
                category={{ ...catColor, icon: catIcon, label: job.category }}
                badges={
                  <span className={`text-[10px] sm:text-xs font-bold px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-md sm:rounded-lg ${statusConfig.bg} ${statusConfig.text} ${statusConfig.border} border flex items-center gap-1`}>
                    <span className="material-symbols-outlined text-[11px] sm:text-[12px]">{statusConfig.icon}</span>
                    {statusConfig.label}
                  </span>
                }
                id={job.id}
                title={job.issue}
                onTitleClick={() => setSelectedJob(job)}
                meta={[
                  { icon: 'person', value: job.name, colorClass: 'text-[#004ac6]' },
                  { icon: 'home', value: job.address, colorClass: 'text-red-400', truncate: true },
                  { icon: 'schedule', value: `Requested ${formatDate(job.createdAt)}` },
                ]}
                mobileExtra={stepper}
                desktopExtra={stepper}
                mobileActions={
                  <>
                    <button
                      onClick={() => setSelectedJob(job)}
                      className="w-10 shrink-0 rounded-lg text-xs font-bold text-[#004ac6] bg-blue-50 border border-blue-100 active:bg-[#004ac6] active:text-white transition-all flex items-center justify-center"
                    >
                      <span className="material-symbols-outlined text-[18px]">visibility</span>
                    </button>

                    {job.status !== 'completed' ? (
                      <GradientButton
                        onClick={() => advanceJob(job.id)}
                        disabled={isUpdating}
                        size="small"
                        className="flex-1 !py-2.5 !text-xs !rounded-lg !font-bold !shadow-sm active:!shadow-md hover:!translate-y-0"
                      >
                        <span className="material-symbols-outlined text-[16px]">
                          {isUpdating ? 'progress_activity' : job.currentStep === 1 ? 'check_circle' : 'play_arrow'}
                        </span>
                        {isUpdating ? 'Updating…' : job.currentStep === 1 ? 'Complete Job' : 'Start Job'}
                      </GradientButton>
                    ) : job.rating ? (
                      <div className="flex-1 flex items-center justify-between px-3 rounded-lg text-xs font-bold text-amber-600 bg-amber-50 border border-amber-100">
                        <span className="flex items-center gap-1">
                          <span className="material-symbols-outlined text-[14px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                          {job.rating}.0
                        </span>
                        {job.review && (
                          <span className="text-[10px] text-amber-500 font-medium truncate max-w-[60%]">&quot;{job.review}&quot;</span>
                        )}
                      </div>
                    ) : (
                      <div className="flex-1 flex items-center gap-1.5 px-3 rounded-lg text-xs text-slate-400 bg-slate-50 border border-slate-100">
                        <span className="material-symbols-outlined text-[14px]">hourglass_empty</span>
                        Awaiting rating
                      </div>
                    )}
                  </>
                }
                desktopActions={
                  <>
                    <button
                      onClick={() => setSelectedJob(job)}
                      className="flex-1 lg:flex-none px-4 py-2.5 rounded-xl text-xs font-bold text-[#004ac6] bg-blue-50 border border-blue-100 hover:bg-[#004ac6] hover:text-white transition-all flex items-center justify-center gap-1.5"
                    >
                      <span className="material-symbols-outlined text-[16px]">visibility</span>
                      Details
                    </button>
                    {job.status !== 'completed' && (
                      <GradientButton
                        onClick={() => advanceJob(job.id)}
                        disabled={isUpdating}
                        size="small"
                        className="flex-1 lg:flex-none !px-3 !py-2.5 !text-xs !rounded-xl !font-bold !shadow-sm hover:!shadow-md hover:!-translate-y-0.5"
                        title={job.currentStep === 1 ? 'Mark Complete' : 'Start Job'}
                      >
                        {isUpdating ? '…' : job.currentStep === 1 ? 'Complete' : 'Start'}
                      </GradientButton>
                    )}
                    {job.status === 'completed' && job.rating && (
                      <span
                        className="px-3 py-2.5 rounded-xl text-xs font-bold text-amber-600 bg-amber-50 border border-amber-100 flex items-center gap-1"
                        title={job.review || ''}
                      >
                        <span className="material-symbols-outlined text-[14px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                        {job.rating}.0
                      </span>
                    )}
                  </>
                }
              />
            );
          })}
        </div>
      )}

      {/* ── Sentinel — infinite scroll ── */}
      <div ref={sentinelRef} className="h-4 sm:h-8 flex items-center justify-center">
        {loadingMore && (
          <div className="flex items-center gap-2 text-slate-400">
            <div className="w-4 h-4 border-2 border-slate-300 border-t-[#004ac6] rounded-full animate-spin" />
            <span className="text-xs font-medium">Loading more...</span>
          </div>
        )}
      </div>

      <style>{`
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes slideUp { from { opacity: 0; transform: translateY(30px) scale(0.97); } to { opacity: 1; transform: translateY(0) scale(1); } }
      `}</style>
    </div>
  );
};

export default AcceptedRequest;